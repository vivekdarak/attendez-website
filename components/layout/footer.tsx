import Link from "next/link";
import { Linkedin, Mail, Network } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface-muted">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Network className="h-4 w-4" />
              </span>
              <span className="text-lg">Attendez</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              AI consulting for B2B teams. We discover where AI actually fits your
              business - then build, automate, and scale.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services/website-ai" className="hover:text-foreground">
                  AI Website Creation
                </Link>
              </li>
              <li>
                <Link href="/services/seo-aeo-geo" className="hover:text-foreground">
                  SEO / AEO / GEO
                </Link>
              </li>
              <li>
                <Link href="/services/workflow-automation" className="hover:text-foreground">
                  Workflow Automation
                </Link>
              </li>
              <li>
                <Link href="/services/voice-agent" className="hover:text-foreground">
                  AI Voice Agents
                </Link>
              </li>
              <li>
                <Link href="/services/whatsapp-automation" className="hover:text-foreground">
                  WhatsApp AI
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About Vivek
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
            <div className="mt-5 flex items-center gap-3 text-muted-foreground">
              <a href="mailto:vivek@attendez.in" aria-label="Email" className="hover:text-foreground">
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vivekdarak"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>(c) {new Date().getFullYear()} Attendez. Vivek Darak. All rights reserved.</p>
          <p>Built with discovery, not just AI.</p>
        </div>
      </div>
    </footer>
  );
}
