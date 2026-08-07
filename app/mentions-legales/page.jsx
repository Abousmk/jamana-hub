"use client";

import { useLang } from "@/lib/i18n";
import LegalDocument from "@/components/LegalDocument";

export default function MentionsLegalesPage() {
  const { t } = useLang();
  return <LegalDocument doc={t.legalNotice} />;
}
