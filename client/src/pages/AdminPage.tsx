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
                // CHANGED: Use /api/settings instead of /api/content
                const res = await fetch("/api/settings");
                if (!res.ok) throw new Error("API not available");
                const data = await res.json();

                // Merge properly with defaults if keys are missing
                if (Object.keys(data).length === 0) throw new Error("Empty data");

                setSiteData(data);
            } catch (error) {
                console.warn("Using default data (API not available or empty)");
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
                    // POPULATED DEFAULT MENU TO MATCH HOME.TSX
                    categories: [
                        {
                            id: "almuerzo",
                            nameEs: "Almuerzo",
                            nameEn: "Lunch",
                            items: [
                                { id: "a1", nameEs: "Arroz con Habichuelas y Pollo", nameEn: "Rice with Beans and Chicken", price: "8.50", descEs: "Servido con ensalada y amarillos.", descEn: "Served with salad and sweet plantains." }
                            ]
                        },
                        {
                            id: "sandwiches",
                            nameEs: "Sandwiches",
                            nameEn: "Sandwiches",
                            items: [
                                { id: "s1", nameEs: "Sandwich Cubano", nameEn: "Cuban Sandwich", price: "7.50", descEs: "Pernil, jamón, queso suizo, pepinillos y mostaza.", descEn: "Pork, ham, swiss cheese, pickles and mustard." },
                                { id: "s2", nameEs: "Sandwich de Mezcla", nameEn: "Mix Sandwich", price: "4.50", descEs: "El clásico de la casa.", descEn: "The house classic." }
                            ]
                        },
                        {
                            id: "bebidas",
                            nameEs: "Bebidas",
                            nameEn: "Beverages",
                            items: [
                                { id: "c1", nameEs: "Posillo", nameEn: "Espresso Shot", price: "1.25", descEs: "Café espresso pequeño.", descEn: "Small espresso shot." },
                                { id: "c2", nameEs: "Café 6oz", nameEn: "Coffee 6oz", price: "2.24", descEs: "Café colado 6oz.", descEn: "Brewed coffee 6oz." },
                                { id: "c3", nameEs: "Café 8oz", nameEn: "Coffee 8oz", price: "3.23", descEs: "Café colado 8oz.", descEn: "Brewed coffee 8oz." },
                                { id: "c4", nameEs: "Café 12oz", nameEn: "Coffee 12oz", price: "4.22", descEs: "Café colado 12oz.", descEn: "Brewed coffee 12oz." }
                            ]
                        },
                        {
                            id: "desayuno",
                            nameEs: "Desayuno",
                            nameEn: "Breakfast",
                            items: [
                                { id: "de1", nameEs: "Revoltillo Ensalada", nameEn: "Salad Scramble", price: "6.25", descEs: "Revoltillo con ensalada.", descEn: "Scramble with salad." }
                            ]
                        },
                        {
                            id: "dulces",
                            nameEs: "Dulces",
                            nameEn: "Sweets",
                            items: [
                                { id: "d1", nameEs: "Donas Azucaradas", nameEn: "Sugar Donuts", price: "1.50", descEs: "Donas esponjosas cubiertas de azúcar.", descEn: "Fluffy donuts coated with sugar." }
                            ]
                        }
                    ]
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
        // REMOVED PADDING AND CENTERING FOR FULL SCREEN LAYOUT
        <div className="min-h-screen w-full bg-neutral-950">
            <AdminPanel
                siteData={siteData}
                setSiteData={setSiteData}
            />
        </div>
    );
}
