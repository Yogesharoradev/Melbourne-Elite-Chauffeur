"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="flex flex-col justify-center overflow-visible">
                        <pre className="ascii-font text-[3.5px] min-[375px]:text-[4.5px] sm:text-[5px] md:text-[6px] leading-[4.5px] min-[375px]:leading-[5.5px] sm:leading-[6px] md:leading-[7px] text-primary whitespace-pre group-hover:text-primary transition-all duration-500 glowing-text">
                            {`
 ██████╗ ███████╗     ██████╗██╗  ██╗ █████╗ ██╗   ██╗███████╗███████╗███████╗██╗   ██╗██████╗ 
██╔═══██╗╚══███╔╝    ██╔════╝██║  ██║██╔══██╗██║   ██║██╔════╝██╔════╝██╔════╝██║   ██║██╔══██╗
██║   ██║  ███╔╝     ██║     ███████║███████║██║   ██║█████╗  █████╗  █████╗  ██║   ██║██████╔╝
██║   ██║ ███╔╝      ██║     ██╔══██║██╔══██║██║   ██║██╔══╝  ██╔══╝  ██╔══╝  ██║   ██║██╔══██╗
╚██████╔╝███████╗    ╚██████╗██║  ██║██║  ██║╚██████╔╝██║     ██║     ███████╗╚██████╔╝██║  ██║
 ╚═════╝ ╚══════╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝
`}
                        </pre>
                    </div>
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

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-foreground p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
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
                </div>
            )}
        </header>
    );
}