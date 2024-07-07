"use client";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import { useState } from "react";
import Head from "next/head";

const jetbrainMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrainMono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <html lang="en">
      <Head>
        <title>Platform Angkutan</title>
      </Head>
      <body className={jetbrainMono.variable}>
        <SessionProvider>
          <div className="min-h-screen">
            <div className="flex">
              <MobileSidebar setter={setShowSidebar} />
              <Sidebar show={showSidebar} setter={setShowSidebar} />
              <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen">
                {children}
              </div>
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
