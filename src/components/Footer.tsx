"use client";

import Image from "next/image";

export default function Footer() {
    const socialLinks = [
        {
            name: "Boop",
            url: "https://boop.fun/tokens/14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop",
            icon: (
                <div className="relative w-6 h-6">
                    <Image src="/boop-logo-32x32.png" alt="Boop.fun - Memecoin Launchpad" fill className="object-contain" />
                </div>
            ),
        },
        {
            name: "Twitter",
            url: "https://x.com/lilturtlenft",
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="relative py-16 px-6 border-t border-white/5 bg-black/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <a href="/" className="flex items-center gap-3 mb-4 group">
                            <div className="relative w-10 h-10 group-hover:rotate-12 transition-transform duration-300">
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
                        </a>
                        <p className="text-gray-400">
                            The most stylish memecoin in your portfolio. Community-driven, unique, and built for the future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-4">
                            Explore
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/#about" className="text-gray-400 hover:text-primary-green transition-colors">About</a>
                            </li>
                            <li>
                                <a href="/nfts" className="text-gray-400 hover:text-primary-green transition-colors">NFT Gallery</a>
                            </li>
                            <li>
                                <a href="/buy" className="text-gray-400 hover:text-primary-green transition-colors">Buy Token</a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-4">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-white hover:text-primary-green hover:border-primary-green transition-all hover:scale-110"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/5 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Lil Turtle. All rights reserved.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        Small steps matter. Become better.
                    </p>
                </div>
            </div>
        </footer>
    );
}
