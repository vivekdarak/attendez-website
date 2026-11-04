import type { Metadata } from "next";

import { LegalPage } from "@/components/layout/legal-page";
import legalPages from "@/data/legal-pages.json";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Attendez collects, uses, stores, and protects your data.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      subtitle="The least visited section of our website. We have all the relevant info for compliance team"
      document={legalPages.privacy}
    />
  );
}
