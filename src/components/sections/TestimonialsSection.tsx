"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Emily Garner",
        role: "Travel Blogger",
        content: "The limousine was exquisite and the service professional. Made my special event truly memorable.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    },
    {
        name: "John Alexander",
        role: "Designer",
        content: "The service was amazing. From the moment the chauffeur arrived to the luxurious ride itself. Every detail was perfection.",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
        name: "Jessica L.",
        role: "CEO",
        content: "I've worked with many elite rental services but this is different. The professionalism and fleet availability beat everyone else.",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    },
];

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground">
                        What Our Clients Saying
                    </h2>
                    <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                        Trusted by Elite Travelers Worldwide
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                        >
                            <Card className="bg-secondary/20 border-border/10 h-full hover:border-primary/30 transition-colors duration-300 relative group">
                                {/* Quote Icon Background */}
                                <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />

                                <CardContent className="p-8 pt-10 flex flex-col h-full relative z-10">
                                    <div className="flex items-center gap-4 mb-6">
                                        <img
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            className="w-14 h-14 rounded-full border-2 border-primary/50 object-cover"
                                        />
                                        <div>
                                            <h4 className="text-lg font-bold font-playfair text-foreground">{testimonial.name}</h4>
                                            {/* <p className="text-sm text-muted-foreground">{testimonial.role}</p> */}
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed flex-grow text-sm md:text-base mb-6">
                                        "{testimonial.content}"
                                    </p>

                                    <div className="flex items-center gap-1 mt-auto">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                        ))}
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
