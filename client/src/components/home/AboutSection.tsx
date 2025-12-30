import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Croissant } from "lucide-react";

interface AboutSectionProps {
    t: any;
}

export function AboutSection({ t }: AboutSectionProps) {
    return (
        <motion.section
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="container mx-auto px-4 relative z-20 -mt-24 md:-mt-32 mb-24"
        >
            <Card className="shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-none overflow-hidden max-w-5xl mx-auto rounded-[2.5rem] bg-white">
                <div className="flex flex-col md:flex-row">
                    {/* Left side accent - purely decorative or image */}
                    <div className="hidden md:block w-4 bg-primary/10"></div>

                    <div className="flex-1 p-8 md:p-14 md:pr-10">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="p-4 bg-[#FFF0F3] rounded-2xl shadow-sm rotate-3 transform transition-transform hover:rotate-6">
                                <Croissant className="h-10 w-10 text-primary" />
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-primary uppercase tracking-tighter">
                                {t.aboutTitle}
                            </h2>
                        </div>

                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-bold opacity-80">
                            {t.aboutDesc}
                        </p>
                    </div>
                </div>
            </Card>
        </motion.section>
    );
}
