"use client";

import { motion } from "framer-motion";

const images = [
    // "/IMG_2857.PNG",
    // "/IMG_2858.WEBP",
    "/IMG_2859.PNG",
    // "/IMG_2860.PNG",
    "/IMG_2861.PNG",
    "/IMG_2864.PNG",
    "/IMG_2865.PNG",
    // "/IMG_2866.PNG",
];

export function VehicleGallery() {
    return (
        <section id="the-car" className="py-12 bg-background border-t border-border/10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground mb-4">
                            Meet <span className="text-primary italic">The Car</span>
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            Meticulously maintained and engineered for a peerless luxury experience. Take a look inside.
                        </p>
                    </motion.div>
                </div>

                {/* Masonry-style Grid for the 8 images */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                    {images.map((src, index) => {
                        // Determine span based on index for a dynamic masonry look
                        let spanClass = "col-span-1 row-span-1";

                        // Make the first and 6th images span 2 columns and 2 rows for emphasis
                        if (index === 0 || index === 5) {
                            spanClass = "md:col-span-2 md:row-span-2";
                        }
                        // Make the 3rd and 7th images span 2 rows vertically
                        else if (index === 2 || index === 6) {
                            spanClass = "md:row-span-2";
                        }

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`relative rounded-xl overflow-hidden group cursor-pointer ${spanClass}`}
                            >
                                <img
                                    src={src}
                                    alt={`Luxury Car View ${index + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm bg-black/20 text-sm font-medium tracking-wide">
                                        View
                                    </span>
                                </div> */}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
