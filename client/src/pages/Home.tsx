import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Clock, Croissant, ChefHat, ArrowRight, Menu as MenuIcon, Utensils, Globe, Sandwich } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import logoImg from "@assets/logo_1766883612871.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
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

const translations = {
  es: {
    heroBadge: "Pan fresco & café",
    heroTitle: "Pan fresco todos los días",
    heroDesc: "Café, desayunos, sandwiches y dulces en Santurce. El sabor de la tradición en cada bocado.",
    visitBtn: "Visítanos",
    menuBtn: "Ver Menú",
    aboutTitle: "Sobre Nosotros",
    aboutDesc: "Somos una panadería y cafetería en Santurce, reconocida por nuestro pan fresco, postres artesanales y un servicio familiar. Desde nuestros inicios, nos hemos dedicado a traer el mejor sabor a tu mesa con ingredientes de primera calidad y mucho amor.",
    menuTitle: "Nuestro Menú",
    breadTitle: "Pan Francés",
    breadDesc: "Recién horneado, crujiente por fuera y suave por dentro.",
    croissantTitle: "Croissant",
    croissantDesc: "Mantequilloso y hojaldrado, perfecto para el desayuno.",
    coffeeTitle: "Café con Leche",
    coffeeDesc: "Café colado al momento con leche espumosa.",
    sandwichTitle: "Sandwiches Especiales",
    sandwichDesc: "Contamos con una gran variedad de sandwiches preparados con nuestro pan recién horneado.",
    viewFullMenu: "Ver menú completo",
    hoursTitle: "Horarios",
    contactTitle: "Contacto",
    callNow: "Llamar ahora",
    locationTitle: "Ubicación",
    avgPrice: "Precio promedio: $10 - $20",
    closed: "Cerrado",
    langSelect: "Selecciona tu idioma",
    langDesc: "Bienvenido a Panadería La Francesa",
    footerDesc: "Llevando el mejor pan a tu mesa desde Santurce. Calidad, frescura y tradición en cada producto."
  },
  en: {
    heroBadge: "Fresh bread & coffee",
    heroTitle: "Fresh bread every day",
    heroDesc: "Coffee, breakfast, sandwiches and sweets in Santurce. The taste of tradition in every bite.",
    visitBtn: "Visit Us",
    menuBtn: "View Menu",
    aboutTitle: "About Us",
    aboutDesc: "We are a bakery and cafeteria in Santurce, recognized for our fresh bread, artisanal desserts and family service. Since our beginnings, we have been dedicated to bringing the best flavor to your table with top quality ingredients and lots of love.",
    menuTitle: "Our Menu",
    breadTitle: "French Bread",
    breadDesc: "Freshly baked, crispy on the outside and soft on the inside.",
    croissantTitle: "Croissant",
    croissantDesc: "Buttery and flaky, perfect for breakfast.",
    coffeeTitle: "Coffee with Milk",
    coffeeDesc: "Freshly brewed coffee with frothy milk.",
    sandwichTitle: "Special Sandwiches",
    sandwichDesc: "We have a wide variety of sandwiches prepared with our freshly baked bread.",
    viewFullMenu: "View full menu",
    hoursTitle: "Hours",
    contactTitle: "Contact",
    callNow: "Call now",
    locationTitle: "Location",
    avgPrice: "Average price: $10 - $20",
    closed: "Closed",
    langSelect: "Select your language",
    langDesc: "Welcome to Panadería La Francesa",
    footerDesc: "Bringing the best bread to your table from Santurce. Quality, freshness and tradition in every product."
  }
};

export default function Home() {
  const [lang, setLang] = useState<Language | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_lang") as Language;
    if (savedLang) {
      setLang(savedLang);
    } else {
      setIsLangOpen(true);
    }
  }, []);

  const selectLanguage = (l: Language) => {
    setLang(l);
    localStorage.setItem("preferred_lang", l);
    setIsLangOpen(false);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const t = translations[lang || "es"];

  return (
    <div className="min-h-screen flex flex-col">
      <Dialog open={isLangOpen} onOpenChange={setIsLangOpen}>
        <DialogContent className="sm:max-w-md bg-background border-primary">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full w-fit">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">{t.langSelect}</DialogTitle>
            <DialogDescription>{t.langDesc}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 pt-4">
            <Button variant="outline" size="lg" onClick={() => selectLanguage("es")} className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
              <span className="text-2xl">🇪🇸</span>
              Español
            </Button>
            <Button variant="outline" size="lg" onClick={() => selectLanguage("en")} className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
              <span className="text-2xl">🇺🇸</span>
              English
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Panaderia La Francesa</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <button onClick={() => scrollTo("about")} className="hover:text-white/80 transition-colors cursor-pointer">{t.aboutTitle}</button>
            <button onClick={() => scrollTo("menu")} className="hover:text-white/80 transition-colors cursor-pointer">Menu</button>
            <button onClick={() => scrollTo("location")} className="hover:text-white/80 transition-colors cursor-pointer">{t.locationTitle}</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <img src={logoImg} alt="Logo" className="h-12 w-12 rounded-full border-2 border-white shadow-sm" />
            </div>
            <Button variant="secondary" size="sm" onClick={() => setIsLangOpen(true)} className="gap-2">
              <Globe className="h-4 w-4" />
              {lang?.toUpperCase()}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="relative bg-primary text-primary-foreground py-24 md:py-32 px-4 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary"></div>
        
        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm rounded-full">{t.heroBadge}</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {t.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" onClick={() => scrollTo("location")} className="gap-2 text-lg h-12 px-8 shadow-lg hover:scale-105 transition-transform">
                <MapPin className="h-5 w-5" /> {t.visitBtn}
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("menu")} className="gap-2 text-lg h-12 px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary shadow-lg hover:scale-105 transition-transform">
                <MenuIcon className="h-5 w-5" /> {t.menuBtn}
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated decorative circles */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-400 rounded-full mix-blend-overlay filter blur-3xl"
        />
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-24 -mt-10 relative z-20">
        
        {/* About Card */}
        <motion.div
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Card className="shadow-xl border-none overflow-hidden max-w-4xl mx-auto transform hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Croissant className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">{t.aboutTitle}</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t.aboutDesc}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu Section */}
        <motion.div 
          id="menu"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">{t.menuTitle}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-transparent hover:border-l-primary group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors">
                    <span>{t.breadTitle}</span>
                    <Badge variant="secondary">$2.00</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t.breadDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-transparent hover:border-l-primary group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors">
                    <span>{t.croissantTitle}</span>
                    <Badge variant="secondary">$3.00</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t.croissantDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-transparent hover:border-l-primary group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors">
                    <span>{t.coffeeTitle}</span>
                    <Badge variant="secondary">$2.50</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t.coffeeDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-transparent border-l-primary bg-primary/5 group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-primary">
                    <div className="flex items-center gap-2">
                      <Sandwich className="h-5 w-5" />
                      <span>{t.sandwichTitle}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{t.sandwichDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:col-span-2">
               <Card className="bg-primary/5 border-dashed border-2 border-primary/20 flex items-center justify-center p-6 cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="text-center">
                  <p className="font-bold text-primary mb-2">{t.viewFullMenu}</p>
                  <ArrowRight className="h-5 w-5 text-primary mx-auto" />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Hours */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="h-full border-t-4 border-t-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <CardTitle>{t.hoursTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Lun - Mar</span>
                  <span className="text-muted-foreground">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Mié</span>
                  <span className="text-muted-foreground">6:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-destructive">Jue</span>
                  <span className="text-destructive font-bold">{t.closed}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Vie - Sáb</span>
                  <span className="text-muted-foreground">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dom</span>
                  <span className="text-muted-foreground">6:00 AM - 3:00 PM</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="h-full border-t-4 border-t-primary shadow-lg flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <CardTitle>{t.contactTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-3xl font-bold text-foreground mb-2">(939) 337-4777</p>
                  <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                    {t.avgPrice}
                  </div>
                </div>
                <Button size="lg" className="w-full text-lg shadow-lg group">
                  <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" /> {t.callNow}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Location */}
        <motion.div 
          id="location"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">{t.locationTitle}</h2>
          </div>
          
          <Card className="overflow-hidden shadow-xl border-none">
            <div className="grid md:grid-cols-3">
              <div className="p-6 md:col-span-1 bg-primary text-primary-foreground flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-2">{t.visitBtn}</h3>
                <p className="text-primary-foreground/90 mb-4">
                  1963 Av. Borinquen,<br/>
                  San Juan, PR 00915
                </p>
                <Button variant="secondary" className="w-full" size="sm">
                  Cómo llegar
                </Button>
              </div>
              <div className="h-64 md:h-auto md:col-span-2 bg-muted relative group overflow-hidden">
                {/* Simulated Map */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-3 rounded-full shadow-xl animate-bounce">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <ChefHat className="h-8 w-8 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">Panaderia La Francesa</h3>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
            {t.footerDesc}
          </p>
          <div className="flex justify-center gap-4 text-sm opacity-60">
            <span>© 2024 Panaderia La Francesa</span>
            <span>•</span>
            <span>Privacidad</span>
            <span>•</span>
            <span>Términos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
