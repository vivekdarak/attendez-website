const LOGO_CLASS = "h-6 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0";

export function ToolLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
      <img src="/logos/n8n.svg" alt="n8n" className={LOGO_CLASS} />
      <img src="/logos/whatsapp.svg" alt="WhatsApp API" className={LOGO_CLASS} />
      <img src="/logos/postgresql.svg" alt="Postgres" className={LOGO_CLASS} />
      <span className="text-lg font-bold leading-none text-foreground/70">ChatGPT</span>
      <img src="/logos/anthropic.svg" alt="Claude" className={LOGO_CLASS} />
      <img src="/logos/github.svg" alt="GitHub" className={LOGO_CLASS} />
      <div className="flex items-center gap-1.5">
        <img src="/logos/google.svg" alt="Google" className={LOGO_CLASS} />
        <span className="text-lg font-bold leading-none text-foreground/70">APIs</span>
      </div>
    </div>
  );
}
