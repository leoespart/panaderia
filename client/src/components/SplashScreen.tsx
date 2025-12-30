import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Floating particle component for background animation
const FloatingParticle = ({ delay }: { delay: number }) => {
    const randomX = Math.random() * 100;
    const randomDuration = 3 + Math.random() * 4;

    return (
        <motion.div
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{ left: `${randomX}%`, top: '-10px' }}
            animate={{
                y: ['0vh', '110vh'],
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0]
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
            }}
        />
    );
};

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
    const [exit, setExit] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Smooth progress animation
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + 2;
            });
        }, 30);

        const timer = setTimeout(() => {
            setExit(true);
            setTimeout(onComplete, 600);
        }, 2500);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white"
            initial={{ opacity: 1 }}
            animate={exit ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Animated gradient background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white via-primary/5 to-primary/10"
                animate={{
                    background: [
                        'linear-gradient(135deg, #ffffff 0%, rgba(227, 28, 61, 0.05) 50%, rgba(227, 28, 61, 0.1) 100%)',
                        'linear-gradient(135deg, rgba(227, 28, 61, 0.05) 0%, rgba(227, 28, 61, 0.1) 50%, #ffffff 100%)',
                        'linear-gradient(135deg, #ffffff 0%, rgba(227, 28, 61, 0.05) 50%, rgba(227, 28, 61, 0.1) 100%)',
                    ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.3} />
            ))}

            {/* Radial glow effects */}
            <motion.div
                className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/15 rounded-full blur-[120px]"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <motion.div
                className="flex flex-col items-center gap-10 relative z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Logo container with advanced animations */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1
                    }}
                    className="relative"
                >
                    {/* Rotating ring behind logo */}
                    <motion.div
                        className="absolute inset-0 -m-6"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30" />
                    </motion.div>

                    {/* Pulsing glow */}
                    <motion.div
                        className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* Logo image */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img
                            src="/logo.jpg"
                            className="w-64 h-64 md:w-72 md:h-72 rounded-full border-[8px] border-white shadow-2xl object-cover relative z-10"
                            alt="Panadería La Francesa"
                            style={{
                                boxShadow: '0 20px 60px rgba(227, 28, 61, 0.3), 0 0 0 1px rgba(227, 28, 61, 0.1)'
                            }}
                        />
                    </motion.div>

                    {/* Expanding rings */}
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full border-2 border-primary/40"
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.7,
                                ease: "easeOut"
                            }}
                        />
                    ))}
                </motion.div>

                {/* Text content with stagger animation */}
                <div className="text-center space-y-5 px-6 max-w-lg">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="text-5xl md:text-6xl font-display font-black text-primary tracking-tight"
                    >
                        Panadería La Francesa
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative h-1 w-64 mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-full blur-sm"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-primary/80 font-bold text-lg md:text-xl tracking-wide uppercase"
                    >
                        El Sabor de la Tradición
                    </motion.p>

                    {/* Modern progress bar */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="pt-6"
                    >
                        <div className="w-64 mx-auto space-y-2">
                            <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary rounded-full"
                                    style={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>
                            <motion.p
                                className="text-xs text-primary/60 text-center font-bold uppercase"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                Preparando tu experiencia...
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}
