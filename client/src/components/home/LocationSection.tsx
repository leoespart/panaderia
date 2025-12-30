import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationSectionProps {
    siteData: any;
    t: any;
}

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: "easeOut" }
    }
};

export function LocationSection({ siteData, t }: LocationSectionProps) {
    return (
        <motion.div
            id="location"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="py-20"
        >
            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-8xl font-black uppercase mb-4 text-primary">{t.locationTitle}</h2>
                <div className="w-40 h-3 bg-primary mx-auto rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-white relative group">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3550.0!2d-66.0560!3d18.4415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c036924847e62ef%3A0xe6bf44799015949e!2s1963%20Av.%20Borinquen%2C%20San%20Juan%2C%2000915!5e0!3m2!1ses-419!2spr!4v1714324562021!5m2!1ses-419!2spr"
                    className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    allowFullScreen
                    loading="lazy"
                ></iframe>

                <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl max-w-md hidden md:block border border-white/20">
                    <h4 className="text-2xl font-black uppercase text-primary mb-2 flex items-center gap-2">
                        <MapPin className="h-6 w-6" /> {t.addressTitle}
                    </h4>
                    <p className="text-lg font-bold text-muted-foreground leading-tight">{siteData.address}</p>
                </div>
            </div>

            <div className="mt-16 text-center">
                <Button
                    size="lg"
                    className="px-12 py-8 text-2xl font-black uppercase rounded-full shadow-2xl hover:scale-105 transition-all gap-3 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteData.address)}`, '_blank')}
                >
                    <MapPin className="h-8 w-8" /> {t.directionsBtn}
                </Button>
            </div>
        </motion.div>
    );
}
