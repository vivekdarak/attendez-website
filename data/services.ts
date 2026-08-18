import {
  BotMessageSquare,
  GlobeLock,
  MessageCircleCode,
  SearchCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug:
    | "website-ai"
    | "seo-aeo-geo"
    | "workflow-automation"
    | "voice-agent"
    | "whatsapp-automation";
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  outcomes: string[];
  ideal: string;
  pageContent?: {
    problem: string[];
    promise: string[];
    deliverables: Array<{
      title: string;
      body: string;
    }>;
    process: Array<{
      title: string;
      body: string;
    }>;
    whyItMatters: string[];
    idealFor: string[];
    faqs: Array<{
      q: string;
      a: string;
    }>;
    workExamples?: Array<{
      name: string;
      domain: string;
      href: string;
      image: string;
      alt: string;
      description: string;
    }>;
    heroImage?: {
      image: string;
      alt: string;
    };
    finalCta: {
      title: string;
      description: string;
      cta: string;
    };
  };
};

export const services: Service[] = [
  {
    slug: "website-ai",
    title: "AI-Built Websites Your Business Actually Owns",
    short: "Fast business websites built for campaigns, tracking, AI discovery, and easy future changes.",
    description:
      "We design, build, host, and maintain fast marketing-ready websites on modern code. Your website can be updated through GitHub, improved with ChatGPT or Claude, and prepared for SEO, AEO, GEO, and ad conversion tracking from day one.",
    icon: GlobeLock,
    outcomes: [
      "Brand-aligned design, mobile-first",
      "SSR for SEO + fast Core Web Vitals",
      "CMS or no-code admin where it makes sense",
      "Analytics, forms, and integrations wired in",
    ],
    ideal: "Founders, agencies, and B2B teams that need a credible web presence - fast.",
    pageContent: {
      problem: [
        "Many business websites are built like digital brochures. They look acceptable on launch day, but they are not ready for actual marketing.",
        "When campaigns begin, gaps start showing up. Form submissions are not tracked properly. Button clicks are not measured. Meta and Google conversions are missing or unreliable. Pages load slowly on mobile. Content is difficult to update. Every small change requires going back to the same vendor.",
        "For a growing business, that creates friction. Your website should support lead generation, ad campaigns, search visibility, AI discovery, and fast iteration. It should not become another dependency that slows your marketing team down.",
      ],
      promise: [
        "Attendez builds websites that are ready for marketing, tracking, AI discovery, and future changes from day one.",
        "We use AI to speed up design and development, but the outcome is not a throwaway AI-generated page. You get a structured, production-ready website with clean code, clear pages, fast loading, tracking-ready events, and a setup that your business can continue to use and improve.",
        "The website can be hosted, maintained, and updated by us, but the code remains organized in GitHub so your business is not locked into a closed setup.",
      ],
      deliverables: [
        {
          title: "Website Design And Build",
          body: "We create a clean, professional website based on your business, audience, services, and conversion goals. The focus is not only on how the website looks, but also on how clearly it explains your offer and guides visitors toward enquiry or action.",
        },
        {
          title: "Fast-Loading Pages",
          body: "The website is built with performance in mind. We keep the stack lightweight, optimize page structure, and use fast asset delivery so your pages load quickly across devices, especially for paid campaign traffic and mobile users.",
        },
        {
          title: "Campaign And Conversion Tracking",
          body: "We can configure tracking for important actions such as form submissions, phone clicks, WhatsApp clicks, CTA clicks, and key landing page interactions. This can include Google Analytics events, Google Ads conversions, Meta Pixel events, and other campaign measurement needs.",
        },
        {
          title: "SEO, AEO, And GEO-Ready Structure",
          body: "The website is structured so search engines and AI answer engines can better understand your business, services, locations, and expertise. This includes clean page structure, metadata, headings, internal links, and content that supports traditional search as well as AI-driven discovery.",
        },
        {
          title: "Forms And Lead Capture",
          body: "We set up enquiry forms and lead flows based on your business needs. Form submissions can be connected to email, sheets, CRM tools, automation workflows, or other systems depending on the setup you choose.",
        },
        {
          title: "GitHub-Based Code Ownership",
          body: "Your website code can be maintained in a GitHub repository, giving your business a clean and accessible source of truth. If you ever want to copy, fork, transfer, or involve another developer, the code is available in an organized way instead of being handed over as a messy compressed file.",
        },
        {
          title: "Hosting And Deployment",
          body: "We help set up hosting and deployment so your website can go live properly. Depending on the project, this may include static hosting, modern app hosting, custom domain setup, SSL, environment variables, and deployment workflows.",
        },
        {
          title: "Easy Future Changes",
          body: "Because the website is built as clean code, future updates are easier to manage. You can ask us to make changes, involve your own developer, or use AI tools like ChatGPT or Claude to help update content and code with proper review.",
        },
      ],
      process: [
        {
          title: "Discovery",
          body: "We start by understanding your business, current website, target audience, marketing goals, and the role the website needs to play. This helps us decide whether you need a simple static website, a service-led marketing site, landing pages, integrations, or something more advanced.",
        },
        {
          title: "Content And Page Planning",
          body: "We map the important pages, user journey, calls to action, and content hierarchy. The goal is to make sure visitors understand what you do, why it matters, and how to take the next step.",
        },
        {
          title: "Design And Build",
          body: "We design and build the website using a modern stack suited to your requirements. AI helps speed up production, but the structure, content flow, implementation, and quality checks are handled with human judgment.",
        },
        {
          title: "Tracking And Integrations",
          body: "We configure the required forms, analytics, conversion events, pixels, and integrations. This makes the website useful for campaigns, reporting, and future automation instead of being just a static online presence.",
        },
        {
          title: "Hosting And Launch",
          body: "We deploy the website, connect the domain, test the pages, check responsiveness, and make sure the important actions work before launch.",
        },
        {
          title: "Ongoing Changes",
          body: "After launch, we can continue making changes based on your requirements, campaign learnings, new services, SEO needs, or conversion improvements.",
        },
      ],
      whyItMatters: [
        "A business website should be easy to market, easy to measure, and easy to improve.",
        "When tracking is missing, you cannot understand which campaigns are working. When pages are slow, visitors drop off before they enquire. When the code is locked away, every future change becomes dependent on one vendor. When the site is not structured well, search engines and AI tools struggle to understand what your business does.",
        "Our approach gives you a website that works as part of your marketing system. It can support ads, SEO, AI discovery, lead generation, analytics, and future iterations without forcing you into unnecessary complexity.",
      ],
      idealFor: [
        "B2B service businesses that need a serious website for lead generation",
        "Founders who want to launch quickly without compromising ownership",
        "Agencies that need fast website execution for clients",
        "Consultants and professional service providers",
        "Businesses running Google or Meta campaigns",
        "Teams that want their website to be easier to update over time",
        "Companies that want a modern alternative to slow, plugin-heavy website setups",
      ],
      workExamples: [
        {
          name: "Goodtimes",
          domain: "goodtimesco.in",
          href: "https://goodtimesco.in/",
          image: "attendez-website/goodtimes-website-screenshot.png",
          alt: "Goodtimes website homepage built by Attendez",
          description: "A content-led hospitality and lifestyle website built for fast browsing, clean presentation, and future updates.",
        },
        {
          name: "Dantam Dental Care",
          domain: "dantamdentalcare.com",
          href: "https://dantamdentalcare.com/",
          image: "attendez-website/Dantam-website-screenshot.png",
          alt: "Dantam Dental Care website homepage built by Attendez",
          description: "A service website for a dental clinic, structured for trust, enquiries, and clear patient-facing information.",
        },
        {
          name: "Cooperage The Bar School",
          domain: "cooperagetbs.cloud",
          href: "https://cooperagetbs.cloud/",
          image: "attendez-website/cooperage-website-screenshot.png",
          alt: "Cooperage The Bar School website homepage built by Attendez",
          description: "A training institute website built to explain courses, support admissions, and present a credible brand experience.",
        },
      ],
      heroImage: {
        image: "attendez-website/AI-genereated-website-hero.png",
        alt: "AI-assisted website design workflow shown across desktop and mobile screens",
      },

      faqs: [
        {
          q: "Do I own the website code?",
          a: "Yes. The website code can be hosted in a GitHub repository so your business has access to the source code. You can continue working with us, involve your own developer, or copy or fork the code into your own GitHub account if needed.",
        },
        {
          q: "Can you set up Google and Meta conversion tracking?",
          a: "Yes. We can set up tracking for important actions such as form submissions, CTA clicks, phone clicks, WhatsApp clicks, and landing page events. This can include Google Analytics, Google Ads conversions, and Meta Pixel events.",
        },
        {
          q: "Can the website be updated using ChatGPT or Claude later?",
          a: "Yes, because the website is built as clean code. AI tools can help with future edits, content changes, and code updates, though important changes should still be reviewed and tested before going live.",
        },
        {
          q: "Is this a WordPress website?",
          a: "Usually, no. We do not default to WordPress unless your business genuinely needs that type of CMS. For many B2B websites, a modern static, React, Next.js, Node.js, or HTML-based setup can be faster, cleaner, and easier to maintain.",
        },
        {
          q: "Do you also host the website?",
          a: "Yes. We can help with hosting, deployment, domain connection, SSL, and launch setup. The exact hosting approach depends on the type of website and features required.",
        },
        {
          q: "Can you make changes after launch?",
          a: "Yes. We can continue supporting edits, landing page changes, tracking updates, content updates, and new page additions after the website is live.",
        },
        {
          q: "Will the website be SEO-ready?",
          a: "Yes. We build with SEO basics in place, including clean page structure, metadata, responsive layout, fast-loading pages, and content organization. If you need deeper SEO, AEO, or GEO work, that can be handled as a separate ongoing service.",
        },
      ],
      finalCta: {
        title: "Build a website your marketing team can actually use.",
        description:
          "Get a fast, trackable, AI-assisted website that is ready for campaigns, search visibility, lead capture, and future changes.",
        cta: "Book a discovery call",
      },
    },
  },
  {
    slug: "seo-aeo-geo",
    title: "SEO / AEO / GEO Services",
    short: "Get found by search engines, answer engines, and generative AI.",
    description:
      "Classic SEO is no longer enough. We optimise for traditional search (SEO), answer engines like ChatGPT and Perplexity (AEO), and generative search experiences (GEO) so your business shows up wherever buyers ask.",
    icon: SearchCheck,
    outcomes: [
      "Technical SEO audit + fixes",
      "Content strategy targeting buyer intent",
      "Structured data for AI answer engines",
      "Authority building and measurement",
    ],
    ideal: "B2B brands competing for high-intent traffic and AI citations.",
  },
  {
    slug: "workflow-automation",
    title: "Workflow Automation for B2B",
    short: "Cut repetitive work out of sales, ops, and support.",
    description:
      "We map your real workflows, find the AI-fit moments, and build automations using n8n, Postgres, and the APIs you already use. Practical, observable, and owned by you.",
    icon: Workflow,
    outcomes: [
      "Discovery workshop to find the right targets",
      "n8n workflows wired into your stack",
      "Human-in-the-loop where it matters",
      "Documentation and handover, not lock-in",
    ],
    ideal: "Ops, RevOps, and customer teams drowning in repeatable work.",
  },
  {
    slug: "voice-agent",
    title: "AI Voice Agents",
    short: "Always-on voice agents that book, qualify, and support - naturally.",
    description:
      "Custom AI voice agents for inbound and outbound calls - qualification, appointment setting, FAQ handling, and follow-ups. Trained on your data, connected to your CRM.",
    icon: BotMessageSquare,
    outcomes: [
      "Natural, low-latency conversations",
      "CRM and calendar integration",
      "Call transcripts, summaries, and handoff",
      "Compliant logging and guardrails",
    ],
    ideal: "Service businesses, clinics, and sales teams with high call volume.",
  },
  {
    slug: "whatsapp-automation",
    title: "WhatsApp AI Automation",
    short: "Conversational AI on WhatsApp - as a verified tech provider.",
    description:
      "As a WhatsApp tech provider, we build AI-powered WhatsApp experiences end-to-end: onboarding, lead capture, support, broadcasts, and AI replies - all on the official WhatsApp Business API.",
    icon: MessageCircleCode,
    outcomes: [
      "WhatsApp Business API setup",
      "AI chat flows with handoff to humans",
      "Catalog, broadcasts, and template management",
      "Postgres-backed conversation history",
    ],
    ideal: "D2C, services, and B2B teams whose customers already live on WhatsApp.",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}