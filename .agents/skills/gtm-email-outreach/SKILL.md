---
name: gtm-email-outreach
description: Create GTM cold email sequences for website modernization prospects. Use when the user asks Codex to create an email sequence, outreach draft, cold email campaign, or domain-specific prospecting notes for a business website. The workflow must curl the homepage first, identify website platform/tools/pain points, then create a domain folder under "GTM Email Outreach" with an email-sequence text file containing the technical summary and a 4-email sequence.
---

# GTM Email Outreach

## Goal

Create a domain-specific 4-email outreach sequence for prospects who may benefit from an AI-friendly, marketing-ready website.

The output must help the user review and edit the sequence in Notepad.

## Required Workflow

1. Create the root folder if missing:

   `GTM Email Outreach`

2. For each requested domain, create a folder using the domain name:

   `GTM Email Outreach/{domain}/`

3. Fetch the homepage with `curl.exe -L {url}`.

4. Inspect the homepage markup for:

   - Website platform/CMS
   - Page builder
   - SEO plugins/tools
   - Analytics/tracking scripts
   - Chat widgets
   - Form/CRM tools
   - Cache/performance plugins
   - CDN/image delivery
   - WordPress/plugin/builder signs
   - Next.js/React/static site signs
   - Google Sites/Webflow/Shopify/hosted-builder signs

5. Write the findings at the top of the output file.

6. Draft a 4-email sequence with a standard 7-day gap between emails.

7. Save the file as:

   `GTM Email Outreach/{domain}/email-sequence-{domain}.txt`

## Output File Structure

Use this structure inside the text file:

```text
Domain:
Homepage:
Checked on:

Website Build Summary:
- Platform:
- Builder/theme:
- SEO tools:
- Tracking/conversion tools:
- Chat/CRM tools:
- Performance/cache/CDN:
- Notable observations:

Possible Pain Points:
- ...

Outreach Angle:
- ...

Email Sequence:
Subject:

Email 1 - Day 1
...

Email 2 - Day 8
...

Email 3 - Day 15
...

Email 4 - Day 22
...
```

## Email Direction

Position Attendez as helping the prospect move from their current website setup to an owned, AI-friendly website platform. The intent must be clear in the emails. The prospect should understand that the next step is not just a redesign. It is a migration to a faster platform where landing pages, content updates, tracking, and lead forms can be improved quickly.

## Core Offer To Make Clear

Every email sequence must clearly move the prospect toward this offer:

- Migrate the current website to an owned, AI-friendly website platform.
- Create or update landing pages quickly with ChatGPT or Claude.
- Make website updates faster without depending on a hosted builder or agency-controlled system.
- Add interactive form elements where useful, such as phone number OTP verification, better lead qualification, project type selection, service-area checks, and quote-request flows.
- Preserve existing SEO value during migration when possible.
- Improve the website for SEO, AEO, and GEO performance.
- Improve campaign tracking for Google, Meta, and ChatGPT/AI-driven ads.
- Give the business more control through code ownership and GitHub.

When relevant, mention that a 50 to 100 page website migration can often be completed in less than 7 days, while preserving existing SEO signals and improving the structure for AI/search visibility.

Do not guarantee rankings, traffic, or exact migration time. Phrase timing as an operational capability, not a promise.

## ChatGPT Update Story

Use this story when it helps explain the value of moving away from a DIY CMS or hosted builder:

Traditional website update flow:

- Log in to WordPress or another CMS.
- Find the correct page.
- Make the change manually.
- Preview the page.
- Fix layout issues.
- Purge plugin, server, or CDN caches.
- Check the live website again.

AI-friendly owned-code flow:

- Tell ChatGPT or Claude what to update.
- Attach the new content or images.
- Ask it to update the site and push the change to GitHub main.
- The website deploys from the updated repo.

Example:

"Instead of logging into a CMS, finding the gallery page, uploading images, checking the layout, and clearing caches, you could simply tell ChatGPT: add these two photos to the gallery and push the update to GitHub main. The site can then update from the repo."

Use this story carefully. Do not imply zero review is always required. Present it as a faster workflow with human review available when needed.

Example phrasing:

"The goal would be to move your current site to a platform that is easier to update with ChatGPT or Claude. That would make it faster to launch local landing pages, improve forms, and track leads from Google and Meta campaigns."

"For a 50 to 100 page site, this kind of migration can often be completed in under a week. The important part is preserving the SEO value that already exists while improving the structure for AI search, local pages, and campaign tracking."
Use these points when relevant:

- Migration to an owned AI-friendly website platform
- Fast landing page creation for services, locations, and campaigns
- Faster page performance
- Cleaner website ownership
- Website changes can be made faster with Claude or ChatGPT
- Client should not be locked into an agency-controlled website
- Code can live in GitHub
- Better digital marketing tracking
- Meta conversion tracking
- Google Ads conversion tracking
- ChatGPT / AI campaign tracking where relevant
- SEO, AEO, and GEO friendly content structure
- Better landing pages for service areas and campaigns
- Cleaner project galleries and image optimization
- Better consultation, quote, phone-call, and form tracking
- Interactive forms such as OTP phone verification, project qualification, service-area checks, and quote-request flows
- Easier content updates without plugin-heavy workflows
- Reduced dependency on bloated WordPress/plugin stacks where applicable
- Better technical foundation for future AI-assisted edits
- Better lead quality through project type, budget, service area, and timeline qualification
- Better proof architecture through galleries, before/after sliders, case studies, reviews, and FAQs

## Tone Rules

Use a direct B2B tone.

Write like a real person sending a practical business email.

Prefer short sentences, but group related sentences into small paragraphs.

Each paragraph should usually contain 2 to 3 short sentences.

Do not put a blank line after every sentence.

Use a single-sentence paragraph only for emphasis, a transition, or the CTA.

One sentence should usually make one point.

Avoid long, stacked sentences with too many ideas joined by commas, colons, or lists.

The email should not sound like a bullet list or a pitch deck.

It should sound like a thoughtful person noticed something specific about the website and is sharing a useful idea.

Do not insult the current website.

Do not overuse fear-based language.

Do not claim the prospect is doing something wrong.

Do not pretend Attendez has worked with the prospect or their industry unless the user provides proof.

Do not say "your website is bad."

Prefer language like:

- "Your site already has useful trust signals, but the technical foundation could be stronger for modern campaigns."
- "The opportunity is not just a redesign. It is making the website easier to update, track, and scale."
- "For remodeling companies, speed, project proof, service-area pages, and conversion tracking matter as much as the visual design."

Avoid phrases that sound AI-generated or overly packaged:

- "AI-friendly, marketing-ready system"
- "cleaner project proof"
- "real actions like phone clicks, form submissions, and quote requests"
- "technical foundation for future AI-assisted edits"
- "future-proof digital ecosystem"

Rewrite stacked claims into simpler language.

Bad:

"It is turning the website into an AI-friendly, marketing-ready system: faster pages, cleaner project proof, better service-area structure, and tracking for real actions like phone clicks, form submissions, and quote requests."

Better:

"The bigger opportunity is making the website easier to update and easier to track. That includes faster pages, clearer project pages, better local landing pages, and proper tracking for calls and forms."

## CTA

Each email should end with a soft CTA.

Primary CTA:

`Book a call: https://attendez.in/contact`

Optional landing page:

`AI-friendly website service: https://attendez.in/services/website-ai`

Use natural anchor text when writing HTML-style copy is useful:

- `book a quick call`
- `see our AI-friendly website service`
- `review the website modernization approach`

## Subject Line

Use one subject line for the full sequence.

Keep it specific and non-hype.

Examples:

- `Website modernization idea for {Business Name}`
- `A website performance idea for {Business Name}`
- `Making {Business Name}'s website easier to update and track`

## Email Sequence Guidance

Email 1:
Introduce the observation from their current site. Mention the platform/tools briefly. Make the intent clear: migrate from the current setup to an owned AI-friendly website platform that is easier to update, easier to track, and easier to expand with landing pages.

Email 2:
Focus on landing pages, interactive forms, and tracking. Explain that the new platform can support fast landing-page creation, OTP phone verification or stronger lead qualification, and clean conversion tracking for Google, Meta, and AI-driven campaigns.

Email 3:
Focus on ownership, migration speed, and updates. Explain that the website code can live in GitHub, future changes can be made faster with ChatGPT or Claude, and a 50 to 100 page migration can often be completed in less than 7 days when scoped clearly.

Email 4:
Focus on preserving existing SEO value while improving SEO, AEO, and GEO. Mention structured content, local pages, FAQs, project proof, schema, AI-search readiness, and campaign tracking. End with a final soft CTA.

## Quality Bar

Each email should be concise but not too thin.

Avoid generic "we build beautiful websites" language.

Tie the copy to the findings from `curl.exe`.

Before saving the sequence, revise each email for sentence length.

If a sentence has more than two commas, a colon followed by a list, or more than 25 words, split it unless it reads naturally.

After shortening sentences, combine related sentences into small paragraphs so the email reads naturally.

Avoid formatting the email as one sentence per paragraph.

If the website is already modern, do not pitch a full rebuild. Pitch campaign landing pages, tracking, AI-search structure, and content architecture.

If the website is WordPress/plugin-heavy, mention modernization carefully.

If the website is Google Sites or a basic hosted builder, pitch moving to a professional, owned, scalable website foundation.

If no clear platform is detected, state that the platform was not obvious from the homepage markup and focus on visible marketing gaps.

