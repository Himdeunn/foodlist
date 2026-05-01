import type { Metadata } from "next";
import "./styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Montserrat } from "next/font/google";
import { Stalinist_One, Pridi, Zen_Dots, Goldman } from "next/font/google";
import "locomotive-scroll/dist/locomotive-scroll.css";

import Navbar from "@/app/layouts/Navbar"
import Preloader from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const stalinist = Stalinist_One({
  subsets: ["latin"],
  variable: "--font-stalinistone",
  weight: "400",
});

const pridi = Pridi({
  subsets: ["latin"],
  variable: "--font-pridi",
  weight: "400",
});

const zendots = Zen_Dots({
  subsets: ["latin"],
  variable: "--font-zendots",
  weight: "400",
});

const goldman = Goldman({
  subsets: ["latin"],
  variable: "--font-goldman",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bento Hub | Modern Food Management",
  description: "Heyy!! You wanna search some food in Indonesia?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Bento Hub | Modern Food Management</title>
        <meta
          name="keywords"
          content="Bento Hub, Food Management, Recipe Archive"
        />
        <meta
          name="description"
          content="Bento Hub – The official platform for your extraordinary culinary journey. Managed by Tegar Aprilian."
        />
        {/* <!-- Favicon --> */}
        <link
          rel="shortcut icon"
          href="/img/icon/favicon.png"
          type="image/jpeg"
        />
      </head>
      <body
        data-scroll-container
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${stalinist.variable} ${pridi.variable} ${zendots.variable} ${goldman.variable} antialiased`}
      >
        <Preloader />
        <div className="antialiased">{children}</div>
        <Navbar />
      </body>
    </html>
  );
}
