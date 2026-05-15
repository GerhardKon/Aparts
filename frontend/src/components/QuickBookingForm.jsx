import React, { useState } from "react";
import { motion } from "framer-motion";
import { CalendarBlank, UsersThree, ArrowRight } from "@phosphor-icons/react";

export default function QuickBookingForm() {
    const today = new Date().toISOString().slice(0, 10);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

    const [checkIn, setCheckIn] = useState(today);
    const [checkOut, setCheckOut] = useState(tomorrow);
    const [guests, setGuests] = useState(2);

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
            className="glass brass-border rounded-sm p-3 sm:p-6 max-w-4xl mx-auto"
            data-testid="hero-booking-form"
        >
            <div className="grid grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 items-end">
                <div className="md:col-span-3">
                    <label className="overline block mb-2">Заезд</label>
                    <div className="flex items-center gap-2 brass-border bg-[#1a1817]/40 px-2 sm:px-3 py-2.5 sm:py-3">
                        <CalendarBlank size={14} className="text-[#C5A059] shrink-0" />
                        <input
                            type="date"
                            value={checkIn}
                            min={today}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="bg-transparent text-white text-xs sm:text-sm w-full outline-none"
                            data-testid="hero-check-in"
                        />
                    </div>
                </div>
                <div className="md:col-span-3">
                    <label className="overline block mb-2">Выезд</label>
                    <div className="flex items-center gap-2 brass-border bg-[#1a1817]/40 px-2 sm:px-3 py-2.5 sm:py-3">
                        <CalendarBlank size={14} className="text-[#C5A059] shrink-0" />
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="bg-transparent text-white text-xs sm:text-sm w-full outline-none"
                            data-testid="hero-check-out"
                        />
                    </div>
                </div>
                <div className="col-span-2 md:col-span-3">
                    <label className="overline block mb-2">Гости</label>
                    <div className="flex items-center gap-2 brass-border bg-[#1a1817]/40 px-2 sm:px-3 py-2.5 sm:py-3">
                        <UsersThree size={14} className="text-[#C5A059] shrink-0" />
                        <select
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className="bg-transparent text-white text-xs sm:text-sm w-full outline-none appearance-none"
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
                <div className="col-span-2 md:col-span-3">
                    <button
                        onClick={scrollToBook}
                        className="btn-emerald magnetic w-full px-4 sm:px-5 py-3 sm:py-3.5 text-[10px] sm:text-xs tracking-[0.18em] uppercase font-semibold rounded-sm flex items-center justify-center gap-2"
                        data-testid="hero-check-availability"
                    >
                        Проверить наличие
                        <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
