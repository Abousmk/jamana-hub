"use client";

import { LangProvider } from "@/lib/i18n";
import { TallyProvider } from "@/components/TallyModal";

export default function Providers({ children }) {
  return (
    <LangProvider>
      <TallyProvider>{children}</TallyProvider>
    </LangProvider>
  );
}
