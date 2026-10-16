"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { BUSINESS, GENERAL_WHATSAPP_URL, TEL_URL } from "@/lib/site";

export default function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Step aside while a visitor is filling in an enquiry form so the buttons
  // never cover inputs or the submit action on small screens.
  useEffect(() => {
    const isFormField = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      Boolean(target.closest("form")) &&
      Boolean(
        target.matches("input, textarea, select") || target.closest("input, textarea, select"),
      );

    const onFocusIn = (event: FocusEvent) => setTyping(isFormField(event.target));
    const onFocusOut = (event: FocusEvent) => {
      if (isFormField(event.target)) setTyping(false);
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  const shown = visible && !typing;

  return (
    <div
      className={`fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 transition-all duration-500 sm:right-6 sm:bottom-6 ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <a
        href={GENERAL_WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with ${BUSINESS.name} on WhatsApp at ${BUSINESS.whatsappDisplay}`}
        className="group flex items-center gap-0 bg-whatsapp text-white shadow-[0_18px_38px_-16px_rgba(23,138,69,0.9)] transition-all duration-300 hover:bg-[#178a45]"
      >
        <span className="grid size-13 place-items-center p-3.5 sm:size-14">
          <WhatsAppIcon className="size-6 sm:size-7" />
        </span>
        <span className="max-w-0 overflow-hidden text-xs tracking-[0.16em] whitespace-nowrap uppercase transition-all duration-400 group-hover:max-w-[190px] group-hover:pr-5">
          WhatsApp Enquiry
        </span>
      </a>

      <a
        href={TEL_URL}
        aria-label={`Call ${BUSINESS.name} on ${BUSINESS.phoneDisplay}`}
        className="group flex items-center gap-0 bg-espresso text-beige shadow-[0_18px_38px_-18px_rgba(33,23,16,0.95)] ring-1 ring-champagne/25 transition-all duration-300 hover:bg-walnut hover:text-ivory"
      >
        <span className="grid size-13 place-items-center p-3.5 sm:size-14">
          <PhoneIcon className="size-6 sm:size-7" />
        </span>
        <span className="max-w-0 overflow-hidden text-xs tracking-[0.16em] whitespace-nowrap uppercase transition-all duration-400 group-hover:max-w-[190px] group-hover:pr-5">
          {BUSINESS.phoneDisplay}
        </span>
      </a>
    </div>
  );
}
