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
            className="section-padding relative bg-[#242220]"
            data-testid="reviews-section"
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="overline">06 · Отзывы</span>
                    <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.05] mt-4 tracking-tight">
                        Гости о{" "}
                        <em className="text-[#C5A059] italic">нас.</em>
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
                            className="brass-border bg-[#1a1817] p-8 relative lift"
                            data-testid={`review-${r.id}`}
                        >
                            <Quotes
                                size={32}
                                weight="fill"
                                className="text-[#C5A059]/20 absolute top-6 right-6"
                            />
                            <div className="flex items-center gap-4 mb-5">
                                <img
                                    src={r.avatar}
                                    alt={r.author}
                                    loading="lazy"
                                    className="h-12 w-12 rounded-full object-cover brass-border"
                                />
                                <div>
                                    <div className="font-display text-xl text-white">
                                        {r.author}
                                    </div>
                                    <div className="text-[11px] tracking-wider text-white/55">
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
                                                : "text-white/20"
                                        }
                                    />
                                ))}
                            </div>
                            <p className="text-white/75 leading-relaxed">
                                «{r.text}»
                            </p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
