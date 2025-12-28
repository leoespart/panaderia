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

export default function Home() {
  const [lang, setLang] = useState<Language | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPass, setAdminPass] = useState("");
  const [newReview, setNewReview] = useState({ name: "", comment: "" });
  
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  // Editable State
  const [siteData, setSiteData] = useState({
    // ... existing fields
    reviews: [
      { id: "r1", name: "Juan Pérez", comment: "El mejor pan de Barrio Obrero. El café siempre está en su punto.", rating: 5 },
      { id: "r2", name: "Maria Rodriguez", comment: "Los quesitos son adictivos. Servicio excelente.", rating: 5 }
    ],
    categories: [
      {
        id: "bebidas",
        nameEs: "Bebidas",
        nameEn: "Drinks",
        items: [
          { id: "b1", nameEs: "Café con Leche", nameEn: "Coffee with Milk", price: "2.50", descEs: "Café colado al momento con leche espumosa.", descEn: "Freshly brewed coffee with frothy milk.", image: "https://images.unsplash.com/photo-1541167760496-1628856ab752?q=80&w=2000&auto=format&fit=crop" },
          { id: "b2", nameEs: "Jugo Natural", nameEn: "Natural Juice", price: "3.50", descEs: "Naranja o Acerola.", descEn: "Orange or Acerola.", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=2000&auto=format&fit=crop" }
        ]
      },
      // ... more with images
    ]
  });

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

    const savedData = localStorage.getItem("bakery_site_data");
    if (savedData) {
      setSiteData(JSON.parse(savedData));
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

  const saveAdminData = () => {
    localStorage.setItem("bakery_site_data", JSON.stringify(siteData));
    setIsAdminOpen(false);
  };

  const handleAdminLogin = () => {
    if (adminPass === "Yadiel132") {
      setIsLoggedIn(true);
    }
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
      footerDesc: "Llevando el mejor pan, desayunos y almuerzos a tu mesa desde Barrio Obrero."
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
      footerDesc: "Bringing the best bread, breakfast and lunch to your table from Barrio Obrero."
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
            <DialogTitle className="flex items-center gap-2 font-black uppercase">
              <Settings className="h-5 w-5" /> Admin Panel
            </DialogTitle>
          </DialogHeader>
          {!isLoggedIn ? (
            <div className="space-y-4 py-4">
              <Input 
                type="password" 
                placeholder="Contraseña de administrador" 
                value={adminPass} 
                onChange={(e) => setAdminPass(e.target.value)}
              />
              <Button className="w-full uppercase font-black" onClick={handleAdminLogin}>Acceder</Button>
            </div>
          ) : (
            <Tabs defaultValue="general">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="general" className="uppercase font-black">General</TabsTrigger>
                <TabsTrigger value="menu" className="uppercase font-black">Menu</TabsTrigger>
              </TabsList>
          <TabsContent value="general" className="space-y-6 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-lg font-black uppercase opacity-70">Hero Badge (ES)</label>
                    <Input className="text-lg py-6" value={siteData.heroBadgeEs} onChange={(e) => setSiteData({...siteData, heroBadgeEs: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-lg font-black uppercase opacity-70">Hero Badge (EN)</label>
                    <Input className="text-lg py-6" value={siteData.heroBadgeEn} onChange={(e) => setSiteData({...siteData, heroBadgeEn: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-lg font-black uppercase opacity-70">Hero Title</label>
                  <Input className="text-lg py-6 uppercase font-black" value={siteData.heroTitle} onChange={(e) => setSiteData({...siteData, heroTitle: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-lg font-black uppercase opacity-70">Hero Description (ES)</label>
                  <Textarea className="text-lg min-h-[100px]" value={siteData.heroDescEs} onChange={(e) => setSiteData({...siteData, heroDescEs: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-lg font-black uppercase opacity-70">Hero Description (EN)</label>
                  <Textarea className="text-lg min-h-[100px]" value={siteData.heroDescEn} onChange={(e) => setSiteData({...siteData, heroDescEn: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-lg font-black uppercase opacity-70">Sobre Nosotros (ES)</label>
                  <Textarea className="text-lg min-h-[120px]" value={siteData.aboutDescEs} onChange={(e) => setSiteData({...siteData, aboutDescEs: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-lg font-black uppercase opacity-70">About Us (EN)</label>
                  <Textarea className="text-lg min-h-[120px]" value={siteData.aboutDescEn} onChange={(e) => setSiteData({...siteData, aboutDescEn: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-lg font-black uppercase opacity-70">Dirección</label>
                  <Input className="text-lg py-6" value={siteData.address} onChange={(e) => setSiteData({...siteData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-lg font-black uppercase opacity-70">Texto Botón Llegar (ES)</label>
                    <Input className="text-lg py-6" value={siteData.directionsBtnEs} onChange={(e) => setSiteData({...siteData, directionsBtnEs: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-lg font-black uppercase opacity-70">Texto Botón Directions (EN)</label>
                    <Input className="text-lg py-6" value={siteData.directionsBtnEn} onChange={(e) => setSiteData({...siteData, directionsBtnEn: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-lg font-black uppercase opacity-70">Avg Price</label>
                    <Input className="text-lg py-6" value={siteData.avgPrice} onChange={(e) => setSiteData({...siteData, avgPrice: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-lg font-black uppercase opacity-70">Phone</label>
                    <Input className="text-lg py-6 font-black" value={siteData.phone} onChange={(e) => setSiteData({...siteData, phone: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-6 pt-6 border-t-4 border-accent/20 bg-accent/5 p-6 rounded-3xl">
                  <h3 className="text-2xl font-black uppercase tracking-widest text-accent">Eventos Especiales</h3>
                  <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <input type="checkbox" className="w-6 h-6 accent-accent" checked={siteData.showSpecialEvents} onChange={(e) => setSiteData({...siteData, showSpecialEvents: e.target.checked})} id="showEvents" />
                    <label htmlFor="showEvents" className="text-lg font-black uppercase cursor-pointer">Mostrar Sección de Eventos</label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-sm font-black uppercase opacity-70">Título Eventos (ES)</label>
                      <Input className="text-lg py-6" value={siteData.specialEventsTitleEs} onChange={(e) => setSiteData({...siteData, specialEventsTitleEs: e.target.value})} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-black uppercase opacity-70">Title Events (EN)</label>
                      <Input className="text-lg py-6" value={siteData.specialEventsTitleEn} onChange={(e) => setSiteData({...siteData, specialEventsTitleEn: e.target.value})} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase opacity-70">Descripción Eventos (ES)</label>
                    <Textarea className="text-lg" value={siteData.specialEventsDescEs} onChange={(e) => setSiteData({...siteData, specialEventsDescEs: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase opacity-70">Description Events (EN)</label>
                    <Textarea className="text-lg" value={siteData.specialEventsDescEn} onChange={(e) => setSiteData({...siteData, specialEventsDescEn: e.target.value})} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black uppercase opacity-70">URL Imagen Evento</label>
                    <Input className="text-lg py-6" value={siteData.specialEventsImage} onChange={(e) => setSiteData({...siteData, specialEventsImage: e.target.value})} />
                  </div>
                </div>
                <Button className="w-full gap-2 uppercase font-black py-8 text-2xl shadow-xl hover:scale-[1.01] transition-transform" onClick={saveAdminData}><Save className="h-8 w-8"/> Guardar Cambios</Button>
              </TabsContent>
              <TabsContent value="menu" className="space-y-6 py-4">
                {siteData.categories.map((cat, catIdx) => (
                  <Card key={cat.id} className="p-6 border-2">
                    <div className="flex justify-between items-center mb-6">
                      <Input 
                        className="font-black w-1/2 uppercase text-xl" 
                        value={cat.nameEs} 
                        onChange={(e) => {
                          const newCats = [...siteData.categories];
                          newCats[catIdx].nameEs = e.target.value;
                          setSiteData({...siteData, categories: newCats});
                        }} 
                      />
                    </div>
                      <div className="space-y-6">
                        {cat.items.map((item, itemIdx) => (
                          <div key={item.id} className="grid grid-cols-1 gap-4 mb-6 p-6 border-2 rounded-3xl bg-muted/20 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase opacity-50">Nombre (ES)</label>
                                <Input value={item.nameEs} placeholder="Nombre ES" className="font-black text-xl py-6" onChange={(e) => {
                                  const newCats = [...siteData.categories];
                                  newCats[catIdx].items[itemIdx].nameEs = e.target.value;
                                  setSiteData({...siteData, categories: newCats});
                                }} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-xs font-bold uppercase opacity-50">Precio</label>
                                <Input value={item.price} placeholder="Precio" className="font-black text-xl py-6 text-primary" onChange={(e) => {
                                  const newCats = [...siteData.categories];
                                  newCats[catIdx].items[itemIdx].price = e.target.value;
                                  setSiteData({...siteData, categories: newCats});
                                }} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase opacity-50">Descripción (ES)</label>
                              <Textarea value={item.descEs} placeholder="Descripción ES" className="text-lg min-h-[80px]" onChange={(e) => {
                                const newCats = [...siteData.categories];
                                newCats[catIdx].items[itemIdx].descEs = e.target.value;
                                setSiteData({...siteData, categories: newCats});
                              }} />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold uppercase opacity-50">URL Imagen Producto</label>
                              <Input value={item.image} placeholder="https://..." className="text-sm font-mono py-4" onChange={(e) => {
                                const newCats = [...siteData.categories];
                                newCats[catIdx].items[itemIdx].image = e.target.value;
                                setSiteData({...siteData, categories: newCats});
                              }} />
                            </div>
                            <div className="flex justify-end pt-2">
                              <Button variant="destructive" size="lg" className="gap-2 px-8 uppercase font-black" onClick={() => {
                                const newCats = [...siteData.categories];
                                newCats[catIdx].items.splice(itemIdx, 1);
                                setSiteData({...siteData, categories: newCats});
                              }}><Trash2 className="h-5 w-5"/> Eliminar Item</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    <Button variant="outline" size="sm" className="w-full gap-2 uppercase font-bold mt-4 py-6" onClick={() => {
                      const newCats = [...siteData.categories];
                      newCats[catIdx].items.push({ id: Date.now().toString(), nameEs: "Nuevo Item", nameEn: "New Item", price: "0.00", descEs: "", descEn: "" });
                      setSiteData({...siteData, categories: newCats});
                    }}><Plus className="h-5 w-5"/> Add Item</Button>
                  </Card>
                ))}
                <Button className="w-full gap-2 uppercase font-black py-6 mt-6" onClick={saveAdminData}><Save className="h-5 w-5"/> Save Changes</Button>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.1, opacity: 1 }}
              src={logoImg} 
              alt="Logo" 
              className="h-48 w-48 rounded-full border-4 border-white shadow-2xl -mb-16 z-50 transform hover:scale-110 transition-transform duration-500 origin-top" 
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
              <Button variant="secondary" size="sm" onClick={() => setIsLangOpen(true)} className="gap-2 font-black shadow-lg px-6">
                <Globe className="h-4 w-4" />
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
        
        <div className="container mx-auto relative z-10 text-center max-w-5xl pt-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-6 md:px-10 py-3 md:py-4 text-sm md:text-xl rounded-full shadow-lg border-2 border-white/20 uppercase font-black">{t.heroBadge}</Badge>
            <div className="flex flex-col items-center gap-2 md:gap-4 mb-8">
              <h1 className="text-5xl md:text-9xl lg:text-[11rem] font-black leading-none tracking-tight drop-shadow-2xl uppercase">
                Panaderia
              </h1>
              <h1 className="text-4xl md:text-8xl lg:text-[9rem] font-black leading-none tracking-tight drop-shadow-2xl uppercase opacity-90 -mt-2 md:-mt-4">
                La Francesa
              </h1>
            </div>
            <p className="text-lg md:text-3xl text-primary-foreground/90 mb-10 max-w-4xl mx-auto font-bold leading-relaxed uppercase opacity-80">
              {t.heroDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center items-center">
              <Button size="lg" variant="secondary" onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteData.address)}`, '_blank')} className="w-full sm:w-auto gap-3 md:gap-5 text-lg md:text-2xl h-16 md:h-20 px-8 md:px-16 shadow-2xl hover:scale-105 transition-transform font-black uppercase group rounded-2xl md:rounded-3xl">
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
      <main className="container mx-auto px-4 py-8 md:py-16 space-y-16 md:space-y-32 -mt-10 relative z-20">
        {/* About Card */}
        <motion.div id="about" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
          <Card className="shadow-2xl border-none overflow-hidden max-w-5xl mx-auto transform hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute top-0 left-0 w-2 md:w-4 h-full bg-primary"></div>
            <CardHeader className="pb-4 md:pb-6 p-6 md:p-10">
              <div className="flex items-center gap-4 md:gap-6 mb-2 md:mb-4">
                <div className="p-3 md:p-5 bg-primary/10 rounded-2xl md:rounded-3xl">
                  <Croissant className="h-8 w-8 md:h-12 md:w-12 text-primary" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-primary uppercase">{t.aboutTitle}</h2>
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
            <h2 className="text-4xl md:text-7xl font-black text-foreground mb-4 md:mb-8 uppercase">{t.menuTitle}</h2>
            <div className="w-20 md:w-40 h-2 md:h-3 bg-primary rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            {siteData.categories.map((cat) => (
              <React.Fragment key={cat.id}>
                {cat.items.map((item) => (
                  <motion.div key={item.id} variants={fadeInUp}>
                    <Card className="h-full hover:shadow-2xl transition-all border-l-[8px] md:border-l-[16px] border-l-transparent hover:border-l-primary group bg-white p-4">
                      <CardHeader className="p-4 md:p-6">
                        <CardTitle className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 group-hover:text-primary transition-colors text-2xl md:text-4xl font-black uppercase">
                          <span>{lang === "es" ? item.nameEs : item.nameEn}</span>
                          <Badge variant="secondary" className="text-lg md:text-2xl px-4 md:px-5 py-1 md:py-2 font-black">${item.price}</Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 md:px-6">
                        <p className="text-lg md:text-2xl text-muted-foreground font-bold">
                          {lang === "es" ? item.descEs : item.descEn}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </React.Fragment>
            ))}
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
            <div className="sticky top-0 z-30 bg-primary text-white p-8 md:p-12 text-center">
              <h2 className="text-5xl md:text-7xl font-black uppercase mb-4">{t.menuTitle}</h2>
              <p className="text-xl opacity-80 font-bold uppercase tracking-widest">Panaderia La Francesa</p>
            </div>

            <div className="p-6 md:p-12">
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Button 
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="px-8 py-6 text-xl font-black uppercase rounded-2xl h-auto"
                >
                  TODOS
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
                  <span className="text-xl md:text-3xl font-black uppercase whitespace-nowrap">Lun - Sáb</span>
                  <span className="text-xl md:text-3xl text-muted-foreground font-bold whitespace-nowrap">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                  <span className="text-xl md:text-3xl font-black uppercase whitespace-nowrap">Dom</span>
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
                  <a href={`tel:${siteData.phone.replace(/\D/g,'')}`}>
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
            <h2 className="text-4xl md:text-7xl font-black text-foreground mb-4 md:mb-8 uppercase">{t.locationTitle}</h2>
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="max-w-6xl mx-auto py-20 px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase mb-6">Opiniones de Clientes</h2>
            <div className="w-40 h-3 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {siteData.reviews.map((rev) => (
              <Card key={rev.id} className="p-8 rounded-[2.5rem] shadow-xl border-none bg-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-[4rem] group-hover:bg-primary/10 transition-colors"></div>
                <div className="flex gap-1 mb-6 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Heart key={i} className="h-6 w-6 fill-current" />
                  ))}
                </div>
                <p className="text-2xl font-bold italic mb-8 text-muted-foreground">"{rev.comment}"</p>
                <p className="text-xl font-black uppercase tracking-widest text-primary">— {rev.name}</p>
              </Card>
            ))}
          </div>
          <Card className="max-w-2xl mx-auto p-10 rounded-[3rem] shadow-2xl border-none">
            <h3 className="text-3xl font-black uppercase mb-8 text-center">Déjanos tu opinión</h3>
            <div className="space-y-6">
              <Input 
                placeholder="Tu nombre" 
                className="text-lg py-6 px-6 rounded-2xl" 
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              />
              <Textarea 
                placeholder="¿Qué te pareció nuestro sabor?" 
                className="text-lg min-h-[120px] px-6 py-4 rounded-2xl" 
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              />
              <Button 
                className="w-full py-8 text-2xl font-black uppercase rounded-3xl shadow-lg hover:scale-[1.02] transition-transform"
                onClick={() => {
                  if (newReview.name && newReview.comment) {
                    const rev: Review = {
                      id: Date.now().toString(),
                      name: newReview.name,
                      comment: newReview.comment,
                      rating: 5
                    };
                    setSiteData({...siteData, reviews: [rev, ...siteData.reviews]});
                    setNewReview({ name: "", comment: "" });
                  }
                }}
              >
                Enviar Reseña
              </Button>
            </div>
          </Card>
        </motion.div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16 md:py-32 mt-auto relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <img src={logoImg} alt="Logo" className="h-32 w-32 md:h-40 md:w-40 mx-auto mb-8 md:mb-12 rounded-full border-4 border-white shadow-2xl" />
          <div className="mb-10 md:mb-16">
            <h3 className="text-5xl md:text-7xl font-black mb-4 md:mb-6 uppercase">Panaderia</h3>
            <h3 className="text-4xl md:text-6xl font-black mb-4 md:mb-6 uppercase opacity-80">La Francesa</h3>
          </div>
          <p className="text-xl md:text-3xl text-primary-foreground/70 mb-12 md:mb-20 max-w-3xl mx-auto font-bold uppercase">
            {t.footerDesc}
          </p>
          <div className="bg-white/10 p-8 md:p-12 rounded-2xl md:rounded-[3rem] inline-block mb-16 md:mb-24 border-2 border-white/5">
            <p className="text-sm md:text-lg uppercase tracking-widest mb-2 md:mb-4 opacity-60 font-black">Soporte Técnico</p>
            <p className="text-3xl md:text-5xl font-black flex items-center justify-center gap-4 md:gap-6">
              <Phone className="h-8 w-8 md:h-10 md:w-10" /> 939-630-0315
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-lg md:text-2xl font-black opacity-60 uppercase">
            <span className="hover:opacity-100 transition-opacity cursor-pointer">© 2024</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer">Privacidad</span>
            <span className="hover:opacity-100 transition-opacity cursor-pointer">Términos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
