import ConfidentialiteView from "@/components/pages/ConfidentialiteView";
import { buildPageMetadata, SEO } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/confidentialite",
  title: SEO.en.privacyTitle,
  description: SEO.en.privacyDescription,
});

export default function EnConfidentialitePage() {
  return <ConfidentialiteView />;
}
