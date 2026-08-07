import MentionsLegalesView from "@/components/pages/MentionsLegalesView";
import { buildPageMetadata, SEO } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/mentions-legales",
  title: SEO.en.legalTitle,
  description: SEO.en.legalDescription,
});

export default function EnMentionsLegalesPage() {
  return <MentionsLegalesView />;
}
