"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TOKEN_ADDRESS } from "@/services/tokenData";

interface TokenAddressProps {
    /** "compact" shows a shortened address chip, "wide" shows the full address stretched to its container, "full" shows the complete address with a label */
    variant?: "compact" | "wide" | "full";
    /** Optional mono prefix shown before the address (used with variant="wide", e.g. "CA") */
    label?: string;
}

function CopyIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <rect x="9" y="9" width="11" height="11" rx="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

/** Glass-styled token contract address chip with one-click copy-to-clipboard. */
export default function TokenAddress({ variant = "compact", label }: TokenAddressProps) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | null>(null);

    useEffect(() => () => {
        if (timer.current) window.clearTimeout(timer.current);
    }, []);

    const copy = useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(TOKEN_ADDRESS);
            } else {
                const ta = document.createElement("textarea");
                ta.value = TOKEN_ADDRESS;
                ta.style.position = "fixed";
                ta.style.opacity = "0";
                document.body.appendChild(ta);
                ta.select();
                document.execCommand("copy");
                document.body.removeChild(ta);
            }
            setCopied(true);
            if (timer.current) window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 2000);
        } catch {
            // clipboard unavailable - silently ignore
        }
    }, []);

    if (variant === "full") {
        return (
            <div
                className="glass-card w-fit flex items-center gap-3 rounded-xl px-4 py-3 border border-primary-gold/20"
                aria-label="Token contract address"
            >
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-primary-green bg-primary-green/10 px-2 py-1 rounded">
                    CA
                </span>
                <span
                    title={TOKEN_ADDRESS}
                    className="font-mono text-[11px] md:text-xs text-gray-200 whitespace-nowrap leading-relaxed"
                >
                    {TOKEN_ADDRESS}
                </span>
                <button
                    onClick={copy}
                    aria-label="Copy token address"
                    title="Copy address"
                    className={`shrink-0 flex items-center gap-2 rounded-lg px-2.5 py-2 border border-white/10 transition-all duration-300 ${
                        copied
                            ? "text-primary-green border-primary-green/50 bg-primary-green/10"
                            : "text-white hover:text-primary-green hover:border-primary-green/50 hover:bg-white/5"
                    }`}
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">
                        {copied ? "Copied!" : "Copy"}
                    </span>
                </button>
            </div>
        );
    }

    const short = `${TOKEN_ADDRESS.slice(0, 4)}…${TOKEN_ADDRESS.slice(-4)}`;

    if (variant === "wide") {
        return (
            <div
                className="glass-card w-fit flex items-center gap-3 rounded-xl pl-4 pr-2 py-2.5 border border-white/10"
                aria-label="Token contract address"
            >
                {label && (
                    <span className="font-mono text-[10px] md:text-[11px] text-gray-500 whitespace-nowrap">
                        {label} -
                    </span>
                )}
                <span
                    title={TOKEN_ADDRESS}
                    className="font-mono text-[10px] md:text-[11px] text-gray-200 whitespace-nowrap"
                >
                    {TOKEN_ADDRESS}
                </span>
                <button
                    onClick={copy}
                    aria-label="Copy token address"
                    title="Copy address"
                    className={`shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 transition-all duration-300 ${
                        copied
                            ? "text-primary-green border-primary-green/50 bg-primary-green/10"
                            : "text-white hover:text-primary-green hover:border-primary-green/50 hover:bg-white/5"
                    }`}
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={copy}
            aria-label="Copy token contract address"
            title={`Click to copy: ${TOKEN_ADDRESS}`}
            className={`inline-flex items-center gap-2 glass-card rounded-lg px-2.5 py-1.5 font-mono text-[11px] whitespace-nowrap transition-all duration-300 border ${
                copied
                    ? "text-primary-green border-primary-green/50 bg-primary-green/10"
                    : "text-gray-300 hover:text-primary-green hover:scale-105"
            }`}
        >
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-primary-green" />
            <span>{copied ? "Copied!" : short}</span>
            <span className={copied ? "text-primary-green" : "text-gray-500"}>
                {copied ? <CheckIcon /> : <CopyIcon />}
            </span>
        </button>
    );
}
