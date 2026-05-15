import React from "react";
import { motion } from "framer-motion";
import { MapPin, Train, Storefront, FilmStrip } from "@phosphor-icons/react";

const BRANCHES = [
    { id: 1, name: "Гончарная, 10", address: "ул. Гончарная, 10", x: 36, y: 52 },
    { id: 2, name: "Гончарная, 11", address: "ул. Гончарная, 11", x: 42, y: 50 },
    { id: 3, name: "Гончарная, 17", address: "ул. Гончарная, 17", x: 48, y: 48 },
    {
        id: 4,
        name: "Невский, 124",
        address: "Невский проспект, 124",
        x: 28,
        y: 60,
    },
    {
        id: 5,
        name: "4-я Советская, 8",
        address: "4-я Советская ул., 8",
        x: 58,
        y: 34,
    },
];

const NEARBY = [
    { name: "Московский вокзал", minutes: 5, icon: Train },
    { name: "Невский проспект", minutes: 7, icon: Storefront },
    { name: "Площадь Восстания (м)", minutes: 6, icon: Train },
    { name: "Александринский театр", minutes: 12, icon: FilmStrip },
    { name: "Аничков мост", minutes: 10, icon: MapPin },
    { name: "Казанский собор", minutes: 15, icon: MapPin },
    { name: "Русский музей", minutes: 13, icon: MapPin },
    { name: "Таврический сад", minutes: 14, icon: MapPin },
];

export default function Location() {
    return (
        <section
            id="location"
            className="section-padding relative bg-[#242220]"
            data-testid="location-section"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
                    <div className="md:col-span-6">
                        <span className="overline">04 · Локация</span>
                        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mt-4 tracking-tight">
                            В сердце <em className="text-[#C5A059] italic">старого</em>{" "}
                            Петербурга.
                        </h2>
                    </div>
                    <div className="md:col-span-6 md:pt-12">
                        <p className="text-white/70 leading-relaxed font-light">
                            Пять адресов: Гончарная, 10/11/17, Невский 124 и
                            4-я Советская, 8 — квартал, где Невский встречается
                            с Лиговским. Утром — кофе у Московского вокзала,
                            вечером — спектакль в Александринке, и пять минут
                            пешком до дома.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Stylized map */}
                    <div className="lg:col-span-7 relative brass-border bg-[#1a1817] overflow-hidden aspect-[16/11]">
                        <div className="architect-bg absolute inset-0 opacity-40" />
                        {/* Decorative street lines */}
                        <svg
                            viewBox="0 0 100 60"
                            preserveAspectRatio="none"
                            className="absolute inset-0 w-full h-full"
                        >
                            <g
                                stroke="rgba(197,160,89,0.25)"
                                strokeWidth="0.15"
                                fill="none"
                            >
                                <line x1="0" y1="38" x2="100" y2="34" />
                                <line x1="0" y1="50" x2="100" y2="46" />
                                <line x1="20" y1="60" x2="35" y2="0" />
                                <line x1="35" y1="60" x2="50" y2="0" />
                                <line x1="50" y1="60" x2="65" y2="0" />
                                <line x1="65" y1="60" x2="80" y2="0" />
                            </g>
                            {/* Neva river */}
                            <path
                                d="M0,12 Q30,8 60,14 T100,16 L100,20 Q60,18 30,16 T0,18 Z"
                                fill="rgba(24,42,58,0.6)"
                            />
                            <text
                                x="80"
                                y="14"
                                fill="#C5A059"
                                fontSize="1.8"
                                opacity="0.6"
                                fontFamily="Cormorant Garamond"
                                fontStyle="italic"
                            >
                                Нева
                            </text>
                            <text
                                x="3"
                                y="55"
                                fill="rgba(255,255,255,0.4)"
                                fontSize="1.6"
                                fontFamily="Manrope"
                            >
                                НЕВСКИЙ ПРОСПЕКТ
                            </text>
                        </svg>

                        {BRANCHES.map((b, i) => (
                            <motion.div
                                key={b.id}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                                className="absolute group"
                                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                                data-testid={`map-pin-${b.id}`}
                            >
                                <div className="relative -translate-x-1/2 -translate-y-1/2">
                                    <div className="absolute inset-0 h-6 w-6 rounded-full bg-[#00A585]/30 animate-ping" />
                                    <div className="relative h-6 w-6 rounded-full bg-[#005B4B] border-2 border-[#C5A059] flex items-center justify-center text-[10px] text-white font-bold">
                                        {b.id}
                                    </div>
                                    <div className="absolute left-1/2 -translate-x-1/2 top-7 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                        <div className="glass brass-border px-3 py-2 rounded-sm">
                                            <div className="font-display text-sm text-white">
                                                {b.name}
                                            </div>
                                            <div className="text-[10px] text-white/60 mt-0.5">
                                                {b.address}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Legend */}
                        <div className="absolute bottom-4 left-4 glass brass-border px-4 py-3 max-w-xs">
                            <div className="overline mb-2">Наши филиалы</div>
                            <div className="space-y-1">
                                {BRANCHES.map((b) => (
                                    <div
                                        key={b.id}
                                        className="flex items-center gap-2 text-xs text-white/80"
                                    >
                                        <span className="h-4 w-4 rounded-full bg-[#005B4B] border border-[#C5A059] flex items-center justify-center text-[9px] text-white font-bold">
                                            {b.id}
                                        </span>
                                        {b.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Distances */}
                    <div className="lg:col-span-5">
                        <div className="brass-border bg-[#1a1817] p-8 h-full">
                            <span className="overline">Пешком за 5–15 минут</span>
                            <h3 className="font-display font-light text-3xl text-white mt-3 mb-8 leading-tight">
                                Главное —{" "}
                                <em className="text-[#C5A059] italic">рядом</em>.
                            </h3>
                            <div className="space-y-3">
                                {NEARBY.map((n, i) => {
                                    const Icon = n.icon;
                                    return (
                                        <motion.div
                                            key={n.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center justify-between py-3 border-b border-[#C5A059]/15 group"
                                            data-testid={`nearby-${i}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Icon
                                                    size={18}
                                                    weight="thin"
                                                    className="text-[#C5A059]"
                                                />
                                                <span className="text-white/85 text-sm">
                                                    {n.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-display text-2xl text-[#C5A059]">
                                                    {n.minutes}
                                                </span>
                                                <span className="text-[10px] uppercase tracking-widest text-white/55">
                                                    мин
                                                </span>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
