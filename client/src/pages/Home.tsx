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
    heroTitle: "Panaderia La Francesa",
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
    heroTitle: "Panaderia La Francesa",
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
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={logoImg} 
              alt="Logo" 
              className="h-28 w-28 rounded-full border-4 border-white shadow-xl -mb-4 z-50" 
            />
            <div className="hidden sm:flex items-center gap-2">
              <ChefHat className="h-6 w-6" />
              <span className="text-xl font-bold tracking-tight">Panaderia La Francesa</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex gap-6 text-sm font-medium">
              <button onClick={() => scrollTo("about")} className="hover:text-white/80 transition-colors cursor-pointer">{t.aboutTitle}</button>
              <button onClick={() => scrollTo("menu")} className="hover:text-white/80 transition-colors cursor-pointer">Menu</button>
              <button onClick={() => scrollTo("location")} className="hover:text-white/80 transition-colors cursor-pointer">{t.locationTitle}</button>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setIsLangOpen(true)} className="gap-2 font-bold shadow-lg">
              <Globe className="h-4 w-4" />
              {lang?.toUpperCase()}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="relative bg-primary text-primary-foreground py-24 md:py-40 px-4 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary"></div>
        
        <div className="container mx-auto relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-8 px-6 py-2 text-md rounded-full shadow-lg border-2 border-white/20 uppercase tracking-widest">{t.heroBadge}</Badge>
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none tracking-tighter">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" onClick={() => scrollTo("location")} className="gap-3 text-xl h-14 px-10 shadow-2xl hover:scale-105 transition-transform font-bold group">
                <MapPin className="h-6 w-6 group-hover:animate-bounce" /> {t.visitBtn}
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("menu")} className="gap-3 text-xl h-14 px-10 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary shadow-2xl hover:scale-105 transition-transform font-bold group">
                <MenuIcon className="h-6 w-6 group-hover:rotate-12 transition-transform" /> {t.menuBtn}
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated decorative elements */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-64 h-64 border-2 border-white/10 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }} 
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 -right-32 w-96 h-96 bg-yellow-400/20 rounded-full filter blur-3xl"
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
          <Card className="shadow-2xl border-none overflow-hidden max-w-4xl mx-auto transform hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute top-0 left-0 w-3 h-full bg-primary"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Croissant className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-primary">{t.aboutTitle}</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
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
          <div className="flex flex-col items-center mb-12 text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <Utensils className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-4">{t.menuTitle}</h2>
            <div className="w-24 h-1 bg-primary rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-8 border-l-transparent hover:border-l-primary group bg-white">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors text-2xl">
                    <span>{t.breadTitle}</span>
                    <Badge variant="secondary" className="text-lg px-3">$2.00</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">{t.breadDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-8 border-l-transparent hover:border-l-primary group bg-white">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors text-2xl">
                    <span>{t.croissantTitle}</span>
                    <Badge variant="secondary" className="text-lg px-3">$3.00</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">{t.croissantDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-8 border-l-transparent hover:border-l-primary group bg-white">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors text-2xl">
                    <span>{t.coffeeTitle}</span>
                    <Badge variant="secondary" className="text-lg px-3">$2.50</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">{t.coffeeDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-2xl transition-all border-l-8 border-l-primary bg-primary/5 group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center text-primary text-2xl">
                    <div className="flex items-center gap-3">
                      <Sandwich className="h-7 w-7" />
                      <span>{t.sandwichTitle}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground">{t.sandwichDesc}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} className="md:col-span-2">
               <Card className="bg-primary text-primary-foreground border-none flex items-center justify-center p-10 cursor-pointer hover:bg-primary/90 transition-all shadow-xl group overflow-hidden relative">
                <motion.div 
                  className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                  whileHover={{ scale: 1.5 }}
                />
                <div className="text-center relative z-10">
                  <p className="text-3xl font-bold mb-4 uppercase tracking-tighter">{t.viewFullMenu}</p>
                  <ArrowRight className="h-8 w-8 mx-auto group-hover:translate-x-4 transition-transform" />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Hours */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="h-full border-t-8 border-t-primary shadow-2xl bg-white">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold">{t.hoursTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-xl font-medium">Lun - Mar</span>
                  <span className="text-xl text-muted-foreground">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-xl font-medium">Mié</span>
                  <span className="text-xl text-muted-foreground">6:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-xl font-medium text-destructive">Jue</span>
                  <span className="text-xl text-destructive font-black uppercase">{t.closed}</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-xl font-medium">Vie - Sáb</span>
                  <span className="text-xl text-muted-foreground">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium">Dom</span>
                  <span className="text-xl text-muted-foreground">6:00 AM - 3:00 PM</span>
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
            <Card className="h-full border-t-8 border-t-primary shadow-2xl flex flex-col bg-white">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold">{t.contactTitle}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-10 pt-6">
                <div className="text-center md:text-left">
                  <p className="text-5xl font-black text-primary mb-6 tracking-tighter">(939) 337-4777</p>
                  <Badge variant="secondary" className="text-xl px-6 py-2 rounded-full font-bold">
                    {t.avgPrice}
                  </Badge>
                </div>
                <Button size="lg" className="w-full text-2xl h-20 shadow-2xl group rounded-2xl font-black uppercase tracking-tighter hover:scale-[1.02] transition-transform">
                  <Phone className="mr-3 h-8 w-8 group-hover:animate-pulse" /> {t.callNow}
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
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="p-3 bg-primary/10 rounded-full mb-4">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-5xl font-bold text-foreground mb-4">{t.locationTitle}</h2>
          </div>
          
          <Card className="overflow-hidden shadow-2xl border-none rounded-3xl group">
            <div className="grid md:grid-cols-3">
              <div className="p-10 md:col-span-1 bg-primary text-primary-foreground flex flex-col justify-center relative overflow-hidden">
                <motion.div 
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-10 -right-10 opacity-10"
                >
                  <MapPin className="h-40 w-40" />
                </motion.div>
                <div className="relative z-10">
                  <h3 className="font-black text-4xl mb-6 tracking-tighter uppercase">{t.visitBtn}</h3>
                  <p className="text-2xl text-primary-foreground/90 mb-10 font-light leading-tight">
                    1963 Av. Borinquen,<br/>
                    San Juan, PR 00915
                  </p>
                  <Button variant="secondary" className="w-full text-xl h-14 font-black rounded-xl shadow-xl hover:scale-105 transition-transform" size="lg">
                    CÓMO LLEGAR
                  </Button>
                </div>
              </div>
              <div className="h-[450px] md:h-auto md:col-span-2 relative overflow-hidden">
                {/* Real Interactive Map Iframe */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.1311026046416!2d-66.0592!3d18.4411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c03666f2f2c8f61%3A0x6a0c0e0c0c0c0c0c!2s1963%20Av.%20Borinquen%2C%20San%20Juan%2C%2000915%2C%20Puerto%20Rico!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-125 hover:grayscale-0 transition-all duration-1000"
                ></iframe>
                <div className="absolute inset-0 bg-primary/10 pointer-events-none group-hover:bg-transparent transition-colors duration-1000"></div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-20 mt-auto relative overflow-hidden">
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 border-4 border-white/5 rounded-full"
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <img src={logoImg} alt="Logo" className="h-24 w-24 mx-auto mb-8 rounded-full border-4 border-white shadow-2xl" />
          <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">Panaderia La Francesa</h3>
          <p className="text-xl text-primary-foreground/70 mb-12 max-w-xl mx-auto font-light leading-relaxed">
            {t.footerDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg font-bold opacity-60">
            <span className="hover:opacity-100 transition-opacity cursor-pointer tracking-widest">© 2024</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer tracking-widest uppercase">Privacidad</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer tracking-widest uppercase">Términos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
