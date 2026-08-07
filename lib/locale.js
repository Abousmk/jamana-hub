export const SITE_URL = "https://jamana-hub.vercel.app";
export const LOCALES = ["fr", "en"];
export const DEFAULT_LOCALE = "fr";

/** @param {string} pathname */
export function getLocaleFromPathname(pathname) {
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return "fr";
}

/** @param {string} pathname */
export function stripLocalePrefix(pathname) {
  if (!pathname || pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname;
}

/**
 * Prefix an internal href for the given locale.
 * Preserves query string and hash (e.g. /#hub → /en#hub).
 * @param {string} href
 * @param {"fr"|"en"} locale
 */
export function withLocale(href, locale) {
  if (!href || href.startsWith("http") || href.startsWith("mailto:")) {
    return href;
  }

  const match = href.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  let pathname = match?.[1] || "/";
  const search = match?.[2] || "";
  const hash = match?.[3] || "";

  pathname = stripLocalePrefix(pathname || "/");
  if (!pathname) pathname = "/";

  const localized =
    locale === "en" ? (pathname === "/" ? "/en" : `/en${pathname}`) : pathname;

  return `${localized}${search}${hash}`;
}

/** Absolute URL for a locale-aware path (path without locale prefix). */
export function absoluteUrl(path = "/", locale = "fr") {
  const localized = withLocale(path, locale);
  if (localized === "/") return SITE_URL;
  return `${SITE_URL}${localized}`;
}

/**
 * hreflang map for a path without locale prefix (e.g. "/", "/media").
 * @param {string} path
 */
export function languageAlternates(path = "/") {
  return {
    "fr-CA": absoluteUrl(path, "fr"),
    "en-CA": absoluteUrl(path, "en"),
    "x-default": absoluteUrl(path, "fr"),
  };
}
