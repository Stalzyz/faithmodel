import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Poppins, Caveat, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap"
});
const poppins = Poppins({ 
  subsets: ["latin"], 
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap"
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Faith Model School — Every Great Future Begins With a Single Sketch",
  description: "Faith Model School. A place where curiosity is the first line, learning adds the color, and every child creates a masterpiece.",
  openGraph: {
    title: "Faith Model School",
    description: "A premium school experience unlike any other.",
    type: "website",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className={`
        ${inter.variable} 
        ${cormorant.variable} 
        ${poppins.variable} 
        ${caveat.variable} 
        ${manrope.variable} 
        antialiased 
        min-h-screen 
        flex 
        flex-col
        cursor-auto
      `} style={{ cursor: "auto" }}>
        {children}
      </body>
    </html>
  );
}
