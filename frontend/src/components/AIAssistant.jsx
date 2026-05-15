import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkle, PaperPlaneTilt, X, ChatCircleDots } from "@phosphor-icons/react";
import { sendChat } from "../lib/api";

const SUGGESTIONS = [
    "Какие есть студии и от какой цены?",
    "Как проверить свободные даты?",
    "Как добраться от Московского вокзала?",
    "Что входит в стоимость?",
];

const WELCOME = {
    role: "assistant",
    content:
        "Здравствуйте! Я Александр — ваш онлайн-консьерж 24/7 в Kurdyukov Aparts. Расскажу про студии, локацию и услуги. Свободные даты и точные цены смотрите в модуле бронирования Bnovo на странице — а я помогу с остальным. Чем могу быть полезен?",
};

export default function AIAssistant({ open, onClose, onOpen }) {
    const [messages, setMessages] = useState([WELCOME]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    const send = async (text) => {
        const trimmed = (text || "").trim();
        if (!trimmed) return;
        setMessages((m) => [...m, { role: "user", content: trimmed }]);
        setInput("");
        setLoading(true);
        try {
            const res = await sendChat(trimmed, sessionId);
            setSessionId(res.session_id);
            setMessages((m) => [
                ...m,
                { role: "assistant", content: res.response },
            ]);
        } catch (e) {
            console.error(e);
            setMessages((m) => [
                ...m,
                {
                    role: "assistant",
                    content:
                        "Кажется, связь моргнула. Попробуйте ещё раз — или напишите нам в WhatsApp +7 952 225 41 41.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        send(input);
    };

    return (
        <>
            {/* Floating button */}
            <AnimatePresence>
                {!open && (
                    <motion.button
                        key="fab"
                        initial={{ opacity: 0, scale: 0.6, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.6, y: 20 }}
                        transition={{ type: "spring", stiffness: 220, damping: 18 }}
                        onClick={onOpen}
                        data-testid="ai-fab"
                        className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#005B4B] hover:bg-[#007A65] text-[#FDF8E4] rounded-full pl-3 pr-5 py-3 shadow-lg glow-emerald magnetic"
                        aria-label="Открыть чат с Александром"
                    >
                        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#FDF8E4]/10">
                            <Sparkle size={20} weight="duotone" />
                            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#C5A059] animate-pulse" />
                        </span>
                        <span className="hidden sm:flex flex-col items-start leading-tight">
                            <span className="text-[10px] tracking-[0.2em] uppercase opacity-75">
                                консьерж
                            </span>
                            <span className="font-display text-lg">Александр</span>
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 z-50 w-auto sm:w-[400px] max-h-[80vh] glass brass-border-strong rounded-sm flex flex-col overflow-hidden"
                        data-testid="ai-panel"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#C5A059]/20 bg-[#0f0d0c]/70">
                            <div className="flex items-center gap-3">
                                <div className="relative h-10 w-10 rounded-full bg-[#005B4B] flex items-center justify-center">
                                    <Sparkle size={18} weight="duotone" className="text-[#FDF8E4]" />
                                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#00A585] border-2 border-[#1a1817]" />
                                </div>
                                <div>
                                    <div className="font-display text-lg text-white leading-none">
                                        Александр
                                    </div>
                                    <div className="text-[10px] tracking-widest uppercase text-[#C5A059] mt-1">
                                        онлайн · консьерж
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                data-testid="ai-close"
                                aria-label="Закрыть"
                                className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center text-white/70"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto ai-scroll p-4 space-y-3" data-testid="ai-messages">
                            {messages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex ${
                                        m.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                                >
                                    <div
                                        className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                                            m.role === "user"
                                                ? "bg-[#005B4B] text-[#FDF8E4] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
                                                : "bg-[#242220] text-white/90 brass-border rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                                        }`}
                                    >
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="px-4 py-3 bg-[#242220] brass-border rounded-2xl flex items-center gap-1.5">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059] animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            )}
                            <div ref={endRef} />
                        </div>

                        {/* Suggestions */}
                        {messages.length <= 1 && !loading && (
                            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => send(s)}
                                        className="text-[11px] brass-border text-white/75 px-2.5 py-1.5 hover:bg-[#C5A059]/10 hover:text-[#C5A059] transition-colors"
                                        data-testid="ai-suggestion"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <form
                            onSubmit={onSubmit}
                            className="border-t border-[#C5A059]/20 p-3 flex items-center gap-2 bg-[#0f0d0c]/50"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                disabled={loading}
                                placeholder="Спросите про номера, локацию, услуги..."
                                className="flex-1 bg-transparent text-white text-sm outline-none px-3 py-2 placeholder:text-white/40"
                                data-testid="ai-input"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="h-10 w-10 rounded-sm bg-[#005B4B] hover:bg-[#007A65] disabled:opacity-50 text-[#FDF8E4] flex items-center justify-center"
                                data-testid="ai-send"
                                aria-label="Отправить"
                            >
                                <PaperPlaneTilt size={16} weight="fill" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
