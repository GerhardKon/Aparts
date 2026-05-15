import React from "react";
import { WhatsappLogo, TelegramLogo, PhoneCall, EnvelopeSimple, Sparkle } from "@phosphor-icons/react";

export default function Footer({ onOpenAssistant }) {
    const year = new Date().getFullYear();
    return (
        <footer
            className="bg-[#0f0d0c] border-t border-[#C5A059]/20"
            data-testid="site-footer"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 mb-6">
                            <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="20" r="18" stroke="#C5A059" strokeWidth="0.8" />
                                <path
                                    d="M14 28 L14 12 L20 20 L26 12 L26 28"
                                    stroke="#C5A059"
                                    strokeWidth="1.2"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle cx="20" cy="20" r="1.5" fill="#005B4B" />
                            </svg>
                            <div>
                                <div className="font-display text-2xl text-white">
                                    Kurdyukov Aparts
                                </div>
                                <div className="overline">в ритме Петербурга</div>
                            </div>
                        </div>
                        <p className="text-white/55 text-sm leading-relaxed max-w-md">
                            Апарт-отель класса «Комфорт» в историческом сердце
                            Северной столицы. Гончарная улица и 4-я Советская —
                            эстетика петербургской жизни в шаговой доступности от
                            Невского проспекта.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <div className="overline mb-5">Навигация</div>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="#rooms"
                                    className="text-white/70 hover:text-[#C5A059]"
                                    data-testid="footer-link-rooms"
                                >
                                    Номера
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#location"
                                    className="text-white/70 hover:text-[#C5A059]"
                                    data-testid="footer-link-location"
                                >
                                    Локация
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#services"
                                    className="text-white/70 hover:text-[#C5A059]"
                                    data-testid="footer-link-services"
                                >
                                    Услуги
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#reviews"
                                    className="text-white/70 hover:text-[#C5A059]"
                                    data-testid="footer-link-reviews"
                                >
                                    Отзывы
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#book"
                                    className="text-[#C5A059] hover:text-[#D4AF37]"
                                    data-testid="footer-link-book"
                                >
                                    Бронирование
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <div className="overline mb-5">Связь</div>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <a
                                    href="tel:+79522254141"
                                    className="flex items-center gap-3 text-white/80 hover:text-[#C5A059]"
                                    data-testid="footer-phone"
                                >
                                    <PhoneCall
                                        size={16}
                                        weight="thin"
                                        className="text-[#C5A059]"
                                    />
                                    +7 952 225 41 41
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/79522254141"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 text-white/80 hover:text-[#C5A059]"
                                    data-testid="footer-whatsapp"
                                >
                                    <WhatsappLogo
                                        size={16}
                                        weight="thin"
                                        className="text-[#C5A059]"
                                    />
                                    WhatsApp +7 952 225 41 41
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://t.me/Alex_x_00"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 text-white/80 hover:text-[#C5A059]"
                                    data-testid="footer-telegram"
                                >
                                    <TelegramLogo
                                        size={16}
                                        weight="thin"
                                        className="text-[#C5A059]"
                                    />
                                    Telegram @Alex_x_00
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:hello@kurdyukov-aparts.ru"
                                    className="flex items-center gap-3 text-white/80 hover:text-[#C5A059]"
                                    data-testid="footer-email"
                                >
                                    <EnvelopeSimple
                                        size={16}
                                        weight="thin"
                                        className="text-[#C5A059]"
                                    />
                                    hello@kurdyukov-aparts.ru
                                </a>
                            </li>
                        </ul>

                        <button
                            onClick={onOpenAssistant}
                            data-testid="footer-open-assistant"
                            className="mt-6 inline-flex items-center gap-2 btn-ghost-brass px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase font-semibold"
                        >
                            <Sparkle size={14} /> Спросить Александра
                        </button>
                    </div>
                </div>

                <div className="brass-line mb-6" />
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] tracking-wider text-white/45">
                    <div>
                        © {year} Kurdyukov Aparts · Все права защищены
                    </div>
                    <div className="flex gap-6">
                        <span>Заезд: с 14:00 · Выезд: до 12:00</span>
                        <a href="#" className="hover:text-[#C5A059]">
                            Политика конфиденциальности
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
