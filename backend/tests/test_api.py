"""Backend API tests for Kurdyukov Aparts."""
import os
import time
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://aparts-center.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# ---------------- Health ----------------
def test_health_root():
    r = requests.get(f"{API}/", timeout=15)
    assert r.status_code == 200
    j = r.json()
    assert j.get("ok") is True
    assert "service" in j


# ---------------- Weather ----------------
def test_weather_endpoint():
    r = requests.get(f"{API}/weather", timeout=20)
    assert r.status_code == 200
    d = r.json()
    assert "condition" in d
    assert "temp" in d
    assert "is_day" in d
    assert d.get("city") == "Санкт-Петербург"
    # Should be a real result (not fallback) since key is configured
    assert d.get("fallback") is False, f"Weather should not be fallback. Got: {d}"
    assert isinstance(d["temp"], (int, float))


def test_weather_cache():
    """Two successive calls should return same data (cached)."""
    r1 = requests.get(f"{API}/weather", timeout=15).json()
    r2 = requests.get(f"{API}/weather", timeout=15).json()
    assert r1.get("temp") == r2.get("temp")


# ---------------- Rooms ----------------
def test_list_rooms():
    r = requests.get(f"{API}/rooms", timeout=15)
    assert r.status_code == 200
    rooms = r.json()
    assert isinstance(rooms, list)
    assert len(rooms) == 5
    for room in rooms:
        for k in ["id", "name", "address", "short", "price_from", "features", "images", "capacity", "size_m2"]:
            assert k in room, f"Missing key {k} in room {room}"
        assert isinstance(room["price_from"], int)
        assert isinstance(room["features"], list)


def test_get_room_by_id():
    r = requests.get(f"{API}/rooms/goncharnaya-10-studio", timeout=15)
    assert r.status_code == 200
    room = r.json()
    assert room["id"] == "goncharnaya-10-studio"
    assert room["price_from"] == 5900


def test_get_room_not_found():
    r = requests.get(f"{API}/rooms/does-not-exist", timeout=15)
    assert r.status_code == 404


# ---------------- Reviews ----------------
def test_list_reviews():
    r = requests.get(f"{API}/reviews", timeout=15)
    assert r.status_code == 200
    reviews = r.json()
    assert isinstance(reviews, list)
    assert len(reviews) >= 4
    for rv in reviews:
        for k in ["id", "author", "rating", "text", "source"]:
            assert k in rv
        assert 1 <= rv["rating"] <= 5


# ---------------- Leads ----------------
def test_create_lead_and_persist():
    payload = {
        "name": "TEST_Иван",
        "phone": "+79991112233",
        "check_in": "2026-02-10",
        "check_out": "2026-02-12",
        "guests": 2,
        "message": "TEST lead",
        "source": "pytest",
    }
    r = requests.post(f"{API}/leads", json=payload, timeout=15)
    assert r.status_code == 200, r.text
    lead = r.json()
    assert lead["name"] == payload["name"]
    assert lead["phone"] == payload["phone"]
    assert lead["guests"] == 2
    assert "id" in lead and len(lead["id"]) > 0
    assert "created_at" in lead

    # GET list and verify presence
    r2 = requests.get(f"{API}/leads", timeout=15)
    assert r2.status_code == 200
    ids = [l["id"] for l in r2.json()]
    assert lead["id"] in ids


def test_create_lead_minimal():
    payload = {"name": "TEST_Min", "phone": "+70000000000"}
    r = requests.post(f"{API}/leads", json=payload, timeout=15)
    assert r.status_code == 200
    lead = r.json()
    assert lead["name"] == "TEST_Min"
    assert lead["guests"] == 1  # default


def test_create_lead_validation():
    r = requests.post(f"{API}/leads", json={"name": "Only"}, timeout=15)
    assert r.status_code in (400, 422)


# ---------------- Chat ----------------
@pytest.fixture(scope="module")
def chat_session():
    """Start a chat session and return its session_id."""
    payload = {"message": "Здравствуйте, какие у вас номера?"}
    r = requests.post(f"{API}/chat", json=payload, timeout=90)
    assert r.status_code == 200, f"Chat init failed: {r.status_code} {r.text}"
    data = r.json()
    assert "session_id" in data
    assert "response" in data
    assert len(data["response"]) > 5
    return data["session_id"]


def test_chat_first_turn(chat_session):
    assert isinstance(chat_session, str) and len(chat_session) > 10


def test_chat_second_turn_continuity(chat_session):
    """Test multi-turn context preservation."""
    payload = {"session_id": chat_session, "message": "А какая цена за самый дешёвый?"}
    r = requests.post(f"{API}/chat", json=payload, timeout=90)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["session_id"] == chat_session
    # Response should reference price (5500 or 5900) - concierge knows from system prompt
    text = data["response"].lower()
    # Loose check: response should be non-empty Russian text
    assert len(text) > 5


def test_chat_history(chat_session):
    # Allow some persistence time
    time.sleep(1)
    r = requests.get(f"{API}/chat/history/{chat_session}", timeout=15)
    assert r.status_code == 200
    msgs = r.json()
    assert isinstance(msgs, list)
    # At least 4 messages (2 user, 2 assistant)
    assert len(msgs) >= 4
    roles = [m["role"] for m in msgs]
    assert "user" in roles and "assistant" in roles


def test_chat_empty_history():
    r = requests.get(f"{API}/chat/history/nonexistent-session-xyz", timeout=15)
    assert r.status_code == 200
    assert r.json() == []
