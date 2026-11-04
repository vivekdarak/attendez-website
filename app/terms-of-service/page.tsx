import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import legalPages from "@/data/legal-pages.json";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms governing your use of Attendez's website and services.",
  alternates: { canonical: "/terms-of-service" },
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      subtitle="The stuff you agree to but never read – we made it human-readable anyway"
      document={legalPages.terms}
    />
  );
}
