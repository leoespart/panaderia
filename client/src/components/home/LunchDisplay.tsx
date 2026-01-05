import React from "react";
import { motion } from "framer-motion";
import { UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LunchDisplayProps {
    items: any[];
    lang: "es" | "en";
}

export function LunchDisplay({ items, lang }: LunchDisplayProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="w-full max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
                <Badge variant="outline" className="mb-4 px-4 py-1 text-sm font-bold uppercase tracking-widest bg-primary/5 text-primary border-primary/20">
                    {lang === "es" ? "Disponible Hoy" : "Available Today"}
                </Badge>
                <h3 className="text-4xl md:text-5xl font-black uppercase text-primary mb-2">
                    {lang === "es" ? "Almuerzo del Día" : "Daily Lunch"}
                </h3>
                <p className="text-muted-foreground font-medium text-lg">
                    {lang === "es" ? "Preparados frescos para ti" : "Freshly prepared for you"}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="border-none shadow-lg bg-white overflow-hidden hover:shadow-xl transition-shadow group relative">
                            {/* Optional Image would go here if we added image support later */}
                            <div className="p-8 flex flex-col items-center text-center">
                                <div className="mb-4 p-3 bg-yellow-100 rounded-full text-yellow-600 group-hover:scale-110 transition-transform">
                                    <UtensilsCrossed className="w-8 h-8" />
                                </div>
                                <h4 className="text-2xl font-black uppercase mb-2 text-foreground">{lang === "es" ? item.nameEs : item.nameEn}</h4>
                                <p className="text-muted-foreground font-medium mb-4">{lang === "es" ? item.descEs : item.descEn}</p>
                                <div className="text-xl font-bold text-primary">
                                    {item.price}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
