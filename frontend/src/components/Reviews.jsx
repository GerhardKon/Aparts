import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quotes } from "@phosphor-icons/react";
import { fetchReviews } from "../lib/api";

export default function Reviews() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetchReviews()
            .then(setReviews)
            .catch(() => {});
    }, []);

    return (
        <section
            id="reviews"
            className="section-padding relative light-section"
            data-testid="reviews-section"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="overline">06 · Отзывы</span>
                    <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[#1F1D1B] leading-[1.05] mt-4 tracking-tight">
                        Гости о{" "}
                        <em className="text-[#8B7333] italic">нас.</em>
                    </h2>
                    <div className="brass-line w-32 mx-auto mt-6" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {reviews.map((r, i) => (
                        <motion.article
                            key={r.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, delay: i * 0.1 }}
                            className="brass-border bg-white p-8 relative lift"
                            data-testid={`review-${r.id}`}
                        >
                            <Quotes
                                size={32}
                                weight="fill"
                                className="text-[#8B7333]/25 absolute top-6 right-6"
                            />
                            <div className="flex items-center gap-4 mb-5">
                                <img
                                    src={r.avatar}
                                    alt={r.author}
                                    loading="lazy"
                                    className="h-12 w-12 rounded-full object-cover brass-border"
                                />
                                <div>
                                    <div className="font-display text-xl text-[#1F1D1B]">
                                        {r.author}
                                    </div>
                                    <div className="text-[11px] tracking-wider text-[#807A72]">
                                        {new Date(r.date).toLocaleDateString(
                                            "ru-RU",
                                            {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            }
                                        )}{" "}
                                        · {r.source}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        size={14}
                                        weight={idx < r.rating ? "fill" : "regular"}
                                        className={
                                            idx < r.rating
                                                ? "text-[#C5A059]"
                                                : "text-[#807A72]/40"
                                        }
                                    />
                                ))}
                            </div>
                            <p className="text-[#45413D] leading-relaxed">
                                «{r.text}»
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
