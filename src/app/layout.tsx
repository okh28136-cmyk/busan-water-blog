import type { Metadata } from "next";
import { Manrope, Noto_Sans_KR } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "부산생수배달 - 블로그",
  description: "부산지역 생수배달 전문. 네이버 검색 상위 노출에 최적화된 게시글.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${manrope.variable} ${notoSansKr.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning className="bg-background text-on-background font-body-md text-body-md antialiased pt-[80px]">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
