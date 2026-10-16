/**
 * Single source of truth for verified Mount Exports business information.
 * Only facts supplied by the business are stored here — no invented
 * certifications, capacities, client names or shipment statistics.
 */
export const BUSINESS = {
  name: "Mount Exports",
  tagline: "Natural Stone. Global Vision. Timeless Craft.",
  subLabel: "NATURAL STONE · GLOBAL SUPPLY",
  established: 1996,
  category: "Indian Marble, Granite & Exotic Stone Exporter",
  email: "bhagwatisarwa@yahoo.com",
  phoneDisplay: "+91 98280 40343",
  phoneDial: "+919828040343",
  whatsappDisplay: "+91 98292 41343",
  whatsappNumber: "919829241343",
  officeAddress:
    "351, Second Floor, S. M. Lodha Complex, Near Shastri Circle, Udaipur (Rajasthan) 313001",
  officeAddressShort: "351, 2nd Floor, S. M. Lodha Complex, Near Shastri Circle, Udaipur",
  jobWorkAddress: "Jain Grani Marmo",
  quarryOwnership: "Own quarry for Titanium Gold",
  specialization: "Indian Marble, Granite, Patagonia & Exotic Colours",
  city: "Udaipur",
  state: "Rajasthan",
  postalCode: "313001",
  country: "India",
  location: "Udaipur, Rajasthan, India",
  locationShort: "Udaipur, Rajasthan",
  instagramHandle: "@mountexports07",
  instagramUrl: "https://instagram.com/mountexports07",
  /** Placeholder until the live domain is confirmed. */
  siteUrl: "https://www.mountexports.com",
  mapsEmbedQuery: "351, S. M. Lodha Complex, Near Shastri Circle, Udaipur, Rajasthan 313001",
} as const;

export const TEL_URL = `tel:${BUSINESS.phoneDial}`;
export const EMAIL_URL = `mailto:${BUSINESS.email}`;

export const GENERAL_ENQUIRY_MESSAGE =
  "Hello Mount Exports, I would like to enquire about your marble and granite collection for my project.";

/** WhatsApp deep link with a correctly URL-encoded prefilled message. */
export function whatsappUrl(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_WHATSAPP_URL = whatsappUrl(GENERAL_ENQUIRY_MESSAGE);

/** Product-specific enquiry message, e.g. "…enquire about Titanium Gold." */
export function productEnquiryMessage(productName: string): string {
  return `Hello Mount Exports, I would like to enquire about ${productName}. Please share the available options and export enquiry details.`;
}

export function productWhatsappUrl(productName: string): string {
  return whatsappUrl(productEnquiryMessage(productName));
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Products", href: "#products" },
  { label: "Gallery", href: "#gallery" },
  { label: "Export Process", href: "#process" },
  { label: "Why Mount Exports", href: "#why" },
  { label: "Contact", href: "#contact" },
] as const;

/** Builds the readable WhatsApp message for the enquiry forms. */
export function buildEnquiryMessage(input: {
  fullName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  country?: string;
  productInterest?: string;
  quantity?: string;
  dimensionsFinish?: string;
  message?: string;
}): string {
  const lines: string[] = ["Hello Mount Exports, I would like to submit an export enquiry."];
  lines.push(`Name: ${input.fullName}`);
  if (input.companyName?.trim()) lines.push(`Company: ${input.companyName.trim()}`);
  if (input.email?.trim()) lines.push(`Email: ${input.email.trim()}`);
  if (input.phone?.trim()) lines.push(`Phone / WhatsApp: ${input.phone.trim()}`);
  if (input.country?.trim()) lines.push(`Country / Destination: ${input.country.trim()}`);
  if (input.productInterest?.trim()) lines.push(`Product Interest: ${input.productInterest.trim()}`);
  if (input.quantity?.trim()) lines.push(`Required Quantity: ${input.quantity.trim()}`);
  if (input.dimensionsFinish?.trim())
    lines.push(`Dimensions / Finish: ${input.dimensionsFinish.trim()}`);
  if (input.message?.trim()) lines.push(`Project Details: ${input.message.trim()}`);
  lines.push("Please share the available options and export enquiry details.");
  return lines.join("\n");
}

/** Pexels image helper — fixed crop dimensions keep layout stable. */
export function px(id: number, w: number, h: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

/** Local fallback used whenever a remote photograph cannot be loaded. */
export const FALLBACK_IMAGE = "/images/stone-fallback.jpg";
