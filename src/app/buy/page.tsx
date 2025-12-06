import { Metadata } from "next";
import BuyPageClient from "./BuyPageClient";

export const metadata: Metadata = {
    title: "Buy $LILTURTLE Token - Lil Turtle Memecoin on Solana",
    description: "Buy Lil Turtle ($LILTURTLE) token on Solana. Swap tokens instantly using Jupiter aggregator. Join the premium memecoin community.",
    keywords: ["buy Lil Turtle", "LILTURTLE token", "Solana memecoin", "Jupiter swap", "buy memecoin", "Solana token swap"],
    openGraph: {
        title: "Buy $LILTURTLE - Lil Turtle Token",
        description: "Swap and buy Lil Turtle token on Solana using Jupiter aggregator.",
        images: ["/logo.png"],
    },
};

export default function BuyPage() {
    return <BuyPageClient />;
}
