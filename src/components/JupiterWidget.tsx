"use client";

import React, { useEffect } from "react";
import "@jup-ag/plugin/css";

export default function JupiterWidget() {
    useEffect(() => {
        // Capture original font size (usually 16px) to fix Jupiter pollution (which sets it to 10px)
        const html = document.documentElement;
        const originalFontSize = window.getComputedStyle(html).fontSize;

        // Dynamically import the plugin to avoid SSR issues
        import("@jup-ag/plugin").then((mod) => {
            const { init } = mod;
            const cfg: Record<string, unknown> = {
                displayMode: "integrated",
                integratedTargetId: "integrated-terminal",
                strictTokenList: false,
                formProps: {
                    initialInputMint: "So11111111111111111111111111111111111111112", // SOL
                    fixedOutputMint: true,
                    initialOutputMint: "CVGcZCShuPZJKAHe3VE4FBR4jo6jpL9Z9xP9Wigmpump", // LIL TURTLE
                } as Record<string, unknown>,
                // Custom Palette to match site theme
                palette: {
                    main: "#020402", // bg-dark
                    secondary: "#0a0f0a", // bg-card
                    original: "#00ff9d", // primary-green
                    line: "rgba(255, 255, 255, 0.08)",
                    button: "#00ff9d",
                    buttonText: "#020402",
                    text: "#ffffff",
                    subText: "#a1a1aa",
                },
                containerStyles: { zIndex: 100, height: "100%", width: "100%" },
            };
            init(cfg as unknown as object);
        }).catch((err) => console.error("Failed to load Jupiter Plugin", err));

        // Cleanup: Restore font size on unmount
        return () => {
            if (originalFontSize) {
                html.style.fontSize = originalFontSize;
            }
        };
    }, []);

    return (
        <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-black/20">
            <div id="integrated-terminal" className="w-full h-full" />
        </div>
    );
}