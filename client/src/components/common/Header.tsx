import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
    t: any;
    lang: "es" | "en";
    setLang: (l: "es" | "en") => void;
    scrollTo: (id: string) => void;
    onOpenAdmin: () => void;
    isLangOpen: boolean;
    setIsLangOpen: (open: boolean) => void;
}

export function Header({ t, lang, setLang, scrollTo, onOpenAdmin, isLangOpen, setIsLangOpen }: HeaderProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
                }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo Area */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("top")}>
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="relative"
                    >
                        <img
                            src="/logo.jpg"
                            alt="Panadería La Francesa"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-md object-cover"
                        />
                    </motion.div>
                    <div className={`flex flex-col -space-y-1 transition-colors ${isScrolled ? "text-primary" : "text-white"}`}>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest opacity-90">Panadería</span>
                        <span className="text-lg md:text-xl font-display font-black leading-none">La Francesa</span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className={`hidden md:flex gap-8 font-bold uppercase tracking-wide text-sm ${isScrolled ? "text-muted-foreground" : "text-white/90"}`}>
                    <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors relative group">
                        {t.aboutTitle}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </button>
                    <button onClick={() => scrollTo("menu")} className="hover:text-primary transition-colors relative group">
                        Menu
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </button>
                    <button onClick={() => scrollTo("location")} className="hover:text-primary transition-colors relative group">
                        {t.locationTitle}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                    </button>
                </nav>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            onClick={() => scrollTo("contact")}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wide shadow-lg"
                        >
                            {lang === "es" ? "Ordena Ahora" : "Order Now"}
                        </Button>
                    </motion.div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLangOpen(true)}
                        className={`flex gap-2 font-bold uppercase ${isScrolled ? "text-foreground hover:bg-primary/5" : "text-white hover:bg-white/10 hover:text-white"}`}
                    >
                        <Globe className="h-4 w-4" />
                        {lang}
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onOpenAdmin}
                        className={`${isScrolled ? "text-foreground hover:bg-primary/5" : "text-white hover:bg-white/10 hover:text-white"}`}
                    >
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-2">
                    <Button
                        size="sm"
                        onClick={() => scrollTo("contact")}
                        className="bg-primary text-primary-foreground font-bold uppercase text-xs"
                    >
                        {lang === "es" ? "Ordena" : "Order"}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLangOpen(true)}
                        className={`font-bold uppercase ${isScrolled ? "text-foreground" : "text-white"}`}
                    >
                        {lang}
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className={isScrolled ? "text-foreground" : "text-white"}>
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] border-l-primary/20 bg-background">
                            <div className="flex flex-col gap-6 mt-10">
                                <button onClick={() => scrollTo("about")} className="text-2xl font-black uppercase text-left hover:text-primary transition-colors">
                                    {t.aboutTitle}
                                </button>
                                <button onClick={() => scrollTo("menu")} className="text-2xl font-black uppercase text-left hover:text-primary transition-colors">
                                    Menu
                                </button>
                                <button onClick={() => scrollTo("location")} className="text-2xl font-black uppercase text-left hover:text-primary transition-colors">
                                    {t.locationTitle}
                                </button>
                                <Button onClick={() => scrollTo("contact")} className="w-full text-xl font-black uppercase py-6">
                                    {lang === "es" ? "Ordena Ahora" : "Order Now"}
                                </Button>
                                <hr className="border-border my-2" />
                                <button onClick={onOpenAdmin} className="flex items-center gap-3 text-lg font-bold uppercase text-left text-muted-foreground hover:text-primary transition-colors">
                                    <Settings className="h-5 w-5" /> Admin
                                </button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.header>
    );
}
