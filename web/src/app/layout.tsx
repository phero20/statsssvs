import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/shared/Providers";

export const metadata: Metadata = {
  title: "DevStats",
  description: "Elite GitHub Statistics Dashboard",
};

import { Toaster } from "sonner";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import localFont from "next/font/local";

const satoshi = localFont({
  src: "../../public/fonts/Satoshi_Complete/Fonts/Variable/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} dark h-screen font-(family-name:--font-satoshi) antialiased`}
        style={{ colorScheme: "dark" }}
      >
        {/* <ErrorBoundary> */}
        <Providers>
          {children}
          <Toaster richColors position="top-right" />
        </Providers>
        {/* </ErrorBoundary> */}
      </body>
    </html>
  );
}
