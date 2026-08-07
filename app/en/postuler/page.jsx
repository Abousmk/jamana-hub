import PostulerView from "@/components/pages/PostulerView";
import { buildPageMetadata, SEO } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/postuler",
  title: SEO.en.postulerTitle,
  description: SEO.en.postulerDescription,
});

export default function EnPostulerPage() {
  return <PostulerView />;
}
