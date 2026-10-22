"use client";

import Script from "next/script";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

type PreferredSourceClient = {
  init: (options: { theme: "light"; lang: string }) => void;
  addPreferredSource: () => void;
};

export function PreferredSourceButton() {
  const client = useRef<PreferredSourceClient | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  function initialize() {
    const googleWindow = window as typeof window & {
      PREFERRED_SOURCE?: Array<(sdk: PreferredSourceClient) => void>;
    };

    (googleWindow.PREFERRED_SOURCE = googleWindow.PREFERRED_SOURCE || []).push((sdk) => {
      sdk.init({ theme: "light", lang: "en" });
      client.current = sdk;
      setStatus("ready");
    });
  }

  return (
    <div className="mt-14 border-t border-border pt-8">
      <Script
        id="google-preferred-source"
        src="https://news.google.com/swg/js/v1/publisher.js"
        preferred-sources-control="manual"
        strategy="afterInteractive"
        onReady={initialize}
        onError={() => setStatus("error")}
      />
      <p className="mb-4 text-sm text-muted-foreground">
        Found this useful? Add Attendez as a preferred source on Google.
      </p>
      <Button
        type="button"
        variant="outline"
        disabled={status !== "ready"}
        onClick={() => client.current?.addPreferredSource()}
      >
        Add to preferred sources on Google
      </Button>
      {status === "error" ? (
        <p role="status" className="mt-3 text-sm text-muted-foreground">
          Google&apos;s button couldn&apos;t load. Please refresh to try again.
        </p>
      ) : null}
    </div>
  );
}
