from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import time
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone
import requests
from emergentintegrations.llm.chat import LlmChat, UserMessage


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')
OPENWEATHER_API_KEY = os.environ.get('OPENWEATHER_API_KEY', '')
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_ADMIN_CHAT_ID = os.environ.get('TELEGRAM_ADMIN_CHAT_ID', '')

app = FastAPI(title="Kurdyukov Aparts API")
api_router = APIRouter(prefix="/api")

# ----------------- Models -----------------

class LeadIn(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    guests: Optional[int] = 1
    message: Optional[str] = None
    source: Optional[str] = "landing"


class LeadOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    phone: str
    email: Optional[str] = None
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    guests: Optional[int] = 1
    message: Optional[str] = None
    source: Optional[str] = "landing"
    created_at: str


class ChatIn(BaseModel):
    session_id: Optional[str] = None
    message: str


class ChatOut(BaseModel):
    session_id: str
    response: str


class Room(BaseModel):
    id: str
    name: str
    address: str
    short: str
    price_from: int
    features: List[str]
    images: List[str]
    capacity: int
    size_m2: int


class Review(BaseModel):
    id: str
    author: str
    avatar: str
    date: str
    rating: int
    text: str
    source: str


# ----------------- System prompt for AI concierge -----------------

CONCIERGE_SYSTEM_PROMPT = """Ты — Александр, гостеприимный и интеллигентный консьерж апарт-отеля «Kurdyukov Aparts» в Санкт-Петербурге.

О ОТЕЛЕ:
— Формат: апарт-отель, студии.
— Локация: исторический центр Петербурга. Адреса: Гончарная ул., 10, 11, 17; Невский проспект, 124; 4-я Советская, 8 — в шаговой доступности от Невского проспекта, Московского вокзала, станции метро «Площадь Восстания», Аничкова моста, Казанского и Исаакиевского соборов, Русского музея, Александринского театра, Таврического сада.
— Заезд: с 11:00, выезд до 15:00. Возможен ранний заезд по договорённости.
— Удобства каждого номера: бесплатный Wi-Fi, мини-кухня (плита, чайник, микроволновка, посуда), стиральная машина, Smart TV, ежедневная уборка, средства гигиены (тапочки, шампунь, зубная щётка), завтрак в постель по запросу.
— Цена от 1 800 ₽/ночь.
— Поддержка: онлайн-консьерж 24/7.

ВАЖНО про наличие номеров:
— У тебя НЕТ прямого доступа к календарю бронирований. Реальную доступность и актуальные цены показывает модуль Bnovo в секции «Бронирование» на сайте.
— Когда гость спрашивает про даты — отвечай: «Актуальную доступность и точную цену покажет модуль бронирования Bnovo на сайте — могу прокрутить вас к нему. Если хотите, передам менеджеру в WhatsApp +7 952 225 41 41, он подтвердит наличие лично».
— Никогда не выдумывай номера, статусы броней или цены — это подрывает доверие.

ТВОЯ ЗАДАЧА — не просто отвечать на вопросы, а влюблять гостя в наш отель и Петербург. Общайся на русском в тёплой, деловой манере, тактично и интеллигентно. Помни контекст разговора. Если вопрос не по теме — мягко возвращай беседу к бронированию или услугам отеля.

НАВЫКИ:
1. Бронирование: говори про ориентировочные цены (от 1 800 ₽/ночь), правила заезда (с 11:00) и выезда (до 15:00), отмены. Для проверки доступности направляй в модуль Bnovo на сайте или в WhatsApp +7 952 225 41 41.
2. Услуги: рассказывай про удобства, гигиенические наборы, завтрак в постель.
3. Локация: объясняй маршрут от аэропорта Пулково (~45 мин на такси) и от Московского вокзала (5 минут пешком). Рекомендуй достопримечательности, кафе, рестораны рядом.
4. Решение проблем: при негативе — «Понимаю ваше беспокойство, я передам информацию администратору» и предложи переключиться на менеджера в WhatsApp +7 952 225 41 41 или Telegram @Alex_x_00.
5. Допродажи: уместно предлагай завтрак в постель.

ФОРМАТ:
— Отвечай коротко, 2–4 предложения, без длинных списков, если только гость не попросил подробностей.
— Используй на «вы».
— В конце предложений уместно добавляй мягкий call-to-action: «Подскажу даты — проверим в Bnovo» или «Хотите, забронирую звонок менеджера?»."""


# ----------------- Demo data -----------------

DEMO_ROOMS: List[Room] = [
    Room(
        id="goncharnaya-10",
        name="Студия на Гончарной, 10",
        address="ул. Гончарная, 10",
        short="Уютная студия апарт-отеля в 5 минутах от Московского вокзала",
        price_from=1800,
        features=["Smart TV", "Мини-кухня", "Стиральная машина", "Wi-Fi"],
        images=[
            "https://customer-assets.emergentagent.com/job_aparts-center/artifacts/qy3wr9ot_3498b15463f8ef561dff4f7767126380_1050x600.png",
        ],
        capacity=2,
        size_m2=22,
    ),
    Room(
        id="goncharnaya-11",
        name="Студия на Гончарной, 11",
        address="ул. Гончарная, 11",
        short="Студия апарт-отеля с тёплым освещением и Smart TV",
        price_from=1800,
        features=["Smart TV", "Мини-кухня", "Стиральная машина", "Wi-Fi"],
        images=[
            "https://customer-assets.emergentagent.com/job_aparts-center/artifacts/3ifor89f_2553549160f37b7db393587ec9080dff_1050x600.png",
        ],
        capacity=2,
        size_m2=20,
    ),
    Room(
        id="goncharnaya-17",
        name="Студия на Гончарной, 17",
        address="ул. Гончарная, 17",
        short="Камерная студия с зеркалом во всю стену — визуально просторнее",
        price_from=1800,
        features=["Smart TV", "Мини-кухня", "Стиральная машина", "Wi-Fi"],
        images=[
            "https://customer-assets.emergentagent.com/job_aparts-center/artifacts/5hpfzwsx_adcbed9ccc6d7796ac6c3ad251438229.png",
        ],
        capacity=2,
        size_m2=21,
    ),
    Room(
        id="nevsky-124",
        name="Студия на Невском, 124",
        address="Невский проспект, 124",
        short="Двухуровневая студия-лофт с кирпичной кладкой на главной улице",
        price_from=1800,
        features=["Лофт-уровень", "Мини-кухня", "Стиральная машина", "Wi-Fi"],
        images=[
            "https://customer-assets.emergentagent.com/job_aparts-center/artifacts/1lmrimw7_c5558c2840c304841229e5d182242fc5_1050x600.png",
        ],
        capacity=2,
        size_m2=24,
    ),
    Room(
        id="sovetskaya-8",
        name="Студия на 4-й Советской, 8",
        address="4-я Советская ул., 8",
        short="Просторная студия с обеденной зоной и диваном",
        price_from=1800,
        features=["Smart TV", "Мини-кухня", "Стиральная машина", "Wi-Fi"],
        images=[
            "https://customer-assets.emergentagent.com/job_aparts-center/artifacts/vyo3ett2_db308701d7ec0e5c081e32c23cc07f13_1050x600.jpg",
        ],
        capacity=3,
        size_m2=26,
    ),
]


DEMO_REVIEWS: List[Review] = [
    Review(
        id="r1",
        author="Анна К.",
        avatar="https://i.pravatar.cc/120?img=47",
        date="2025-10-14",
        rating=5,
        text="Прекрасный апарт-отель в самом сердце Петербурга. Александр-администратор ответил на все вопросы ещё до заезда. Постель — облако.",
        source="Яндекс.Карты",
    ),
    Review(
        id="r2",
        author="Дмитрий П.",
        avatar="https://i.pravatar.cc/120?img=12",
        date="2025-09-28",
        rating=5,
        text="Расположение огонь — 5 минут до Невского. Студия с тёплым светом, мягкие подсветки и Smart TV — отдельный кайф вечером.",
        source="Яндекс.Карты",
    ),
    Review(
        id="r3",
        author="Мария Л.",
        avatar="https://i.pravatar.cc/120?img=32",
        date="2025-09-10",
        rating=5,
        text="Заехали на годовщину. Заказали завтрак в постель — мелочь, но запомнилось навсегда. Спасибо за внимание к деталям.",
        source="Booking",
    ),
    Review(
        id="r4",
        author="Олег С.",
        avatar="https://i.pravatar.cc/120?img=68",
        date="2025-08-22",
        rating=5,
        text="Жил неделю по работе. Тихо, чисто, быстрый Wi-Fi. Идеально для командировки и для прогулок по городу.",
        source="Яндекс.Карты",
    ),
]


# ----------------- Weather (cached) -----------------

_WEATHER_CACHE: Dict[str, Any] = {"ts": 0, "data": None}


def fetch_spb_weather() -> Dict[str, Any]:
    """Fetch current weather for Saint Petersburg from OpenWeatherMap with 10-minute cache."""
    now = time.time()
    if _WEATHER_CACHE["data"] and now - _WEATHER_CACHE["ts"] < 600:
        return _WEATHER_CACHE["data"]

    if not OPENWEATHER_API_KEY:
        # Fallback static data
        return {
            "condition": "clear",
            "description": "ясно",
            "temp": 0,
            "is_day": True,
            "city": "Санкт-Петербург",
            "fallback": True,
        }

    try:
        r = requests.get(
            "https://api.openweathermap.org/data/2.5/weather",
            params={
                "q": "Saint Petersburg,RU",
                "appid": OPENWEATHER_API_KEY,
                "units": "metric",
                "lang": "ru",
            },
            timeout=8,
        )
        r.raise_for_status()
        raw = r.json()
        main_id = raw.get("weather", [{}])[0].get("id", 800)
        # Map to simple conditions for the panorama overlay
        if 200 <= main_id < 300:
            condition = "thunderstorm"
        elif 300 <= main_id < 600:
            condition = "rain"
        elif 600 <= main_id < 700:
            condition = "snow"
        elif 700 <= main_id < 800:
            condition = "fog"
        elif main_id == 800:
            condition = "clear"
        else:
            condition = "clouds"

        sunrise = raw.get("sys", {}).get("sunrise", 0)
        sunset = raw.get("sys", {}).get("sunset", 0)
        current = raw.get("dt", int(now))
        is_day = sunrise <= current <= sunset if sunrise and sunset else True

        data = {
            "condition": condition,
            "description": raw.get("weather", [{}])[0].get("description", ""),
            "temp": round(raw.get("main", {}).get("temp", 0)),
            "feels_like": round(raw.get("main", {}).get("feels_like", 0)),
            "humidity": raw.get("main", {}).get("humidity", 0),
            "wind_speed": raw.get("wind", {}).get("speed", 0),
            "is_day": is_day,
            "city": "Санкт-Петербург",
            "icon": raw.get("weather", [{}])[0].get("icon", "01d"),
            "sunrise": sunrise,
            "sunset": sunset,
            "fallback": False,
        }
        _WEATHER_CACHE["ts"] = now
        _WEATHER_CACHE["data"] = data
        return data
    except Exception as e:
        logging.exception("Weather fetch failed: %s", e)
        return {
            "condition": "clouds",
            "description": "облачно",
            "temp": 5,
            "is_day": True,
            "city": "Санкт-Петербург",
            "fallback": True,
        }


# ----------------- Telegram notifications -----------------

def send_telegram_lead_notification(lead: Dict[str, Any]) -> None:
    """Send a formatted message about a new lead to the admin Telegram chat."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_ADMIN_CHAT_ID:
        return

    name = lead.get("name") or "—"
    phone = lead.get("phone") or "—"
    email = lead.get("email") or "—"
    check_in = lead.get("check_in") or "—"
    check_out = lead.get("check_out") or "—"
    guests = lead.get("guests") or "—"
    message = lead.get("message") or ""
    source = lead.get("source") or "—"
    created = lead.get("created_at") or ""

    text = (
        "🛎 *Новая заявка — Kurdyukov Aparts*\n"
        f"\n👤 *Гость:* {name}"
        f"\n📞 *Телефон:* `{phone}`"
        f"\n📧 *Email:* {email}"
        f"\n📅 *Заезд:* {check_in}  →  *Выезд:* {check_out}"
        f"\n👥 *Гости:* {guests}"
        f"\n🌐 *Источник:* {source}"
    )
    if message:
        text += f"\n💬 *Сообщение:* {message}"
    text += f"\n🕓 {created}"

    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            json={
                "chat_id": TELEGRAM_ADMIN_CHAT_ID,
                "text": text,
                "parse_mode": "Markdown",
                "disable_web_page_preview": True,
            },
            timeout=6,
        )
    except Exception as e:
        logging.warning("Telegram send failed: %s", e)


# ----------------- Routes -----------------

@api_router.get("/")
async def root():
    return {"service": "Kurdyukov Aparts API", "ok": True}


@api_router.get("/weather")
async def get_weather():
    return fetch_spb_weather()


@api_router.get("/rooms", response_model=List[Room])
async def list_rooms():
    return DEMO_ROOMS


@api_router.get("/rooms/{room_id}", response_model=Room)
async def get_room(room_id: str):
    for r in DEMO_ROOMS:
        if r.id == room_id:
            return r
    raise HTTPException(status_code=404, detail="Room not found")


@api_router.get("/reviews", response_model=List[Review])
async def list_reviews():
    return DEMO_REVIEWS


@api_router.post("/leads", response_model=LeadOut)
async def create_lead(lead: LeadIn):
    doc = lead.model_dump()
    doc["id"] = str(uuid.uuid4())
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.leads.insert_one(doc)
    doc.pop("_id", None)
    # Notify admin via Telegram (best-effort, never breaks the API)
    try:
        send_telegram_lead_notification(doc)
    except Exception as e:
        logging.warning("Telegram notify failed: %s", e)
    return LeadOut(**doc)


@api_router.get("/leads", response_model=List[LeadOut])
async def list_leads(x_admin_token: Optional[str] = None):
    # Privacy: this endpoint exposes guest PII. Require an admin token (set via env).
    admin_token = os.environ.get("ADMIN_TOKEN")
    if not admin_token or x_admin_token != admin_token:
        raise HTTPException(status_code=403, detail="Forbidden")
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return [LeadOut(**lead) for lead in leads]


@api_router.post("/chat", response_model=ChatOut)
async def chat(payload: ChatIn):
    if not EMERGENT_LLM_KEY:
        raise HTTPException(status_code=500, detail="LLM key is not configured")

    session_id = payload.session_id or str(uuid.uuid4())

    try:
        llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=CONCIERGE_SYSTEM_PROMPT,
        ).with_model("openai", "gpt-5.2")

        # Replay short history from DB for continuity
        history = await db.chat_messages.find(
            {"session_id": session_id}, {"_id": 0}
        ).sort("created_at", 1).to_list(40)
        # Library maintains its own state once instantiated; we instead just feed the new user message.
        # Replay previous messages so the new LlmChat instance has context.
        for h in history:
            if h.get("role") == "user":
                try:
                    await llm.send_message(UserMessage(text=h.get("content", "")))
                except Exception:
                    pass

        user_msg = UserMessage(text=payload.message)
        response_text = await llm.send_message(user_msg)

        now_iso = datetime.now(timezone.utc).isoformat()
        await db.chat_messages.insert_one({
            "id": str(uuid.uuid4()),
            "session_id": session_id,
            "role": "user",
            "content": payload.message,
            "created_at": now_iso,
        })
        await db.chat_messages.insert_one({
            "id": str(uuid.uuid4()),
            "session_id": session_id,
            "role": "assistant",
            "content": response_text,
            "created_at": now_iso,
        })

        return ChatOut(session_id=session_id, response=response_text)
    except HTTPException:
        raise
    except Exception as e:
        logging.exception("Chat error: %s", e)
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")


@api_router.get("/chat/history/{session_id}")
async def chat_history(session_id: str):
    msgs = await db.chat_messages.find(
        {"session_id": session_id}, {"_id": 0}
    ).sort("created_at", 1).to_list(200)
    return msgs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
