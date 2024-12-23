import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Trust Social - Modern Testimonial Platform",
  description:
    "Collect, organize, and share testimonials effortlessly with Trust Social.",
  openGraph: {
    title: "Trust Social - Modern Testimonial Platform",
    description:
      "Collect, organize, and share testimonials effortlessly with Trust Social.",
    url: "https://trustsocial.vercel.app",
    images: [
      {
        url: "https://trustsocial.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Trust Social - Showcase Testimonials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trust Social - Modern Testimonial Platform",
    description:
      "Collect, organize, and share testimonials effortlessly with Trust Social.",
    images: ["https://trustsocial.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${oswald.variable} antialiased min-h-screen flex`}
      >
        <SessionProvider>
          {children}
          <Toaster richColors />
        </SessionProvider>
      </body>
    </html>
  );
}
