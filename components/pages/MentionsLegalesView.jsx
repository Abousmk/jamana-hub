"use client";

import { useLang } from "@/lib/i18n";
import LegalDocument from "@/components/LegalDocument";

export default function MentionsLegalesView() {
  const { t } = useLang();
  return <LegalDocument doc={t.legalNotice} />;
}
