"use client";

import { useLang } from "@/lib/i18n";
import LegalDocument from "@/components/LegalDocument";

export default function ConfidentialitePage() {
  const { t } = useLang();
  return <LegalDocument doc={t.privacy} />;
}
