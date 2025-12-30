import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Upload, X, Save, Edit3, Image as ImageIcon, Utensils } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface MenuViewProps {
    siteData: any;
    setSiteData: (data: any) => void;
    onSave: (desc: string) => void;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>, catIdx: number, itemIdx: number) => void;
}

export function MenuView({ siteData, setSiteData, onSave, onUpload }: MenuViewProps) {
    const [selectedCatId, setSelectedCatId] = useState<string>(siteData.categories?.[0]?.id || "");

    const activeCategoryIndex = siteData.categories.findIndex((c: any) => c.id === selectedCatId);
    const activeCategory = activeCategoryIndex >= 0 ? siteData.categories[activeCategoryIndex] : null;

    const handleAddCategory = () => {
        const newCats = [...siteData.categories];
        const newId = Date.now().toString();
        newCats.push({
            id: newId,
            nameEs: "Nueva Categoría",
            nameEn: "[EN: New Category]",
            items: []
        });
        setSiteData({ ...siteData, categories: newCats });
        setSelectedCatId(newId);
    };

    const handleDeleteCategory = (catIdx: number) => {
        if (!confirm("¿Seguro que quieres borrar esta categoría y todos sus platos?")) return;
        const newCats = [...siteData.categories];
        newCats.splice(catIdx, 1);
        setSiteData({ ...siteData, categories: newCats });
        if (newCats.length > 0) setSelectedCatId(newCats[0].id);
        else setSelectedCatId("");
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-black uppercase text-white tracking-wide">Menú</h2>
                    <p className="text-muted-foreground text-lg">Gestiona tus categorías y platos.</p>
                </div>
                <Button
                    onClick={() => onSave("Editó el Menú")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold uppercase shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
                >
                    <Save className="mr-2 h-5 w-5" /> Guardar Todo
                </Button>
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden">
                {/* Categories Sidebar */}
                <div className="w-1/4 flex flex-col gap-4 overflow-y-auto pr-2">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-black uppercase text-muted-foreground tracking-wider">Categorías</span>
                        <Button variant="ghost" size="icon" onClick={handleAddCategory} className="h-8 w-8 hover:bg-white/10">
                            <Plus className="h-6 w-6" />
                        </Button>
                    </div>
                    {siteData.categories.map((cat: any, idx: number) => (
                        <div key={cat.id} className="group flex gap-2">
                            <button
                                onClick={() => setSelectedCatId(cat.id)}
                                className={`flex-1 text-left px-6 py-4 rounded-xl font-bold text-lg transition-all border border-transparent ${selectedCatId === cat.id
                                    ? "bg-primary text-primary-foreground border-primary/50 shadow-lg shadow-primary/20"
                                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white border-white/5"
                                    }`}
                            >
                                {cat.nameEs}
                            </button>
                            {selectedCatId === cat.id && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteCategory(idx)}
                                >
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    ))}
                    {siteData.categories.length === 0 && (
                        <div className="text-center py-10 border-2 border-dashed border-white/10 rounded-xl">
                            <p className="text-muted-foreground text-sm mb-4">No hay categorías</p>
                            <Button onClick={handleAddCategory} variant="secondary">Crear Primera</Button>
                        </div>
                    )}
                </div>

                {/* Items Editor */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 overflow-y-auto backdrop-blur-md">
                    {activeCategory ? (
                        <div className="space-y-8">
                            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-6">
                                <div className="space-y-2">
                                    <label className="text-sm uppercase font-bold text-muted-foreground">Nombre Categoría (ES)</label>
                                    <Input
                                        value={activeCategory.nameEs}
                                        onChange={(e) => {
                                            const newCats = [...siteData.categories];
                                            newCats[activeCategoryIndex].nameEs = e.target.value;
                                            setSiteData({ ...siteData, categories: newCats });
                                        }}
                                        className="bg-black/20 border-white/10 text-3xl h-auto py-4 font-black focus:border-primary/50"
                                    />
                                </div>
                                <div className="space-y-2 opacity-50">
                                    <label className="text-sm uppercase font-bold text-muted-foreground">Category Name (EN)</label>
                                    <Input
                                        value={activeCategory.nameEn}
                                        onChange={(e) => {
                                            const newCats = [...siteData.categories];
                                            newCats[activeCategoryIndex].nameEn = e.target.value;
                                            setSiteData({ ...siteData, categories: newCats });
                                        }}
                                        className="bg-black/20 border-white/10 text-3xl h-auto py-4 font-bold"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <div className="bg-primary/20 p-1.5 rounded-lg"><Utensils className="h-5 w-5 text-primary" /></div>
                                        Platos ({activeCategory.items.length})
                                    </h3>
                                    <Button
                                        onClick={() => {
                                            const newCats = [...siteData.categories];
                                            newCats[activeCategoryIndex].items.push({
                                                id: Date.now().toString(),
                                                nameEs: "Nuevo Plato",
                                                nameEn: "New Dish",
                                                price: "0.00",
                                                descEs: "",
                                                image: ""
                                            });
                                            setSiteData({ ...siteData, categories: newCats });
                                        }}
                                        className="bg-white/10 hover:bg-white/20"
                                    >
                                        <Plus className="h-4 w-4 mr-2" /> Agregar Plato
                                    </Button>
                                </div>

                                <div className="grid gap-4">
                                    <AnimatePresence>
                                        {activeCategory.items.map((item: any, itemIdx: number) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                layout
                                                className="bg-black/20 border border-white/5 rounded-xl p-4 hover:border-white/20 transition-colors group"
                                            >
                                                <div className="flex gap-4">
                                                    {/* Image Handler */}
                                                    <div className="w-24 h-24 bg-white/5 rounded-lg shrink-0 overflow-hidden relative border border-white/10">
                                                        {item.image ? (
                                                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-2 text-center">
                                                                <ImageIcon className="h-6 w-6 mb-1 opacity-50" />
                                                                <span className="text-[10px] uppercase font-bold">Sin foto</span>
                                                            </div>
                                                        )}
                                                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                                                            <Upload className="h-6 w-6 text-white" />
                                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => onUpload(e, activeCategoryIndex, itemIdx)} />
                                                        </label>
                                                    </div>

                                                    {/* Fields */}
                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex gap-4">
                                                            <Input
                                                                className="bg-transparent border-transparent hover:border-white/10 focus:border-primary/50 font-bold text-lg p-0 h-auto rounded-none border-b"
                                                                value={item.nameEs}
                                                                onChange={(e) => {
                                                                    const newCats = [...siteData.categories];
                                                                    newCats[activeCategoryIndex].items[itemIdx].nameEs = e.target.value;
                                                                    setSiteData({ ...siteData, categories: newCats });
                                                                }}
                                                            />
                                                            <div className="w-24 relative">
                                                                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
                                                                <Input
                                                                    className="bg-transparent border-transparent hover:border-white/10 focus:border-primary/50 font-bold text-lg p-0 pl-4 h-auto rounded-none border-b text-right text-primary"
                                                                    value={item.price}
                                                                    onChange={(e) => {
                                                                        const newCats = [...siteData.categories];
                                                                        newCats[activeCategoryIndex].items[itemIdx].price = e.target.value;
                                                                        setSiteData({ ...siteData, categories: newCats });
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <Textarea
                                                            className="bg-white/5 border-transparent focus:border-primary/50 text-sm resize-none h-16"
                                                            placeholder="Descripción del plato..."
                                                            value={item.descEs}
                                                            onChange={(e) => {
                                                                const newCats = [...siteData.categories];
                                                                newCats[activeCategoryIndex].items[itemIdx].descEs = e.target.value;
                                                                setSiteData({ ...siteData, categories: newCats });
                                                            }}
                                                        />
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex flex-col justify-start">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="text-white/20 hover:text-destructive hover:bg-destructive/10"
                                                            onClick={() => {
                                                                const newCats = [...siteData.categories];
                                                                newCats[activeCategoryIndex].items.splice(itemIdx, 1);
                                                                setSiteData({ ...siteData, categories: newCats });
                                                            }}
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground text-center">
                            <div>
                                <Utensils className="h-16 w-16 mx-auto mb-4 opacity-20" />
                                <h3 className="text-xl font-bold mb-2">Selecciona una categoría</h3>
                                <p>Elige una categoría de la izquierda para editar su menú.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
