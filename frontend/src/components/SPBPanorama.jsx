import React from "react";

/**
 * Multi-layered SVG silhouette of St. Petersburg landmarks.
 * Layers move at different speeds for parallax depth.
 *
 * Landmarks (left → right):
 *  - Aničkov bridge horses & lampposts
 *  - Kazan Cathedral colonnade & dome
 *  - Moscow Train Station spire
 *  - St. Isaac's Cathedral dome
 *  - Townhouses + Tavrichesky garden trees
 */
export default function SPBPanorama({ scrollY = 0, isDay = true }) {
    // Twilight shifts colors to cooler tones
    const farColor = isDay ? "#3a4a55" : "#0e1a26";
    const midColor = isDay ? "#2a3540" : "#0a1420";
    const nearColor = isDay ? "#1a1f26" : "#06101a";
    const skyTop = isDay
        ? "rgba(253,248,228,0.06)"
        : "rgba(24,42,58,0.55)";

    return (
        <div className="absolute inset-x-0 bottom-0 w-full pointer-events-none select-none">
            {/* Far layer - distant dome silhouettes */}
            <svg
                viewBox="0 0 1600 360"
                preserveAspectRatio="xMidYMax slice"
                className="absolute bottom-0 left-0 w-full h-[42vh] sm:h-[55vh]"
                style={{
                    transform: `translateY(${scrollY * 0.05}px)`,
                    opacity: 0.6,
                }}
            >
                <defs>
                    <linearGradient id="far-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={skyTop} />
                        <stop offset="100%" stopColor={farColor} />
                    </linearGradient>
                </defs>
                <rect
                    x="0"
                    y="0"
                    width="1600"
                    height="360"
                    fill="url(#far-grad)"
                    opacity="0.0"
                />
                {/* Distant Kazan Cathedral dome */}
                <g fill={farColor} opacity="0.85">
                    <path d="M0,360 L0,260 L80,260 L80,240 L150,240 L150,220 L200,180 Q220,140 240,180 L240,200 L260,200 L260,210 Q270,140 290,140 Q310,140 320,210 L320,200 L340,200 L340,240 L420,240 L420,260 L520,260 L520,360 Z" />
                    {/* Isaac's dome - far */}
                    <path d="M520,360 L520,250 L580,250 L580,230 L600,230 L600,200 Q620,140 650,140 Q680,140 700,200 L700,230 L720,230 L720,250 L780,250 L780,360 Z" />
                    {/* Moscow station spire - far */}
                    <path d="M780,360 L780,260 L880,260 L880,240 L900,240 L900,220 L908,220 L908,170 L912,140 L916,170 L916,220 L924,220 L924,240 L944,240 L944,260 L1040,260 L1040,360 Z" />
                    {/* Right side townhouses */}
                    <path d="M1040,360 L1040,260 L1120,260 L1120,240 L1180,240 L1180,260 L1260,260 L1260,240 L1320,240 L1320,260 L1400,260 L1400,240 L1480,240 L1480,260 L1600,260 L1600,360 Z" />
                </g>
                {/* Twilight: window lights in far buildings */}
                {!isDay && (
                    <g fill="#FDE7A8" opacity="0.9">
                        {Array.from({ length: 30 }).map((_, i) => (
                            <rect
                                key={i}
                                className="window-light"
                                style={{
                                    animationDelay: `${(i % 7) * 0.9}s`,
                                }}
                                x={60 + i * 50 + (i % 3) * 8}
                                y={280 + (i % 4) * 10}
                                width="2.5"
                                height="3.5"
                            />
                        ))}
                    </g>
                )}
            </svg>

            {/* Mid layer - main landmarks */}
            <svg
                viewBox="0 0 1600 420"
                preserveAspectRatio="xMidYMax slice"
                className="absolute bottom-0 left-0 w-full h-[38vh] sm:h-[50vh]"
                style={{
                    transform: `translateY(${scrollY * 0.12}px)`,
                }}
            >
                <g fill={midColor}>
                    {/* Townhouses */}
                    <path d="M0,420 L0,300 L120,300 L120,260 L240,260 L240,300 L360,300 L360,250 L480,250 L480,300 L560,300 L560,420 Z" />
                    {/* Isaac's Cathedral large dome */}
                    <g>
                        <rect x="560" y="280" width="240" height="140" />
                        <path d="M580,280 L580,250 L780,250 L780,280 Z" />
                        <path d="M620,250 L620,210 L740,210 L740,250 Z" />
                        <path d="M620,210 Q680,80 740,210 Z" />
                        <rect x="675" y="60" width="10" height="40" />
                        <circle cx="680" cy="55" r="6" fill={midColor} />
                        <rect x="678" y="38" width="4" height="20" />
                    </g>
                    {/* Bridge / Aničkov */}
                    <path d="M800,420 L800,330 Q860,300 920,330 L920,420 Z" />
                    <rect x="810" y="300" width="6" height="40" />
                    <rect x="900" y="300" width="6" height="40" />
                    {/* Horse silhouettes on the bridge */}
                    <g transform="translate(820,278)">
                        <path d="M0,22 L4,18 L8,16 L14,16 L16,12 L20,8 L24,10 L24,16 L30,18 L34,22 L34,28 L0,28 Z" />
                    </g>
                    <g transform="translate(875,278)">
                        <path d="M0,22 L4,18 L8,16 L14,16 L16,12 L20,8 L24,10 L24,16 L30,18 L34,22 L34,28 L0,28 Z" />
                    </g>

                    {/* Moscow station with tall spire */}
                    <rect x="940" y="270" width="220" height="150" />
                    <rect x="1020" y="230" width="60" height="40" />
                    <path d="M1040,230 L1040,180 L1060,180 L1060,230 Z" />
                    <rect x="1046" y="120" width="8" height="60" />
                    <path d="M1050,90 L1058,120 L1042,120 Z" />
                    <circle cx="1050" cy="85" r="3" fill={midColor} />

                    {/* Kazan Cathedral colonnade */}
                    <rect x="1160" y="280" width="260" height="140" />
                    {[...Array(10)].map((_, i) => (
                        <rect
                            key={i}
                            x={1170 + i * 25}
                            y={250}
                            width="6"
                            height="30"
                        />
                    ))}
                    <rect x="1160" y="240" width="260" height="10" />
                    <path d="M1260,240 L1260,200 L1320,200 L1320,240 Z" />
                    <path d="M1265,200 Q1290,140 1315,200 Z" />
                    <rect x="1287" y="115" width="6" height="30" />

                    {/* Right townhouses */}
                    <path d="M1420,420 L1420,300 L1500,300 L1500,260 L1600,260 L1600,420 Z" />
                </g>

                {/* Architectural thin lines (chertezh effect) */}
                <g
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.6"
                    fill="none"
                    className="architect-line"
                >
                    <line x1="0" y1="300" x2="1600" y2="300" />
                    <line x1="560" y1="280" x2="800" y2="280" />
                    <line x1="940" y1="270" x2="1160" y2="270" />
                    <line x1="680" y1="60" x2="680" y2="210" />
                    <line x1="1050" y1="90" x2="1050" y2="270" />
                </g>

                {/* Window lights in mid layer at twilight */}
                {!isDay && (
                    <g fill="#FFD89C" opacity="0.95">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <rect
                                key={i}
                                className="window-light"
                                style={{ animationDelay: `${(i % 6) * 0.7}s` }}
                                x={20 + i * 38 + (i % 4) * 4}
                                y={320 + (i % 3) * 14}
                                width="3"
                                height="4"
                            />
                        ))}
                    </g>
                )}
            </svg>

            {/* Near layer - foreground railings and lampposts */}
            <svg
                viewBox="0 0 1600 200"
                preserveAspectRatio="xMidYMax slice"
                className="absolute bottom-0 left-0 w-full h-[18vh] sm:h-[22vh]"
                style={{
                    transform: `translateY(${scrollY * 0.22}px)`,
                }}
            >
                <rect x="0" y="100" width="1600" height="100" fill={nearColor} />
                {/* Bridge railing */}
                <g
                    stroke="#C5A059"
                    strokeWidth="0.5"
                    fill="none"
                    opacity="0.45"
                >
                    <line x1="0" y1="100" x2="1600" y2="100" />
                    {[...Array(40)].map((_, i) => (
                        <line
                            key={i}
                            x1={i * 40}
                            y1="100"
                            x2={i * 40}
                            y2="120"
                        />
                    ))}
                    <line x1="0" y1="120" x2="1600" y2="120" />
                </g>
                {/* Lampposts */}
                {[180, 760, 1280].map((x, i) => (
                    <g key={i} fill={nearColor} stroke="#C5A059" strokeWidth="0.4">
                        <rect x={x} y="40" width="3" height="60" />
                        <circle cx={x + 1.5} cy="36" r="6" fill="#C5A059" opacity="0.5" />
                        <path d={`M${x - 14},40 L${x + 18},40`} />
                    </g>
                ))}
                {/* Subtle tree silhouettes - Tavrichesky garden */}
                <g fill={nearColor} opacity="0.95">
                    <ellipse cx="300" cy="100" rx="40" ry="30" />
                    <ellipse cx="1100" cy="100" rx="50" ry="35" />
                    <ellipse cx="1450" cy="100" rx="45" ry="32" />
                </g>
            </svg>
        </div>
    );
}
