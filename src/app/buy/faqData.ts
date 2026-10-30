export interface FaqItem {
    question: string;
    answer: string;
    linkLabel?: string;
    linkHref?: string;
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: "What is Lil Turtle ($LILTURTLE)?",
        answer: "Lil Turtle is a community-driven memecoin on the Solana blockchain, launched on pump.fun in December 2025. No presale, no team allocation - just a turtle that never gives up, and a community that grows with it.",
    },
    {
        question: "How do I buy $LILTURTLE?",
        answer: "1) Install a Solana wallet like Phantom or Solflare. 2) Fund it with SOL (from an exchange or directly in your wallet). 3) Click BUY ON PUMP.FUN on this page and swap SOL for $LILTURTLE. That's it - you are a holder. Direct swaps on Jupiter will unlock automatically once the token graduates from the pump.fun bonding curve.",
    },
    {
        question: "What is the token contract address?",
        answer: "The official $LILTURTLE contract address is CVGcZCShuPZJKAHe3VE4FBR4jo6jpL9Z9xP9Wigmpump. It is always visible in the navbar, in the footer and right on this page with a one-click copy button - so you don't have to type it manually. Always double-check it before trading - the only links we post are on this website and our official X account.",
        linkLabel: "View on pump.fun",
        linkHref: "https://pump.fun/coin/CVGcZCShuPZJKAHe3VE4FBR4jo6jpL9Z9xP9Wigmpump",
    },
    {
        question: "Does $LILTURTLE have a transaction tax?",
        answer: "No. $LILTURTLE was launched on pump.fun with no buy or sell tax - every swap moves 100% of your tokens. As on any memecoin, Solana network fees still apply and are minimal.",
    },
    {
        question: "Where can I see the live price and chart?",
        answer: "Right here on this page - the chart and market data (price, market cap, liquidity, volume) update live via GeckoTerminal. The same data is available on pump.fun and Jupiter.",
    },
];
