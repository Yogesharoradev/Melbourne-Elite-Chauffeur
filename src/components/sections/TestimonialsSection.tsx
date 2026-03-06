"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        name: "Emily Garner",
        role: "Travel Blogger",
        content: "The limousine was exquisite and the service professional. Made my special event truly memorable.",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
        name: "John Alexander",
        role: "Designer",
        content: "The service was amazing. From the moment the chauffeur arrived to the luxurious ride itself. Every detail was perfection.",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
        name: "Jessica L.",
        role: "CEO",
        content: "I've worked with many elite rental services but this is different. The professionalism and fleet availability beat everyone else.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
        name: "Michael Chen",
        role: "Investment Banker",
        content: "Punctual, discreet, and extremely comfortable. Easily the best airport transfer I've experienced in Melbourne.",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
        name: "Sarah Jenkins",
        role: "Event Planner",
        content: "I exclusively book this service for my VIP clients. They never fail to deliver an incredible red-carpet experience.",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    },
    {
        name: "David Dubois",
        role: "Architect",
        content: "The fleet condition is pristine. My chauffeur was knowledgeable about the city and completely accommodating.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    },
];

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-0 md:px-6 max-w-7xl relative z-10 w-full overflow-hidden">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes infinite-scroll {
                        from { transform: translateX(0); }
                        to { transform: translateX(calc(-50% - 1rem)); } /* -50% to shift by half the container width (the first set of items), -1rem to account for gap adjustment */
                    }
                    .animate-infinite-scroll {
                        animation: infinite-scroll 40s linear infinite;
                    }
                    .animate-infinite-scroll:hover {
                        animation-play-state: paused;
                    }
                    `
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 px-6"
                >
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-foreground">
                        What Our Clients Saying
                    </h2>
                    <p className="mt-4 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
                        Trusted by Elite Travelers Worldwide
                    </p>
                </motion.div>

                {/* Auto-scrolling wrapper */}
                <div className="w-full relative py-4">
                    <div className="flex w-max gap-8 animate-infinite-scroll pl-6 md:pl-0">
                        {/* Duplicate the array to create a seamless infinite scroll loop */}
                        {[...testimonials, ...testimonials].map((testimonial, index) => (
                            <div
                                key={index}
                                className="w-[85vw] md:w-[400px] flex-shrink-0"
                            >
                                <Card className="bg-secondary/20 border-border/10 h-full hover:border-primary/30 transition-colors duration-300 relative group">
                                    {/* Quote Icon Background */}
                                    <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors duration-300" />

                                    <CardContent className="p-8 pt-10 flex flex-col h-full relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
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
                            </div>
                        ))}
                    </div>

                    {/* Left/Right Fade Overlays to blend edges */}
                    <div className="absolute inset-y-0 left-0 w-8 md:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-8 md:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
}
