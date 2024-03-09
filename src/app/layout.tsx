import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] , variable:"--font-inter" });

export const metadata: Metadata = {
  title: {
    template: '%s | store',
    default: 'dev-store',
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-zinc-950 text-zinc-50 antialiased" >
        {children}
      </body>
    </html>
  );
}
