import type { Metadata } from "next";
import { Pathway_Extreme } from "next/font/google";
import "./globals.css";

const pathway = Pathway_Extreme({
  variable: "--font-pathway",
  subsets: ["latin"],
  weight: ["400", "400"],
});

export const metadata: Metadata = {
  title: "Silici",
  description: "built by hungercrew.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pathway.variable} antialiased`}>{children}</body>
    </html>
  );
}
