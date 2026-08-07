import MediaView from "@/components/pages/MediaView";
import { buildPageMetadata, SEO } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/media",
  title: SEO.en.mediaTitle,
  description: SEO.en.mediaDescription,
});

export default function EnMediaPage() {
  return <MediaView />;
}
