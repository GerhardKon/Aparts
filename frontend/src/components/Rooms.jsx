import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowUpRight, Ruler, Users } from "@phosphor-icons/react";
import { fetchRooms } from "../lib/api";

export default function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [favorites, setFavorites] = useState({});
    const [activeRoom, setActiveRoom] = useState(null);

    useEffect(() => {
        fetchRooms()
            .then(setRooms)
            .catch(() => {});
    }, []);

    const toggleFav = (e, id) => {
        e.stopPropagation();
        setFavorites((p) => ({ ...p, [id]: !p[id] }));
    };

    return (
        <section
            id="rooms"
            className="section-padding relative bg-[#1a1817]"
            data-testid="rooms-section"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
                    <div>
                        <span className="overline">03 · Каталог</span>
                        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mt-4 tracking-tight">
                            Наши <em className="text-[#C5A059] italic">номера.</em>
                        </h2>
                        <p className="text-white/60 mt-4 max-w-xl leading-relaxed">
                            Пять адресов на Гончарной улице и 4-й Советской — в
                            шаговой доступности от Невского проспекта.
                        </p>
                    </div>
                    <a
                        href="#book"
                        className="btn-ghost-brass px-6 py-3 text-xs tracking-[0.18em] uppercase font-semibold rounded-sm inline-flex items-center gap-2"
                        data-testid="rooms-see-availability"
                    >
                        Проверить даты <ArrowUpRight size={14} />
                    </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room, idx) => (
                        <motion.article
                            key={room.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.7,
                                delay: idx * 0.08,
                                ease: "easeOut",
                            }}
                            className="group brass-border bg-[#242220] overflow-hidden lift cursor-pointer relative"
                            data-testid={`room-card-${room.id}`}
                            onClick={() => setActiveRoom(room)}
                        >
                            <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1817]">
                                <img
                                    src={room.images?.[0]}
                                    alt={room.name}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1817] via-[#1a1817]/30 to-transparent" />
                                {/* Architectural corner */}
                                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                                    <span className="overline glass px-3 py-1.5 rounded-full">
                                        от {room.price_from.toLocaleString("ru-RU")} ₽
                                        / ночь
                                    </span>
                                    <button
                                        onClick={(e) => toggleFav(e, room.id)}
                                        className={`h-10 w-10 rounded-full glass border border-[#C5A059]/30 flex items-center justify-center transition-colors ${
                                            favorites[room.id]
                                                ? "text-[#00A585]"
                                                : "text-white/70 hover:text-[#C5A059]"
                                        }`}
                                        aria-label="В избранное"
                                        data-testid={`room-fav-${room.id}`}
                                    >
                                        <Heart
                                            size={16}
                                            weight={favorites[room.id] ? "fill" : "regular"}
                                            className={favorites[room.id] ? "heart-pop" : ""}
                                        />
                                    </button>
                                </div>

                                <div className="absolute bottom-0 inset-x-0 p-6">
                                    <div className="overline mb-2">
                                        {room.address}
                                    </div>
                                    <h3 className="font-display text-2xl text-white leading-tight">
                                        {room.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-white/65 text-sm leading-relaxed mb-4">
                                    {room.short}
                                </p>
                                <div className="flex items-center gap-4 text-[11px] tracking-widest uppercase text-white/55 mb-5">
                                    <span className="flex items-center gap-1.5">
                                        <Users size={14} className="text-[#C5A059]" />{" "}
                                        {room.capacity} гостя
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Ruler size={14} className="text-[#C5A059]" />{" "}
                                        {room.size_m2} м²
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {room.features.slice(0, 4).map((f) => (
                                        <span
                                            key={f}
                                            className="brass-border text-[11px] px-2.5 py-1 text-white/75"
                                        >
                                            {f}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-[#C5A059]/15">
                                    <span className="text-[11px] tracking-widest uppercase text-[#C5A059]">
                                        подробнее
                                    </span>
                                    <ArrowUpRight
                                        size={18}
                                        className="text-[#C5A059] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                                    />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>

            {/* Room detail modal */}
            <AnimatePresence>
                {activeRoom && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
                        onClick={() => setActiveRoom(null)}
                        data-testid="room-modal"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-[#242220] brass-border-strong"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveRoom(null)}
                                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full glass border border-[#C5A059]/30 text-white/80 hover:text-white"
                                data-testid="room-modal-close"
                            >
                                ✕
                            </button>
                            <div className="aspect-[16/9] relative overflow-hidden bg-[#1a1817]">
                                <img
                                    src={activeRoom.images?.[0]}
                                    alt={activeRoom.name}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1817] to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="overline mb-2">
                                        {activeRoom.address}
                                    </div>
                                    <h3 className="font-display text-4xl text-white">
                                        {activeRoom.name}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2">
                                    <span className="overline">О номере</span>
                                    <p className="text-white/75 leading-relaxed mt-3">
                                        {activeRoom.short}
                                    </p>
                                    <div className="brass-line my-6" />
                                    <span className="overline">Удобства</span>
                                    <div className="grid grid-cols-2 gap-2 mt-3">
                                        {activeRoom.features.map((f) => (
                                            <div
                                                key={f}
                                                className="brass-border px-3 py-2.5 text-sm text-white/80"
                                            >
                                                {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="brass-border p-6 text-center">
                                        <span className="overline">от</span>
                                        <div className="font-display text-4xl text-[#C5A059] my-2">
                                            {activeRoom.price_from.toLocaleString("ru-RU")} ₽
                                        </div>
                                        <div className="text-xs text-white/60 tracking-wider">
                                            за ночь
                                        </div>
                                        <button
                                            onClick={() => {
                                                setActiveRoom(null);
                                                document
                                                    .querySelector("#book")
                                                    ?.scrollIntoView({
                                                        behavior: "smooth",
                                                    });
                                            }}
                                            className="btn-emerald w-full mt-6 py-3 text-xs tracking-[0.18em] uppercase font-semibold rounded-sm"
                                            data-testid="room-modal-book"
                                        >
                                            Забронировать
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
