import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { AuthBootstrap } from "@/components/shared/AuthBootstrap";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const syne = Syne({ 
  subsets: ["latin"], 
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nexora - Where Ideas Meet Community",
  description: "A hyper-local idea sharing and community networking platform for college students in Kakinada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable} dark`}>
      <body className="bg-[#05050F] text-[#F8FAFC] antialiased min-h-screen flex flex-col relative">
        <AnimatedBackground />
        <AuthBootstrap />
        <Toaster position="top-right" toastOptions={{
          style: {
            background: "#100B1E",
            color: "#F8FAFC",
            border: "1px solid rgba(255,255,255,0.1)",
          }
        }} />
        <Navbar />
        <div className="flex flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 mb-10 relative z-10">
          <Sidebar className="hidden lg:block w-64 shrink-0 mr-8" />
          <main className="flex-1 w-full relative">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
