"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, Headphones } from "lucide-react";

const reasons = [
    {
        title: "Dedicated Personal Attention",
        description: "Experience true white-glove service. As your sole driver, I provide personalized attention to every detail of your journey.",
        icon: ShieldCheck,
    },
    {
        title: "Punctuality & Reliability",
        description: "Arrive in style and on time. With a spotless track record, I ensure reliable service for a seamless journey, every time.",
        icon: Clock,
    },
    {
        title: "Direct Communication",
        description: "No dispatchers or call centers. You deal directly with me for all your bookings, special requests, and inquiries.",
        icon: Headphones,
    },
];

export function WhyChooseUsSection() {
    return (
        <section className="relative py-24 overflow-hidden border-y border-border/10">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/IMG_2865.PNG"
                    alt="Luxury Interior Background"
                    className="w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background/20 to-background z-0"></div>
            </div>

            <div className="container relative z-10 mx-auto px-6 max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground">
                        Why Choose <span className="text-primary italic">Melbourne Elite Chauffeur</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                        Experience the pinnacle of luxury, privacy, and dedicated personal service.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="flex flex-col items-center space-y-4 group"
                        >
                            <div className="w-20 h-20 rounded-full border border-border/50 bg-background/50 backdrop-blur-sm flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all duration-500 shadow-lg group-hover:shadow-gold relative after:absolute after:inset-0 after:rounded-full after:border after:border-primary/20 after:scale-110 after:opacity-0 group-hover:after:scale-125 group-hover:after:opacity-100 after:transition-all after:duration-700">
                                <reason.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="text-xl font-bold font-playfair text-foreground pt-4">{reason.title}</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
