"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [

    { value: "500+", label: "Successful 5-Star Rides" },
    { value: "Spotless", label: "Vehicle Record" },
    { value: "5+ Years", label: "Professional Chauffeur Experience" },
    { value: "5.0", label: "Customer Ratings" },
];

export function StatsSection() {
    return (
        <section className="py-20 bg-background border-t border-border/10">
            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground">
                        Step Into the World of <br className="hidden md:block" />
                        <span className="text-primary italic">Luxury</span>
                    </h2>
                    <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                        Experience, trust, and unmatched service crafted over the years.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center text-center space-y-2 group"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold font-playfair text-primary group-hover:scale-110 transition-transform duration-300">
                                {stat.value}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
