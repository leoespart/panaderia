import React from "react";
import { Save, Globe, Clock, MapPin, Phone, Sparkles, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface SettingsViewProps {
    siteData: any;
    setSiteData: (data: any) => void;
    onSave: (desc: string) => void;
}

export function SettingsView({ siteData, setSiteData, onSave }: SettingsViewProps) {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-4xl font-black uppercase text-white tracking-wide">Configuración</h2>
                    <p className="text-muted-foreground text-lg">Información general y promociones.</p>
                </div>
                <Button
                    onClick={() => onSave("Actualizó configuraciones")}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold uppercase shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all"
                >
                    <Save className="mr-2 h-5 w-5" /> Guardar Todo
                </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl mb-6 w-full max-w-md mx-auto">
                    <TabsTrigger value="general" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">General</TabsTrigger>
                    <TabsTrigger value="promos" className="flex-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold">Promociones & Eventos</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    {/* Hero Section */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md p-6 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                            <Globe className="h-5 w-5 text-primary" /> Información Principal (Hero)
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Título Principal</label>
                                <Input
                                    value={siteData.heroTitle}
                                    onChange={(e) => setSiteData({ ...siteData, heroTitle: e.target.value })}
                                    className="bg-black/20 border-white/10 text-white font-black text-xl"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Badge / Subtítulo</label>
                                <Input
                                    value={siteData.heroBadgeEs}
                                    onChange={(e) => setSiteData({ ...siteData, heroBadgeEs: e.target.value })}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Descripción</label>
                                <Textarea
                                    value={siteData.heroDescEs}
                                    onChange={(e) => setSiteData({ ...siteData, heroDescEs: e.target.value })}
                                    className="bg-black/20 border-white/10 text-white min-h-[100px]"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Contact Info */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md p-6 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                            <MapPin className="h-5 w-5 text-blue-400" /> Contacto & Ubicación
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Dirección</label>
                                <Input
                                    value={siteData.address}
                                    onChange={(e) => setSiteData({ ...siteData, address: e.target.value })}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Teléfono</label>
                                <Input
                                    value={siteData.phone}
                                    onChange={(e) => setSiteData({ ...siteData, phone: e.target.value })}
                                    className="bg-black/20 border-white/10 text-white font-mono"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Hours */}
                    <Card className="bg-white/5 border-white/10 backdrop-blur-md p-6 space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                            <Clock className="h-5 w-5 text-orange-400" /> Horarios
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Semana (Lun-Vie)</label>
                                <Input
                                    value={siteData.hoursWeekdays}
                                    onChange={(e) => setSiteData({ ...siteData, hoursWeekdays: e.target.value })}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-muted-foreground">Fin de Semana (Sab-Dom)</label>
                                <Input
                                    value={siteData.hoursWeekend}
                                    onChange={(e) => setSiteData({ ...siteData, hoursWeekend: e.target.value })}
                                    className="bg-black/20 border-white/10 text-white"
                                />
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="promos" className="space-y-6">
                    {/* Promo Popup */}
                    <Card className="bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20 backdrop-blur-md p-6 space-y-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Heart className="h-6 w-6 text-pink-500 fill-pink-500" /> Popup de Promoción
                            </h3>
                            <Switch
                                checked={siteData.promoActive}
                                onCheckedChange={(checked) => setSiteData({ ...siteData, promoActive: checked })}
                                className="data-[state=checked]:bg-pink-500"
                            />
                        </div>
                        {siteData.promoActive && (
                            <div className="grid md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 fade-in duration-300">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Mensaje</label>
                                    <Input
                                        value={siteData.promoMessage}
                                        onChange={(e) => setSiteData({ ...siteData, promoMessage: e.target.value })}
                                        className="bg-black/20 border-white/10 text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Descuento (Highlight)</label>
                                    <Input
                                        value={siteData.promoDiscount}
                                        onChange={(e) => setSiteData({ ...siteData, promoDiscount: e.target.value })}
                                        className="bg-black/20 border-white/10 text-pink-400 font-black text-xl"
                                    />
                                </div>
                            </div>
                        )}
                    </Card>

                    {/* Special Events */}
                    <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20 backdrop-blur-md p-6 space-y-6">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <Sparkles className="h-6 w-6 text-yellow-500 fill-yellow-500" /> Sección Eventos Especiales
                            </h3>
                            <Switch
                                checked={siteData.showSpecialEvents}
                                onCheckedChange={(checked) => setSiteData({ ...siteData, showSpecialEvents: checked })}
                                className="data-[state=checked]:bg-yellow-500"
                            />
                        </div>
                        {siteData.showSpecialEvents && (
                            <div className="space-y-4 animate-in slide-in-from-top-4 fade-in duration-300">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-muted-foreground">Título</label>
                                        <Input
                                            value={siteData.specialEventsTitleEs}
                                            onChange={(e) => setSiteData({ ...siteData, specialEventsTitleEs: e.target.value })}
                                            className="bg-black/20 border-white/10 text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase text-muted-foreground">Imagen URL</label>
                                        <Input
                                            value={siteData.specialEventsImage}
                                            onChange={(e) => setSiteData({ ...siteData, specialEventsImage: e.target.value })}
                                            className="bg-black/20 border-white/10 text-white font-mono text-xs"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-muted-foreground">Descripción</label>
                                    <Textarea
                                        value={siteData.specialEventsDescEs}
                                        onChange={(e) => setSiteData({ ...siteData, specialEventsDescEs: e.target.value })}
                                        className="bg-black/20 border-white/10 text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
