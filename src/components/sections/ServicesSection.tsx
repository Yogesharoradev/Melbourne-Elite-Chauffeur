"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Briefcase, Plane, GlassWater, CarFront } from "lucide-react";

const services = [
    {
        title: "VIP Transport",
        description: "Relax in absolute comfort over short or long distances with a dedicated driver committed to a seamless ride.",
        icon: CarFront,
    },
    {
        title: "Airport Transfers",
        description: "Arrive in style and on time with door-to-door airport transfer service. I track your flight for guaranteed punctuality.",
        icon: Plane,
    },
    {
        title: "Corporate Hire",
        description: "Elevate your business trips or executive transits with tailored, discreet, and reliable corporate service.",
        icon: Briefcase,
    },
    {
        title: "Wedding & Events Escorts",
        description: "Make your special moments unforgettable with a pristine luxury car and a sharply dressed professional driver.",
        icon: GlassWater,
    },
];

export function ServicesSection() {
    return (
        <section id="services" className="py-24 bg-secondary/50 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Exceptional Services for a<br /> Luxurious Drive
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Our tailored services redefine the way you travel, ensuring comfort, convenience, and class.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Card className="group overflow-hidden bg-background/50 hover:bg-background border-border/50 hover:border-primary/50 transition-all duration-500 h-full">
                                <CardContent className="p-8 flex flex-col md:flex-row gap-6 items-start">
                                    <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500 shrinks-0">
                                        <service.icon className="w-8 h-8" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <h3 className="text-xl font-bold font-playfair text-foreground">{service.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {service.description}
                                        </p>
                                        <Button variant="link" className="p-0 text-primary hover:text-primary/80 group-hover:translate-x-2 transition-transform h-auto">
                                            Inquire now <ArrowRight className="ml-2 w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
