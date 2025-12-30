import React, { useState, useEffect } from "react";
import { AdminPanel } from "@/components/admin/AdminPanel";
import { SiteData } from "@/types";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
    const [siteData, setSiteData] = useState<SiteData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/content");
                if (!res.ok) throw new Error("API not available");
                const data = await res.json();
                setSiteData(data);
            } catch (error) {
                console.warn("Using default data (API not available)");
                setSiteData({
                    heroBadgeEs: "Desayunos & Almuerzos",
                    heroBadgeEn: "Breakfast & Lunch",
                    footerDescEs: "Llevando el mejor pan, desayunos y almuerzos a tu mesa desde Barrio Obrero.",
                    footerDescEn: "Bringing the best bread, breakfast and lunch to your table from Barrio Obrero.",
                    hoursWeekdays: "6:00 AM - 6:00 PM",
                    hoursWeekend: "7:00 AM - 1:00 PM",
                    heroTitle: "Panaderia La Francesa",
                    heroDescEs: "La panadería del corazón de Barrio Obrero.",
                    heroDescEn: "The bakery of the heart of Barrio Obrero.",
                    avgPrice: "$5 - $10",
                    phone: "(939) 337-4777",
                    address: "1963 Av. Borinquen, San Juan, PR 00915",
                    directionsBtnEs: "CÓMO LLEGAR",
                    directionsBtnEn: "DIRECTIONS",
                    aboutDescEs: "Somos una panadería y cafetería en Barrio Obrero, reconocida por nuestro pan fresco, postres artesanales y un servicio familiar. Ofrecemos desayunos, almuerzos y una gran variedad de sandwiches.",
                    aboutDescEn: "We are a bakery and cafeteria in Barrio Obrero, recognized for our fresh bread, artisanal desserts and family service. We offer breakfast, lunch and a wide variety of sandwiches.",
                    showSpecialEvents: false,
                    specialEventsTitleEs: "Eventos Especiales",
                    specialEventsTitleEn: "Special Events",
                    specialEventsDescEs: "¡Únete a nosotros para nuestras noches de música en vivo y degustaciones!",
                    specialEventsDescEn: "Join us for our live music nights and tastings!",
                    specialEventsImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop",
                    logoUrl: "",
                    promoActive: false,
                    promoMessage: "🎉 ¡Gran Descuento de Temporada!",
                    promoDiscount: "50% OFF",
                    categories: [] // Simplification for admin init if API fails
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading || !siteData) {
        return (
            <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <AdminPanel
                    siteData={siteData}
                    setSiteData={setSiteData}
                />
            </div>
        </div>
    );
}
