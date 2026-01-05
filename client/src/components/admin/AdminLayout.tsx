import React from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Menu, Settings, LogOut, Sparkles, ChefHat, History, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
    children: React.ReactNode;
    currentView: string;
    onViewChange: (view: string) => void;
    onLogout: () => void;
    currentUser: string | null;
}

export function AdminLayout({ children, currentView, onViewChange, onLogout, currentUser }: AdminLayoutProps) {
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "menu", label: "Menú & Precios", icon: Menu },
        { id: "lunch", label: "Almuerzos", icon: UtensilsCrossed },
        { id: "settings", label: "Configuración", icon: Settings },
        { id: "logs", label: "Registro de Cambios", icon: History },
    ];

    return (
        <div className="flex h-screen bg-neutral-950 text-white overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-24 md:w-80 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20">
                <div className="p-8 flex items-center gap-4">
                    <div className="bg-primary/20 p-3 rounded-2xl">
                        <ChefHat className="h-8 w-8 text-primary" />
                    </div>
                    <span className="font-black text-2xl tracking-tight hidden md:block">ADMIN<span className="text-primary">PANEL</span></span>
                </div>

                <nav className="flex-1 px-6 py-8 space-y-3">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onViewChange(item.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${currentView === item.id
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <item.icon className={`h-6 w-6 ${currentView === item.id ? "animate-pulse" : ""}`} />
                            <span className="font-bold text-lg hidden md:block">{item.label}</span>
                            {currentView === item.id && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute left-0 w-1.5 h-10 bg-white rounded-r-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5 space-y-6">
                    <div className="hidden md:flex items-center gap-4 px-6 py-4 bg-white/5 rounded-2xl">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center font-bold text-sm">
                            {currentUser?.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-base font-bold truncate">{currentUser}</p>
                            <p className="text-sm text-muted-foreground">Administrador</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive gap-3"
                        onClick={onLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden md:block">Cerrar Sesión</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black z-0" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0 pointer-events-none" />

                {/* Header Decoration */}
                <div className="absolute top-0 right-0 p-8 z-10 opacity-50 pointer-events-none">
                    <Sparkles className="h-64 w-64 text-primary/5 blur-3xl" />
                </div>

                <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto min-h-full flex flex-col">
                    <motion.div
                        key={currentView}
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex-1"
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
