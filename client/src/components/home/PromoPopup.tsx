import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PromoPopupProps {
    siteData: any;
    isOpen: boolean;
    onClose: () => void;
}

export const PromoPopup = ({ siteData, isOpen, onClose }: PromoPopupProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                    <div className="relative bg-white text-center p-10 rounded-[3rem] max-w-lg w-full shadow-2xl border-[8px] border-primary">
                        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                            <LogOut className="h-6 w-6" />
                        </button>
                        <Badge className="bg-primary text-white text-xl px-6 py-2 mb-6 uppercase font-black tracking-widest animate-pulse">¡Aviso Especial!</Badge>
                        <h2 className="text-5xl font-black text-primary mb-4 uppercase leading-none">{siteData.promoDiscount}</h2>
                        <p className="text-2xl font-bold text-gray-700 mb-8">{siteData.promoMessage}</p>
                        <Button size="lg" className="w-full text-2xl py-8 font-black uppercase rounded-2xl animate-bounce" onClick={onClose}>
                            ¡Entendido!
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
