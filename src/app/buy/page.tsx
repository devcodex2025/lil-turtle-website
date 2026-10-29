import { Metadata } from "next";
import BuyPageClient from "./BuyPageClient";
import { fetchTokenInfo } from "@/services/tokenData";

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:3000' : 'https://www.lilturtle.fun';

export const metadata: Metadata = {
    title: "Buy $LILTURTLE Token - Lil Turtle Memecoin on Solana",
    description: "Buy Lil Turtle ($LILTURTLE) token on Solana live on pump.fun or swap instantly on Jupiter. Live price, chart and market data. Join the community memecoin.",
    keywords: ["buy Lil Turtle", "LILTURTLE token", "Solana memecoin", "pump.fun", "Jupiter swap", "buy memecoin", "Solana token swap"],
    alternates: {
        canonical: `${baseUrl}/buy`,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
    openGraph: {
        title: "Buy $LILTURTLE - Lil Turtle Token",
        description: "Buy Lil Turtle token on Solana live on pump.fun or swap instantly on Jupiter.",
        url: `${baseUrl}/buy`,
        images: ["/og-buy.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Buy $LILTURTLE - Lil Turtle Token",
        description: "Buy Lil Turtle token on Solana live on pump.fun or swap instantly on Jupiter.",
        images: ["/og-buy.png"],
    },
};

export default async function BuyPage() {
    const tokenInfo = await fetchTokenInfo();
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebPage",
                                "@id": `${baseUrl}/buy#webpage`,
                                url: `${baseUrl}/buy`,
                                name: "Buy $LILTURTLE Token - Lil Turtle Memecoin on Solana",
                                description: "Buy Lil Turtle ($LILTURTLE) token on Solana live on pump.fun or swap instantly on Jupiter.",
                                isPartOf: { "@id": `${baseUrl}/#website` },
                                about: { "@id": `${baseUrl}/#organization` },
                                inLanguage: "en",
                            },
                            {
                                "@type": "BreadcrumbList",
                                name: "Breadcrumb",
                                itemListElement: [
                                    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
                                    { "@type": "ListItem", position: 2, name: "Buy Token", item: `${baseUrl}/buy` },
                                ],
                            },
                        ],
                    }),
                }}
            />
            <BuyPageClient initialTokenInfo={tokenInfo} />
        </>
    );
}
