import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Enhanced imports
import { Phone, Globe, Settings, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import logoImg from "@assets/new_logo.jpg";

// Components
import { Header } from "@/components/common/Header"; // New Header
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection"; // New AboutSection
import { MenuSection } from "@/components/home/MenuSection";
import { LocationSection } from "@/components/home/LocationSection";
import { PromoPopup } from "@/components/home/PromoPopup";
import { SplashScreen } from "@/components/SplashScreen";

const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

const scrollTo = (id: string) => {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const element = document.getElementById(id);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const offset = 100; // Header offset
    const targetPosition = startPosition + elementPosition - offset;
    const distance = targetPosition - startPosition;

    // Custom duration: slower for main sections to show off the animation
    const duration = 2000; // 2 seconds
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;

      // Easing function: easeInOutCubic
      const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const run = ease(Math.min(timeElapsed / duration, 1));

      window.scrollTo(0, startPosition + distance * run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }
};

type Language = "es" | "en";


export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<Language | null>(null);

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showPromo, setShowPromo] = useState(false);

  // Track visit on mount
  useEffect(() => {
    fetch("/api/visit", { method: "POST" }).catch(e => console.error(e));
  }, []);

  // Editable State
  const [siteData, setSiteData] = useState<any>({
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

    isMenuVisible: true, // Menu visibility toggle
    categories: [
      {
        id: "bebidas",
        nameEs: "Bebidas",
        nameEn: "Beverages",
        items: [
          // Specials First
          { id: "be1", nameEs: "Batidas", nameEn: "Shakes", price: "$5.00", descEs: "", descEn: "" },
          { id: "be2", nameEs: "Morir Soñando", nameEn: "Dominican orange juice with milk", price: "$5.00", descEs: "Jugo de naranja con leche", descEn: "Dominican orange juice with milk" },
          { id: "be3", nameEs: "Jugos Naturales (16oz)", nameEn: "Natural Juices (16oz)", price: "$3.50", descEs: "100% fruta natural", descEn: "100% natural fruit" },

          // Hot Drinks (Simplified)
          { id: "bc1", nameEs: "Café", nameEn: "Coffee", price: "$2.24 - $4.22", descEs: "Variedad de tamaños (6oz, 8oz, 12oz)", descEn: "Variety of sizes (6oz, 8oz, 12oz)" },
          { id: "bc4", nameEs: "Chocolate", nameEn: "Hot Chocolate", price: "$2.75 - $3.75", descEs: "Regular (8oz) o Grande (12oz)", descEn: "Regular (8oz) or Large (12oz)" },

          // Cold Drinks
          { id: "bf1", nameEs: "Agua", nameEn: "Water", price: "$1.00", descEs: "", descEn: "" },
          { id: "bf2", nameEs: "Jugo Embotellado", nameEn: "Bottled Juice", price: "$2.00", descEs: "", descEn: "" },
          { id: "bf3", nameEs: "Refresco de Lata", nameEn: "Canned Soda", price: "$1.35", descEs: "", descEn: "" },
          { id: "bf4", nameEs: "Refresco de Botella", nameEn: "Bottled Soda", price: "$2.00", descEs: "", descEn: "" },
          { id: "bf5", nameEs: "Bebidas Energéticas", nameEn: "Energy Drinks", price: "$2.00", descEs: "", descEn: "" }
        ]
      },
      {
        id: "desayunos",
        nameEs: "Desayunos",
        nameEn: "Breakfast",
        items: [
          // Revoltillo
          { id: "r1", nameEs: "Revoltillo Regular", nameEn: "Scrambled Eggs Regular", price: "$5.25", descEs: "", descEn: "" },
          { id: "r2", nameEs: "Revoltillo con Queso Suizo", nameEn: "Scrambled eggs & Swiss Cheese", price: "$6.25", descEs: "", descEn: "" },
          { id: "r3", nameEs: "Revoltillo Con Todo", nameEn: "Scrambled eggs with everything", price: "$7.25", descEs: "", descEn: "" },

          // Toast
          { id: "t1", nameEs: "Tostada con Mantequilla", nameEn: "Toast with Butter", price: "$2.25", descEs: "", descEn: "" },
          { id: "t2", nameEs: "Tostada con Queso", nameEn: "Toast with Cheese", price: "$3.25", descEs: "", descEn: "" },

          // Cremas
          { id: "c1", nameEs: "Avena", nameEn: "Oatmeal", price: "$3.00", descEs: "Disponible hasta las 11am", descEn: "Available until 11am" },
          { id: "c2", nameEs: "Crema de Maiz", nameEn: "Cornmeal Porridge", price: "$3.00", descEs: "Disponible hasta las 11am", descEn: "Available until 11am" }
        ]
      },
      {
        id: "sandwiches",
        nameEs: "Sándwiches",
        nameEn: "Sandwiches",
        items: [
          // Popular Ones First? Or just mix them. Let's mix them but maybe prioritize popular ones at the top.
          { id: "sp3", nameEs: "Tripleta", nameEn: "Three Meat Sandwich", price: "$8.00", descEs: "Jamón, Cerdo, Bistec", descEn: "Ham, Pork, Steak" },
          { id: "sp4", nameEs: "Cubano", nameEn: "Cuban Sandwich", price: "$9.25", descEs: "", descEn: "" },
          { id: "sp1", nameEs: "Jamón, Queso y Huevo", nameEn: "Ham, Cheese & Egg Sandwich", price: "$6.25", descEs: "", descEn: "" },
          { id: "s1", nameEs: "Jamón y Queso", nameEn: "Ham & Cheese Sandwich", price: "$5.25", descEs: "", descEn: "" },
          { id: "s2", nameEs: "Jamón y Huevo", nameEn: "Ham & Egg Sandwich", price: "$6.00", descEs: "", descEn: "" },
          { id: "s3", nameEs: "Queso y Huevo", nameEn: "Cheese & Egg Sandwich", price: "$6.00", descEs: "", descEn: "" },
          { id: "sp2", nameEs: "Atún", nameEn: "Tuna Sandwich", price: "$6.95", descEs: "", descEn: "" },
          { id: "s8", nameEs: "Pastrami", nameEn: "Pastrami Sandwich", price: "$9.25", descEs: "", descEn: "" },
          { id: "s9", nameEs: "Bistec", nameEn: "Steak Sandwich", price: "$9.25", descEs: "", descEn: "" },
          { id: "s6", nameEs: "Pavo", nameEn: "Turkey Sandwich", price: "$6.95", descEs: "", descEn: "" },
          { id: "s7", nameEs: "Pernil", nameEn: "Roast Pork Sandwich", price: "$8.95", descEs: "", descEn: "" },
          { id: "s4", nameEs: "Mortadella y Queso", nameEn: "Mortadella & Cheese Sandwich", price: "$6.25", descEs: "", descEn: "" },
          { id: "s5", nameEs: "Salami y Queso", nameEn: "Salami & Cheese Sandwich", price: "$6.25", descEs: "", descEn: "" }
        ]
      },
      {
        id: "dulces",
        nameEs: "Dulces y Repostería",
        nameEn: "Sweets & Pastries",
        items: [
          // Popular First
          { id: "e1", nameEs: "Quesitos", nameEn: "Cream Cheese Pastry", price: "$2.00", descEs: "¡El favorito de la casa!", descEn: "House favorite!" },
          { id: "e5", nameEs: "Tres Leches", nameEn: "Three Milks Cake", price: "$3.50", descEs: "", descEn: "" },
          { id: "e3", nameEs: "Flan de Queso", nameEn: "Cheese Flan", price: "$3.50", descEs: "Cremoso y delicioso", descEn: "Creamy and delicious" },
          { id: "e4", nameEs: "Cheesecake", nameEn: "Cheesecake", price: "$3.50", descEs: "", descEn: "" },

          // Others
          { id: "e2", nameEs: "Bizcocho", nameEn: "Cake", price: "$3.00", descEs: "Vainilla o Chocolate", descEn: "Vanilla or Chocolate" },
          { id: "d3", nameEs: "Donas", nameEn: "Donuts", price: "$1.50 - $2.00", descEs: "Glasadas, chocolate, rellenas", descEn: "Glazed, chocolate, filled" },
          { id: "d2", nameEs: "Pastelillo Relleno (Tornillo)", nameEn: "Turnovers (Tornillo)", price: "$1.50", descEs: "Guayaba o Queso", descEn: "Guava or Cheese" },
          { id: "d1", nameEs: "Galletas", nameEn: "Cookies", price: "$0.50", descEs: "", descEn: "" },
          { id: "d4", nameEs: "Bizcocho de Maiz", nameEn: "Cornbread", price: "$1.50", descEs: "", descEn: "" },
          { id: "d5", nameEs: "Muffin", nameEn: "Muffin", price: "$2.00", descEs: "Arándanos, Maíz, Chocolate", descEn: "Blueberry, Corn, Chocolate" }
        ]
      }
    ]

  });

  /* 
     Handle Splash Complete:
     Only after the splash screen finishes do we check if we need to show the language selector.
     This prevents the popup from appearing *behind* the splash screen or too early.
  */
  const handleSplashComplete = () => {
    setShowSplash(false);
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (!savedLang) {
      // Small delay to make it feel natural after splash fade out
      setTimeout(() => setIsLangOpen(true), 300);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (savedLang) {
      setLang(savedLang);
    }
    // Note: We removed the automatic timeout here. It's now handled in handleSplashComplete.

    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          setSiteData((prev: any) => ({ ...prev, ...data }));
          if (data.promoActive) {
            setTimeout(() => setShowPromo(true), 2000);
          }
        }
      });
  }, []);

  const selectLanguage = (l: Language) => {
    setLang(l);
    localStorage.setItem("preferred_lang", l);
    setIsLangOpen(false);
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
      viewFullMenu: "Actualmente en Construcción",
      specialEventsBtn: "Eventos",
      specialEventsTitle: siteData.specialEventsTitleEs,
      specialEventsDesc: siteData.specialEventsDescEs,
      hoursTitle: "Horario",
      addressTitle: "Dirección",
      contactTitle: "Contacto",
      callNow: "Llamar ahora",
      locationTitle: "Ubicación",
      avgPriceLabel: `Precio promedio: ${siteData.avgPrice}`,
      closed: "Cerrado",
      langSelect: "Selecciona tu idioma",
      langDesc: "Bienvenido a Panadería La Francesa",
      footerDesc: siteData.footerDescEs,
      support: "Soporte Técnico",
      privacy: "Privacidad",
      terms: "Términos",
      daysMonSat: "Lun - Sáb",
      daySun: "Dom",
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
      viewFullMenu: "Currently in Development",
      specialEventsBtn: "Events",
      specialEventsTitle: siteData.specialEventsTitleEn,
      specialEventsDesc: siteData.specialEventsDescEn,
      hoursTitle: "Hours",
      addressTitle: "Address",
      contactTitle: "Contact",
      callNow: "Call now",
      locationTitle: "Location",
      avgPriceLabel: `Average price: ${siteData.avgPrice}`,
      closed: "Closed",
      langSelect: "Select your language",
      langDesc: "Welcome to Panadería La Francesa",
      footerDesc: siteData.footerDescEn,
      support: "Technical Support",
      privacy: "Privacy",
      terms: "Terms",
      daysMonSat: "Mon - Sat",
      daySun: "Sun",
      allCats: "All",
      exitBtn: "Exit"
    }
  }[lang || "es"];

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 overflow-x-hidden">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col bg-background">

        {/* Language Selector Dialog */}
        <Dialog open={isLangOpen} onOpenChange={setIsLangOpen}>
          <DialogContent className="sm:max-w-md bg-white border-primary z-[100]">
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

        <PromoPopup siteData={siteData} isOpen={showPromo} onClose={() => setShowPromo(false)} />

        {/* New Header */}
        <Header
          t={t}
          lang={lang || "es"}
          setLang={(l) => selectLanguage(l)} // Although dialog is used, passing this for completeness if needed later
          scrollTo={scrollTo}
          isLangOpen={isLangOpen}
          setIsLangOpen={setIsLangOpen}
        />

        {/* Hero Section */}
        <Hero siteData={siteData} t={t} lang={lang || "es"} scrollTo={scrollTo} />

        <main className="relative z-20 pb-32">

          {/* About Section - Overlapping */}
          <AboutSection t={t} />

          {/* Menu Section */}
          <MenuSection siteData={siteData} t={t} lang={lang || "es"} />

          {/* Info Grid Container */}
          <div className="container mx-auto px-4 mt-16 md:mt-24">
            <div className="flex flex-col gap-12 md:gap-16 max-w-[1200px] mx-auto w-full">

              {/* Contact Card */}
              <motion.div id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-full">
                <Card className="h-full border-none shadow-xl flex flex-col bg-white rounded-[2rem] overflow-hidden">
                  <div className="bg-primary/5 p-8 md:p-12 text-center pb-0 border-b border-primary/5">
                    <div className="inline-flex p-4 bg-white rounded-full shadow-sm mb-6 text-primary">
                      <Phone className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-primary mb-2">{t.contactTitle}</h2>
                    <p className="text-lg md:text-xl font-medium text-muted-foreground">{t.callNow}</p>
                  </div>
                  <CardContent className="flex-1 flex flex-col items-center justify-center gap-8 p-10 md:p-16 text-center">
                    <div className="space-y-4">
                      <a href={`tel:${(siteData.phone || "").replace(/\D/g, '')}`} className="block text-4xl md:text-6xl lg:text-7xl font-black text-foreground hover:text-primary transition-colors leading-none tracking-tight">
                        {siteData.phone}
                      </a>
                      <div className="pt-4">
                        <Button
                          size="lg"
                          className="text-2xl py-8 px-10 rounded-full font-black uppercase shadow-xl hover:scale-105 transition-all animate-pulse"
                          onClick={() => window.open(`tel:${(siteData.phone || "").replace(/\D/g, '')}`)}
                        >
                          <Phone className="mr-3 h-8 w-8" /> {t.callNow}
                        </Button>
                      </div>
                      <Badge variant="secondary" className="text-lg px-6 py-2 rounded-full font-bold mt-4">
                        {t.avgPriceLabel}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Special Events Section */}
              {siteData.showSpecialEvents && (
                <motion.div id="specials" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="w-full">
                  <Card className="bg-accent text-white overflow-hidden rounded-[2.5rem] shadow-2xl border-none relative">
                    {/* Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>

                    <div className="grid md:grid-cols-2">
                      <div className="p-10 md:p-16 flex flex-col justify-center relative z-10">
                        <Badge variant="secondary" className="w-fit mb-6 px-4 py-1 rounded-full font-black uppercase tracking-widest bg-white text-accent text-xs">¡PRÓXIMAMENTE!</Badge>
                        <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-none">{t.specialEventsTitle}</h2>
                        <p className="text-xl md:text-2xl font-bold opacity-90 leading-relaxed mb-10">
                          {t.specialEventsDesc}
                        </p>
                      </div>
                      <div className="h-[300px] md:h-auto overflow-hidden relative">
                        <img src={siteData.specialEventsImage} alt="Special Event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-accent/80 to-transparent md:bg-gradient-to-l"></div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

            </div>
          </div>


          {/* Location Section */}
          <LocationSection siteData={siteData} t={t} />

        </main>

        {/* Footer */}
        <footer className="bg-primary text-primary-foreground py-10 md:py-16 mt-auto relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-px bg-white/20"></div>

          <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
            <div className="mb-12">
              <div className="inline-block p-2 bg-white rounded-full mb-8 shadow-lg">
                <img src="/logo.jpg" alt="Panadería La Francesa" className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-primary" />
              </div>

              <h3 className="text-4xl md:text-6xl font-display font-black mb-2 uppercase tracking-tighter">Panadería La Francesa</h3>
              <p className="text-lg md:text-2xl text-primary-foreground/80 max-w-2xl mx-auto font-medium leading-relaxed">
                {t.footerDesc}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16 items-center">
              <div className="text-right hidden md:block">
                <span className="block text-sm font-bold opacity-60 uppercase tracking-widest mb-1">{t.daysMonSat}</span>
                <span className="text-xl font-black">{siteData.hoursWeekdays}</span>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-widest mb-2 opacity-80 font-bold">{t.support}</p>
                <p className="text-2xl font-black whitespace-nowrap">
                  939-630-0315
                </p>
              </div>
              <div className="text-left hidden md:block">
                <span className="block text-sm font-bold opacity-60 uppercase tracking-widest mb-1">{t.daySun}</span>
                <span className="text-xl font-black">{siteData.hoursWeekend}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm md:text-base font-bold opacity-60 uppercase tracking-wide">
              <span>© 2025 Panadería La Francesa</span>
              <a href="#" className="hover:opacity-100 transition-opacity">{t.privacy}</a>
              <a href="#" className="hover:opacity-100 transition-opacity">{t.terms}</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

