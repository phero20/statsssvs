import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";

export const metadata: Metadata = {
  title: "DevStats",
  description: "Elite GitHub Statistics Dashboard",
};

import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <Providers>
            {children}
            <Toaster richColors position="top-right" />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
