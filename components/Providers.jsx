"use client";

import { LangProvider } from "@/lib/i18n";
import IntroGate from "@/components/IntroGate";
import { TallyProvider } from "@/components/TallyModal";

export default function Providers({ children }) {
  return (
    <LangProvider>
      <IntroGate />
      <TallyProvider>{children}</TallyProvider>
    </LangProvider>
  );
}
