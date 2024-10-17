import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import Providers from "@/components/app/providers";
import { APP_NAME, APP_DESCRIPTION } from "@/constants/app";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
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
