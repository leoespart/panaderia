import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardViewProps {
    siteData: any;
    onNavigate: (view: string) => void;
}

export function DashboardView({ siteData, onNavigate }: DashboardViewProps) {
    const categoriesCount = siteData.categories?.length || 0;
    const itemsCount = siteData.categories?.reduce((acc: number, cat: any) => acc + cat.items.length, 0) || 0;

    // Fake stats for visual demo
    const stats = [
        { label: "Vistas Totales", value: "12,345", change: "+12%", icon: Users, color: "text-blue-400" },
        { label: "Items en Menú", value: itemsCount, change: "+2", icon: Utensils, color: "text-orange-400" },
        { label: "Categorías", value: categoriesCount, change: "0", icon: ShoppingBag, color: "text-purple-400" },
        { label: "Conversión", value: "3.2%", change: "+0.4%", icon: TrendingUp, color: "text-green-400" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-2">
                <h2 className="text-4xl font-black uppercase text-white tracking-wide">Dashboard</h2>
                <p className="text-muted-foreground text-lg">Bienvenido al centro de control.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <span className="text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">{stat.change}</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground font-bold uppercase">{stat.label}</p>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-4 uppercase">Estado del Sitio</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                            <div>
                                <p className="font-bold text-white">Promoción Activa</p>
                                <p className="text-sm text-muted-foreground">{siteData.promoActive ? "Visible para todos" : "Desactivada"}</p>
                            </div>
                            <div className={`h-3 w-3 rounded-full ${siteData.promoActive ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500"}`} />
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                            <div>
                                <p className="font-bold text-white">Eventos Especiales</p>
                                <p className="text-sm text-muted-foreground">{siteData.showSpecialEvents ? "Sección Visible" : "Oculta"}</p>
                            </div>
                            <div className={`h-3 w-3 rounded-full ${siteData.showSpecialEvents ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "bg-red-500"}`} />
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-primary/20 to-purple-500/20 border-white/10 backdrop-blur-md flex flex-col justify-center items-start gap-4">
                    <h3 className="text-2xl font-black text-white uppercase">Acciones Rápidas</h3>
                    <p className="text-gray-300">Gestiona los productos y precios de tu menú rápidamente.</p>
                    <Button
                        size="lg"
                        className="font-bold uppercase shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
                        onClick={() => onNavigate("menu")}
                    >
                        Ir al Menú <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Card>
            </div>
        </div>
    );
}
