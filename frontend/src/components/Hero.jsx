import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SPBPanorama from "./SPBPanorama";
import WeatherLayer from "./WeatherLayer";
import QuickBookingForm from "./QuickBookingForm";
import { fetchWeather } from "../lib/api";
import { Drop, Sun, Cloud, Snowflake, CloudFog, Lightning } from "@phosphor-icons/react";

const ICON_MAP = {
    clear: Sun,
    clouds: Cloud,
    rain: Drop,
    drizzle: Drop,
    snow: Snowflake,
    fog: CloudFog,
    mist: CloudFog,
    thunderstorm: Lightning,
};

const LABEL_MAP = {
    clear: "Ясно",
    clouds: "Облачно",
    rain: "Дождь",
    drizzle: "Морось",
    snow: "Снег",
    fog: "Туман",
    mist: "Дымка",
    thunderstorm: "Гроза",
};

export default function Hero() {
    const [scrollY, setScrollY] = useState(0);
    const [weather, setWeather] = useState({
        condition: "clear",
        temp: 0,
        is_day: true,
        description: "ясно",
    });

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });

        fetchWeather()
            .then((w) => setWeather(w))
            .catch(() => {});

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isDay = weather.is_day;
    const Icon = ICON_MAP[weather.condition] || Sun;
    const condLabel = LABEL_MAP[weather.condition] || "Ясно";

    return (
        <section
            id="top"
            className="relative w-full min-h-screen overflow-hidden grain"
            data-testid="hero-section"
            style={{
                background: isDay
                    ? "linear-gradient(180deg, #1a1817 0%, #2a2825 40%, #1a1817 100%)"
                    : "linear-gradient(180deg, #0a141e 0%, #182a3a 40%, #06101a 100%)",
                transition: "background 3s ease",
            }}
        >
            {/* Architectural background grid */}
            <div className="absolute inset-0 architect-bg opacity-50" />

            {/* Sky / weather particles */}
            <WeatherLayer condition={weather.condition} isDay={isDay} />

            {/* SPB silhouette layers */}
            <SPBPanorama scrollY={scrollY} isDay={isDay} />

            {/* Content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32 sm:pt-40 pb-44 min-h-screen flex flex-col">
                <div className="flex-1 flex flex-col items-center text-center max-w-4xl mx-auto pt-8">
                    {/* Weather badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 brass-border rounded-full px-4 py-2 mb-8 glass"
                        data-testid="hero-weather-badge"
                    >
                        <Icon
                            size={16}
                            weight="duotone"
                            className="text-[#C5A059]"
                        />
                        <span className="text-xs tracking-wider text-white/85">
                            Сейчас в Петербурге · {condLabel} ·{" "}
                            <span className="text-[#C5A059] font-semibold">
                                {weather.temp > 0 ? "+" : ""}
                                {weather.temp}°
                            </span>
                        </span>
                    </motion.div>

                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="overline mb-6"
                    >
                        Апарт-отель · Класс Комфорт
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="font-display font-light text-balance text-white leading-[0.95] tracking-tighter"
                        style={{
                            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                        }}
                    >
                        В ритме <em className="text-[#C5A059] not-italic">Петербурга.</em>
                        <br />В центре{" "}
                        <em className="italic text-[#C5A059]/90 font-normal">
                            комфорта.
                        </em>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="mt-8 max-w-2xl text-white/70 text-base sm:text-lg leading-relaxed font-light text-balance"
                    >
                        Апартаменты в шаговой доступности от Невского проспекта,
                        Московского вокзала и станции метро «Площадь Восстания».
                        Эстетика северной столицы, плавно вписанная в современный
                        минимализм.
                    </motion.p>

                    {/* Decorative brass line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 1.2 }}
                        className="brass-line w-40 mt-10 origin-center"
                    />
                </div>

                {/* Quick booking form */}
                <div className="relative mt-12 sm:mt-16">
                    <QuickBookingForm />
                </div>
            </div>

            {/* Scroll hint */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] uppercase text-white/40 hidden md:flex flex-col items-center gap-2 z-20"
                data-testid="scroll-hint"
            >
                <span>прокрутите</span>
                <span className="w-px h-10 bg-gradient-to-b from-[#C5A059]/60 to-transparent" />
            </div>
        </section>
    );
}
