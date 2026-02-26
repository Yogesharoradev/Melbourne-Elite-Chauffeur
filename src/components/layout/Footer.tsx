import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
    return (
        <footer className="bg-background border-t border-border/10 pt-20 pb-10">
            <section id="contact">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                        {/* Brand & Description */}
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center gap-2 group">
                                <span className="text-2xl font-playfair font-bold text-primary tracking-wide group-hover:text-primary/80 transition-colors">
                                    <span className="text-foreground">Melbourne </span> Elite <span className="text-foreground">Chauffeur </span>
                                </span>
                            </Link>
                            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                                Excellent luxury travel with our premium limousine rental services.
                            </p>
                            {/* <div className="space-y-2">
                            <span className="text-foreground font-semibold font-playfair block">Subscribe To Updates</span>
                            <div className="flex items-center gap-2 border border-border/50 rounded-full p-1 bg-background">
                                <Input
                                    placeholder="Email Address"
                                    className="border-0 bg-transparent focus-visible:ring-0 text-sm h-10 px-4"
                                />
                                <Button size="icon" className="rounded-full h-10 w-10 shrink-0">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div> */}
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-6 lg:ml-12">
                            <h4 className="text-foreground font-semibold font-playfair text-xl">Quick Links</h4>
                            <ul className="space-y-4">
                                {["The Car", "Services", "Testimonials"].map((link) => (
                                    <li key={link}>
                                        <Link href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-muted-foreground text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div className="space-y-6">
                            <h4 className="text-foreground font-semibold font-playfair text-xl">Support</h4>
                            <ul className="space-y-4">
                                {["Privacy Policy", "Cancellation Policy"].map((link) => (
                                    <li key={link}>
                                        <Link href="#" className="text-muted-foreground text-sm hover:text-primary transition-colors hover:translate-x-1 inline-block">
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Get In Touch */}
                        <div className="space-y-6">
                            <h4 className="text-foreground font-semibold font-playfair text-xl">Get In Touch</h4>

                            <div className="flex flex-col gap-3">
                                {/* WhatsApp Button */}
                                <a
                                    href="https://wa.me/918437579399?text=Hi,%20I%20want%20to%20book%20a%20ride.."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/20 transition-all group"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">Message Me</span>
                                        <span className="font-bold">WhatsApp</span>
                                    </div>
                                </a>

                                {/* Call Button */}
                                <a
                                    href="tel:+918437579399"
                                    className="flex items-center gap-3 px-5 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all group"
                                >
                                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    <div className="flex flex-col text-left">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold opacity-70">Call Me Directly</span>
                                        <span className="font-bold">+91 8437579399</span>
                                    </div>
                                </a>
                            </div>

                            {/* <div className="flex items-center gap-4 pt-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:border-primary hover:text-primary transition-all">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div> */}
                        </div>

                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-border/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                        <p>© 2024 Melbourne Elite Chauffeur. All Rights Reserved.</p>
                        <div className="flex items-center gap-1">
                            <span>Crafted with elegance in Melbourne.</span>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}
