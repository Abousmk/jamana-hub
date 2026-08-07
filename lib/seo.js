import {
  SITE_URL,
  absoluteUrl,
  languageAlternates,
} from "@/lib/locale";

export { SITE_URL };

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Jamana Hub — Foi · Ambition · Excellence",
};

export const SEO = {
  fr: {
    title:
      "Jamana Hub — Réseau de jeunes professionnels et entrepreneurs musulmans au Québec",
    description:
      "Réseau de jeunes professionnels et entrepreneurs musulmans au Québec et à Montréal. Networking, entrepreneuriat et valeurs partagées pour bâtir sans se renier.",
    mediaTitle: "Média",
    mediaDescription:
      "Jamana Media : série documentaire sur des jeunes musulmans qui réussissent. Foi, ambition et excellence au Québec et à Montréal.",
    postulerTitle: "Postuler",
    postulerDescription:
      "Postulez à Jamana Hub, le réseau de professionnels et entrepreneurs musulmans au Québec. Rejoignez une communauté fondée sur vos valeurs.",
  },
  en: {
    title:
      "Jamana Hub — Network of young Muslim professionals and entrepreneurs in Quebec",
    description:
      "Network of young Muslim professionals and entrepreneurs in Quebec and Montreal. Networking, entrepreneurship, and shared values to build without compromise.",
    mediaTitle: "Media",
    mediaDescription:
      "Jamana Media: a documentary series on young Muslims succeeding with their values. Faith, ambition, and excellence in Quebec and Montreal.",
    postulerTitle: "Apply",
    postulerDescription:
      "Apply to Jamana Hub, the network for Muslim professionals and entrepreneurs in Quebec. Join a community grounded in shared values.",
  },
};

/**
 * @param {{ locale: "fr"|"en", path: string, title?: string, description?: string, absoluteTitle?: boolean }} opts
 */
export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}) {
  const copy = SEO[locale] || SEO.fr;
  const pageTitle = title ?? copy.title;
  const pageDescription = description ?? copy.description;
  const url = absoluteUrl(path, locale);
  const ogLocale = locale === "en" ? "en_CA" : "fr_CA";
  const ogTitle = absoluteTitle || pageTitle.includes("Jamana Hub")
    ? pageTitle
    : `${pageTitle} — Jamana Hub`;

  return {
    title: absoluteTitle ? { absolute: pageTitle } : pageTitle,
    description: pageDescription,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: ogTitle,
      description: pageDescription,
      url,
      siteName: "Jamana Hub",
      locale: ogLocale,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: pageDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Jamana Hub",
    url: SITE_URL,
    logo: `${SITE_URL}/Jamana_embleme_seul_transparent.png`,
    description: SEO.fr.description,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Quebec",
    },
    sameAs: [
      "https://www.instagram.com/jamanahub/",
      "https://www.threads.net/@jamanahub",
    ],
  };
}
