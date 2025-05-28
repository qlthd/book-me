"use client";
import type { Metadata } from "next";
import "./globals.css";
import TRPCProvider from "../app/_trpc/Provider";
import { Lexend } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lexend.variable} antialiased`}>
        <SessionProvider>
          <TRPCProvider>{children}</TRPCProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
