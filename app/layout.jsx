import { headers } from "next/headers";
import { Libre_Caslon_Display, Jost } from "next/font/google";
import GlobalBackground from "@/components/GlobalBackground";
import Providers from "@/components/Providers";
import { buildPageMetadata, OG_IMAGE, organizationJsonLd, SEO } from "@/lib/seo";
import "./globals.css";

const titleFont = Libre_Caslon_Display({
  variable: "--font-title",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodyFont = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang={locale} suppressHydrationWarning className="h-full antialiased">
      <body
        className={`${titleFont.variable} ${bodyFont.variable} min-h-full overflow-x-hidden font-body text-cream`}
      >
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
