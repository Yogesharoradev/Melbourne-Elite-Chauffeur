"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "The Car", href: "#the-car" },
        { name: "Services", href: "#services" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled
                ? "bg-background/80 backdrop-blur-md border-border/50 py-4 shadow-md"
                : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-playfair font-bold text-primary tracking-wide group-hover:text-primary/80 transition-colors">
                        <span className="text-foreground">Melbourne </span> Elite <span className="text-foreground">Chauffeur </span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop CTA */}
                {/* <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" className="text-foreground hover:text-primary hover:bg-transparent">
                        Sign In
                    </Button>
                    <Button className="rounded-full px-6 font-semibold shadow-gold">Sign Up</Button>
                </div> */}

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-foreground p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Content */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border/50 py-4 shadow-lg flex flex-col items-center gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-foreground hover:text-primary transition-colors w-full text-center py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {/* <div className="flex flex-col gap-2 w-full px-6 mt-4">
                        <Button variant="outline" className="w-full">
                            Sign In
                        </Button>
                        <Button className="w-full rounded-full">Sign Up</Button>
                    </div> */}
                </div>
            )}
        </header>
    );
}
