import React from "react";
import { motion } from "framer-motion";
import { Broom, Bed, ForkKnife, WifiHigh, MapPin } from "@phosphor-icons/react";

const SPB_PHOTO =
    "https://images.unsplash.com/photo-1692190145463-e49b90c29cef?auto=format&fit=crop&w=1600&q=80";

const FADE = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: "easeOut" },
};

export default function AboutBento() {
    return (
        <section
            id="about"
            className="section-padding relative light-section"
            data-testid="about-section"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mb-16">
                    <motion.div {...FADE} className="md:col-span-5">
                        <span className="overline">02 · Атмосфера</span>
                        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1F1D1B] leading-[1.05] mt-4 tracking-tight">
                            Почувствуйте{" "}
                            <em className="text-[#8B7333] italic">Петербург</em>
                            <br />
                            на ощупь.
                        </h2>
                    </motion.div>
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.2 }}
                        className="md:col-span-6 md:col-start-7"
                    >
                        <p className="text-[#45413D] leading-relaxed font-light text-base sm:text-lg">
                            Не просто апартаменты. Это ваше личное пространство в
                            ритме города, который никогда не спит. Утренний свет
                            на белёных стенах, прохладный мрамор подоконника,
                            тёплое золото латунных деталей — всё, чтобы вы
                            почувствовали Петербург не глазами туриста, а сердцем
                            местного жителя.
                        </p>
                        <div className="brass-line mt-8" />
                    </motion.div>
                </div>

                {/* Bento grid — balanced 2-column */}
                <div className="grid grid-cols-12 gap-4 sm:gap-6">
                    {/* Location hero card with SPB photo */}
                    <motion.div
                        {...FADE}
                        className="col-span-12 md:col-span-7 relative brass-border overflow-hidden group bg-[#FBF8F1] lift min-h-[320px] md:min-h-[380px]"
                        data-testid="bento-location"
                    >
                        <div
                            className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-105"
                            style={{
                                backgroundImage: `url(${SPB_PHOTO})`,
                            }}
                        />
                        {/* Bottom-up gradient for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1F1D1B] via-[#1F1D1B]/45 to-transparent" />
                        <div className="relative z-10 h-full p-8 sm:p-12 flex flex-col justify-between">
                            <MapPin
                                size={42}
                                weight="thin"
                                className="text-[#FDF8E4]"
                            />
                            <div>
                                <span className="text-[11px] tracking-[0.28em] uppercase font-bold text-[#FDF8E4]/85">
                                    Центр
                                </span>
                                <h3 className="font-display font-light text-3xl sm:text-4xl text-[#FDF8E4] mt-2 leading-tight">
                                    5 минут пешком
                                    <br />до Невского проспекта
                                </h3>
                                <p className="text-[#FDF8E4]/80 mt-3 text-sm max-w-md leading-relaxed">
                                    Гончарная и 4-я Советская — квартал, где
                                    Невский встречается с Лиговским. Утром кофе у
                                    вокзала, вечером — спектакль в Александринке.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Daily cleaning */}
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.1 }}
                        className="col-span-6 md:col-span-5 brass-border bg-white p-6 sm:p-8 flex flex-col justify-between lift min-h-[260px]"
                        data-testid="bento-cleaning"
                    >
                        <Broom
                            size={36}
                            weight="thin"
                            className="text-[#8B7333]"
                        />
                        <div>
                            <span className="overline">Сервис</span>
                            <h3 className="font-display font-light text-2xl sm:text-3xl text-[#1F1D1B] mt-2 leading-tight">
                                Ежедневная уборка
                            </h3>
                            <p className="text-[#6B655D] text-sm mt-3 leading-relaxed">
                                Свежие полотенца и идеальный порядок каждое
                                утро — пока вы гуляете по городу.
                            </p>
                        </div>
                    </motion.div>

                    {/* Breakfast in bed - emerald accent */}
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.15 }}
                        className="col-span-6 md:col-span-5 brass-border bg-[#005B4B] p-6 sm:p-8 flex flex-col justify-between lift relative overflow-hidden min-h-[260px]"
                        data-testid="bento-breakfast"
                    >
                        <Bed
                            size={36}
                            weight="thin"
                            className="text-[#C5A059]"
                        />
                        <div>
                            <span className="text-[11px] tracking-[0.28em] uppercase font-bold text-[#C5A059]">
                                Утро
                            </span>
                            <h3 className="font-display font-light text-2xl sm:text-3xl text-[#FDF8E4] mt-2 leading-tight">
                                Завтрак
                                <br />в постель
                            </h3>
                            <p className="text-[#FDF8E4]/75 text-sm mt-3 leading-relaxed">
                                Свежая выпечка и кофе — без выхода из номера.
                            </p>
                        </div>
                    </motion.div>

                    {/* Kitchen + wifi split */}
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.2 }}
                        className="col-span-12 md:col-span-7 brass-border bg-white p-6 sm:p-8 lift min-h-[260px]"
                        data-testid="bento-kitchen-wifi"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                            <div className="flex flex-col justify-between">
                                <ForkKnife
                                    size={36}
                                    weight="thin"
                                    className="text-[#8B7333]"
                                />
                                <div>
                                    <span className="overline">Кухня</span>
                                    <h4 className="font-display text-xl sm:text-2xl text-[#1F1D1B] mt-2 leading-snug">
                                        Мини-кухня
                                    </h4>
                                    <p className="text-[#6B655D] text-sm mt-2 leading-relaxed">
                                        Плита, чайник, микроволновка и посуда —
                                        всё для долгого пребывания.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between sm:border-l sm:border-[#8B7333]/15 sm:pl-6">
                                <WifiHigh
                                    size={36}
                                    weight="thin"
                                    className="text-[#8B7333]"
                                />
                                <div>
                                    <span className="overline">Цифровое</span>
                                    <h4 className="font-display text-xl sm:text-2xl text-[#1F1D1B] mt-2 leading-snug">
                                        Быстрый Wi-Fi
                                    </h4>
                                    <p className="text-[#6B655D] text-sm mt-2 leading-relaxed">
                                        Удобно работать удалённо и стримить
                                        вечерние сериалы.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
