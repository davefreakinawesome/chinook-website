import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Sponsor/partner enquiry endpoint. Logs the enquiry for now; wire an email
 * provider (e.g. Resend) or CRM here later. Recipient is site.sponsorEmail.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json(
      { error: "Please complete the required fields with a valid email." },
      { status: 400 },
    );
  }

  console.info("[enquiry] new partnership enquiry:", { name, email, company: body.company, type: body.type });

  return NextResponse.json({
    message:
      "Thanks — your enquiry is in. We'll review it and get back to you shortly with a media kit and next steps.",
  });
}
