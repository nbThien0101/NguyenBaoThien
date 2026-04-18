import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/MotionProvider";
import Navbar from "@/components/Navbar";
import ScrollRevealObserver from "@/components/ScrollRevealObserver";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thien Portfolio",
  description: "Personal portfolio built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="reveal-ready">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="page-bg" aria-hidden="true" />
        <Navbar />
        <main className="site-main">
          <ScrollRevealObserver />
          <MotionProvider>{children}</MotionProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
