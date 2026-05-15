import React, { useEffect, useRef } from "react";

/**
 * Bnovo booking widget embed.
 * Uses the public Bnovo Widget JS with the property UID from Kurdyukov Aparts.
 */
export default function BnovoWidget() {
    const ref = useRef(null);
    const loadedRef = useRef(false);

    useEffect(() => {
        if (loadedRef.current) return;
        loadedRef.current = true;

        const init = () => {
            if (window.Bnovo_Widget && ref.current) {
                try {
                    window.Bnovo_Widget.init(function () {
                        window.Bnovo_Widget.open("_bn_widget_adaptive", {
                            type: "vertical",
                            uid: "76549505-08bd-424d-8202-cfca8af47099",
                            lang: "ru",
                            width: "100%",
                            background: "#1a1817",
                            bg_alpha: "100",
                            padding: "24",
                            padding_mobile: "20",
                            border_radius: "0",
                            font_type: "inter",
                            title_color: "#ffffff",
                            title_size: "30",
                            without_title: "on",
                            inp_color: "#ffffff",
                            inp_bordhover: "#C5A059",
                            inp_bordcolor: "#C5A059",
                            inp_alpha: "0",
                            btn_background: "#005B4B",
                            btn_background_over: "#007A65",
                            btn_textcolor: "#FDF8E4",
                            btn_textover: "#FDF8E4",
                            btn_bordcolor: "#005B4B",
                            btn_bordhover: "#007A65",
                            adults_default: "1",
                            dates_preset: "on",
                            dfrom_tomorrow: "on",
                            dto_nextday: "on",
                            switch_mobiles: "on",
                            switch_mobiles_width: "980",
                        });
                    });
                } catch (e) {
                    console.error("Bnovo init failed", e);
                }
            }
        };

        // Inject script once
        const existing = document.querySelector("script[data-bnovo]");
        if (existing) {
            init();
            return;
        }

        const script = document.createElement("script");
        script.src = "https://widget.reservationsteps.ru/js/bnovo.js";
        script.async = true;
        script.dataset.bnovo = "true";
        script.onload = init;
        script.onerror = () => {
            console.warn("Bnovo widget failed to load");
        };
        document.body.appendChild(script);
    }, []);

    return (
        <div
            className="bnovo-container"
            ref={ref}
            data-testid="bnovo-widget-container"
        >
            <div
                className="div_for__bn_widget_adaptive"
                id="div_for__bn_widget_adaptive"
            >
                <div id="absolute_div_for__bn_widget_adaptive">
                    <div className="left" id="_bn_widget_adaptive">
                        <a
                            href="http://bnovo.ru/"
                            id="_bnovo_link_"
                            target="_blank"
                            rel="noreferrer"
                            style={{ zIndex: 1000, color: "#C5A059" }}
                        >
                            Bnovo
                        </a>
                    </div>
                </div>
            </div>
            <div
                style={{ height: "344px", display: "none" }}
                className="div_for__bn_widget_adaptive"
            />
            <style>{`
                #div_for__bn_widget_adaptive {width: 100%; max-width: 100%; margin: auto;}
                #absolute_div_for__bn_widget_adaptive {position: relative; width: 100%; max-width: 100%; z-index: 10;}
                .div_for__bn_widget_adaptive {min-height: 344px;}
            `}</style>
        </div>
    );
}
