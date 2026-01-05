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
          { id: "bc1", nameEs: "Café", nameEn: "Coffee", price: "", descEs: "Variedad de tamaños (6oz, 8oz, 12oz)", descEn: "Variety of sizes (6oz, 8oz, 12oz)", popular: true },
          { id: "be1", nameEs: "Batidas", nameEn: "Shakes", price: "", descEs: "Fresa, Vainilla, Chocolate", descEn: "Strawberry, Vanilla, Chocolate", popular: true },
          { id: "be3", nameEs: "Jugos Naturales (16oz)", nameEn: "Natural Juices (16oz)", price: "", descEs: "100% fruta natural", descEn: "100% natural fruit", popular: true },
          { id: "bc4", nameEs: "Chocolate", nameEn: "Hot Chocolate", price: "", descEs: "Regular (8oz) o Grande (12oz)", descEn: "Regular (8oz) or Large (12oz)" },
          { id: "be2", nameEs: "Morir Soñando", nameEn: "Dominican orange juice with milk", price: "", descEs: "Jugo de naranja con leche", descEn: "Orange juice with milk" }
        ]
      },
      {
        id: "desayunos",
        nameEs: "Desayunos",
        nameEn: "Breakfast",
        items: [
          { id: "r1", nameEs: "Revoltillos", nameEn: "Scrambled Eggs", price: "", descEs: "Huevos, jamón, queso y tostadas", descEn: "Eggs, ham, cheese and toast", popular: true },
          { id: "t1", nameEs: "Tostadas", nameEn: "Toast", price: "", descEs: "Mantequilla, Mayonesa y Queso", descEn: "Butter, Mayo and Cheese" },
          { id: "c1", nameEs: "Cremas", nameEn: "Porridge", price: "", descEs: "Avenas, Farinas y Arina", descEn: "Oatmeal, Cream of Wheat, Cornmeal" }
        ]
      },
      {
        id: "sandwiches",
        nameEs: "Sándwiches",
        nameEn: "Sandwiches",
        items: [
          { id: "sp3", nameEs: "Tripleta", nameEn: "Three Meat Sandwich", price: "", descEs: "Jamón, Cerdo, Bistec", descEn: "Ham, Pork, Steak", popular: true },
          { id: "sp4", nameEs: "Cubano", nameEn: "Cuban Sandwich", price: "", descEs: "Pernil, jamón, queso suizo, pepinillo", descEn: "Roast pork, ham, swiss cheese, pickles", popular: true },
          { id: "sp1", nameEs: "Jamón, Queso y Huevo", nameEn: "Ham, Cheese & Egg Sandwich", price: "", descEs: "Completo y delicioso", descEn: "Complete and delicious", popular: true },
          { id: "s1", nameEs: "Jamón y Queso", nameEn: "Ham & Cheese Sandwich", price: "", descEs: "Clásico con queso americano", descEn: "Classic with American cheese" },
          { id: "s2", nameEs: "Jamón y Huevo", nameEn: "Ham & Egg Sandwich", price: "", descEs: "Con huevo frito o revuelto", descEn: "With fried or scrambled egg" },
          { id: "s3", nameEs: "Queso y Huevo", nameEn: "Cheese & Egg Sandwich", price: "", descEs: "Simple y rico", descEn: "Simple and delicious" },
          { id: "sp2", nameEs: "Atún", nameEn: "Tuna Sandwich", price: "", descEs: "Ensalada de atún fresca", descEn: "Fresh tuna salad" },
          { id: "s8", nameEs: "Pastrami", nameEn: "Pastrami Sandwich", price: "", descEs: "Con mostaza y queso", descEn: "With mustard and cheese" },
          { id: "s9", nameEs: "Bistec", nameEn: "Steak Sandwich", price: "", descEs: "Bistec encebollado", descEn: "Steak with onions" },
          { id: "s6", nameEs: "Pavo", nameEn: "Turkey Sandwich", price: "", descEs: "Jamón de pavo", descEn: "Turkey ham" },
          { id: "s7", nameEs: "Pernil", nameEn: "Roast Pork Sandwich", price: "", descEs: "Pernil asado en casa", descEn: "House roasted pork" },
          { id: "s4", nameEs: "Mortadella y Queso", nameEn: "Mortadella & Cheese Sandwich", price: "", descEs: "Mortadella de calidad", descEn: "Quality mortadella" },
          { id: "s5", nameEs: "Salami y Queso", nameEn: "Salami & Cheese Sandwich", price: "", descEs: "Salami genova", descEn: "Genoa Salami" }
        ]
      },
      {
        id: "dulces",
        nameEs: "Dulces y Repostería",
        nameEn: "Sweets & Pastries",
        items: [
          { id: "e1", nameEs: "Quesitos", nameEn: "Cream Cheese Pastry", price: "", descEs: "¡El favorito de la casa!", descEn: "House favorite!", popular: true },
          { id: "e5", nameEs: "Tres Leches", nameEn: "Three Milks Cake", price: "", descEs: "Bizcocho mojada en 3 leches", descEn: "Cake soaked in 3 milks", popular: true },
          { id: "e3", nameEs: "Flan de Queso", nameEn: "Cheese Flan", price: "", descEs: "Cremoso y delicioso", descEn: "Creamy and delicious", popular: true },
          { id: "e4", nameEs: "Cheesecake", nameEn: "Cheesecake", price: "", descEs: "Con topping de fresa o plain", descEn: "Strawberry topping or plain" },
          { id: "d3", nameEs: "Donas", nameEn: "Donuts", price: "", descEs: "Glasadas, chocolate, rellenas", descEn: "Glazed, chocolate, filled" },
          { id: "d5", nameEs: "Muffin", nameEn: "Muffin", price: "", descEs: "Arándanos, Maíz, Chocolate", descEn: "Blueberry, Corn, Chocolate" }
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
      viewFullMenu: "VER MENÚ",
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

