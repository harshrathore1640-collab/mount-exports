"use client";

import { useState } from "react";
import { ChevronDownIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Primitives";
import { cn } from "@/lib/cn";
import type { Faq } from "@/lib/content";
import { BUSINESS, GENERAL_WHATSAPP_URL, TEL_URL } from "@/lib/site";

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-walnut py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-sm flex items-center gap-4 text-champagne">
                <span className="h-px w-10 bg-champagne/60" />
                Questions
              </p>
              <h2 className="mt-6 text-[2.05rem] leading-[1.08] text-ivory sm:text-[2.7rem] lg:text-[3.1rem]">
                Frequently Asked
                <span className="mt-2 block text-beige/85 italic">Export Questions</span>
              </h2>
              <p className="mt-7 max-w-md text-[0.975rem] leading-[1.9] text-beige/75">
                Answers here cover how to enquire and what information helps. For availability,
                quotations, shipping timelines and destination-specific requirements, please contact
                the business directly.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 border border-champagne/25 bg-espresso/50 p-7">
                <p className="label-xs text-taupe">Still deciding?</p>
                <p className="mt-4 font-serif text-[1.5rem] leading-snug text-ivory">
                  Speak with {BUSINESS.name} directly
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={GENERAL_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a href={TEL_URL} className="btn btn-outline-light">
                    <span>{BUSINESS.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-champagne/20">
              {faqs.map((faq, index) => {
                const isOpen = open === index;
                return (
                  <Reveal key={faq.question} as="li" delay={index * 60}>
                    <div className="border-b border-champagne/20">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${index}`}
                          id={`faq-button-${index}`}
                          className="flex w-full items-start justify-between gap-6 py-6 text-left"
                        >
                          <span className="flex items-start gap-5">
                            <span className="mt-1 font-serif text-[0.8125rem] tracking-[0.16em] text-champagne/80">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={cn(
                                "font-serif text-[1.15rem] leading-snug transition-colors duration-300 sm:text-[1.4rem]",
                                isOpen ? "text-champagne" : "text-ivory",
                              )}
                            >
                              {faq.question}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 grid size-9 shrink-0 place-items-center border transition-all duration-400",
                              isOpen
                                ? "rotate-180 border-champagne text-champagne"
                                : "border-champagne/30 text-beige/70",
                            )}
                          >
                            <ChevronDownIcon className="size-4" />
                          </span>
                        </button>
                      </h3>
                      <div
                        className="faq-panel"
                        data-open={isOpen}
                        id={`faq-panel-${index}`}
                        role="region"
                        aria-labelledby={`faq-button-${index}`}
                      >
                        <div>
                          <p className="max-w-2xl pr-4 pb-7 pl-10 text-[0.9375rem] leading-[1.9] text-beige/75">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
