import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// New Components
import { AdminLayout } from "./AdminLayout";
import { DashboardView } from "./views/DashboardView";
import { MenuView } from "./views/MenuView";
import { SettingsView } from "./views/SettingsView";

interface AdminPanelProps {
    siteData: any;
    setSiteData: (data: any) => void;
}

export function AdminPanel({ siteData, setSiteData }: AdminPanelProps) {
    // Auth State
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminPass, setAdminPass] = useState("");
    const [loginError, setLoginError] = useState("");
    const [currentUser, setCurrentUser] = useState<string | null>(null);

    // View State
    const [currentView, setCurrentView] = useState("dashboard");

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
                setIsLoggedIn(true);
                toast.success(`Bienvenido, ${data.username}`);
            } else {
                setLoginError("Contraseña incorrecta");
                toast.error("Acceso denegado");
            }
        } catch (e) {
            setLoginError("Error de conexión");
            toast.error("Error de conexión");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setAdminPass("");
        setCurrentUser(null);
        toast.info("Sesión cerrada");
    };

    const saveAdminData = async (actionDesc = "Actualizó configuraciones") => {
        try {
            const promise = fetch("/api/settings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    settings: siteData,
                    username: currentUser,
                    action: actionDesc
                })
            });

            toast.promise(promise, {
                loading: 'Guardando cambios...',
                success: 'Cambios guardados correctamente',
                error: 'Error al guardar cambios'
            });

            await promise;
        } catch (e) {
            console.error("Failed to save", e);
            toast.error("Error de conexión");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, catIdx: number, itemIdx: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const promise = fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            toast.promise(promise, {
                loading: 'Subiendo imagen...',
                success: 'Imagen subida correctamente',
                error: 'Error al subir imagen'
            });

            const res = await promise;

            if (res.ok) {
                const data = await res.json();
                const newCats = [...siteData.categories];
                newCats[catIdx].items[itemIdx].image = data.url;
                setSiteData({ ...siteData, categories: newCats });
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    if (!isLoggedIn) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md mx-auto"
            >
                <div className="w-full space-y-8 bg-white/50 dark:bg-black/50 backdrop-blur-xl p-8 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-500" />

                    <div className="text-center space-y-2 relative z-10">
                        <div className="bg-gradient-to-tr from-primary/20 to-purple-500/20 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 shadow-inner">
                            <Lock className="h-10 w-10 text-primary" />
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white">Acceso Admin</h2>
                        <p className="text-muted-foreground font-medium">Sistema de Gestión Central</p>
                    </div>

                    <div className="space-y-6 relative z-10">
                        <div className="space-y-4">
                            <Input
                                type="password"
                                placeholder="Contraseña Maestra"
                                value={adminPass}
                                onChange={(e) => {
                                    setAdminPass(e.target.value);
                                    if (loginError) setLoginError("");
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") handleAdminLogin();
                                }}
                                className={`pl-6 text-lg py-6 bg-white/50 dark:bg-black/20 border-neutral-200 dark:border-white/10 focus:border-primary/50 text-center tracking-widest transition-all ${loginError ? "border-destructive ring-destructive/20" : ""}`}
                            />

                            {loginError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-destructive/10 text-destructive text-sm font-bold px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                                >
                                    <X className="h-4 w-4" />
                                    {loginError}
                                </motion.div>
                            )}
                        </div>

                        <Button
                            className="w-full uppercase font-black text-lg py-6 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all rounded-xl hover:-translate-y-1 bg-gradient-to-r from-primary to-purple-600 border-none"
                            onClick={handleAdminLogin}
                        >
                            <Settings className="mr-2 h-5 w-5 animate-spin-slow" /> Iniciar Sistema
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <AdminLayout
            currentView={currentView}
            onViewChange={setCurrentView}
            onLogout={handleLogout}
            currentUser={currentUser}
        >
            {currentView === "dashboard" && (
                <DashboardView siteData={siteData} onNavigate={setCurrentView} />
            )}
            {currentView === "menu" && (
                <MenuView
                    siteData={siteData}
                    setSiteData={setSiteData}
                    onSave={saveAdminData}
                    onUpload={handleFileUpload}
                />
            )}
            {currentView === "settings" && (
                <SettingsView
                    siteData={siteData}
                    setSiteData={setSiteData}
                    onSave={saveAdminData}
                />
            )}
        </AdminLayout>
    );
}
