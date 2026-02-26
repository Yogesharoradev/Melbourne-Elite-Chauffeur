"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const destinations = [
    { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop" },
    { name: "London", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop" },
    { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e9076f1cb68?q=80&w=800&auto=format&fit=crop" },
    { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" },
];

export function DestinationsSection() {
    return (
        <section className="py-24 bg-background border-t border-border/10">
            <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="w-full lg:w-1/3 space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground">
                        Experience Luxury Across Melbourne
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Discover premium, discrete, and reliable limousine services across top local destinations and events.
                    </p>
                    <Button variant="outline" className="rounded-full px-8 py-6 text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-all">
                        View All Cities
                    </Button>
                </motion.div>

                {/* Gallery */}
                <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {destinations.map((city, index) => (
                        <motion.div
                            key={city.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className={`relative rounded-2xl overflow-hidden group cursor-pointer ${index % 2 === 0 ? "h-64 md:h-80 md:mt-8" : "h-64 md:h-80"
                                }`}
                        >
                            <img
                                src={city.image}
                                alt={city.name}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300"></div>
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <span className="text-white font-playfair text-xl font-bold tracking-wider group-hover:text-primary transition-colors">
                                    {city.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
