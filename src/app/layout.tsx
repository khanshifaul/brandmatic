import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/colors.css";
import "./globals.css";
import ClientLayout from './components/organisms/ClientLayout';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChromaFlow E-commerce",
  description: "A modern e-commerce platform with dynamic theming",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <div className="flex flex-col min-h-screen">
          <ClientLayout>
            <main className="grow">
              {children}
            </main>
            <footer className="mt-auto py-8 bg-background-subtle border-t border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">About ChromaFlow</h3>
                    <p className="text-foreground-muted">
                      A modern e-commerce platform with dynamic theming capabilities.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-foreground-muted">
                      <li>Products</li>
                      <li>Theme Settings</li>
                      <li>Contact</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Connect</h3>
                    <div className="flex space-x-4 text-foreground-muted">
                      <span>Twitter</span>
                      <span>GitHub</span>
                      <span>LinkedIn</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-border-subtle text-center text-foreground-muted">
                  <p>&copy; {new Date().getFullYear()} ChromaFlow. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </ClientLayout>
        </div>
      </body>
    </html>
  );
}
