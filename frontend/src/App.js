import React, { useState } from "react";
import "@/App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutBento from "./components/AboutBento";
import Rooms from "./components/Rooms";
import Location from "./components/Location";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import AIAssistant from "./components/AIAssistant";

function App() {
    const [aiOpen, setAiOpen] = useState(false);

    return (
        <div className="App" data-testid="app-root">
            <Header onOpenAssistant={() => setAiOpen(true)} />
            <main>
                <Hero />
                <AboutBento />
                <Rooms />
                <Location />
                <Services />
                <Reviews />
                <BookingSection />
            </main>
            <Footer onOpenAssistant={() => setAiOpen(true)} />
            <AIAssistant
                open={aiOpen}
                onOpen={() => setAiOpen(true)}
                onClose={() => setAiOpen(false)}
            />
        </div>
    );
}

export default App;
