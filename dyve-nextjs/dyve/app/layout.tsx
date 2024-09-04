import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import RainbowkitWrapper from "@/Layout/RainbowkitWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DYVE",
  description: "Powering financial inclusivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowkitWrapper>
          <LayoutWrapper>{children}</LayoutWrapper>
        </RainbowkitWrapper>
      </body>
    </html>
  );
}
