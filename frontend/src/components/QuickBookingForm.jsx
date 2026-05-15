import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarBlank, UsersThree, ArrowRight, Check } from "@phosphor-icons/react";
import { createLead } from "../lib/api";

export default function QuickBookingForm() {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(tomorrow);
    const [guests, setGuests] = useState(2);
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const onCheck = () => {
        setOpen(true);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createLead({
                name,
                phone,
                check_in: checkIn,
                check_out: checkOut,
                guests: Number(guests),
                source: "hero-quick",
            });
            setDone(true);
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const scrollToBook = () => {
        document
            .querySelector("#book")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="glass brass-border rounded-sm p-4 sm:p-6 max-w-4xl mx-auto"
            data-testid="hero-booking-form"
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-3">
                    <label className="overline block mb-2">Заезд</label>
                    <div className="flex items-center gap-2 brass-border bg-[#1a1817]/40 px-3 py-3">
                        <CalendarBlank size={16} className="text-[#C5A059]" />
                        <input
                            type="date"
                            value={checkIn}
                            min={today}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="bg-transparent text-white text-sm w-full outline-none"
                            data-testid="hero-check-in"
                        />
                    </div>
                </div>
                <div className="md:col-span-3">
                    <label className="overline block mb-2">Выезд</label>
                    <div className="flex items-center gap-2 brass-border bg-[#1a1817]/40 px-3 py-3">
                        <CalendarBlank size={16} className="text-[#C5A059]" />
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="bg-transparent text-white text-sm w-full outline-none"
                            data-testid="hero-check-out"
                        />
                    </div>
                </div>
                <div className="md:col-span-3">
                    <label className="overline block mb-2">Гости</label>
                    <div className="flex items-center gap-2 brass-border bg-[#1a1817]/40 px-3 py-3">
                        <UsersThree size={16} className="text-[#C5A059]" />
                        <select
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="bg-transparent text-white text-sm w-full outline-none appearance-none"
                            data-testid="hero-guests"
                        >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <option key={n} value={n} className="bg-[#1a1817]">
                                    {n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="md:col-span-3 flex flex-col gap-2">
                    <button
                        onClick={onCheck}
                        className="btn-emerald magnetic w-full px-5 py-3.5 text-xs tracking-[0.18em] uppercase font-semibold rounded-sm flex items-center justify-center gap-2"
                        data-testid="hero-check-availability"
                    >
                        Проверить наличие
                        <ArrowRight size={14} />
                    </button>
                    <button
                        onClick={scrollToBook}
                        className="text-[11px] tracking-[0.18em] uppercase text-[#C5A059] hover:text-[#D4AF37] transition-colors"
                        data-testid="hero-jump-to-bnovo"
                    >
                        или открыть полное бронирование ↓
                    </button>
                </div>
            </div>

            {open && !done && (
                <motion.form
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    onSubmit={onSubmit}
                    className="mt-5 pt-5 border-t border-[#C5A059]/20 grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
                    data-testid="hero-lead-form"
                >
                    <div className="md:col-span-4">
                        <label className="overline block mb-2">Как к вам обращаться</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Имя"
                            className="brass-border bg-[#1a1817]/40 px-3 py-3 w-full text-white text-sm outline-none"
                            data-testid="hero-lead-name"
                        />
                    </div>
                    <div className="md:col-span-4">
                        <label className="overline block mb-2">Телефон</label>
                        <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+7 ___ ___ __ __"
                            className="brass-border bg-[#1a1817]/40 px-3 py-3 w-full text-white text-sm outline-none"
                            data-testid="hero-lead-phone"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="md:col-span-4 btn-ghost-brass px-5 py-3.5 text-xs tracking-[0.18em] uppercase font-semibold rounded-sm disabled:opacity-60"
                        data-testid="hero-lead-submit"
                    >
                        {submitting ? "Отправляем..." : "Перезвоните мне"}
                    </button>
                </motion.form>
            )}

            {done && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-5 pt-5 border-t border-[#C5A059]/20 flex items-center gap-3 text-[#C5A059]"
                    data-testid="hero-lead-success"
                >
                    <div className="h-9 w-9 rounded-full border border-[#C5A059] flex items-center justify-center heart-pop">
                        <Check size={16} weight="bold" />
                    </div>
                    <div>
                        <div className="font-display text-xl text-white">
                            Спасибо! Александр свяжется в ближайшее время.
                        </div>
                        <div className="text-xs text-white/60 mt-1">
                            А пока — загляните в каталог номеров.
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}
