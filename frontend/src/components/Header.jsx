import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Sparkle } from "@phosphor-icons/react";

const NAV_LINKS = [
    { label: "Номера", href: "#rooms" },
    { label: "Локация", href: "#location" },
    { label: "Услуги", href: "#services" },
    { label: "Отзывы", href: "#reviews" },
];

export default function Header({ onOpenAssistant }) {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollTo = (href) => {
        setOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <header
            data-testid="site-header"
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled ? "scrolled-header py-3" : "py-5"
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
                <a
                    href="#top"
                    onClick={(e) => {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    data-testid="brand-logo"
                    className="flex items-center gap-3 group"
                >
                    <div className="relative">
                        <svg
                            width="34"
                            height="34"
                            viewBox="0 0 40 40"
                            fill="none"
                            className="transition-transform group-hover:rotate-180 duration-700"
                        >
                            <circle
                                cx="20"
                                cy="20"
                                r="18"
                                stroke="#C5A059"
                                strokeWidth="0.8"
                            />
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
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="font-display text-xl tracking-wide text-white">
                            Kurdyukov
                        </span>
                        <span className="overline mt-0.5">Aparts</span>
                    </div>
                </a>

                <nav className="hidden lg:flex items-center gap-10">
                    {NAV_LINKS.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollTo(l.href);
                            }}
                            data-testid={`nav-link-${l.href.replace("#", "")}`}
                            className="text-sm tracking-wide text-white/80 hover:text-[#C5A059] transition-colors duration-300"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onOpenAssistant}
                        data-testid="header-open-assistant"
                        aria-label="Открыть консьерж"
                        className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-[#C5A059]/40 text-[#C5A059] hover:bg-[#C5A059]/10 hover:text-[#D4AF37] transition-all magnetic"
                    >
                        <Sparkle size={18} weight="duotone" />
                    </button>
                    <button
                        onClick={() => scrollTo("#book")}
                        data-testid="header-cta-book"
                        className="hidden sm:inline-flex btn-emerald px-5 py-2.5 text-xs tracking-[0.18em] uppercase font-semibold rounded-sm magnetic"
                    >
                        Забронировать
                    </button>
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden flex h-10 w-10 items-center justify-center text-white"
                        data-testid="mobile-menu-toggle"
                        aria-label="Меню"
                    >
                        {open ? <X size={22} /> : <List size={22} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden glass border-t border-[#C5A059]/15"
                        data-testid="mobile-menu"
                    >
                        <div className="px-6 py-6 grid grid-cols-2 gap-3">
                            {NAV_LINKS.map((l) => (
                                <button
                                    key={l.href}
                                    onClick={() => scrollTo(l.href)}
                                    className="brass-border px-4 py-5 text-left font-display text-lg text-white hover:bg-[#C5A059]/10 transition-colors"
                                    data-testid={`mobile-nav-${l.href.replace("#", "")}`}
                                >
                                    {l.label}
                                </button>
                            ))}
                            <button
                                onClick={() => scrollTo("#book")}
                                className="btn-emerald col-span-2 py-4 text-sm tracking-[0.18em] uppercase font-semibold rounded-sm"
                                data-testid="mobile-cta-book"
                            >
                                Забронировать
                            </button>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    onOpenAssistant?.();
                                }}
                                className="btn-ghost-brass col-span-2 py-4 text-sm tracking-[0.18em] uppercase font-semibold rounded-sm"
                                data-testid="mobile-cta-assistant"
                            >
                                Консьерж Александр
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
