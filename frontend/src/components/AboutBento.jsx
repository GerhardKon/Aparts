import React from "react";
import { motion } from "framer-motion";
import { FilmReel, Broom, Bed, ForkKnife, WifiHigh } from "@phosphor-icons/react";

const TEX_FABRIC =
    "https://static.prod-images.emergentagent.com/jobs/a5222b22-df61-46af-9de0-edb0b92bd3c7/images/ad781e25380d15f03873e6eadc9e4c8b0bbb14fca6b539fec17fd7cd8b5813fc.png";
const TEX_MARBLE =
    "https://static.prod-images.emergentagent.com/jobs/a5222b22-df61-46af-9de0-edb0b92bd3c7/images/7a85faa0e64e88436a4ff28dc71104faa324e97153fc050d167d80cc6c7ea159.png";

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
            className="section-padding relative grain"
            data-testid="about-section"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 mb-16">
                    <motion.div {...FADE} className="md:col-span-5">
                        <span className="overline">02 · Атмосфера</span>
                        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mt-4 tracking-tight">
                            Почувствуйте{" "}
                            <em className="text-[#C5A059] italic">Петербург</em>
                            <br />
                            на ощупь.
                        </h2>
                    </motion.div>
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.2 }}
                        className="md:col-span-6 md:col-start-7"
                    >
                        <p className="text-white/70 leading-relaxed font-light text-base sm:text-lg">
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

                {/* Bento Tetris */}
                <div className="grid grid-cols-12 grid-rows-[repeat(6,minmax(80px,auto))] gap-4 sm:gap-6">
                    {/* Hero card - cinema */}
                    <motion.div
                        {...FADE}
                        className="col-span-12 md:col-span-7 row-span-3 relative brass-border overflow-hidden group bg-[#242220] lift"
                        data-testid="bento-cinema"
                    >
                        <div
                            className="absolute inset-0 opacity-30 transition-opacity duration-700 group-hover:opacity-50"
                            style={{
                                backgroundImage: `url(${TEX_FABRIC})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <div className="relative z-10 h-full p-8 sm:p-12 flex flex-col justify-between min-h-[280px]">
                            <FilmReel
                                size={42}
                                weight="thin"
                                className="text-[#C5A059]"
                            />
                            <div>
                                <span className="overline">Кино дома</span>
                                <h3 className="font-display font-light text-3xl sm:text-4xl text-white mt-2 leading-tight">
                                    Домашний кинотеатр
                                    <br />в каждом номере
                                </h3>
                                <p className="text-white/65 mt-3 text-sm max-w-md leading-relaxed">
                                    Проектор, мягкий свет и тишина — формула
                                    тёплого вечера после прогулки по набережной.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Vertical card - design */}
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.1 }}
                        className="col-span-12 md:col-span-5 row-span-6 relative overflow-hidden brass-border bg-[#242220] lift"
                        data-testid="bento-design"
                    >
                        <div
                            className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-700"
                            style={{
                                backgroundImage: `url(${TEX_MARBLE})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        />
                        <div className="relative z-10 h-full p-8 sm:p-12 flex flex-col justify-between min-h-[420px]">
                            <div>
                                <span className="overline">Дизайн</span>
                                <h3 className="font-display font-light text-3xl sm:text-4xl lg:text-5xl text-white mt-3 leading-tight">
                                    Современный минимализм с{" "}
                                    <em className="text-[#C5A059] italic">
                                        петербургской душой
                                    </em>
                                </h3>
                            </div>
                            <div>
                                <div className="brass-line w-24 mb-6" />
                                <p className="text-white/70 leading-relaxed font-light">
                                    Тактильные материалы, мягкое освещение,
                                    архитектурные линии — каждая деталь
                                    продумана, чтобы создать ощущение «дома, в
                                    который хочется возвращаться».
                                </p>
                                <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                                    <div className="brass-border p-3">
                                        <div className="font-display text-2xl text-[#C5A059]">
                                            5
                                        </div>
                                        <div className="text-[10px] tracking-widest uppercase text-white/55 mt-1">
                                            филиалов
                                        </div>
                                    </div>
                                    <div className="brass-border p-3">
                                        <div className="font-display text-2xl text-[#C5A059]">
                                            24/7
                                        </div>
                                        <div className="text-[10px] tracking-widest uppercase text-white/55 mt-1">
                                            консьерж
                                        </div>
                                    </div>
                                    <div className="brass-border p-3">
                                        <div className="font-display text-2xl text-[#C5A059]">
                                            11:00
                                        </div>
                                        <div className="text-[10px] tracking-widest uppercase text-white/55 mt-1">
                                            заезд
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Daily cleaning */}
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.2 }}
                        className="col-span-6 md:col-span-3 row-span-3 brass-border bg-[#242220] p-6 sm:p-8 flex flex-col justify-between lift"
                        data-testid="bento-cleaning"
                    >
                        <Broom
                            size={32}
                            weight="thin"
                            className="text-[#C5A059]"
                        />
                        <div>
                            <span className="overline">Сервис</span>
                            <h3 className="font-display font-light text-2xl text-white mt-2 leading-tight">
                                Ежедневная уборка
                            </h3>
                            <p className="text-white/55 text-xs mt-2 leading-relaxed">
                                Свежие полотенца, идеальный порядок каждое утро.
                            </p>
                        </div>
                    </motion.div>

                    {/* Breakfast */}
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.25 }}
                        className="col-span-6 md:col-span-2 row-span-3 brass-border bg-[#005B4B]/30 p-6 sm:p-7 flex flex-col justify-between lift relative overflow-hidden"
                        data-testid="bento-breakfast"
                    >
                        <Bed
                            size={32}
                            weight="thin"
                            className="text-[#C5A059]"
                        />
                        <div>
                            <span className="overline">Утро</span>
                            <h3 className="font-display font-light text-2xl text-white mt-2 leading-tight">
                                Завтрак <br />в постель
                            </h3>
                        </div>
                    </motion.div>

                    {/* Kitchen + wifi */}
                    <motion.div
                        {...FADE}
                        transition={{ ...FADE.transition, delay: 0.3 }}
                        className="col-span-12 md:col-span-7 row-span-3 brass-border bg-[#242220] p-6 sm:p-8 lift"
                        data-testid="bento-kitchen-wifi"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                            <div className="flex flex-col justify-between">
                                <ForkKnife
                                    size={32}
                                    weight="thin"
                                    className="text-[#C5A059]"
                                />
                                <div>
                                    <span className="overline">Кухня</span>
                                    <h4 className="font-display text-xl text-white mt-2 leading-snug">
                                        Мини-кухня
                                    </h4>
                                    <p className="text-white/55 text-xs mt-2">
                                        Плита, чайник, микроволновка и посуда — всё для долгого пребывания.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between sm:border-l sm:border-[#C5A059]/15 sm:pl-6">
                                <WifiHigh
                                    size={32}
                                    weight="thin"
                                    className="text-[#C5A059]"
                                />
                                <div>
                                    <span className="overline">Цифровое</span>
                                    <h4 className="font-display text-xl text-white mt-2 leading-snug">
                                        Быстрый Wi-Fi
                                    </h4>
                                    <p className="text-white/55 text-xs mt-2">
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
