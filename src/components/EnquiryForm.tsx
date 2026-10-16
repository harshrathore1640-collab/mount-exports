"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CheckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { QUOTE_EVENT } from "@/components/Products";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/site";

type Variant = "compact" | "full";

type Fields = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  country: string;
  productInterest: string;
  quantity: string;
  dimensionsFinish: string;
  message: string;
};

const EMPTY: Fields = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  productInterest: "",
  quantity: "",
  dimensionsFinish: "",
  message: "",
};

const GENERIC_INTERESTS = [
  "Marble — Blocks",
  "Marble — Slabs",
  "Granite — Blocks",
  "Granite — Slabs",
  "Multiple stones / not decided yet",
];

type Status =
  | { state: "idle" }
  | { state: "ready"; url: string; saved: boolean }
  | { state: "error"; message: string };

export default function EnquiryForm({
  variant = "full",
  productNames,
  source,
  tone = "light",
}: {
  variant?: Variant;
  productNames: string[];
  source: string;
  tone?: "light" | "dark";
}) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const interestOptions = useMemo(
    () => [...productNames, ...GENERIC_INTERESTS],
    [productNames],
  );

  // Allow product cards to pre-fill the quote request form.
  useEffect(() => {
    const onQuote = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail) return;
      setFields((current) => ({ ...current, productInterest: detail }));
      setStatus({ state: "idle" });
    };
    window.addEventListener(QUOTE_EVENT, onQuote as EventListener);
    return () => window.removeEventListener(QUOTE_EVENT, onQuote as EventListener);
  }, []);

  const dark = tone === "dark";

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof Fields, string>> = {};

    if (!fields.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!fields.email.trim() && !fields.phone.trim())
      next.email = "Please provide an email address or a phone / WhatsApp number.";
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(fields.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!fields.country.trim()) next.country = "Please enter your country or destination.";
    if (!fields.productInterest.trim()) next.productInterest = "Please select a product interest.";
    if (variant === "compact" && !fields.quantity.trim())
      next.quantity = "Please indicate the required quantity.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ state: "idle" });

    if (!validate()) {
      const firstError = formRef.current?.querySelector<HTMLElement>("[data-invalid='true']");
      firstError?.focus();
      return;
    }

    const message = buildEnquiryMessage(fields);
    const url = whatsappUrl(message);

    // Open WhatsApp synchronously from the user gesture so popup blockers allow it.
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitting(true);
    let saved = false;
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, source }),
      });
      const data = (await response.json()) as { saved?: boolean };
      saved = Boolean(response.ok && data.saved);
    } catch {
      saved = false;
    } finally {
      setSubmitting(false);
    }

    setStatus({ state: "ready", url, saved });
  };

  const labelClass = cn(
    "label-xs block",
    dark ? "text-sandstone/80" : "text-taupe",
  );
  const fieldClass = cn("field mt-2", dark && "field-dark");

  const errorClass = "mt-2 block text-[0.75rem] text-[#c0563c]";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-7">
      <div className={cn("grid gap-7", variant === "full" && "sm:grid-cols-2")}>
        <div>
          <label className={labelClass} htmlFor={`${variant}-name`}>
            Full Name *
          </label>
          <input
            id={`${variant}-name`}
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={fields.fullName}
            data-invalid={Boolean(errors.fullName)}
            onChange={(event) => update("fullName", event.target.value)}
            className={cn(fieldClass, errors.fullName && "field-error")}
          />
          {errors.fullName && <span className={errorClass}>{errors.fullName}</span>}
        </div>

        {variant === "full" && (
          <div>
            <label className={labelClass} htmlFor="company">
              Company Name
            </label>
            <input
              id="company"
              name="companyName"
              type="text"
              autoComplete="organization"
              placeholder="Importer, studio or project"
              value={fields.companyName}
              onChange={(event) => update("companyName", event.target.value)}
              className={fieldClass}
            />
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor={`${variant}-email`}>
            Email Address {variant === "compact" ? "" : "*"}
          </label>
          <input
            id={`${variant}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={fields.email}
            data-invalid={Boolean(errors.email)}
            onChange={(event) => update("email", event.target.value)}
            className={cn(fieldClass, errors.email && "field-error")}
          />
          {errors.email && <span className={errorClass}>{errors.email}</span>}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${variant}-phone`}>
            Phone / WhatsApp Number {variant === "compact" ? "" : "*"}
          </label>
          <input
            id={`${variant}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+00 000 000 0000"
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor={`${variant}-country`}>
            Country / Destination *
          </label>
          <input
            id={`${variant}-country`}
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="Where should the stone be shipped?"
            value={fields.country}
            data-invalid={Boolean(errors.country)}
            onChange={(event) => update("country", event.target.value)}
            className={cn(fieldClass, errors.country && "field-error")}
          />
          {errors.country && <span className={errorClass}>{errors.country}</span>}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${variant}-product`}>
            Product Interest *
          </label>
          <select
            id={`${variant}-product`}
            name="productInterest"
            value={fields.productInterest}
            data-invalid={Boolean(errors.productInterest)}
            onChange={(event) => update("productInterest", event.target.value)}
            className={cn(fieldClass, "appearance-none pr-8", errors.productInterest && "field-error")}
          >
            <option value="">Select a product or format</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.productInterest && <span className={errorClass}>{errors.productInterest}</span>}
        </div>

        <div>
          <label className={labelClass} htmlFor={`${variant}-quantity`}>
            Required Quantity {variant === "compact" ? "*" : ""}
          </label>
          <input
            id={`${variant}-quantity`}
            name="quantity"
            type="text"
            placeholder="e.g. 2 containers / 400 m² / 10 slabs"
            value={fields.quantity}
            data-invalid={Boolean(errors.quantity)}
            onChange={(event) => update("quantity", event.target.value)}
            className={cn(fieldClass, errors.quantity && "field-error")}
          />
          {errors.quantity && <span className={errorClass}>{errors.quantity}</span>}
        </div>

        {variant === "full" && (
          <div>
            <label className={labelClass} htmlFor="dimensions">
              Dimensions or Finish
            </label>
            <input
              id="dimensions"
              name="dimensionsFinish"
              type="text"
              placeholder="e.g. 2800 × 1600 × 20 mm, polished"
              value={fields.dimensionsFinish}
              onChange={(event) => update("dimensionsFinish", event.target.value)}
              className={fieldClass}
            />
          </div>
        )}
      </div>

      {variant === "full" && (
        <div>
          <label className={labelClass} htmlFor="message">
            Project Details / Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us about the project, the stone you are looking for and any specific requirements."
            value={fields.message}
            onChange={(event) => update("message", event.target.value)}
            className={cn(fieldClass, "resize-y")}
          />
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-whatsapp w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
        >
          <WhatsAppIcon className="size-4" />
          <span>{submitting ? "Preparing…" : "Send Enquiry on WhatsApp"}</span>
        </button>
        <p className={cn("text-[0.8125rem] leading-relaxed", dark ? "text-beige/65" : "text-brown-deep/70")}>
          WhatsApp opens in a new tab with your details prefilled. Press send to complete the
          enquiry.
        </p>
      </div>

      {status.state === "ready" && (
        <div
          role="status"
          className={cn(
            "border-l-2 p-5",
            dark
              ? "border-champagne/60 bg-espresso/50 text-beige/85"
              : "border-brown/60 bg-beige/40 text-brown-deep",
          )}
        >
          <p className="flex items-start gap-3 text-[0.9375rem] leading-relaxed">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-whatsapp" />
            <span>
              Your WhatsApp message is ready — press <strong className="font-medium">send</strong> in
              WhatsApp to deliver it to Mount Exports.
              {status.saved
                ? " Your enquiry details were also recorded on our enquiry list."
                : " We could not record the enquiry on our server at this moment, but the WhatsApp message still reaches us."}
            </span>
          </p>
          <a
            href={status.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-3 inline-block text-[0.8125rem] tracking-[0.14em] uppercase underline underline-offset-4",
              dark ? "text-champagne" : "text-brown",
            )}
          >
            WhatsApp did not open? Tap here
          </a>
        </div>
      )}
    </form>
  );
}
