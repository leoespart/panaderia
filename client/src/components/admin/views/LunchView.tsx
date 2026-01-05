import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Save, UtensilsCrossed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface LunchViewProps {
    siteData: any;
    setSiteData: (data: any) => void;
    onSave: (desc: string) => void;
}

export function LunchView({ siteData, setSiteData, onSave }: LunchViewProps) {
    const items = siteData.lunchSpecials || [];

    const handleAddItem = () => {
        const newItem = {
            id: Date.now().toString(),
            nameEs: "Nuevo Almuerzo",
            nameEn: "New Lunch",
            descEs: "Descripción del plato",
            descEn: "Dish description",
            price: "$10.00"
        };
        setSiteData({ ...siteData, lunchSpecials: [...items, newItem] });
    };

    const handleUpdateItem = (idx: number, field: string, value: string) => {
        const newItems = [...items];
        newItems[idx] = { ...newItems[idx], [field]: value };
        setSiteData({ ...siteData, lunchSpecials: newItems });
    };

    const handleDeleteItem = (idx: number) => {
        const newItems = [...items];
        newItems.splice(idx, 1);
        setSiteData({ ...siteData, lunchSpecials: newItems });
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-black uppercase text-white tracking-wide">Almuerzos del Día</h2>
                    <p className="text-muted-foreground text-lg">Gestiona los especiales de almuerzo que aparecen en la página principal.</p>
                </div>
                <Button
                    onClick={() => onSave("Actualizó Almuerzos")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold uppercase shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
                >
                    <Save className="mr-2 h-5 w-5" /> Guardar Todo
                </Button>
            </div>

            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-y-auto backdrop-blur-md">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center opacity-50">
                        <UtensilsCrossed className="h-20 w-20 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">No hay almuerzos activos</h3>
                        <p className="mb-8">Agrega un plato para que aparezca en la sección de destacados.</p>
                        <Button onClick={handleAddItem} size="lg" className="font-bold">
                            <Plus className="mr-2 h-5 w-5" /> Agregar Primer Plato
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        <div className="flex justify-end">
                            <Button onClick={handleAddItem} variant="secondary">
                                <Plus className="mr-2 h-4 w-4" /> Agregar Otro
                            </Button>
                        </div>
                        <AnimatePresence>
                            {items.map((item: any, idx: number) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-black/20 border border-white/10 rounded-xl p-6 relative group"
                                >
                                    <div className="absolute top-4 right-4">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-white/20 hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDeleteItem(idx)}
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </Button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 pr-12">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase">Nombre (ES)</label>
                                                <Input
                                                    value={item.nameEs}
                                                    onChange={(e) => handleUpdateItem(idx, 'nameEs', e.target.value)}
                                                    className="bg-white/5 border-white/10 font-bold text-lg"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-muted-foreground uppercase">Descripción (ES)</label>
                                                <Textarea
                                                    value={item.descEs}
                                                    onChange={(e) => handleUpdateItem(idx, 'descEs', e.target.value)}
                                                    className="bg-white/5 border-white/10 resize-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                                                <label className="text-xs font-bold text-muted-foreground uppercase">Name (EN)</label>
                                                <Input
                                                    value={item.nameEn}
                                                    onChange={(e) => handleUpdateItem(idx, 'nameEn', e.target.value)}
                                                    className="bg-white/5 border-white/10"
                                                />
                                            </div>
                                            <div className="space-y-2 opacity-60 hover:opacity-100 transition-opacity">
                                                <label className="text-xs font-bold text-muted-foreground uppercase">Description (EN)</label>
                                                <Textarea
                                                    value={item.descEn}
                                                    onChange={(e) => handleUpdateItem(idx, 'descEn', e.target.value)}
                                                    className="bg-white/5 border-white/10 resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5 w-1/3">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-yellow-500 uppercase">Precio</label>
                                            <Input
                                                value={item.price}
                                                onChange={(e) => handleUpdateItem(idx, 'price', e.target.value)}
                                                className="bg-white/5 border-yellow-500/30 text-yellow-400 font-black text-xl"
                                                placeholder="$0.00"
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}
