import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Menu as MenuIcon, Heart, Clock, Store } from "lucide-react";

interface HeroProps {
    siteData: any;
    t: any;
    lang: "es" | "en";
    scrollTo: (id: string) => void;
}

export function Hero({ siteData, t, lang, scrollTo }: HeroProps) {
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    const isBakeryOpen = () => {
        const now = new Date();
        const day = now.getDay(); // 0 is Sunday
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hour + minutes / 60;

        if (day === 0) { // Sunday
            return currentTime >= 7 && currentTime <= 13;
        }
        return currentTime >= 7 && currentTime <= 18;
    };

    const isOpen = isBakeryOpen();

    return (
        <motion.section
            className="relative bg-primary text-primary-foreground pt-24 pb-32 md:pt-40 md:pb-52 px-4 overflow-hidden"
            style={{ y: heroY, opacity: heroOpacity }}
        >
            {/* Background Texture/Gradient Overlay to add depth to the red */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.05),rgba(0,0,0,0.2))] pointer-events-none"></div>

            {/* Subtle Pattern if desired, keeping it clean for now as per "flat" mostly look */}

            <div className="container mx-auto relative z-10 text-center max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="flex flex-col items-center"
                >
                    {/* Status Pills */}
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <div className={`px-5 py-2 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg`}>
                            <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? "bg-green-400 shadow-[0_0_10px_#4ade80]" : "bg-red-900"}`}></div>
                            {isOpen ? (lang === "es" ? "Abierto Ahora" : "Open Now") : (lang === "es" ? "Cerrado Ahora" : "Closed Now")}
                        </div>
                        <div className="px-5 py-2 rounded-full bg-white/10 border-2 border-white/30 backdrop-blur-sm text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg">
                            <Clock className="w-3.5 h-3.5" />
                            {siteData.heroBadge || (lang === "es" ? "Desayunos & Almuerzos" : "Breakfast & Lunch")}
                        </div>
                    </div>

                    {/* Main Title - Stacked and Big */}
                    <div className="flex flex-col items-center leading-none mb-8 select-none">
                        <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-display font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.1)] tracking-tight">
                            PANADERIA
                        </h1>
                        <h1 className="text-4xl md:text-7xl lg:text-[8rem] font-display font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.1)] tracking-tight -mt-1 md:-mt-4">
                            LA FRANCESA
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-xl text-white/90 mb-10 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md px-4">
                        {t.heroDesc}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                onClick={() => scrollTo("location")}
                                className="bg-[#FFF0F3] text-primary hover:bg-white border-b-4 border-b-primary-foreground/20 active:border-b-0 active:translate-y-1 transition-all h-14 md:h-16 px-8 md:px-10 rounded-full text-lg md:text-xl font-black uppercase tracking-wide shadow-xl group"
                            >
                                <motion.div
                                    animate={{ y: [0, -4, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                    className="mr-2"
                                >
                                    <MapPin className="h-6 w-6" />
                                </motion.div>
                                {t.visitBtn}
                            </Button>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                size="lg"
                                variant="outline"
                                onClick={() => scrollTo("menu")}
                                className="bg-transparent border-4 border-white text-white hover:bg-white hover:text-primary transition-all h-14 md:h-16 px-8 md:px-10 rounded-full text-lg md:text-xl font-black uppercase tracking-wide shadow-xl active:scale-95 group"
                            >
                                <motion.div
                                    whileHover={{ rotate: 180 }}
                                    transition={{ duration: 0.3 }}
                                    className="mr-2"
                                >
                                    <MenuIcon className="h-6 w-6" />
                                </motion.div>
                                {t.menuBtn}
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
