"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
    { name: "About", href: "/#about" },
    { name: "NFTs", href: "/nfts" },
    { name: "Buy Token", href: "/buy" },
];

// Dynamically import ConnectButton to avoid hydration issues
const ConnectButton = dynamic(() => import('./ConnectButton'), { ssr: false });

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isBuyPage = pathname === "/buy";

    // Close mobile menu when route changes (prevent stale open state after navigation)
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Close mobile menu if window resized to desktop width
    useEffect(() => {
        const onResize = () => {
            try {
                if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
            } catch (e) {
                // ignore in non-browser environments
            }
        };
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on Escape and focus first link when opened
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };

        document.addEventListener('keydown', onKey);
        if (isMobileMenuOpen) {
            setTimeout(() => {
                const first = document.querySelector(`a[href=\"${NAV_LINKS[0].href}\"]`) as HTMLAnchorElement | null;
                first?.focus();
            }, 50);
        }
        return () => document.removeEventListener('keydown', onKey);
    }, [isMobileMenuOpen]);

    // Focus trap within the mobile menu when open
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const node = document.getElementById('mobile-menu');
        if (!node) return;
        const focusable = node.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [isMobileMenuOpen]);

    // Use stable NAV_LINKS constant directly

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-black/80 backdrop-blur-xl py-4" : "py-8 bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-12 h-12 group-hover:rotate-12 transition-transform duration-300">
                        <Image
                            src="/LilTurtleLogo.png"
                            alt="Lil Turtle - Premium Memecoin Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-2xl font-black tracking-tight text-white group-hover:text-primary-green transition-colors">
                        LIL TURTLE
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex nav-desktop-force items-center gap-8">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/#about' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-widest transition-colors relative group ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-1 left-0 h-[2px] bg-primary-green transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`} />
                            </Link>
                        );
                    })}

                    {isBuyPage && <ConnectButton />}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => {
                        try {
                            if (window.innerWidth < 768) setIsMobileMenuOpen(!isMobileMenuOpen);
                            else setIsMobileMenuOpen(false);
                        } catch (e) {
                            // ignore if window is not defined
                        }
                    }}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                    className="md:hidden nav-mobile-btn-force w-12 h-12 flex items-center justify-center text-white"
                >
                    <div className="space-y-2">
                        <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                        <span className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
                    </div>
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-xl z-40 pt-32 px-6"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute top-8 right-6 text-white p-2 hover:text-primary-green transition-colors"
                            aria-label="Close menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="flex flex-col gap-8 text-center mt-12">
                            {NAV_LINKS.map((link) => (
                                <Link key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-3xl font-black text-white hover:text-primary-green transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                            {isBuyPage && (
                                <div className="flex justify-center">
                                    <ConnectButton />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}

