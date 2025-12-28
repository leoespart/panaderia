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
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

type Language = "es" | "en";

const translations = {
  es: {
    heroBadge: "Artesanal • Fresco • Tradicional",
    heroTitle: "Panaderia La Francesa",
    heroDesc: "Excelencia en panadería artesanal, desayunos gourmet y los sandwiches más icónicos de Santurce.",
    visitBtn: "Visítanos",
    menuBtn: "Explorar Menú",
    aboutTitle: "Nuestra Herencia",
    aboutDesc: "Ubicados en el corazón de Santurce, somos custodios de la tradición panadera. Cada pieza que sale de nuestro horno es el resultado de décadas de perfeccionamiento, utilizando ingredientes premium para garantizar una experiencia gastronómica inigualable.",
    menuTitle: "Selección de la Casa",
    breadTitle: "Pan Francés de Autor",
    breadDesc: "Nuestra receta secreta: corteza perfectamente caramelizada con un centro etéreo y suave.",
    croissantTitle: "Croissant de Mantequilla",
    croissantDesc: "Laminado a mano con mantequilla premium para lograr capas infinitas y crujientes.",
    coffeeTitle: "Café Especialidad",
    coffeeDesc: "Granos locales seleccionados, tostados a la perfección y servidos por expertos.",
    sandwichTitle: "Sandwiches de Autor",
    sandwichDesc: "Una curaduría de ingredientes frescos en nuestro pan artesanal. La verdadera esencia de Santurce.",
    viewFullMenu: "Carta Completa",
    hoursTitle: "Horarios de Atención",
    contactTitle: "Contacto Premium",
    callNow: "Contactar Ahora",
    locationTitle: "Nuestra Ubicación",
    avgPrice: "Cubierto promedio: $15 - $25",
    closed: "Cerrado",
    langSelect: "Seleccione su Idioma",
    langDesc: "Bienvenido a la experiencia La Francesa",
    footerDesc: "Definiendo el estándar de la panadería artesanal en Puerto Rico. Tradición que se siente en cada detalle."
  },
  en: {
    heroBadge: "Artisanal • Fresh • Traditional",
    heroTitle: "Panaderia La Francesa",
    heroDesc: "Excellence in artisanal baking, gourmet breakfasts, and the most iconic sandwiches in Santurce.",
    visitBtn: "Visit Us",
    menuBtn: "Explore Menu",
    aboutTitle: "Our Heritage",
    aboutDesc: "Located in the heart of Santurce, we are custodians of the baking tradition. Every piece from our oven is the result of decades of refinement, using premium ingredients to guarantee an unparalleled gastronomic experience.",
    menuTitle: "House Selection",
    breadTitle: "Signature French Bread",
    breadDesc: "Our secret recipe: perfectly caramelized crust with an ethereal, soft center.",
    croissantTitle: "Butter Croissant",
    croissantDesc: "Hand-laminated with premium butter to achieve infinite, crispy layers.",
    coffeeTitle: "Specialty Coffee",
    coffeeDesc: "Selected local beans, roasted to perfection and expertly served.",
    sandwichTitle: "Signature Sandwiches",
    sandwichDesc: "A curation of fresh ingredients on our artisanal bread. The true essence of Santurce.",
    viewFullMenu: "Full Menu",
    hoursTitle: "Business Hours",
    contactTitle: "Premium Contact",
    callNow: "Contact Now",
    locationTitle: "Our Location",
    avgPrice: "Average meal: $15 - $25",
    closed: "Closed",
    langSelect: "Select Your Language",
    langDesc: "Welcome to the La Francesa experience",
    footerDesc: "Defining the standard of artisanal baking in Puerto Rico. Tradition felt in every detail."
  }
};

export default function Home() {
  const [lang, setLang] = useState<Language | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.98]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.8]);

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
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-white">
      <Dialog open={isLangOpen} onOpenChange={setIsLangOpen}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-primary/20 shadow-2xl">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-6 bg-primary/5 p-4 rounded-full w-fit">
              <Globe className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <DialogTitle className="text-3xl font-display font-bold tracking-tight">{t.langSelect}</DialogTitle>
            <DialogDescription className="text-base">{t.langDesc}</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-6 pt-6">
            <Button variant="outline" size="lg" onClick={() => selectLanguage("es")} className="h-32 flex flex-col gap-3 hover:border-primary hover:bg-primary/5 border-2 transition-all duration-300">
              <span className="text-4xl">🇪🇸</span>
              <span className="font-bold tracking-widest uppercase text-xs">Español</span>
            </Button>
            <Button variant="outline" size="lg" onClick={() => selectLanguage("en")} className="h-32 flex flex-col gap-3 hover:border-primary hover:bg-primary/5 border-2 transition-all duration-300">
              <span className="text-4xl">🇺🇸</span>
              <span className="font-bold tracking-widest uppercase text-xs">English</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-primary/95 backdrop-blur-md text-primary-foreground border-b border-white/10">
        <div className="container mx-auto px-6 h-28 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <motion.div style={{ scale: logoScale }} className="relative">
              <motion.img 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={logoImg} 
                alt="Logo" 
                className="h-36 w-36 md:h-44 md:w-44 rounded-full border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] -mb-12 z-50 relative" 
              />
              <div className="absolute inset-0 rounded-full bg-black/5 blur-2xl -z-10 translate-y-4" />
            </motion.div>
            <div className="hidden md:flex flex-col">
              <span className="text-2xl font-display font-black tracking-tighter uppercase leading-none">Panaderia</span>
              <span className="text-2xl font-display font-black tracking-tighter uppercase leading-none opacity-80">La Francesa</span>
            </div>
          </div>
          <div className="flex items-center gap-12">
            <div className="hidden xl:flex gap-10 text-sm font-bold tracking-[0.2em] uppercase">
              <button onClick={() => scrollTo("about")} className="hover:text-white/60 transition-colors cursor-pointer">{t.aboutTitle}</button>
              <button onClick={() => scrollTo("menu")} className="hover:text-white/60 transition-colors cursor-pointer">Menu</button>
              <button onClick={() => scrollTo("location")} className="hover:text-white/60 transition-colors cursor-pointer">{t.locationTitle}</button>
            </div>
            <Button variant="secondary" size="lg" onClick={() => setIsLangOpen(true)} className="gap-3 font-black shadow-2xl rounded-none px-8 border-b-4 border-black/20 hover:border-b-0 hover:translate-y-1 transition-all">
              <Globe className="h-5 w-5" />
              {lang?.toUpperCase()}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-[90vh] flex items-center bg-primary text-primary-foreground pt-40 pb-24 px-6 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-fixed bg-center opacity-20 mix-blend-soft-light grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-transparent"></div>
        
        <div className="container mx-auto relative z-10 text-center max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Badge variant="secondary" className="mb-12 px-10 py-3 text-sm rounded-none shadow-2xl border-l-4 border-white bg-white/10 text-white backdrop-blur-md uppercase tracking-[0.4em] font-black">{t.heroBadge}</Badge>
            <h1 className="text-7xl md:text-11xl lg:text-13xl font-display font-black mb-10 leading-[0.85] tracking-[-0.05em] uppercase">
              {t.heroTitle}
            </h1>
            <p className="text-2xl md:text-3xl text-primary-foreground/80 mb-16 max-w-3xl mx-auto font-light leading-snug tracking-tight">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Button size="lg" variant="secondary" onClick={() => scrollTo("location")} className="gap-4 text-2xl h-20 px-16 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:scale-105 transition-all font-black rounded-none uppercase tracking-widest border-b-4 border-black/20">
                <MapPin className="h-8 w-8" /> {t.visitBtn}
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo("menu")} className="gap-4 text-2xl h-20 px-16 bg-transparent border-4 border-white text-white hover:bg-white hover:text-primary shadow-2xl hover:scale-105 transition-all font-black rounded-none uppercase tracking-widest">
                <MenuIcon className="h-8 w-8" /> {t.menuBtn}
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Cinematic Particles */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white rounded-full animate-ping" />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-white/20 rounded-full blur-xl" />
        </div>
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-32 space-y-40 -mt-20 relative z-20">
        
        {/* About Card - Swiss Style */}
        <motion.div
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <div className="flex items-center gap-6">
                <div className="w-20 h-2 bg-primary" />
                <h2 className="text-6xl font-display font-black uppercase tracking-tighter leading-none">{t.aboutTitle}</h2>
              </div>
              <p className="text-3xl text-muted-foreground leading-tight font-light tracking-tight">
                {t.aboutDesc}
              </p>
            </div>
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-primary translate-x-6 translate-y-6 -z-10" />
              <img 
                src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=2000&auto=format&fit=crop" 
                alt="Bakery Craft" 
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
          </div>
        </motion.div>

        {/* Menu Section - Minimalist Grid */}
        <motion.div 
          id="menu"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col items-start mb-24">
            <h2 className="text-8xl font-display font-black uppercase tracking-tighter leading-none mb-6">{t.menuTitle}</h2>
            <div className="w-40 h-4 bg-primary" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-1 px-1 bg-border/20">
            {[
              { title: t.breadTitle, desc: t.breadDesc, price: "$2.00", icon: Croissant },
              { title: t.croissantTitle, desc: t.croissantDesc, price: "$3.50", icon: Croissant },
              { title: t.coffeeTitle, desc: t.coffeeDesc, price: "$2.75", icon: Utensils },
              { title: t.sandwichTitle, desc: t.sandwichDesc, price: "Var.", icon: Sandwich }
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp} className="group bg-background p-12 hover:bg-primary transition-colors duration-500 cursor-default">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-primary/5 group-hover:bg-white/10 rounded-full transition-colors">
                    <item.icon className="h-10 w-10 text-primary group-hover:text-white" />
                  </div>
                  <span className="text-3xl font-display font-black group-hover:text-white transition-colors">{item.price}</span>
                </div>
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-xl text-muted-foreground group-hover:text-white/80 transition-colors font-light leading-snug">{item.desc}</p>
              </motion.div>
            ))}
            
            <motion.div variants={fadeInUp} className="md:col-span-2 group cursor-pointer overflow-hidden relative">
               <div className="bg-black text-white p-20 flex flex-col items-center justify-center text-center transition-all duration-700 group-hover:scale-[1.02]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2052&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10">
                  <p className="text-5xl font-display font-black uppercase tracking-tighter mb-6">{t.viewFullMenu}</p>
                  <ArrowRight className="h-12 w-12 mx-auto group-hover:translate-x-6 transition-transform" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Info Grid - Brutalist */}
        <div className="grid md:grid-cols-2 gap-2 max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="h-full bg-white p-16 border-l-[16px] border-primary shadow-2xl">
              <div className="flex items-center gap-6 mb-12">
                <Clock className="h-12 w-12 text-primary" />
                <h2 className="text-5xl font-display font-black uppercase tracking-tighter">{t.hoursTitle}</h2>
              </div>
              <div className="space-y-8">
                {[
                  ["Lun - Mar", "6:00 AM - 7:00 PM"],
                  ["Mié", "6:00 AM - 3:00 PM"],
                  ["Jue", t.closed, "destructive"],
                  ["Vie - Sáb", "6:00 AM - 7:00 PM"],
                  ["Dom", "6:00 AM - 3:00 PM"]
                ].map(([day, time, type], i) => (
                  <div key={i} className="flex justify-between items-center border-b-2 border-border/10 pb-4">
                    <span className="text-2xl font-bold uppercase tracking-tight">{day}</span>
                    <span className={`text-2xl font-black ${type === 'destructive' ? 'text-destructive' : 'text-muted-foreground'}`}>{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <div className="h-full bg-primary p-16 text-primary-foreground shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-6 mb-12">
                  <Phone className="h-12 w-12" />
                  <h2 className="text-5xl font-display font-black uppercase tracking-tighter">{t.contactTitle}</h2>
                </div>
                <p className="text-7xl font-display font-black tracking-tighter mb-8 leading-none">(939) 337-4777</p>
                <Badge variant="secondary" className="text-2xl px-10 py-4 rounded-none font-black uppercase tracking-[0.2em] bg-white text-primary">
                  {t.avgPrice}
                </Badge>
              </div>
              <Button size="lg" className="w-full text-3xl h-24 shadow-2xl group rounded-none font-black uppercase tracking-widest mt-20 bg-black hover:bg-black/80 text-white border-none">
                {t.callNow}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Location - Cinematic Map */}
        <motion.div 
          id="location"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-6xl mx-auto"
        >
          <div className="flex flex-col items-start mb-16">
            <h2 className="text-8xl font-display font-black uppercase tracking-tighter leading-none mb-6">{t.locationTitle}</h2>
            <div className="w-60 h-6 bg-primary" />
          </div>
          
          <div className="overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-black group relative">
            <div className="grid md:grid-cols-4">
              <div className="p-16 md:col-span-1 bg-white text-black flex flex-col justify-center relative z-10 border-r-8 border-primary">
                <h3 className="font-display font-black text-6xl mb-10 tracking-tighter uppercase leading-none">{t.visitBtn}</h3>
                <p className="text-3xl font-light mb-12 leading-tight tracking-tight">
                  1963 Av. Borinquen,<br/>
                  San Juan, PR 00915
                </p>
                <Button variant="default" className="w-full text-2xl h-20 font-black rounded-none shadow-2xl hover:bg-primary transition-all uppercase tracking-widest" size="lg">
                  DIRECCIONES
                </Button>
              </div>
              <div className="h-[600px] md:h-auto md:col-span-3 relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.1311026046416!2d-66.0592!3d18.4411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c03666f2f2c8f61%3A0x6a0c0e0c0c0c0c0c!2s1963%20Av.%20Borinquen%2C%20San%20Juan%2C%2000915%2C%20Puerto%20Rico!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-150 brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-out"
                ></iframe>
                <div className="absolute inset-0 bg-primary/5 pointer-events-none mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer - High Fashion Style */}
      <footer className="bg-black text-white py-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-end">
          <div className="space-y-12">
            <motion.img 
              whileHover={{ rotate: 5, scale: 1.05 }}
              src={logoImg} 
              alt="Logo" 
              className="h-48 w-48 rounded-full border-4 border-white shadow-2xl" 
            />
            <h3 className="text-8xl font-display font-black leading-none tracking-tighter uppercase">Panaderia<br/>La Francesa</h3>
          </div>
          <div className="space-y-16 text-right">
            <p className="text-3xl text-white/60 font-light leading-snug max-w-xl ml-auto">
              {t.footerDesc}
            </p>
            <div className="flex flex-wrap justify-end gap-12 text-xl font-black tracking-[0.4em] uppercase opacity-40">
              <span className="hover:text-primary transition-colors cursor-pointer">© 2024</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
