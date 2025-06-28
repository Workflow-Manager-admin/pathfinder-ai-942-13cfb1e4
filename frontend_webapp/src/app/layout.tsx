import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./shared/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillBridge – AI-Powered Learning",
  description: "Personalized learning recommendations, AI projects, and interactive chat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 min-h-screen`}
        style={{ minHeight: "100vh" }}
      >
        <Nav />
        <main className="pt-5 pb-8 flex flex-col min-h-[calc(100vh-48px)]">
          {children}
        </main>
      </body>
    </html>
  );
}
