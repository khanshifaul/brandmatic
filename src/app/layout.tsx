import type { Metadata } from "next";
import "./globals.css";
import "./styles/colors.css";
import { Providers } from "@/components/providers";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "ChromaFlow - Modern E-commerce",
  description: "A modern e-commerce application with dynamic theming capabilities",
  keywords: ["e-commerce", "shopping", "online store", "dynamic theme", "modern UI"],
  authors: [{ name: "Your Name" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ChromaFlow",
    title: "ChromaFlow - Modern E-commerce",
    description: "A modern e-commerce application with dynamic theming capabilities",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ChromaFlow",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChromaFlow - Modern E-commerce",
    description: "A modern e-commerce application with dynamic theming capabilities",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
