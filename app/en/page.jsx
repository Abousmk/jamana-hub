import HomeView from "@/components/pages/HomeView";
import { buildPageMetadata, SEO } from "@/lib/seo";

export const metadata = buildPageMetadata({
  locale: "en",
  path: "/",
  title: SEO.en.title,
  description: SEO.en.description,
  absoluteTitle: true,
});

export default function EnHomePage() {
  return <HomeView />;
}
