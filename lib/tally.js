export const TALLY_FORM_IDS = {
  fr: "442AOX",
  en: "ZjAgRa",
};

/**
 * @param {"fr" | "en"} lang
 * @param {{ alignLeft?: boolean; hideTitle?: boolean; dynamicHeight?: boolean }} [opts]
 */
export function getTallyEmbedSrc(lang, opts = {}) {
  const {
    alignLeft = true,
    hideTitle = true,
    dynamicHeight = true,
  } = opts;
  const id = TALLY_FORM_IDS[lang] ?? TALLY_FORM_IDS.fr;
  const params = new URLSearchParams({ transparentBackground: "1" });
  if (alignLeft) params.set("alignLeft", "1");
  if (hideTitle) params.set("hideTitle", "1");
  if (dynamicHeight) params.set("dynamicHeight", "1");
  return `https://tally.so/embed/${id}?${params.toString()}`;
}
