import React, { useMemo } from "react";

/**
 * Renders weather particles & atmospheric overlay over the panorama
 * Conditions: clear, clouds, rain, drizzle, snow, fog, thunderstorm
 */
export default function WeatherLayer({ condition = "clear", isDay = true }) {
    const c = (condition || "clear").toLowerCase();

    const drops = useMemo(() => {
        if (!["rain", "drizzle", "thunderstorm"].includes(c)) return [];
        const count = c === "drizzle" ? 50 : c === "thunderstorm" ? 120 : 90;
        return Array.from({ length: count }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 2,
            duration: 0.6 + Math.random() * 0.8,
            opacity: 0.3 + Math.random() * 0.5,
        }));
    }, [c]);

    const flakes = useMemo(() => {
        if (c !== "snow") return [];
        return Array.from({ length: 70 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 6 + Math.random() * 6,
            size: 6 + Math.random() * 10,
            opacity: 0.4 + Math.random() * 0.5,
        }));
    }, [c]);

    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            data-testid="weather-layer"
            data-condition={c}
        >
            {/* Sky color overlay reactive to time of day */}
            <div
                className="absolute inset-0 transition-colors duration-[3000ms]"
                style={{
                    background: isDay
                        ? "linear-gradient(180deg, rgba(253,248,228,0.05) 0%, rgba(26,24,23,0) 50%, rgba(26,24,23,0) 100%)"
                        : "linear-gradient(180deg, rgba(24,42,58,0.7) 0%, rgba(26,24,23,0.2) 60%, rgba(26,24,23,0) 100%)",
                }}
            />

            {/* Fog layer */}
            {(c === "fog" || c === "mist") && (
                <>
                    <div
                        className="absolute inset-x-0 bottom-0 h-1/2"
                        style={{
                            background:
                                "linear-gradient(180deg, transparent 0%, rgba(180,190,200,0.18) 70%, rgba(180,190,200,0.32) 100%)",
                        }}
                    />
                    <div
                        className="absolute inset-x-0 bottom-1/4 h-32 blur-2xl"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, rgba(200,210,220,0.25) 0%, transparent 70%)",
                        }}
                    />
                </>
            )}

            {/* Cloudy soft layer */}
            {c === "clouds" && (
                <div
                    className="absolute inset-x-0 top-0 h-1/3"
                    style={{
                        background:
                            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
                    }}
                />
            )}

            {/* Sun rays on clear day */}
            {c === "clear" && isDay && (
                <div
                    className="absolute top-[10%] right-[15%] w-72 h-72 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(253,248,228,0.35) 0%, rgba(253,248,228,0.08) 40%, transparent 70%)",
                        filter: "blur(8px)",
                    }}
                />
            )}

            {/* Rain */}
            {drops.map((d) => (
                <span
                    key={d.id}
                    className="rain-drop"
                    style={{
                        left: `${d.left}%`,
                        animationDelay: `${d.delay}s`,
                        animationDuration: `${d.duration}s`,
                        opacity: d.opacity,
                    }}
                />
            ))}

            {/* Snow */}
            {flakes.map((f) => (
                <span
                    key={f.id}
                    className="snowflake"
                    style={{
                        left: `${f.left}%`,
                        animationDelay: `${f.delay}s`,
                        animationDuration: `${f.duration}s`,
                        fontSize: `${f.size}px`,
                        opacity: f.opacity,
                    }}
                >
                    ❄
                </span>
            ))}

            {/* Thunderstorm flash */}
            {c === "thunderstorm" && (
                <div
                    className="absolute inset-0 bg-white opacity-0"
                    style={{
                        animation: "lightning 6s infinite",
                    }}
                />
            )}

            <style>{`
                @keyframes lightning {
                    0%, 92%, 96%, 100% { opacity: 0; }
                    93% { opacity: 0.4; }
                    95% { opacity: 0.15; }
                }
            `}</style>
        </div>
    );
}
