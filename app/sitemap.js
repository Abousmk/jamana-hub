import { SITE_URL } from "@/lib/seo";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/media", changeFrequency: "monthly", priority: 0.8 },
  { path: "/postuler", changeFrequency: "monthly", priority: 0.9 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.3 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.flatMap(({ path, changeFrequency, priority }) => {
    const frUrl = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
    const enUrl = path === "/" ? `${SITE_URL}/en` : `${SITE_URL}/en${path}`;

    return [
      {
        url: frUrl,
        lastModified,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            "fr-CA": frUrl,
            "en-CA": enUrl,
          },
        },
      },
      {
        url: enUrl,
        lastModified,
        changeFrequency,
        priority: priority * 0.95,
        alternates: {
          languages: {
            "fr-CA": frUrl,
            "en-CA": enUrl,
          },
        },
      },
    ];
  });
}
