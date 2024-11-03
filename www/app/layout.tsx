import type { Metadata } from "next";
import { cn } from "@/utils/styles";
import "./globals.css";
import Providers from "@/app/components/providers/providers";
import { APP_NAME, APP_HEADING } from "@/constants/app";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_HEADING,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn("min-h-screen bg-background font-sans antialiased")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
