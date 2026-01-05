import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Utensils, ArrowRight, LogOut } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface MenuSectionProps {
    siteData: any;
    t: any;
    lang: "es" | "en";
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: "easeOut" }
    }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export function MenuSection({ siteData, t, lang }: MenuSectionProps) {
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    // Default to strict first category instead of "all"
    const [selectedCategory, setSelectedCategory] = useState<string>(siteData.categories?.[0]?.id || "");

    if (!siteData.isMenuVisible) return null;

    return (
        <motion.div id="menu" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
                <div className="p-3 md:p-5 bg-primary/10 rounded-full mb-4 md:mb-8">
                    <Utensils className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-foreground mb-4 md:mb-8 uppercase hover:text-primary transition-colors cursor-default">{t.menuTitle}</h2>
                <div className="w-20 md:w-40 h-2 md:h-3 bg-primary rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                {/* Featured Items - Dynamically take the first 4 items from the first category if available, or just placeholder logic */}
                {/* For now, let's just show the first 4 items of the first category as the "preview" */}
                {siteData.categories?.[0]?.items?.slice(0, 4).map((item: any) => (
                    <motion.div variants={fadeInUp} key={item.id}>
                        <Card className="h-full hover:shadow-2xl transition-all border-l-[8px] md:border-l-[16px] border-l-transparent hover:border-l-primary group bg-white p-4">
                            <CardHeader className="p-4 md:p-6">
                                <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group-hover:text-primary transition-colors text-2xl md:text-4xl font-black uppercase">
                                    <span>{lang === "es" ? item.nameEs : item.nameEn}</span>
                                    {/* Price removed */}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 md:px-6">
                                <p className="text-lg md:text-2xl text-muted-foreground font-bold">
                                    {lang === "es" ? item.descEs : item.descEn}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
                <motion.div variants={fadeInUp} className="md:col-span-2">
                    <Card
                        onClick={() => setIsMenuModalOpen(true)}
                        className="bg-primary text-primary-foreground border-none flex items-center justify-center p-12 md:p-20 cursor-pointer hover:bg-primary/90 transition-all shadow-xl group overflow-hidden relative rounded-2xl md:rounded-[2rem]">
                        <div className="text-center relative z-10">
                            <p className="text-3xl md:text-5xl font-black mb-4 md:mb-8 uppercase">{t.viewFullMenu}</p>
                            <ArrowRight className="h-10 w-10 md:h-16 md:w-16 mx-auto group-hover:translate-x-8 transition-transform" />
                        </div>
                    </Card>
                </motion.div>
            </div>

            <Dialog open={isMenuModalOpen} onOpenChange={setIsMenuModalOpen}>
                <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 border-none bg-background rounded-3xl">
                    <div className="sticky top-0 z-30 bg-primary text-white pt-14 pb-8 px-4 md:p-12 text-center relative shadow-lg">
                        <button
                            onClick={() => setIsMenuModalOpen(false)}
                            className="absolute top-3 right-3 md:top-8 md:right-8 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                            title={t.exitBtn}
                        >
                            <LogOut className="w-6 h-6 md:w-10 md:h-10 text-white" />
                        </button>
                        <h2 className="text-4xl md:text-7xl font-black uppercase mb-2 md:mb-4 leading-none">{t.menuTitle}</h2>
                        <p className="text-sm md:text-xl opacity-90 font-bold uppercase tracking-widest">Panaderia La Francesa</p>
                    </div>

                    <div className="p-4 md:p-12">
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12">
                            {siteData.categories.map((cat: any) => (
                                <Button
                                    key={cat.id}
                                    variant={selectedCategory === cat.id ? "default" : "outline"}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className="px-8 py-6 text-xl font-black uppercase rounded-2xl h-auto"
                                >
                                    {lang === "es" ? cat.nameEs : cat.nameEn}
                                </Button>
                            ))}
                        </div>

                        <div className="space-y-12">
                            {siteData.categories
                                .filter((cat: any) => selectedCategory === "all" || selectedCategory === cat.id)
                                .map((cat: any) => (
                                    <div key={cat.id} className="space-y-6">
                                        <h3 className="text-5xl font-black text-primary uppercase border-b-4 border-primary/10 pb-2 mb-8 inline-block">
                                            {lang === "es" ? cat.nameEs : cat.nameEn}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {cat.items.map((item: any) => (
                                                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl transition-all border-2 border-transparent bg-white shadow-sm hover:shadow-md">
                                                    {item.image && (
                                                        <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                                                            <img src={item.image} alt={item.nameEs} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 flex flex-col justify-center">
                                                        <div className="flex justify-between items-baseline mb-2 gap-4">
                                                            <h4 className="text-3xl font-black uppercase leading-tight whitespace-normal">{lang === "es" ? item.nameEs : item.nameEn}</h4>
                                                            {/* Price removed */}
                                                        </div>
                                                        <p className="text-lg text-muted-foreground font-bold leading-snug">{lang === "es" ? item.descEs : item.descEn}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
}
