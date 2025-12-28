import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MapPin, Clock, Coffee, Croissant, ChefHat, ArrowRight, Menu as MenuIcon, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">Panaderia La Francesa</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-white/80 transition-colors">Nosotros</a>
            <a href="#menu" className="hover:text-white/80 transition-colors">Menú</a>
            <a href="#location" className="hover:text-white/80 transition-colors">Ubicación</a>
          </div>
          <Button variant="secondary" size="sm" className="font-bold">
            Ordena Online
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section 
        className="relative bg-primary text-primary-foreground py-24 md:py-32 px-4 overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary"></div>
        
        <div className="container mx-auto relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm rounded-full">Pan fresco & café</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Pan fresco <br className="hidden md:block"/> todos los días
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Café, desayunos, sandwiches y dulces en Santurce. 
              El sabor de la tradición en cada bocado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2 text-lg h-12 px-8 shadow-lg hover:scale-105 transition-transform">
                <MapPin className="h-5 w-5" /> Visítanos
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg h-12 px-8 bg-transparent border-white text-white hover:bg-white hover:text-primary shadow-lg hover:scale-105 transition-transform">
                <MenuIcon className="h-5 w-5" /> Ver Menú
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Animated decorative circles */}
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-48 h-48 bg-yellow-400 rounded-full mix-blend-overlay filter blur-3xl"
        />
      </motion.section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 space-y-24 -mt-10 relative z-20">
        
        {/* About Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Card className="shadow-xl border-none overflow-hidden max-w-4xl mx-auto transform hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary"></div>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Croissant className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-primary">Sobre Nosotros</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos una panadería y cafetería en Santurce, reconocida por nuestro pan fresco, 
                postres artesanales y un servicio familiar. Desde nuestros inicios, nos hemos 
                dedicado a traer el mejor sabor a tu mesa con ingredientes de primera calidad 
                y mucho amor.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu Section */}
        <motion.div 
          id="menu"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Nuestro Menú</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-transparent hover:border-l-primary group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors">
                    <span>Pan Francés</span>
                    <Badge variant="secondary">$2.00</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Recién horneado, crujiente por fuera y suave por dentro.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-transparent hover:border-l-primary group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors">
                    <span>Croissant</span>
                    <Badge variant="secondary">$3.00</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Mantequilloso y hojaldrado, perfecto para el desayuno.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-transparent hover:border-l-primary group">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center group-hover:text-primary transition-colors">
                    <span>Café con Leche</span>
                    <Badge variant="secondary">$2.50</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Café colado al momento con leche espumosa.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
               <Card className="h-full bg-primary/5 border-dashed border-2 border-primary/20 flex items-center justify-center p-6 cursor-pointer hover:bg-primary/10 transition-colors">
                <div className="text-center">
                  <p className="font-bold text-primary mb-2">Ver menú completo</p>
                  <ArrowRight className="h-5 w-5 text-primary mx-auto" />
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Hours */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="h-full border-t-4 border-t-primary shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <CardTitle>Horarios</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Lun - Mar</span>
                  <span className="text-muted-foreground">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Mié</span>
                  <span className="text-muted-foreground">6:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium text-destructive">Jue</span>
                  <span className="text-destructive font-bold">Cerrado</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Vie - Sáb</span>
                  <span className="text-muted-foreground">6:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Dom</span>
                  <span className="text-muted-foreground">6:00 AM - 3:00 PM</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Card className="h-full border-t-4 border-t-primary shadow-lg flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <CardTitle>Contacto</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-6">
                <div>
                  <p className="text-3xl font-bold text-foreground mb-2">(939) 337-4777</p>
                  <div className="inline-block bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                    Precio promedio: $10 - $20
                  </div>
                </div>
                <Button size="lg" className="w-full text-lg shadow-lg group">
                  <Phone className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Llamar ahora
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Location */}
        <motion.div 
          id="location"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Ubicación</h2>
          </div>
          
          <Card className="overflow-hidden shadow-xl border-none">
            <div className="grid md:grid-cols-3">
              <div className="p-6 md:col-span-1 bg-primary text-primary-foreground flex flex-col justify-center">
                <h3 className="font-bold text-xl mb-2">Visítanos</h3>
                <p className="text-primary-foreground/90 mb-4">
                  1963 Av. Borinquen,<br/>
                  San Juan, PR 00915
                </p>
                <Button variant="secondary" className="w-full" size="sm">
                  Cómo llegar
                </Button>
              </div>
              <div className="h-64 md:h-auto md:col-span-2 bg-muted relative group overflow-hidden">
                {/* Simulated Map */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-3 rounded-full shadow-xl animate-bounce">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <ChefHat className="h-8 w-8 mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-bold mb-4">Panaderia La Francesa</h3>
          <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
            Llevando el mejor pan a tu mesa desde Santurce. Calidad, frescura y tradición en cada producto.
          </p>
          <div className="flex justify-center gap-4 text-sm opacity-60">
            <span>© 2024 Panaderia La Francesa</span>
            <span>•</span>
            <span>Privacidad</span>
            <span>•</span>
            <span>Términos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
