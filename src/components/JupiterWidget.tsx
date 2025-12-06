"use client";

import React, { useEffect } from "react";
import "@jup-ag/plugin/css";

export default function JupiterWidget() {
    useEffect(() => {
        // Dynamically import the plugin to avoid SSR issues
        import("@jup-ag/plugin").then((mod) => {
            const { init } = mod;
            init({
                displayMode: "integrated",
                integratedTargetId: "integrated-terminal",
                strictTokenList: false,
                formProps: {
                    initialInputMint: "So11111111111111111111111111111111111111112", // SOL
                    fixedOutputMint: true,
                    initialOutputMint: "14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop", // LIL TURTLE
                } as any,
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
            } as any);
        }).catch((err) => console.error("Failed to load Jupiter Plugin", err));
    }, []);

    return (
        <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-black/20">
            <div id="integrated-terminal" className="w-full h-full" />
        </div>
    );
}