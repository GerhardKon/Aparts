import React from "react";
import { motion } from "framer-motion";
import BnovoWidget from "./BnovoWidget";

export default function BookingSection() {
    return (
        <section
            id="book"
            className="section-padding relative light-section grain"
            data-testid="booking-section"
        >
            <div className="absolute inset-0 architect-bg opacity-50" />
            <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5"
                    >
                        <span className="overline">07 · Бронирование</span>
                        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1F1D1B] leading-[1.05] mt-4 tracking-tight">
                            Забронируйте{" "}
                            <em className="text-[#8B7333] italic">мгновенно.</em>
                        </h2>
                        <p className="text-[#45413D] mt-6 leading-relaxed max-w-md">
                            Выберите даты — система Bnovo покажет доступные
                            варианты и актуальные цены. Подтверждение брони
                            приходит в течение нескольких минут.
                        </p>
                        <div className="brass-line w-32 my-8" />
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="font-display text-3xl text-[#8B7333] leading-none">
                                    01
                                </div>
                                <div>
                                    <div className="font-display text-lg text-[#1F1D1B]">
                                        Выберите даты и гостей
                                    </div>
                                    <div className="text-sm text-[#6B655D]">
                                        Стандартный заезд с 11:00, выезд до 15:00.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="font-display text-3xl text-[#8B7333] leading-none">
                                    02
                                </div>
                                <div>
                                    <div className="font-display text-lg text-[#1F1D1B]">
                                        Выберите номер
                                    </div>
                                    <div className="text-sm text-[#6B655D]">
                                        От уютной студии до сьюта на 4 гостя.
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="font-display text-3xl text-[#8B7333] leading-none">
                                    03
                                </div>
                                <div>
                                    <div className="font-display text-lg text-[#1F1D1B]">
                                        Подтвердите бронь
                                    </div>
                                    <div className="text-sm text-[#6B655D]">
                                        Получите подтверждение и инструкции по заезду.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-7"
                    >
                        <div
                            className="brass-border bg-white p-2 sm:p-4 relative"
                            data-testid="bnovo-frame"
                        >
                            <div className="absolute -top-3 left-6 px-3 bg-[#F5F1E8]">
                                <span className="overline">Bnovo · Live</span>
                            </div>
                            <BnovoWidget />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
