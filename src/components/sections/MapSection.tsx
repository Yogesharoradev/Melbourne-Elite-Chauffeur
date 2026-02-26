"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function MapSection() {
    return (
        <section className="py-24 bg-background relative border-t border-border/10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12 items-center">

                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-border/20 shadow-2xl relative group"
                    >
                        {/* Google Maps Embed - Centered on Melbourne City */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098462!2d144.9630576!3d-37.8136276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1715012345678!5m2!1sen!2sus&style=feature:all|element:labels.text.fill|color:0x8ec3b9&style=feature:all|element:labels.text.stroke|color:0x1a3646&style=feature:landscape|element:geometry|color:0x2c5a71&style=feature:poi|element:geometry|color:0x283d6a&style=feature:poi.park|element:geometry|color:0x259160&style=feature:road|element:geometry|color:0x144b53&style=feature:road.arterial|element:geometry|color:0x144b53&style=feature:road.highway|element:geometry|color:0x004975&style=feature:road.highway|element:geometry.stroke|color:0x004975&style=feature:road.local|element:geometry|color:0x144b53&style=feature:transit|element:geometry|color:0x144b53&style=feature:water|element:geometry|color:0x003366"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(80%) contrast(120%)" }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 grayscale transition-all duration-700 group-hover:grayscale-0"
                        />

                        {/* Overlay for Dark Theme blending */}
                        <div className="absolute inset-0 bg-primary/10 pointer-events-none mix-blend-overlay"></div>
                    </motion.div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 space-y-6 lg:pl-12 text-center lg:text-left"
                    >
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground">
                            Step Into the World of <br className="hidden md:block" />
                            <span className="text-primary italic">Luxury!</span>
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-lg mx-auto lg:mx-0">
                            Experience elegance, comfort, and exclusivity with Melbourne Elite Chauffeur. Whether it's a business event or wedding, your journey begins here .
                        </p>

                        <div className="pt-4">
                            <Button className="rounded-full px-8 py-6 text-lg font-semibold shadow-gold relative overflow-hidden group">
                                <span className="relative z-10 w-full text-center">Book Now</span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            </Button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
