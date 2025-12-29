import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, Croissant, ChefHat, ArrowRight, Menu as MenuIcon, Utensils, Globe, Sandwich, Settings, LogOut, Save, Plus, Trash2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import logoImg from "@assets/logo_1766883612871.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" as const }
  }
};

const scrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = elementPosition - 100; // Offset for header
    let startTime: number | null = null;

    const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, 2000); // 2000ms duration
      window.scrollTo(0, run);
      if (timeElapsed < 2000) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

type Language = "es" | "en";

interface MenuCategory {
  id: string;
  nameEs: string;
  nameEn: string;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  nameEs: string;
  nameEn: string;
  price: string;
  descEs: string;
  descEn: string;
  image?: string;
}

interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
}

const DEFAULT_CATEGORIES: MenuCategory[] = [
  {
    id: "bebidas",
    nameEs: "Bebidas",
    nameEn: "Drinks",
    items: [
      { id: "b1", nameEs: "Café con Leche", nameEn: "Coffee with Milk", price: "2.50", descEs: "Café colado al momento con leche espumosa.", descEn: "Freshly brewed coffee with frothy milk.", image: "https://images.unsplash.com/photo-1541167760496-1628856ab752?q=80&w=2000&auto=format&fit=crop" },
      { id: "b2", nameEs: "Jugo Natural", nameEn: "Natural Juice", price: "3.50", descEs: "Naranja o Acerola.", descEn: "Orange or Acerola.", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=2000&auto=format&fit=crop" }
    ]
  },
  // ... rest of categories with images
];

const PromoPopup = ({ siteData, isOpen, onClose }: { siteData: any, isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="relative bg-white text-center p-10 rounded-[3rem] max-w-lg w-full shadow-2xl border-[8px] border-primary">
            <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
              <LogOut className="h-6 w-6" />
            </button>
            <Badge className="bg-primary text-white text-xl px-6 py-2 mb-6 uppercase font-black tracking-widest animate-pulse">¡Aviso Especial!</Badge>
            <h2 className="text-5xl font-black text-primary mb-4 uppercase leading-none">{siteData.promoDiscount}</h2>
            <p className="text-2xl font-bold text-gray-700 mb-8">{siteData.promoMessage}</p>
            <Button size="lg" className="w-full text-2xl py-8 font-black uppercase rounded-2xl animate-bounce" onClick={onClose}>
              ¡Entendido!
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Home() {
  const [lang, setLang] = useState<Language | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [newReview, setNewReview] = useState<{ name: string, comment: string, rating: number }>({ name: "", comment: "", rating: 5 });

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // Editable State
  const [siteData, setSiteData] = useState({
    heroBadgeEs: "Desayunos & Almuerzos",
    heroBadgeEn: "Breakfast & Lunch",
    heroTitle: "Panaderia La Francesa",
    heroDescEs: "Café, sandwiches, dulces y comida en Barrio Obrero. El sabor de la tradición en cada bocado.",
    heroDescEn: "Coffee, sandwiches, sweets and food in Barrio Obrero. The taste of tradition in every bite.",
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
    // New Fields
    logoUrl: "", // Empty defaults to asset import
    promoActive: false,
    promoMessage: "🎉 ¡Gran Descuento de Temporada!",
    promoDiscount: "50% OFF",
    reviews: [
      { id: "r1", name: "Juan Pérez", comment: "El mejor pan de Barrio Obrero. El café siempre está en su punto.", rating: 5 },
      { id: "r2", name: "Maria Rodriguez", comment: "Los quesitos son adictivos. Servicio excelente.", rating: 5 }
    ],
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
          { id: "c4", nameEs: "Café 12oz", nameEn: "Coffee 12oz", price: "4.22", descEs: "Café colado 12oz.", descEn: "Brewed coffee 12oz." },
          { id: "ch1", nameEs: "Chocolate 6oz", nameEn: "Hot Chocolate 6oz", price: "2.00", descEs: "Chocolate caliente 6oz.", descEn: "Hot chocolate 6oz." },
          { id: "ch2", nameEs: "Chocolate 8oz", nameEn: "Hot Chocolate 8oz", price: "2.75", descEs: "Chocolate caliente 8oz.", descEn: "Hot chocolate 8oz." },
          { id: "ch3", nameEs: "Chocolate 12oz", nameEn: "Hot Chocolate 12oz", price: "3.75", descEs: "Chocolate caliente 12oz.", descEn: "Hot chocolate 12oz." },
          { id: "b1", nameEs: "Agua", nameEn: "Water", price: "1.00", descEs: "Agua embotellada.", descEn: "Bottled water." },
          { id: "b2", nameEs: "Agua Perrier", nameEn: "Perrier Water", price: "2.25", descEs: "Agua Perrier con gas.", descEn: "Perrier sparkling water." },
          { id: "b3", nameEs: "Sparkling Water", nameEn: "Sparkling Water", price: "1.50", descEs: "Agua con gas.", descEn: "Sparkling water." },
          { id: "b4", nameEs: "Malta Pequeña", nameEn: "Small Malta", price: "1.00", descEs: "Malta pequeña.", descEn: "Small malta." },
          { id: "b5", nameEs: "Refrescos de Lata", nameEn: "Canned Soda", price: "1.35", descEs: "Refrescos en lata.", descEn: "Canned sodas." },
          { id: "b6", nameEs: "Refrescos de Botella", nameEn: "Bottled Soda", price: "2.00", descEs: "Refrescos en botella.", descEn: "Bottled sodas." },
          { id: "b7", nameEs: "Powerade", nameEn: "Powerade", price: "2.00", descEs: "Bebida deportiva Powerade.", descEn: "Powerade sports drink." },
          { id: "b8", nameEs: "Gatorade", nameEn: "Gatorade", price: "2.00", descEs: "Bebida deportiva Gatorade.", descEn: "Gatorade sports drink." },
          { id: "b9", nameEs: "Jugostia (cajita)", nameEn: "Juice Box", price: "2.00", descEs: "Jugo en cajita.", descEn: "Juice box." },
          { id: "b10", nameEs: "Jugos Naturales 16oz", nameEn: "Natural Juice 16oz", price: "3.50", descEs: "Jugo natural fresco 16oz.", descEn: "Fresh natural juice 16oz." },
          { id: "b11", nameEs: "Medio Galón de Jugo", nameEn: "Half Gallon Juice", price: "3.00", descEs: "Medio galón de jugo.", descEn: "Half gallon of juice." },
          { id: "b12", nameEs: "1 Galón de Jugo", nameEn: "1 Gallon Juice", price: "5.00", descEs: "1 galón de jugo.", descEn: "1 gallon of juice." },
          { id: "b13", nameEs: "Batidas", nameEn: "Smoothies", price: "5.00", descEs: "Batidas de frutas frescas.", descEn: "Fresh fruit smoothies." },
          { id: "b14", nameEs: "Morir Soñando", nameEn: "Morir Soñando", price: "5.00", descEs: "Bebida de naranja y leche.", descEn: "Orange and milk drink." },
          { id: "b15", nameEs: "Padrino", nameEn: "Padrino", price: "2.50", descEs: "Bebida especial Padrino.", descEn: "Special Padrino drink." }
        ]
      },
      {
        id: "desayuno",
        nameEs: "Desayuno",
        nameEn: "Breakfast",
        items: [
          { id: "de1", nameEs: "Revoltillo Ensalada", nameEn: "Salad Scramble", price: "6.25", descEs: "Revoltillo con ensalada.", descEn: "Scramble with salad." },
          { id: "de2", nameEs: "Revoltillo con Todo", nameEn: "Everything Scramble", price: "7.25", descEs: "Revoltillo con todos los ingredientes.", descEn: "Scramble with all ingredients." },
          { id: "de3", nameEs: "Revoltillo de Jamón", nameEn: "Ham Scramble", price: "5.25", descEs: "Revoltillo con jamón.", descEn: "Scramble with ham." },
          { id: "de4", nameEs: "Revoltillo Suizo", nameEn: "Swiss Scramble", price: "6.25", descEs: "Revoltillo con queso suizo.", descEn: "Scramble with swiss cheese." },
          { id: "de5", nameEs: "Revoltillo Solo Huevo", nameEn: "Egg Only Scramble", price: "4.25", descEs: "Revoltillo de huevo solo.", descEn: "Egg only scramble." },
          { id: "de6", nameEs: "Empanadilla", nameEn: "Turnover", price: "2.00", descEs: "Empanadilla rellena.", descEn: "Filled turnover." },
          { id: "f1", nameEs: "Farina 6oz", nameEn: "Cream of Wheat 6oz", price: "1.50", descEs: "Farina caliente 6oz.", descEn: "Hot cream of wheat 6oz." },
          { id: "f2", nameEs: "Farina 8oz", nameEn: "Cream of Wheat 8oz", price: "2.50", descEs: "Farina caliente 8oz.", descEn: "Hot cream of wheat 8oz." },
          { id: "f3", nameEs: "Farina 16oz", nameEn: "Cream of Wheat 16oz", price: "4.50", descEs: "Farina caliente 16oz.", descEn: "Hot cream of wheat 16oz." }
        ]
      },
      {
        id: "dulces",
        nameEs: "Dulces",
        nameEn: "Sweets",
        items: [
          { id: "d1", nameEs: "Donas Azucaradas", nameEn: "Sugar Donuts", price: "1.50", descEs: "Donas esponjosas cubiertas de azúcar.", descEn: "Fluffy donuts coated with sugar." },
          { id: "d2", nameEs: "Donas Glaseadas", nameEn: "Glazed Donuts", price: "1.50", descEs: "Donas con glaseado dulce.", descEn: "Donuts with sweet glaze." },
          { id: "d3", nameEs: "Donas Rellenas", nameEn: "Filled Donuts", price: "2.00", descEs: "Donas rellenas de crema.", descEn: "Donuts filled with cream." },
          { id: "m1", nameEs: "Muffin de Zanahoria", nameEn: "Carrot Muffin", price: "2.00", descEs: "Muffin de zanahoria fresco.", descEn: "Fresh carrot muffin." },
          { id: "m2", nameEs: "Muffin de Vainilla y Chocolate Chip", nameEn: "Vanilla Chocolate Chip Muffin", price: "2.00", descEs: "Muffin de vainilla con chispas de chocolate.", descEn: "Vanilla muffin with chocolate chips." },
          { id: "m3", nameEs: "Muffin de Crema de Queso", nameEn: "Cream Cheese Muffin", price: "2.00", descEs: "Muffin con crema de queso.", descEn: "Muffin with cream cheese." },
          { id: "m4", nameEs: "Muffin de Queso Crema y Guayaba", nameEn: "Cream Cheese & Guava Muffin", price: "2.00", descEs: "Muffin de queso crema con guayaba.", descEn: "Cream cheese muffin with guava." },
          { id: "m5", nameEs: "Muffin de Maíz", nameEn: "Corn Muffin", price: "2.00", descEs: "Muffin de maíz tradicional.", descEn: "Traditional corn muffin." },
          { id: "du1", nameEs: "Tres Leches", nameEn: "Tres Leches Cake", price: "3.50", descEs: "Bizcocho empapado en tres leches.", descEn: "Cake soaked in three milks." },
          { id: "du2", nameEs: "Flan", nameEn: "Flan", price: "3.50", descEs: "Flan de caramelo cremoso.", descEn: "Creamy caramel flan." },
          { id: "du3", nameEs: "Cheesecake", nameEn: "Cheesecake", price: "3.50", descEs: "Cheesecake suave y cremoso.", descEn: "Smooth and creamy cheesecake." },
          { id: "du4", nameEs: "Bizcocho de Chocolate", nameEn: "Chocolate Cake", price: "3.00", descEs: "Bizcocho de chocolate húmedo.", descEn: "Moist chocolate cake." },
          { id: "du5", nameEs: "Bizcocho de Maíz", nameEn: "Corn Cake", price: "1.50", descEs: "Bizcocho de maíz tradicional.", descEn: "Traditional corn cake." },
          { id: "du6", nameEs: "Galletas", nameEn: "Cookies", price: "0.50", descEs: "Galletas frescas.", descEn: "Fresh cookies." },
          { id: "du7", nameEs: "Quesitos", nameEn: "Quesitos", price: "2.00", descEs: "Hojaldre relleno de crema de queso.", descEn: "Puff pastry filled with cream cheese." },
          { id: "du8", nameEs: "Pastel Danés", nameEn: "Danish Pastry", price: "2.50", descEs: "Pastel danés con relleno.", descEn: "Danish pastry with filling." },
          { id: "du9", nameEs: "Turnovers", nameEn: "Turnovers", price: "1.50", descEs: "Pastelitos de hojaldre.", descEn: "Puff pastry turnovers." }
        ]
      }
    ]
  });

  const [logs, setLogs] = useState<{ timestamp: string, device: string, action: string }[]>([]);
  const [showPromo, setShowPromo] = useState(false);

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [200, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [200, 600], [1, 0.95]);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (savedLang) {
      setLang(savedLang);
      // Even if saved, we can show it once or just ensure it's working
    } else {
      // Small delay to ensure the dialog can mount properly
      const timer = setTimeout(() => setIsLangOpen(true), 500);
      return () => clearTimeout(timer);
    }

    // Fetch settings from server
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          setSiteData(prev => ({ ...prev, ...data })); // Merge with defaults
          // Check promo
          if (data.promoActive) {
            setTimeout(() => setShowPromo(true), 2000); // Popup delay
          }
        }
      });
  }, []);

  const selectLanguage = (l: Language) => {
    setLang(l);
    localStorage.setItem("preferred_lang", l);
    setIsLangOpen(false);
  };



  const saveAdminData = async () => {
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteData)
      });
      setIsAdminOpen(false);
    } catch (e) {
      console.error("Failed to save", e);
    }
  };

  const handleAdminLogin = async () => {
    if (adminPass === "Yadiel132") {
      setIsLoggedIn(true);
      await fetch("/api/login", { method: "POST" });
    }
  };

  const fetchLogs = async () => {
    const res = await fetch("/api/logs");
    const data = await res.json();
    setLogs(data);
  };

  const t = {
    es: {
      heroBadge: siteData.heroBadgeEs,
      heroTitle: siteData.heroTitle,
      heroDesc: siteData.heroDescEs,
      visitBtn: "Visítanos",
      directionsBtn: siteData.directionsBtnEs || "CÓMO LLEGAR",
      menuBtn: "Ver Menú",
      aboutTitle: "Sobre Nosotros",
      aboutDesc: siteData.aboutDescEs,
      menuTitle: "Nuestro Menú",
      viewFullMenu: "Ver menú completo",
      specialEventsBtn: "Eventos",
      specialEventsTitle: siteData.specialEventsTitleEs,
      specialEventsDesc: siteData.specialEventsDescEs,
      hoursTitle: "Horarios",
      contactTitle: "Contacto",
      callNow: "Llamar ahora",
      locationTitle: "Ubicación",
      avgPriceLabel: `Precio promedio: ${siteData.avgPrice}`,
      closed: "Cerrado",
      langSelect: "Selecciona tu idioma",
      langDesc: "Bienvenido a Panadería La Francesa",
      footerDesc: "Llevando el mejor pan, desayunos y almuerzos a tu mesa desde Barrio Obrero.",
      reviewsTitle: "Opiniones de Clientes",
      leaveReviewTitle: "Déjanos tu opinión",
      submitReviewBtn: "Enviar Reseña",
      support: "Soporte Técnico",
      privacy: "Privacidad",
      terms: "Términos",
      daysMonSat: "Lun - Sáb",
      daySun: "Dom",
      namePlaceholder: "Tu nombre",
      commentPlaceholder: "¿Qué te pareció nuestro sabor?",
      allCats: "Todos",
      exitBtn: "Salir"
    },
    en: {
      heroBadge: siteData.heroBadgeEn,
      heroTitle: siteData.heroTitle,
      heroDesc: siteData.heroDescEn,
      visitBtn: "Visit Us",
      directionsBtn: siteData.directionsBtnEn || "DIRECTIONS",
      menuBtn: "View Menu",
      aboutTitle: "About Us",
      aboutDesc: siteData.aboutDescEn,
      menuTitle: "Our Menu",
      viewFullMenu: "View full menu",
      specialEventsBtn: "Events",
      specialEventsTitle: siteData.specialEventsTitleEn,
      specialEventsDesc: siteData.specialEventsDescEn,
      hoursTitle: "Hours",
      contactTitle: "Contact",
      callNow: "Call now",
      locationTitle: "Location",
      avgPriceLabel: `Average price: ${siteData.avgPrice}`,
      closed: "Closed",
      langSelect: "Select your language",
      langDesc: "Welcome to Panadería La Francesa",
      footerDesc: "Bringing the best bread, breakfast and lunch to your table from Barrio Obrero.",
      reviewsTitle: "Customer Reviews",
      leaveReviewTitle: "Write a Review",
      submitReviewBtn: "Submit Review",
      support: "Technical Support",
      privacy: "Privacy",
      terms: "Terms",
      daysMonSat: "Mon - Sat",
      daySun: "Sun",
      namePlaceholder: "Your Name",
      commentPlaceholder: "How was the food?",
      allCats: "All",
      exitBtn: "Exit"
    }
  }[lang || "es"];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Language Selector */}
      <Dialog open={isLangOpen} onOpenChange={setIsLangOpen}>
        <DialogContent className="sm:max-w-md bg-background border-primary z-[100]">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold tracking-tight">{t.langSelect}</DialogTitle>
            <DialogDescription className="mt-2">{t.langDesc}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button variant="outline" size="lg" onClick={() => selectLanguage("es")} className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 font-bold uppercase">
              <span className="text-2xl">🇪🇸</span>
              Español
            </Button>
            <Button variant="outline" size="lg" onClick={() => selectLanguage("en")} className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5 font-bold uppercase">
              <span className="text-2xl">🇺🇸</span>
              English
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Panel Dialog */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto z-[90]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-black uppercase text-2xl">
              <Settings className="h-6 w-6" /> Admin Panel
            </DialogTitle>
          </DialogHeader>
          {!isLoggedIn ? (
            <div className="space-y-6 py-6">
              <Input
                type="password"
                placeholder="Contraseña de administrador"
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                className="text-lg py-6"
              />
              <Button className="w-full uppercase font-black text-xl py-6" onClick={handleAdminLogin}>Acceder</Button>
            </div>
          ) : (
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="flex flex-wrap h-auto gap-2 mb-6">
                <TabsTrigger value="general" className="uppercase font-black text-lg py-3 flex-1">General</TabsTrigger>
                <TabsTrigger value="menu" className="uppercase font-black text-lg py-3 flex-1">Menu</TabsTrigger>
                <TabsTrigger value="design" className="uppercase font-black text-lg py-3 flex-1">Diseño</TabsTrigger>
                <TabsTrigger value="promo" className="uppercase font-black text-lg py-3 flex-1">Promociones</TabsTrigger>
                <TabsTrigger value="logs" className="uppercase font-black text-lg py-3 flex-1" onClick={fetchLogs}>Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-8">
                <div className="grid gap-6">
                  {/* Hero Badge */}
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase text-muted-foreground">Hero Badge (ES)</label>
                        <Input
                          className="font-bold text-lg"
                          value={siteData.heroBadgeEs}
                          onChange={(e) => setSiteData({
                            ...siteData,
                            heroBadgeEs: e.target.value,
                            heroBadgeEn: `[EN: ${e.target.value}]` // Simple auto-fill mock
                          })}
                        />
                      </div>
                      <div className="space-y-2 opacity-70">
                        <label className="text-sm font-black uppercase text-muted-foreground">Hero Badge (EN)</label>
                        <Input
                          className="font-bold text-lg bg-muted"
                          value={siteData.heroBadgeEn}
                          readOnly
                        />
                        <p className="text-xs text-muted-foreground">*Traducido automáticamente</p>
                      </div>
                    </div>
                  </Card>

                  {/* Hero Title */}
                  <Card className="p-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black uppercase text-muted-foreground">Hero Title</label>
                      <Input
                        className="font-black text-xl uppercase"
                        value={siteData.heroTitle}
                        onChange={(e) => setSiteData({ ...siteData, heroTitle: e.target.value })}
                      />
                    </div>
                  </Card>

                  {/* Hero Description */}
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase text-muted-foreground">Hero Description (ES)</label>
                        <Textarea
                          className="text-lg min-h-[100px]"
                          value={siteData.heroDescEs}
                          onChange={(e) => setSiteData({
                            ...siteData,
                            heroDescEs: e.target.value,
                            heroDescEn: `[EN: ${e.target.value}]` // Simple auto-fill mock
                          })}
                        />
                      </div>
                      <div className="space-y-2 opacity-70">
                        <label className="text-sm font-black uppercase text-muted-foreground">Hero Description (EN)</label>
                        <Textarea
                          className="text-lg min-h-[100px] bg-muted"
                          value={siteData.heroDescEn}
                          readOnly
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Address & Buttons */}
                  <Card className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase text-muted-foreground">Dirección</label>
                        <Input
                          className="text-lg"
                          value={siteData.address}
                          onChange={(e) => setSiteData({ ...siteData, address: e.target.value })}
                        />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-black uppercase text-muted-foreground">Texto Botón Llegar (ES)</label>
                          <Input
                            className="text-lg"
                            value={siteData.directionsBtnEs}
                            onChange={(e) => setSiteData({
                              ...siteData,
                              directionsBtnEs: e.target.value,
                              directionsBtnEn: e.target.value === "CÓMO LLEGAR" ? "DIRECTIONS" : `[EN: ${e.target.value}]`
                            })}
                          />
                        </div>
                        <div className="space-y-2 opacity-70">
                          <label className="text-sm font-black uppercase text-muted-foreground">Texto Botón Directions (EN)</label>
                          <Input
                            className="text-lg bg-muted"
                            value={siteData.directionsBtnEn}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Phone & Price */}
                  <Card className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase text-muted-foreground">Teléfono</label>
                        <Input
                          className="text-lg font-bold"
                          value={siteData.phone}
                          onChange={(e) => setSiteData({ ...siteData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black uppercase text-muted-foreground">Precio Promedio</label>
                        <Input
                          className="text-lg"
                          value={siteData.avgPrice}
                          onChange={(e) => setSiteData({ ...siteData, avgPrice: e.target.value })}
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                <Button className="w-full gap-2 uppercase font-black py-8 text-2xl shadow-xl hover:scale-[1.01] transition-transform" onClick={saveAdminData}>
                  <Save className="h-8 w-8" /> Guardar Cambios
                </Button>
              </TabsContent>

              <TabsContent value="menu" className="space-y-6">
                {siteData.categories.map((cat, catIdx) => (
                  <Card key={cat.id} className="overflow-hidden border-2">
                    <div className="p-6 bg-muted/30 border-b-2 flex items-center gap-4">
                      <Input
                        className="font-black uppercase text-xl flex-1 border-none bg-transparent shadow-none px-0 focus-visible:ring-0"
                        value={cat.nameEs}
                        onChange={(e) => {
                          const newCats = [...siteData.categories];
                          newCats[catIdx].nameEs = e.target.value;
                          newCats[catIdx].nameEn = `[EN: ${e.target.value}]`;
                          setSiteData({ ...siteData, categories: newCats });
                        }}
                      />
                      <span className="text-sm font-mono text-muted-foreground px-3 py-1 bg-muted rounded">EN: {cat.nameEn}</span>
                    </div>


                    <div className="p-6 space-y-6">
                      {cat.items.map((item, itemIdx) => (
                        <Card key={item.id} className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                            <div className="space-y-4">
                              <div className="aspect-square rounded-lg overflow-hidden bg-muted relative group">
                                {item.image ? (
                                  <img src={item.image} alt={item.nameEs} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No img</div>
                                )}
                              </div>
                              <Input
                                placeholder="URL Imagen"
                                value={item.image || ""}
                                onChange={(e) => {
                                  const newCats = [...siteData.categories];
                                  newCats[catIdx].items[itemIdx].image = e.target.value;
                                  setSiteData({ ...siteData, categories: newCats });
                                }}
                                className="text-xs"
                              />
                            </div>

                            <div className="space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <label className="text-xs font-bold uppercase opacity-50">Nombre</label>
                                  <Input
                                    value={item.nameEs}
                                    className="font-black text-lg"
                                    onChange={(e) => {
                                      const newCats = [...siteData.categories];
                                      newCats[catIdx].items[itemIdx].nameEs = e.target.value;
                                      newCats[catIdx].items[itemIdx].nameEn = `[EN: ${e.target.value}]`;
                                      setSiteData({ ...siteData, categories: newCats });
                                    }}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-bold uppercase opacity-50">Precio</label>
                                  <Input
                                    value={item.price}
                                    className="font-black text-lg text-primary"
                                    onChange={(e) => {
                                      const newCats = [...siteData.categories];
                                      newCats[catIdx].items[itemIdx].price = e.target.value;
                                      setSiteData({ ...siteData, categories: newCats });
                                    }}
                                  />
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-xs font-bold uppercase opacity-50">Descripción</label>
                                <Textarea
                                  value={item.descEs}
                                  className="min-h-[80px]"
                                  onChange={(e) => {
                                    const newCats = [...siteData.categories];
                                    newCats[catIdx].items[itemIdx].descEs = e.target.value;
                                    newCats[catIdx].items[itemIdx].descEn = `[EN: ${e.target.value}]`;
                                    setSiteData({ ...siteData, categories: newCats });
                                  }}
                                />
                              </div>

                              <div className="flex justify-end">
                                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10 uppercase font-bold" onClick={() => {
                                  const newCats = [...siteData.categories];
                                  newCats[catIdx].items.splice(itemIdx, 1);
                                  setSiteData({ ...siteData, categories: newCats });
                                }}>
                                  <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}

                      <Button variant="outline" className="w-full border-dashed border-2 py-8 uppercase font-bold text-muted-foreground hover:text-primary hover:border-primary" onClick={() => {
                        const newCats = [...siteData.categories];
                        newCats[catIdx].items.push({ id: Date.now().toString(), nameEs: "Nuevo Plato", nameEn: "New Dish", price: "0.00", descEs: "", descEn: "", image: "" });
                        setSiteData({ ...siteData, categories: newCats });
                      }}>
                        <Plus className="h-5 w-5 mr-2" /> Agregar Plato a {cat.nameEs}
                      </Button>
                    </div>
                  </Card>
                ))}

                <Button className="w-full gap-2 uppercase font-black py-8 text-2xl" onClick={saveAdminData}>
                  <Save className="h-6 w-6" /> Guardar Cambios
                </Button>
              </TabsContent>

              <TabsContent value="design" className="space-y-6 py-4">
                <Card className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-black uppercase">Logo del Sitio</h3>
                    <div className="flex gap-6 items-center">
                      <div className="h-32 w-32 rounded-full bg-muted border-4 border-primary overflow-hidden flex-shrink-0">
                        <img src={siteData.logoUrl || logoImg} alt="Preview" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <label className="text-sm font-bold uppercase opacity-70">URL del Logo (Imagen)</label>
                        <Input
                          placeholder="https://..."
                          className="text-lg py-6"
                          value={siteData.logoUrl}
                          onChange={(e) => setSiteData({ ...siteData, logoUrl: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Deja vacío para usar el logo por defecto.</p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Button className="w-full gap-2 uppercase font-black py-8 text-2xl" onClick={saveAdminData}>
                  <Save className="h-6 w-6" /> Guardar Cambios
                </Button>
              </TabsContent>

              <TabsContent value="promo" className="space-y-6 py-4">
                <Card className="p-6 bg-accent/5 border-accent/20 border-2">
                  <h3 className="text-2xl font-black uppercase text-accent mb-6 flex items-center gap-2">
                    <Heart className="fill-accent h-8 w-8" /> Configuración de Promociones
                  </h3>

                  <div className="flex items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border">
                    <Switch
                      checked={siteData.promoActive}
                      onCheckedChange={(checked) => setSiteData({ ...siteData, promoActive: checked })}
                      className="scale-150 ml-2"
                    />
                    <div className="flex flex-col ml-4">
                      <span className="text-xl font-black uppercase">Activar Popup de Promoción</span>
                      <span className="text-sm text-muted-foreground font-bold">Si se activa, todos los usuarios verán el anuncio al entrar.</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase opacity-70">Mensaje de Promoción</label>
                      <Input
                        className="text-xl py-6 font-bold"
                        value={siteData.promoMessage}
                        onChange={(e) => setSiteData({ ...siteData, promoMessage: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase opacity-70">Texto del Descuento (Grande)</label>
                      <Input
                        className="text-xl py-6 font-black text-accent"
                        value={siteData.promoDiscount}
                        onChange={(e) => setSiteData({ ...siteData, promoDiscount: e.target.value })}
                      />
                    </div>
                  </div>
                </Card>
                <Button className="w-full gap-2 uppercase font-black py-8 text-2xl" onClick={saveAdminData}>
                  <Save className="h-6 w-6" /> Guardar Cambios
                </Button>
              </TabsContent>

              <TabsContent value="logs" className="space-y-6 py-4">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black uppercase">Registros de Acceso</h3>
                    <Button variant="outline" size="sm" onClick={fetchLogs}>Refrescar Logs</Button>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-bold uppercase">Hora</TableHead>
                          <TableHead className="font-bold uppercase">Dispositivo</TableHead>
                          <TableHead className="font-bold uppercase">Acción</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {logs.map((log, i) => (
                          <TableRow key={i}>
                            <TableCell className="font-mono text-xs">{new Date(log.timestamp).toLocaleString()}</TableCell>
                            <TableCell className="text-xs truncate max-w-[200px]" title={log.device}>{log.device}</TableCell>
                            <TableCell className="font-bold text-primary">{log.action}</TableCell>
                          </TableRow>
                        ))}
                        {logs.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No hay registros recientes.</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">Mostrando últimos 50 accesos. Registrado por el servidor.</p>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Promo Popup */}
      {/* Promo Popup */}
      <PromoPopup siteData={siteData} isOpen={showPromo} onClose={() => setShowPromo(false)} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              src={siteData.logoUrl || logoImg}
              alt="Logo"
              className="h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-white shadow-2xl -mb-16 z-50 transform hover:scale-110 transition-transform duration-500 origin-top bg-white object-cover"
            />
            <div className="hidden md:flex items-center gap-2 pl-28">
              <ChefHat className="h-6 w-6" />
              <span className="text-xl font-black uppercase whitespace-nowrap">Panaderia La Francesa</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex gap-10 text-sm font-black uppercase">
              <button onClick={() => scrollTo("about")} className="hover:text-white/80 transition-colors cursor-pointer">{t.aboutTitle}</button>
              <button onClick={() => scrollTo("menu")} className="hover:text-white/80 transition-colors cursor-pointer">Menu</button>
              <button onClick={() => scrollTo("location")} className="hover:text-white/80 transition-colors cursor-pointer">{t.locationTitle}</button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" onClick={() => setIsLangOpen(true)} className="gap-2 font-black shadow-lg px-8 h-14 text-xl hover:scale-110 active:scale-95 transition-transform duration-200">
                <Globe className="h-6 w-6" />
                {lang?.toUpperCase() || "..."}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsAdminOpen(true)} className="text-white hover:bg-white/10">
                <Settings className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="relative bg-primary text-primary-foreground py-16 md:py-24 px-4 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary"></div>

        <div className="container mx-auto relative z-10 text-center max-w-5xl pt-24 md:pt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-6 md:px-10 py-3 md:py-4 text-sm md:text-xl rounded-full shadow-lg border-2 border-white/20 uppercase font-black">{t.heroBadge}</Badge>
            <div className="flex flex-col items-center gap-2 md:gap-4 mb-8">
              <h1 className="text-6xl md:text-9xl lg:text-[13rem] font-black leading-none tracking-tighter drop-shadow-2xl uppercase hover:text-white transition-colors duration-300 transform hover:scale-105 inline-block cursor-default select-none">
                Panaderia
              </h1>
              <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black leading-none tracking-tighter drop-shadow-2xl uppercase opacity-90 -mt-2 md:-mt-8 hover:text-accent transition-colors duration-300 transform hover:scale-105 inline-block cursor-default select-none">
                La Francesa
              </h1>
            </div>
            <p className="text-lg md:text-3xl text-primary-foreground/90 mb-10 max-w-4xl mx-auto font-bold leading-relaxed uppercase opacity-80">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center">
              <Button size="lg" variant="secondary" onClick={() => scrollTo("location")} className="w-full sm:w-auto gap-3 md:gap-5 text-lg md:text-2xl h-16 md:h-20 px-8 md:px-16 shadow-2xl hover:scale-105 transition-transform font-black uppercase group rounded-2xl md:rounded-3xl">
                <MapPin className="h-6 w-6 md:h-8 md:w-8 group-hover:animate-bounce" /> {t.visitBtn}
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("menu")} className="w-full sm:w-auto gap-3 md:gap-5 text-lg md:text-2xl h-16 md:h-20 px-8 md:px-16 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary shadow-2xl hover:scale-105 transition-transform font-black uppercase group rounded-2xl md:rounded-3xl">
                <MenuIcon className="h-6 w-6 md:h-8 md:w-8 group-hover:rotate-12 transition-transform" /> {t.menuBtn}
              </Button>
              {siteData.showSpecialEvents && (
                <Button size="lg" variant="outline" onClick={() => scrollTo("specials")} className="w-full sm:w-auto gap-3 md:gap-5 text-lg md:text-2xl h-16 md:h-20 px-8 md:px-16 bg-accent border-2 border-white text-white hover:bg-white hover:text-accent shadow-2xl hover:scale-105 transition-transform font-black uppercase group rounded-2xl md:rounded-3xl">
                  <Heart className="h-6 w-6 md:h-8 md:w-8 group-hover:scale-125 transition-transform" /> {t.specialEventsBtn}
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-8 py-8 md:py-16 space-y-16 md:space-y-32 -mt-10 relative z-20">
        {/* About Card */}
        <motion.div id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Card className="shadow-2xl border-none overflow-hidden max-w-5xl mx-auto transform hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute top-0 left-0 w-2 md:w-4 h-full bg-primary"></div>
            <CardHeader className="pb-4 md:pb-6 p-6 md:p-10">
              <div className="flex items-center gap-4 md:gap-6 mb-2 md:mb-4">
                <div className="p-3 md:p-5 bg-primary/10 rounded-2xl md:rounded-3xl">
                  <Croissant className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-primary uppercase hover:scale-105 transition-transform cursor-default">{t.aboutTitle}</h2>
              </div>
            </CardHeader>
            <CardContent className="px-6 md:px-10 pb-6 md:pb-10">
              <p className="text-xl md:text-3xl text-muted-foreground leading-relaxed font-bold">
                {t.aboutDesc}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu Section */}
        <motion.div id="menu" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-12 md:mb-20 text-center">
            <div className="p-3 md:p-5 bg-primary/10 rounded-full mb-4 md:mb-8">
              <Utensils className="h-8 w-8 md:h-12 md:w-12 text-primary" />
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground mb-4 md:mb-8 uppercase hover:text-primary transition-colors cursor-default">{t.menuTitle}</h2>
            <div className="w-20 md:w-40 h-2 md:h-3 bg-primary rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {/* Café */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-[8px] md:border-l-[16px] border-l-transparent hover:border-l-primary group bg-white p-4">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group-hover:text-primary transition-colors text-2xl md:text-4xl font-black uppercase">
                    <span>{lang === "es" ? "Café 8oz" : "Coffee 8oz"}</span>
                    <Badge variant="secondary" className="text-lg md:text-2xl px-4 md:px-5 py-1 md:py-2 font-black">$3.23</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                  <p className="text-lg md:text-2xl text-muted-foreground font-bold">
                    {lang === "es" ? "Café colado al momento." : "Freshly brewed coffee."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Sandwich Cubano */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-[8px] md:border-l-[16px] border-l-transparent hover:border-l-primary group bg-white p-4">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group-hover:text-primary transition-colors text-2xl md:text-4xl font-black uppercase">
                    <span>{lang === "es" ? "Sandwich Cubano" : "Cuban Sandwich"}</span>
                    <Badge variant="secondary" className="text-lg md:text-2xl px-4 md:px-5 py-1 md:py-2 font-black">$7.50</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                  <p className="text-lg md:text-2xl text-muted-foreground font-bold">
                    {lang === "es" ? "Pernil, jamón, queso suizo, pepinillos y mostaza." : "Pork, ham, swiss cheese, pickles and mustard."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tres Leches */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-[8px] md:border-l-[16px] border-l-transparent hover:border-l-primary group bg-white p-4">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group-hover:text-primary transition-colors text-2xl md:text-4xl font-black uppercase">
                    <span>{lang === "es" ? "Tres Leches" : "Tres Leches Cake"}</span>
                    <Badge variant="secondary" className="text-lg md:text-2xl px-4 md:px-5 py-1 md:py-2 font-black">$3.50</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                  <p className="text-lg md:text-2xl text-muted-foreground font-bold">
                    {lang === "es" ? "Bizcocho empapado en tres leches." : "Cake soaked in three milks."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Batidas */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-[8px] md:border-l-[16px] border-l-transparent hover:border-l-primary group bg-white p-4">
                <CardHeader className="p-4 md:p-6">
                  <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group-hover:text-primary transition-colors text-2xl md:text-4xl font-black uppercase">
                    <span>{lang === "es" ? "Batidas" : "Smoothies"}</span>
                    <Badge variant="secondary" className="text-lg md:text-2xl px-4 md:px-5 py-1 md:py-2 font-black">$5.00</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                  <p className="text-lg md:text-2xl text-muted-foreground font-bold">
                    {lang === "es" ? "Batidas de frutas frescas." : "Fresh fruit smoothies."}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
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
        </motion.div>

        {/* Full Menu Modal */}
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
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="px-8 py-6 text-xl font-black uppercase rounded-2xl h-auto"
                >
                  {t.allCats}
                </Button>
                {siteData.categories.map(cat => (
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {siteData.categories
                  .filter(cat => selectedCategory === "all" || selectedCategory === cat.id)
                  .map(cat => (
                    <div key={cat.id} className="space-y-6">
                      <h3 className="text-4xl font-black text-primary uppercase border-b-4 border-primary/20 pb-2 mb-8">
                        {lang === "es" ? cat.nameEs : cat.nameEn}
                      </h3>
                      <div className="space-y-4">
                        {cat.items.map(item => (
                          <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 rounded-3xl hover:bg-primary/5 transition-all border-2 border-transparent hover:border-primary/10 bg-white/50">
                            {item.image && (
                              <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                                <img src={item.image} alt={item.nameEs} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                              </div>
                            )}
                            <div className="flex-1 flex flex-col justify-center">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="text-3xl font-black uppercase leading-tight">{lang === "es" ? item.nameEs : item.nameEn}</h4>
                                <span className="text-3xl font-black text-primary ml-4">${item.price}</span>
                              </div>
                              <p className="text-xl text-muted-foreground font-bold leading-relaxed">{lang === "es" ? item.descEs : item.descEn}</p>
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

        {/* Info Grid */}
        <div className="flex flex-col xl:flex-row gap-8 md:gap-16 max-w-[1400px] mx-auto w-full">
          {/* Hours */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex-1 w-full">
            <Card className="h-full border-t-[8px] md:border-t-[16px] border-t-primary shadow-2xl bg-white rounded-2xl md:rounded-3xl">
              <CardHeader className="p-6 md:p-10">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-5 bg-primary/10 rounded-full">
                    <Clock className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                  </div>
                  <CardTitle className="text-3xl md:text-5xl font-black uppercase">{t.hoursTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 md:space-y-10 pt-4 md:pt-8 px-6 md:px-10 pb-8 md:pb-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 md:border-b-4 border-border pb-4 md:pb-6 gap-2 sm:gap-4">
                  <span className="text-xl md:text-3xl font-black uppercase whitespace-nowrap">{t.daysMonSat}</span>
                  <span className="text-xl md:text-3xl text-muted-foreground font-bold whitespace-nowrap">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <span className="text-xl md:text-3xl font-black uppercase whitespace-nowrap">{t.daySun}</span>
                  <span className="text-xl md:text-3xl text-muted-foreground font-bold whitespace-nowrap">6:00 AM - 3:00 PM</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="flex-1 w-full">
            <Card className="h-full border-t-[8px] md:border-t-[16px] border-t-primary shadow-2xl flex flex-col bg-white rounded-2xl md:rounded-3xl">
              <CardHeader className="p-6 md:p-10">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="p-3 md:p-5 bg-primary/10 rounded-full">
                    <Phone className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                  </div>
                  <CardTitle className="text-3xl md:text-5xl font-black uppercase">{t.contactTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-8 md:gap-16 pt-4 md:pt-8 px-6 md:px-10 pb-8 md:pb-12">
                <div className="text-center md:text-left overflow-hidden">
                  <p className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-primary mb-6 md:mb-10 drop-shadow-md whitespace-nowrap leading-tight">{siteData.phone}</p>
                  <Badge variant="secondary" className="text-lg md:text-2xl lg:text-3xl px-6 md:px-8 py-3 md:py-4 rounded-full font-black w-fit">
                    <span>{t.avgPriceLabel}</span>
                  </Badge>
                </div>
                <Button size="lg" asChild className="w-full text-2xl md:text-4xl h-20 md:h-28 shadow-2xl group rounded-2xl md:rounded-[2rem] font-black uppercase hover:scale-[1.02] transition-transform">
                  <a href={`tel:${(siteData.phone || "").replace(/\D/g, '')}`}>
                    <Phone className="mr-4 md:mr-6 h-8 w-8 md:h-12 md:w-12 group-hover:animate-pulse" /> {t.callNow}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Special Events Section */}
        {siteData.showSpecialEvents && (
          <motion.div id="specials" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto">
            <Card className="bg-accent text-white overflow-hidden rounded-[3rem] shadow-2xl border-none">
              <div className="grid md:grid-cols-2">
                <div className="p-12 md:p-20 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-8 px-6 py-2 rounded-full font-black uppercase tracking-widest bg-white text-accent">¡PRÓXIMAMENTE!</Badge>
                  <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-none">{t.specialEventsTitle}</h2>
                  <p className="text-2xl md:text-3xl font-bold opacity-90 leading-relaxed mb-12">
                    {t.specialEventsDesc}
                  </p>
                </div>
                <div className="h-[400px] md:h-auto overflow-hidden">
                  <img src={siteData.specialEventsImage} alt="Special Event" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Location */}
        <motion.div id="location" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto pb-10 md:pb-20">
          <div className="flex flex-col items-center mb-10 md:mb-16 text-center">
            <div className="p-3 md:p-5 bg-primary/10 rounded-full mb-4 md:mb-8">
              <MapPin className="h-8 w-8 md:h-12 md:w-12 text-primary" />
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-foreground mb-4 md:mb-8 uppercase hover:text-primary transition-colors cursor-default">{t.locationTitle}</h2>
          </div>
          <Card className="overflow-hidden shadow-2xl border-none rounded-3xl md:rounded-[4rem] group">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="p-8 md:p-16 md:col-span-1 bg-primary text-primary-foreground flex flex-col justify-center relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-black text-4xl md:text-6xl mb-6 md:mb-10 uppercase leading-none">{t.visitBtn}</h3>
                  <p className="text-2xl md:text-4xl text-primary-foreground/90 mb-10 md:mb-16 font-bold leading-none">
                    {siteData.address}
                  </p>
                  <Button variant="secondary" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteData.address)}`, '_blank')} className="w-full text-xl md:text-3xl h-16 md:h-24 font-black rounded-xl md:rounded-2xl shadow-xl hover:scale-105 transition-transform uppercase" size="lg">
                    {t.directionsBtn}
                  </Button>
                </div>
              </div>
              <div className="h-[400px] md:h-auto md:col-span-2 relative overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.1311026046416!2d-66.0592!3d18.4411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c03666f2f2c8f61%3A0x6a0c0e0c0c0c0c0c!2s1963%20Av.%20Borinquen%2C%20San%20Juan%2C%2000915%2C%20Puerto%20Rico!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                ></iframe>
                <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:bg-transparent transition-colors duration-1000"></div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Reviews Section */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto py-20 px-6 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-6">{t.reviewsTitle}</h2>
          <div className="w-40 h-3 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {siteData.reviews.map((rev) => (
            <Card key={rev.id} className="p-8 rounded-[2.5rem] shadow-xl border-none bg-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[4rem] group-hover:bg-primary/10 transition-colors"></div>
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(rev.rating)].map((_, i) => (
                  <Heart key={i} className="h-6 w-6 fill-current" />
                ))}
              </div>
              <p className="text-2xl font-bold italic mb-8 text-muted-foreground">"{rev.comment}"</p>
              <p className="text-xl font-black uppercase tracking-widest text-primary">— {rev.name}</p>
            </Card>
          ))}
        </div>
        <Card className="max-w-2xl mx-auto p-10 rounded-[3rem] shadow-2xl border-none">
          <h3 className="text-3xl font-black uppercase mb-8 text-center">{t.leaveReviewTitle}</h3>
          <div className="space-y-6">
            <Input
              placeholder={t.namePlaceholder}
              className="text-lg py-6 px-6 rounded-2xl"
              value={newReview.name}
              onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            />
            <div className="flex gap-2 justify-center py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setNewReview({ ...newReview, rating: star })} type="button" className="focus:outline-none transform transition-transform hover:scale-125">
                  <Heart className={`h-10 w-10 ${star <= (newReview.rating || 5) ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
              ))}
            </div>
            <Textarea
              placeholder={t.commentPlaceholder}
              className="text-lg min-h-[120px] px-6 py-4 rounded-2xl"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
            <Button
              className="w-full py-8 text-2xl font-black uppercase rounded-3xl shadow-lg hover:scale-[1.02] transition-transform"
              onClick={() => {
                if (newReview.name && newReview.comment) {
                  const rev: Review = {
                    id: Date.now().toString(),
                    name: newReview.name,
                    comment: newReview.comment,
                    rating: newReview.rating
                  };
                  setSiteData({ ...siteData, reviews: [rev, ...siteData.reviews] });
                  setNewReview({ name: "", comment: "", rating: 5 });
                }
              }}
            >
              {t.submitReviewBtn}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 md:py-32 mt-auto relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <img src={logoImg} alt="Logo" className="h-32 w-32 md:h-40 md:w-40 mx-auto mb-8 md:mb-12 rounded-full border-4 border-white shadow-2xl" />
          <div className="mb-10 md:mb-16">
            <h3 className="text-5xl md:text-7xl font-black mb-4 md:mb-6 uppercase">Panaderia</h3>
            <h3 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 uppercase opacity-80">La Francesa</h3>
          </div>
          <p className="text-xl md:text-3xl text-primary-foreground/70 mb-12 md:mb-20 max-w-3xl mx-auto font-bold uppercase">
            {t.footerDesc}
          </p>
          <div className="bg-white/10 p-8 md:p-12 rounded-2xl md:rounded-[3rem] inline-block mb-16 md:mb-24 border-2 border-white/5">
            <p className="text-sm md:text-lg uppercase tracking-widest mb-2 md:mb-4 opacity-60 font-black">{t.support}</p>
            <p className="text-3xl md:text-5xl font-black flex items-center justify-center gap-4 md:gap-6">
              <Phone className="h-8 w-8 md:h-10 md:w-10" /> 939-630-0315
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-lg md:text-2xl font-black opacity-60 uppercase">
            <span className="hover:opacity-100 transition-opacity cursor-pointer">© 2025</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer">{t.privacy}</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer">{t.terms}</span>
          </div>
        </div>
      </footer>
    </div >
  );
}
