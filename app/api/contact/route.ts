import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phoneCountryCode?: string;
  phone?: string;
  company?: string;
  service?: string;
  message?: string;
  website?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (clean(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);

  if (!name || !email || !/^\S+@\S+\.\S+$/.test(email) || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const baseUrl = process.env.N8N_WEBHOOK_BASE_URL?.replace(/\/$/, "");
  const webhookPath = process.env.N8N_CONTACT_WEBHOOK_PATH || "/webhook/attendez-website-contact-us";

  if (!baseUrl) {
    return NextResponse.json({ error: "Contact webhook is not configured." }, { status: 500 });
  }

  const phoneCountryCode = clean(payload.phoneCountryCode) || "+1";
  const phone = clean(payload.phone);
  const webhookUrl = `${baseUrl}${webhookPath.startsWith("/") ? webhookPath : `/${webhookPath}`}`;

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "attendez-website-contact-us",
      submittedAt: new Date().toISOString(),
      name,
      email,
      phoneCountryCode,
      phone,
      fullPhone: phone ? `${phoneCountryCode} ${phone}` : "",
      company: clean(payload.company),
      service: clean(payload.service),
      message,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Unable to submit the message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}