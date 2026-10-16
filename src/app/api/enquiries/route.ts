import { createEnquiry, type EnquiryInput } from "@/lib/repository";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const MAX_LENGTH = 1200;

function clean(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  return value.replace(/\r/g, "").slice(0, MAX_LENGTH).trim();
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const fullName = clean(body.fullName);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const country = clean(body.country);
  const productInterest = clean(body.productInterest);

  const errors: Record<string, string> = {};
  if (!fullName) errors.fullName = "Full name is required.";
  if (!email && !phone) errors.email = "An email address or phone number is required.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "Please provide a valid email address.";
  if (!country) errors.country = "Country or destination is required.";
  if (!productInterest) errors.productInterest = "Product interest is required.";

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const input: EnquiryInput = {
    fullName,
    companyName: clean(body.companyName),
    email,
    phone,
    country,
    productInterest,
    quantity: clean(body.quantity),
    dimensionsFinish: clean(body.dimensionsFinish),
    message: clean(body.message, ""),
    source: clean(body.source, "website"),
  };

  const result = await createEnquiry(input);

  return Response.json(
    {
      ok: result.ok,
      saved: result.saved,
      whatsappUrl: result.whatsappUrl,
      message: buildEnquiryMessage(input),
    },
    { status: result.ok ? 200 : 500 },
  );
}

/** Convenience endpoint returning the canonical enquiry link for the business. */
export async function GET() {
  return Response.json({
    ok: true,
    whatsappUrl: whatsappUrl(
      "Hello Mount Exports, I would like to enquire about your marble and granite collection for my project.",
    ),
  });
}
