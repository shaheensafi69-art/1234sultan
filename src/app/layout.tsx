import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingSupport from "@/components/FloatingSupport"; // کامپوننت دکمه‌های شناور

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sultan Online Service | Premium Digital Infrastructure",
  description: "Elite Social Media Marketing and Digital Services for global growth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-[#F8FAFC]`}>
        {/* قرار دادن FloatingSupport در اینجا باعث می‌شود 
          دکمه‌ها در تمام صفحات (لاگین، دشبورد، خدمات و...) 
          به صورت خودکار نمایش داده شوند.
        */}
        <main>
          {children}
        </main>
        
        <FloatingSupport />
      </body>
    </html>
  );
}