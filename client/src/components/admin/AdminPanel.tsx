import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, ChefHat, Sparkles, Upload, X, LogOut, Save, Plus, Trash2, Heart, Minus, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { SiteData } from "@/types";
import { useLocation } from "wouter";

interface AdminPanelProps {
    siteData: any;
    setSiteData: (data: any) => void;
}

export function AdminPanel({ siteData, setSiteData }: AdminPanelProps) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminPass, setAdminPass] = useState("");
    const [loginError, setLoginError] = useState("");
    const [currentUser, setCurrentUser] = useState<string | null>(null);
    const [showGreeting, setShowGreeting] = useState(false);
    const [logs, setLogs] = useState<{ timestamp: string, device: string, action: string }[]>([]);
    const [collapsedCats, setCollapsedCats] = useState<Record<string, boolean>>({});
    const [, setLocation] = useLocation();

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Buenos días";
        if (hour < 18) return "Buenas tardes";
        return "Buenas noches";
    };

    const handleAdminLogin = async () => {
        try {
            setLoginError("");
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: adminPass })
            });

            if (res.ok) {
                const data = await res.json();
                setCurrentUser(data.username);
                setShowGreeting(true);
                setTimeout(() => {
                    setIsLoggedIn(true);
                    setShowGreeting(false);
                }, 3000);
            } else {
                setLoginError("Contraseña incorrecta");
            }
        } catch (e) {
            setLoginError("Error de conexión");
        }
    };

    const saveAdminData = async (actionDesc = "Actualizó configuraciones") => {
        try {
            await fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    settings: siteData,
                    username: currentUser,
                    action: actionDesc
                })
            });
            // Show success toast or feedback here if needed
        } catch (e) {
            console.error("Failed to save", e);
        }
    };

    const fetchLogs = async () => {
        const res = await fetch("/api/logs");
        const data = await res.json();
        setLogs(data);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, catIdx: number, itemIdx: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                const newCats = [...siteData.categories];
                newCats[catIdx].items[itemIdx].image = data.url;
                setSiteData({ ...siteData, categories: newCats });
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const toggleCat = (catId: string) => {
        setCollapsedCats(prev => ({ ...prev, [catId]: !prev[catId] }));
    };

    return (
        <Card className="min-h-[80vh] w-full max-w-5xl mx-auto shadow-2xl overflow-hidden bg-white/95 backdrop-blur-sm border-0">
            <div className="p-6 md:p-8 bg-neutral-900 text-white flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" onClick={() => setLocation("/")} className="text-white hover:bg-white/20 -ml-2">
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                        <h1 className="font-black uppercase text-2xl md:text-3xl flex items-center gap-2">
                            <Settings className="h-6 w-6 md:h-8 md:w-8" /> Panel de Administración
                        </h1>
                    </div>
                    {isLoggedIn && currentUser && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-primary text-sm font-bold ml-10"
                        >
                            {getGreeting()}, {currentUser}
                        </motion.div>
                    )}
                </div>
            </div>

            <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                    {showGreeting ? (
                        <motion.div
                            key="greeting-screen"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col items-center justify-center py-20 space-y-8"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="bg-primary/5 p-10 rounded-full mb-6 relative"
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                >
                                    <ChefHat className="h-32 w-32 text-primary drop-shadow-2xl" />
                                </motion.div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="absolute -top-2 -right-2"
                                >
                                    <Sparkles className="h-12 w-12 text-yellow-400 animate-pulse" />
                                </motion.div>
                            </motion.div>

                            <div className="text-center space-y-4">
                                <motion.h2
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="text-7xl md:text-[8rem] font-black text-primary uppercase tracking-tighter leading-none"
                                >
                                    {getGreeting()}
                                </motion.h2>
                                <motion.p
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                    className="text-5xl md:text-7xl font-black text-muted-foreground uppercase flex items-center justify-center gap-4"
                                >
                                    <span className="text-primary">👋</span> {currentUser}
                                </motion.p>
                            </div>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 200 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full mt-8"
                            />
                        </motion.div>
                    ) : !isLoggedIn ? (
                        <motion.div
                            key="login"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                            className="space-y-6 py-6"
                        >
                            <div className="space-y-4">
                                {/* Hidden username field for accessibility/password managers */}
                                <Input
                                    type="text"
                                    name="username"
                                    autoComplete="username"
                                    className="hidden"
                                    aria-hidden="true"
                                    defaultValue={currentUser || "admin"}
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Contraseña de administrador"
                                    value={adminPass}
                                    onChange={(e) => {
                                        setAdminPass(e.target.value);
                                        if (loginError) setLoginError("");
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleAdminLogin();
                                    }}
                                    className={`text-lg py-6 ${loginError ? "border-destructive ring-destructive" : ""}`}
                                />
                                {loginError && (
                                    <motion.p
                                        initial={{ x: -10 }}
                                        animate={{ x: [0, -10, 10, -10, 10, 0] }}
                                        className="text-destructive font-bold text-sm uppercase px-2"
                                    >
                                        {loginError}
                                    </motion.p>
                                )}
                            </div>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    className="w-full uppercase font-black text-xl py-6 shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/20"
                                    onClick={handleAdminLogin}
                                >
                                    Acceder
                                </Button>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="admin-tabs"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <Tabs defaultValue="general" className="w-full">
                                <TabsList className="mb-6 p-1 bg-muted rounded-lg w-full flex">
                                    {["general", "menu", "promo", "logs"]
                                        .filter(tab => tab !== 'logs' || currentUser === 'Yadiel')
                                        .map((tab) => (
                                            <TabsTrigger
                                                key={tab}
                                                value={tab}
                                                onClick={tab === 'logs' ? fetchLogs : undefined}
                                                className="flex-1 text-sm font-medium py-2.5 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md transition-all capitalize"
                                            >
                                                {tab === 'menu' ? 'Menú' : tab === 'promo' ? 'Promociones' : tab}
                                            </TabsTrigger>
                                        ))}
                                </TabsList>

                                <TabsContent value="general" className="space-y-8">
                                    <div className="grid gap-6">
                                        {/* Hero Badge */}
                                        <motion.div whileHover={{ scale: 1.01, translateY: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Card className="p-6 transition-shadow hover:shadow-lg">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Hero Badge (ES)</label>
                                                        <Input
                                                            className="font-bold text-lg hover:border-primary transition-colors"
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
                                        </motion.div>

                                        {/* Hero Title */}
                                        <motion.div whileHover={{ scale: 1.01, translateY: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Card className="p-6 transition-shadow hover:shadow-lg">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-black uppercase text-muted-foreground">Hero Title</label>
                                                    <Input
                                                        className="font-black text-xl uppercase hover:border-primary transition-colors"
                                                        value={siteData.heroTitle}
                                                        onChange={(e) => setSiteData({ ...siteData, heroTitle: e.target.value })}
                                                    />
                                                </div>
                                            </Card>
                                        </motion.div>

                                        {/* Hero Description */}
                                        <motion.div whileHover={{ scale: 1.01, translateY: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Card className="p-6 transition-shadow hover:shadow-lg">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Hero Description (ES)</label>
                                                        <Textarea
                                                            className="text-lg min-h-[100px] hover:border-primary transition-colors"
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
                                        </motion.div>

                                        {/* About Us */}
                                        <motion.div whileHover={{ scale: 1.01, translateY: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Card className="p-6 transition-shadow hover:shadow-lg border-l-4 border-l-primary/20">
                                                <h3 className="text-xl font-black uppercase mb-4 text-primary">Sobre Nosotros</h3>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Descripción (ES)</label>
                                                        <Textarea
                                                            className="text-lg min-h-[120px] hover:border-primary transition-colors"
                                                            value={siteData.aboutDescEs}
                                                            onChange={(e) => setSiteData({
                                                                ...siteData,
                                                                aboutDescEs: e.target.value,
                                                                aboutDescEn: `[EN: ${e.target.value}]`
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2 opacity-70">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Descripción (EN)</label>
                                                        <Textarea
                                                            className="text-lg min-h-[120px] bg-muted"
                                                            value={siteData.aboutDescEn}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>

                                        {/* Footer & Hours */}
                                        <motion.div whileHover={{ scale: 1.01, translateY: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Card className="p-6 transition-shadow hover:shadow-lg border-l-4 border-l-primary/20">
                                                <h3 className="text-xl font-black uppercase mb-4 text-primary">Horarios & Footer</h3>
                                                <div className="grid md:grid-cols-2 gap-6 mb-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Horario Semanal (Lun-Sab)</label>
                                                        <Input
                                                            className="text-lg font-bold"
                                                            value={siteData.hoursWeekdays}
                                                            onChange={(e) => setSiteData({ ...siteData, hoursWeekdays: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Horario Fines de Semana</label>
                                                        <Input
                                                            className="text-lg font-bold"
                                                            value={siteData.hoursWeekend}
                                                            onChange={(e) => setSiteData({ ...siteData, hoursWeekend: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Descripción Footer (ES)</label>
                                                        <Textarea
                                                            className="min-h-[80px]"
                                                            value={siteData.footerDescEs}
                                                            onChange={(e) => setSiteData({ ...siteData, footerDescEs: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2 opacity-70">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Descripción Footer (EN)</label>
                                                        <Textarea
                                                            className="min-h-[80px] bg-muted"
                                                            value={siteData.footerDescEn}
                                                            readOnly
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>

                                        {/* Address & Buttons */}
                                        <motion.div whileHover={{ scale: 1.01, translateY: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Card className="p-6 transition-shadow hover:shadow-lg">
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Dirección</label>
                                                        <Input
                                                            className="text-lg hover:border-primary transition-colors"
                                                            value={siteData.address}
                                                            onChange={(e) => setSiteData({ ...siteData, address: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-sm font-black uppercase text-muted-foreground">Texto Botón Llegar (ES)</label>
                                                            <Input
                                                                className="text-lg hover:border-primary transition-colors"
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
                                        </motion.div>

                                        {/* Phone & Price */}
                                        <motion.div whileHover={{ scale: 1.01, translateY: -2 }} transition={{ type: "spring", stiffness: 300 }}>
                                            <Card className="p-6 transition-shadow hover:shadow-lg">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Teléfono</label>
                                                        <Input
                                                            className="text-lg font-bold hover:border-primary transition-colors"
                                                            value={siteData.phone}
                                                            onChange={(e) => setSiteData({ ...siteData, phone: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-black uppercase text-muted-foreground">Precio Promedio</label>
                                                        <Input
                                                            className="text-lg hover:border-primary transition-colors"
                                                            value={siteData.avgPrice}
                                                            onChange={(e) => setSiteData({ ...siteData, avgPrice: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <Button
                                            className="w-full gap-2 uppercase font-black py-8 text-2xl shadow-xl transition-all hover:bg-primary/90 hover:shadow-primary/30"
                                            onClick={() => saveAdminData("Cambió textos/info general")}
                                        >
                                            <Save className="h-8 w-8" /> Guardar Cambios
                                        </Button>
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="menu" className="space-y-6">
                                    {siteData.categories.map((cat: any, catIdx: number) => (
                                        <Card key={cat.id} className="overflow-hidden border-2">
                                            <div className="p-6 bg-muted/30 border-b-2 flex items-center gap-4">
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="p-1 h-auto hover:bg-primary/10 transition-colors"
                                                        onClick={() => toggleCat(cat.id)}
                                                    >
                                                        {collapsedCats[cat.id] ? (
                                                            <Plus className="h-6 w-6 text-primary" />
                                                        ) : (
                                                            <Minus className="h-6 w-6 text-primary" />
                                                        )}
                                                    </Button>
                                                </motion.div>
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

                                            {!collapsedCats[cat.id] && (
                                                <div className="p-6 space-y-6">
                                                    {cat.items.map((item: any, itemIdx: number) => (
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
                                                                    <div className="flex flex-col gap-2">
                                                                        <label htmlFor={`file-upload-${cat.id}-${item.id}`} className="cursor-pointer">
                                                                            <div className="flex items-center justify-center gap-2 border-2 border-dashed border-primary/20 rounded-lg p-2 hover:bg-primary/5 transition-colors text-xs font-bold uppercase text-primary">
                                                                                <Upload className="h-4 w-4" /> Subir Foto
                                                                            </div>
                                                                            <input
                                                                                id={`file-upload-${cat.id}-${item.id}`}
                                                                                type="file"
                                                                                accept="image/*"
                                                                                className="hidden"
                                                                                onChange={(e) => handleFileUpload(e, catIdx, itemIdx)}
                                                                            />
                                                                        </label>
                                                                        {item.image && (
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="h-6 text-[10px] text-destructive hover:bg-destructive/10"
                                                                                onClick={() => {
                                                                                    const newCats = [...siteData.categories];
                                                                                    newCats[catIdx].items[itemIdx].image = "";
                                                                                    setSiteData({ ...siteData, categories: newCats });
                                                                                }}
                                                                            >
                                                                                <X className="h-3 w-3 mr-1" /> Quitar
                                                                            </Button>
                                                                        )}
                                                                    </div>
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
                                                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                className="text-destructive hover:text-white hover:bg-destructive uppercase font-bold transition-all px-4"
                                                                                onClick={() => {
                                                                                    const newCats = [...siteData.categories];
                                                                                    newCats[catIdx].items.splice(itemIdx, 1);
                                                                                    setSiteData({ ...siteData, categories: newCats });
                                                                                }}
                                                                            >
                                                                                <Trash2 className="h-4 w-4 mr-2" /> Eliminar
                                                                            </Button>
                                                                        </motion.div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card>
                                                    ))}

                                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full border-dashed border-2 py-8 uppercase font-bold text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all shadow-sm hover:shadow-md"
                                                            onClick={() => {
                                                                const newCats = [...siteData.categories];
                                                                newCats[catIdx].items.push({ id: Date.now().toString(), nameEs: "Nuevo Plato", nameEn: "New Dish", price: "0.00", descEs: "", descEn: "", image: "" });
                                                                setSiteData({ ...siteData, categories: newCats });
                                                            }}
                                                        >
                                                            <Plus className="h-5 w-5 mr-2" /> Agregar Plato a {cat.nameEs}
                                                        </Button>
                                                    </motion.div>
                                                </div>
                                            )}
                                        </Card>
                                    ))}

                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                                        <Button
                                            className="w-full gap-2 uppercase font-black py-8 text-2xl shadow-xl transition-all hover:bg-primary/90"
                                            onClick={() => saveAdminData("Editó el Menú (Precios/Platos)")}
                                        >
                                            <Save className="h-6 w-6" /> Guardar Cambios
                                        </Button>
                                    </motion.div>
                                </TabsContent>

                                <TabsContent value="promo" className="space-y-6 py-4">
                                    <Card className="p-6 bg-accent/5 border-accent/20 border-2">
                                        <h3 className="text-2xl font-black uppercase text-accent mb-6 flex items-center gap-2">
                                            <Heart className="fill-accent h-8 w-8" /> Configuración de Promociones
                                        </h3>

                                        <motion.div
                                            whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                                            className="flex items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border transition-all cursor-pointer group"
                                            onClick={() => setSiteData({ ...siteData, promoActive: !siteData.promoActive })}
                                        >
                                            <Switch
                                                checked={siteData.promoActive}
                                                onCheckedChange={(checked) => setSiteData({ ...siteData, promoActive: checked })}
                                                className="scale-150 ml-2 group-hover:ring-2 ring-primary/20 transition-all"
                                            />
                                            <div className="flex flex-col ml-4">
                                                <span className="text-xl font-black uppercase group-hover:text-primary transition-colors">Activar Popup de Promoción</span>
                                                <span className="text-sm text-muted-foreground font-bold">Si se activa, todos los usuarios verán el anuncio al entrar.</span>
                                            </div>
                                        </motion.div>

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

                                    {/* Special Events Settings */}
                                    <Card className="p-6 bg-accent/5 border-accent/20 border-2 mt-8">
                                        <h3 className="text-2xl font-black uppercase text-accent mb-6 flex items-center gap-2">
                                            <Sparkles className="fill-accent h-8 w-8" /> Eventos Especiales
                                        </h3>

                                        <motion.div
                                            whileHover={{ backgroundColor: "rgba(var(--primary), 0.05)" }}
                                            className="flex items-center gap-4 mb-8 bg-white p-6 rounded-2xl shadow-sm border transition-all cursor-pointer group"
                                            onClick={() => setSiteData({ ...siteData, showSpecialEvents: !siteData.showSpecialEvents })}
                                        >
                                            <Switch
                                                checked={siteData.showSpecialEvents}
                                                onCheckedChange={(checked) => setSiteData({ ...siteData, showSpecialEvents: checked })}
                                                className="scale-150 ml-2 group-hover:ring-2 ring-primary/20 transition-all"
                                            />
                                            <div className="flex flex-col ml-4">
                                                <span className="text-xl font-black uppercase group-hover:text-primary transition-colors">Mostrar Sección Eventos</span>
                                                <span className="text-sm text-muted-foreground font-bold">Activa/Desactiva la sección de eventos especiales en el Home.</span>
                                            </div>
                                        </motion.div>

                                        {siteData.showSpecialEvents && (
                                            <div className="space-y-6">
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold uppercase opacity-70">Título (ES)</label>
                                                        <Input
                                                            className="text-lg font-bold"
                                                            value={siteData.specialEventsTitleEs}
                                                            onChange={(e) => setSiteData({ ...siteData, specialEventsTitleEs: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold uppercase opacity-70">Título (EN)</label>
                                                        <Input
                                                            className="text-lg font-bold"
                                                            value={siteData.specialEventsTitleEn}
                                                            onChange={(e) => setSiteData({ ...siteData, specialEventsTitleEn: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold uppercase opacity-70">Descripción (ES)</label>
                                                        <Textarea
                                                            className="min-h-[80px]"
                                                            value={siteData.specialEventsDescEs}
                                                            onChange={(e) => setSiteData({ ...siteData, specialEventsDescEs: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-bold uppercase opacity-70">Descripción (EN)</label>
                                                        <Textarea
                                                            className="min-h-[80px]"
                                                            value={siteData.specialEventsDescEn}
                                                            onChange={(e) => setSiteData({ ...siteData, specialEventsDescEn: e.target.value })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-bold uppercase opacity-70">Imagen URL</label>
                                                    <Input
                                                        className="font-mono text-xs"
                                                        value={siteData.specialEventsImage}
                                                        onChange={(e) => setSiteData({ ...siteData, specialEventsImage: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </Card>
                                    <Button className="w-full gap-2 uppercase font-black py-8 text-2xl" onClick={() => saveAdminData("Cambió Promociones")}>
                                        <Save className="h-6 w-6" /> Guardar Cambios
                                    </Button>
                                </TabsContent>

                                <TabsContent value="logs" className="space-y-6 py-4">
                                    <Card className="p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-black uppercase">Registros de Acceso y Cambios</h3>
                                            <Button variant="outline" size="sm" onClick={fetchLogs}>Refrescar Logs</Button>
                                        </div>
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="font-bold uppercase w-[180px]">Fecha/Hora</TableHead>
                                                        <TableHead className="font-bold uppercase w-[150px]">Dispositivo</TableHead>
                                                        <TableHead className="font-bold uppercase">Actividad</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {logs.map((log, i) => (
                                                        <TableRow key={i} className="hover:bg-muted/50">
                                                            <TableCell className="font-mono text-xs font-bold">{new Date(log.timestamp).toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
                                                            <TableCell className="text-xs">
                                                                <Badge variant="outline" className="font-bold uppercase border-primary/20 text-[10px]">{log.device}</Badge>
                                                            </TableCell>
                                                            <TableCell className="font-black text-sm text-primary uppercase">{log.action}</TableCell>
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
                                        <p className="text-xs text-muted-foreground mt-4 text-center font-bold italic">Los registros se conservan por 7 días. Los cambios de precio y menú se detallan por usuario.</p>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Card>
    );
}
