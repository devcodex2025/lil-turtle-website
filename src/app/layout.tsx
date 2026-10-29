import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const isDev = process.env.NODE_ENV === 'development';
const baseUrl = isDev ? 'http://localhost:3000' : 'https://www.lilturtle.fun';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  title: "Lil Turtle - Community Memecoin on Solana",
  description: "Join the elite Lil Turtle community. Community-driven memecoin on Solana blockchain. Swap instantly on Jupiter and join the movement.",
  keywords: [
    "Lil Turtle",
    "memecoin",
    "Solana memecoin",
    "crypto",
    "blockchain",
    "LILTURTLE token",
    "$LILTURTLE",
    "pump.fun",
    "Jupiter swap",
    "memecoin launch"
  ],
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
    title: "Lil Turtle - Community Memecoin on Solana",
    description: "Join the elite Lil Turtle community. Community-driven memecoin on Solana.",
    url: baseUrl,
    siteName: "Lil Turtle",
    images: [
      {
        url: `${baseUrl}/og-home.png`,
        width: 1200,
        height: 630,
        alt: "Lil Turtle - Community Memecoin on Solana",
      }
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil Turtle - Community Memecoin on Solana",
    description: "Join the elite Lil Turtle community on Solana. Community-driven memecoin.",
    images: [`${baseUrl}/og-home.png`],
    site: "@lilturtlenft",
    creator: "@lilturtlenft",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth force-platform-font">
      <body className={`${outfit.variable} font-sans antialiased bg-[#050505] text-white selection:bg-primary-gold selection:text-black overflow-x-hidden`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${baseUrl}/#organization`,
                  name: "Lil Turtle",
                  url: baseUrl,
                  logo: `${baseUrl}/LilTurtleLogo.png`,
                  sameAs: ["https://x.com/lilturtlenft"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  url: baseUrl,
                  name: "Lil Turtle",
                  publisher: { "@id": `${baseUrl}/#organization` },
                },
              ],
            }),
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
