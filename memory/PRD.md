# Kurdyukov Aparts — Product Requirements

## Original Problem Statement
Build a landing page for Kurdyukov Aparts — a comfort-class apart-hotel in the historical center of Saint Petersburg. Slogan: "В ритме Петербурга. В центре комфорта". UTP: live, interactive St. Petersburg scenery with an AI-concierge. Brand voice: intelligent, hospitable, tactful, modern, technological.

## Architecture
- **Backend**: FastAPI (Python) at `/api/*`, MongoDB (motor), emergentintegrations LlmChat (GPT-5.2), OpenWeatherMap REST proxy
- **Frontend**: React 19 + Tailwind, framer-motion, @phosphor-icons/react, lenis, custom CSS animations
- **Design system**: Dark Jewel & Luxury — Chinchilla (#1A1817) / Emerald (#005B4B) / Brass (#C5A059) with Cormorant Garamond headings + Manrope body
- **Integrations**: GPT-5.2 (via Emergent Universal Key), OpenWeatherMap (live SPB weather), Bnovo widget (production UID `76549505-08bd-424d-8202-cfca8af47099`)

## User Personas
1. **Турист 25–45 лет** — приехал на выходные, ищет атмосферу старого Петербурга, бронирует через сайт или WhatsApp
2. **Командировочный** — нужно тихое место с Wi-Fi и кухней рядом с Московским вокзалом
3. **Пара на годовщину** — ищет уют, проектор, завтрак в постель, дополнительные услуги

## Core Requirements (Static)
- 5 апартаментов на Гончарной/4-й Советской
- Класс «Комфорт», заезд с 14:00, выезд до 12:00
- Бесплатный Wi-Fi, кухня, стиральная машина, проектор, ежедневная уборка
- Языковая аудитория: русскоязычная

## Implemented (2025-12)
- [x] FastAPI backend at `/api/*` with health, weather, rooms, rooms/{id}, reviews, leads (POST + protected GET), chat (POST), chat/history/{session_id}
- [x] Live OpenWeatherMap proxy with 10-min in-memory cache; returns condition, temp, is_day, sunrise/sunset, etc.
- [x] AI concierge "Александр" via GPT-5.2 with Russian system prompt, session continuity, MongoDB chat persistence
- [x] Demo data: 5 rooms (Гончарная/4-я Советская), 4 reviews
- [x] Lead capture endpoint (POST /api/leads) saves to MongoDB
- [x] Smart header (transparent → glassmorphism on scroll), mobile bento menu
- [x] Hero with multi-layered SVG SPB silhouette (Isaakievskiy, Anichkov bridge w/ horses, Moscow station spire, Kazan Cathedral colonnade, townhouses), parallax on scroll, twilight mode with flickering window lights, weather particles (rain/snow/fog) reactive to live API, live weather badge with temp
- [x] Quick booking form on hero with date/guest selection + expandable lead-capture form
- [x] About bento (Tetris asymmetric grid: cinema, design, cleaning, breakfast, kitchen+wifi) with tactile texture overlays
- [x] Rooms section: 5 cards with hover-lift, emerald heart favorite with pop animation, full-screen modal with details + book CTA
- [x] Location section: stylized map with 5 numbered branch pins (pulsing), Neva river silhouette, infographic "Пешком за 5–15 мин" to landmarks
- [x] Services: 8 icon-based cards (breakfast, hygiene, cleaning, wifi, transfer, early check-in, cinema, pet-friendly)
- [x] Reviews: 4 cards with avatar, star rating, source attribution
- [x] Bnovo booking widget integration in #book section, themed with brand palette
- [x] Footer with logo, brand voice, contacts (+7 952 225 41 41, WhatsApp, Telegram @Alex_x_00, email), policy
- [x] Floating AI assistant: emerald FAB → glassmorphism chat panel with suggestions, typing indicator, session_id persistence
- [x] Backend protected `GET /api/leads` requires ADMIN_TOKEN header

## Backlog
### P0 (do next)
- Add real photos for each apartment (currently using stock); gallery of 20+ per room per requirement
- Set ADMIN_TOKEN env variable for production
- Add structured data (JSON-LD Hotel) for SEO

### P1
- Stripe deposit integration with Crypto support for international guests (revenue boost)
- Multilingual: EN version with hreflang for international tourists
- Wishlist persistence (currently favorites are session-only)
- Email/Telegram notification to admin on new lead via /api/leads
- Cookie-based chat session resume across page reloads

### P2
- Lenis smooth scrolling (library installed, not yet wired)
- WebGL/Three.js upgrade of the SPB panorama for cinematic depth
- Pet-fee selector in booking
- A/B test of CTA copy and emerald shade
- Server-side weather cache shared across uvicorn workers (Redis)

## Notes
- Test credentials: N/A (no auth)
- All endpoints use `/api` prefix
- Backend logs at `/var/log/supervisor/backend.*.log`
- Live preview: https://aparts-center.preview.emergentagent.com
