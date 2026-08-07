import { headers } from "next/headers";
import { Playfair_Display, Lato, Montserrat } from "next/font/google";
import GlobalBackground from "@/components/GlobalBackground";
import Providers from "@/components/Providers";
import { buildPageMetadata, OG_IMAGE, organizationJsonLd, SEO } from "@/lib/seo";
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

const homeMeta = buildPageMetadata({
  locale: "fr",
  path: "/",
  title: SEO.fr.title,
  description: SEO.fr.description,
  absoluteTitle: true,
});

export const metadata = {
  metadataBase: new URL("https://jamana-hub.vercel.app"),
  title: {
    default: SEO.fr.title,
    template: "%s — Jamana Hub",
  },
  description: SEO.fr.description,
  icons: {
    icon: "/Jamana_embleme_seul_transparent.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: homeMeta.alternates,
  openGraph: {
    ...homeMeta.openGraph,
    images: [OG_IMAGE],
  },
  twitter: homeMeta.twitter,
};

export default async function RootLayout({ children }) {
  const headerList = await headers();
  const locale =
    headerList.get("x-jamana-locale") === "en" ? "en" : "fr";
  const jsonLd = organizationJsonLd();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${playfair.variable} ${lato.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden font-body text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GlobalBackground />
        <div className="relative z-10 min-h-full">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
