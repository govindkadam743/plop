import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import './globals.css';
import { Toaster } from "sonner";

const monoSans = Mona_Sans({
  variable: "--font-mono-sans",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "plop",
  description: "An AI platform for preapring mock interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${ monoSans.className } antialiased pattern `}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
