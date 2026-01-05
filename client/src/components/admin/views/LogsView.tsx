import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { History, Smartphone, Monitor } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Log {
    id: number;
    timestamp: string;
    action: string;
    device: string;
}

export function LogsView() {
    const [logs, setLogs] = useState<Log[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/logs")
            .then(res => res.json())
            .then(data => {
                setLogs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch logs", err);
                setLoading(false);
            });
    }, []);

    const getIcon = (device: string) => {
        if (device.toLowerCase().includes("iphone") || device.toLowerCase().includes("android")) return <Smartphone className="h-4 w-4" />;
        return <Monitor className="h-4 w-4" />;
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-4xl font-black uppercase text-white tracking-wide">Registro de Cambios</h2>
                <p className="text-muted-foreground text-lg">Historial de actividades y actualizaciones del sistema.</p>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-black/20 text-muted-foreground uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Hora</th>
                                <th className="p-6">Acción</th>
                                <th className="p-6">Dispositivo</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-muted-foreground">Cargando registros...</td>
                                </tr>
                            ) : logs.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="p-8 text-center text-muted-foreground">No hay registros recientes.</td>
                                </tr>
                            ) : (
                                logs.map((log) => (
                                    <motion.tr
                                        key={log.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-white hover:bg-white/5 transition-colors"
                                    >
                                        <td className="p-6 whitespace-nowrap font-mono text-sm text-muted-foreground">
                                            {format(new Date(log.timestamp), "d MMM, h:mm a", { locale: es })}
                                        </td>
                                        <td className="p-6 font-medium">
                                            {log.action}
                                        </td>
                                        <td className="p-6 flex items-center gap-2 text-sm text-muted-foreground">
                                            {getIcon(log.device)}
                                            {log.device}
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}
