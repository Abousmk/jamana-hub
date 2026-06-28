import { Playfair_Display, Lato, Montserrat } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-util",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Jamana Hub — Foi. Ambition. Excellence.",
  description:
    "Réseau privé sélectif pour jeunes musulmans professionnels et entrepreneurs au Canada.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${lato.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-green-abyss font-body text-cream">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
