import React from "react";
import { motion } from "framer-motion";
import {
    Coffee,
    Bathtub,
    Broom,
    WifiHigh,
    Car,
    Clock,
    Television,
    PawPrint,
} from "@phosphor-icons/react";

const SERVICES = [
    {
        icon: Coffee,
        title: "Завтрак в постель",
        desc: "Свежая выпечка и кофе по заказу — без выхода из номера.",
    },
    {
        icon: Bathtub,
        title: "Средства гигиены",
        desc: "Тапочки, шампунь, зубная щётка, фен — всё ждёт вас в номере.",
    },
    {
        icon: Broom,
        title: "Ежедневная уборка",
        desc: "Свежие полотенца и порядок каждое утро — пока вы гуляете по городу.",
    },
    {
        icon: WifiHigh,
        title: "Бесплатный Wi-Fi",
        desc: "Стабильный высокоскоростной интернет во всех номерах.",
    },
    {
        icon: Car,
        title: "Трансфер",
        desc: "От Пулково или с вокзала — комфортная встреча в любое время.",
    },
    {
        icon: Clock,
        title: "Ранний заезд",
        desc: "Стандартный заезд с 14:00, ранний — по предварительной договорённости.",
    },
    {
        icon: Television,
        title: "Домашний кинотеатр",
        desc: "Проектор и подборка фильмов для уютного вечера.",
    },
    {
        icon: PawPrint,
        title: "Pet-friendly",
        desc: "Мы рады гостям с домашними любимцами по предварительной заявке.",
    },
];

export default function Services() {
    return (
        <section
            id="services"
            className="section-padding relative bg-[#1a1817]"
            data-testid="services-section"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
                    <div className="md:col-span-6">
                        <span className="overline">05 · Сервис</span>
                        <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mt-4 tracking-tight">
                            Заботимся о{" "}
                            <em className="text-[#C5A059] italic">мелочах.</em>
                        </h2>
                    </div>
                    <div className="md:col-span-6 md:pt-12">
                        <p className="text-white/70 leading-relaxed font-light">
                            Заезд с 14:00, выезд до 12:00. Возможен ранний заезд
                            по договорённости — напишите нам или попросите
                            Александра, нашего цифрового консьержа.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#C5A059]/15">
                    {SERVICES.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: i * 0.05 }}
                                className="bg-[#1a1817] p-8 group hover:bg-[#242220] transition-colors duration-500 relative"
                                data-testid={`service-${i}`}
                            >
                                <Icon
                                    size={36}
                                    weight="thin"
                                    className="text-[#C5A059] transition-transform duration-500 group-hover:scale-110"
                                />
                                <h3 className="font-display text-2xl text-white mt-5 leading-tight">
                                    {s.title}
                                </h3>
                                <p className="text-white/55 text-sm mt-3 leading-relaxed">
                                    {s.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
