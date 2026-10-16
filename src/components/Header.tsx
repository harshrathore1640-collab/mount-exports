"use client";

import { useEffect, useState } from "react";
import {
  InstagramIcon,
  LogoMark,
  MenuIcon,
  CloseIcon,
  PhoneIcon,
  WhatsAppIcon,
  MailIcon,
} from "@/components/ui/Icons";
import { Cta } from "@/components/ui/Primitives";
import { cn } from "@/lib/cn";
import { BUSINESS, EMAIL_URL, GENERAL_WHATSAPP_URL, NAV_LINKS, TEL_URL } from "@/lib/site";

const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace("#", ""));

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.15, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-60 transition-all duration-500",
        solid
          ? "bg-espresso/95 shadow-[0_18px_40px_-32px_rgba(0,0,0,0.9)] backdrop-blur-md"
          : "bg-gradient-to-b from-espresso/70 via-espresso/20 to-transparent",
      )}
    >
      {/* utility strip */}
      <div
        className={cn(
          "hidden border-b border-champagne/12 transition-all duration-500 lg:block",
          solid ? "h-0 overflow-hidden opacity-0" : "h-10 opacity-100",
        )}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-8 py-2.5 text-[0.6875rem] tracking-[0.2em] text-beige/70 uppercase">
          <span>
            Est. {BUSINESS.established} · {BUSINESS.location}
          </span>
          <span className="flex items-center gap-6">
            <a
              href={TEL_URL}
              className="inline-flex items-center gap-2 transition-colors hover:text-champagne"
            >
              <PhoneIcon className="size-3.5" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={GENERAL_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-champagne"
            >
              <WhatsAppIcon className="size-3.5 text-whatsapp" />
              WhatsApp: {BUSINESS.whatsappDisplay}
            </a>
            <a
              href={EMAIL_URL}
              className="hidden items-center gap-2 transition-colors hover:text-champagne xl:inline-flex"
            >
              <MailIcon className="size-3.5" />
              {BUSINESS.email}
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors hover:text-champagne"
            >
              <InstagramIcon className="size-3.5" />
              {BUSINESS.instagramHandle}
            </a>
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-3.5 sm:px-8 lg:py-4">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex items-center gap-3.5 text-ivory"
          aria-label={`${BUSINESS.name} — home`}
        >
          <LogoMark className="size-10 text-champagne transition-colors duration-500 group-hover:text-beige sm:size-11" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[1.15rem] tracking-[0.16em] uppercase sm:text-[1.3rem]">
              Mount Exports
            </span>
            <span className="mt-1.5 text-[0.5625rem] tracking-[0.28em] text-champagne/85 uppercase sm:text-[0.625rem]">
              {BUSINESS.subLabel}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                data-active={active === id}
                className={cn(
                  "nav-link text-[0.75rem] tracking-[0.16em] uppercase transition-colors duration-300",
                  active === id ? "text-champagne" : "text-beige/85 hover:text-ivory",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Cta
              href="#contact"
              variant="champagne"
              buttonClassName="!px-6 !py-3.5 text-[0.6875rem]"
            >
              Request a Quote
            </Cta>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="grid size-11 place-items-center border border-champagne/35 text-ivory transition-colors hover:border-champagne hover:text-champagne xl:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {/* mobile panel */}
      <div
        id="mobile-navigation"
        className={cn(
          "overflow-hidden border-t border-champagne/12 bg-espresso transition-[max-height,opacity] duration-500 xl:hidden",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col px-6 py-4">
          {NAV_LINKS.map((link, index) => {
            const id = link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-baseline gap-4 border-b border-champagne/10 py-4 text-lg transition-colors",
                  active === id ? "text-champagne" : "text-beige hover:text-ivory",
                )}
              >
                <span className="font-sans text-[0.625rem] tracking-[0.2em] text-taupe">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-serif">{link.label}</span>
              </a>
            );
          })}
          <div className="mt-6 flex flex-col gap-3 pb-2">
            <Cta href="#contact" variant="champagne" magnetic={false} buttonClassName="w-full">
              Request a Quote
            </Cta>
            <a
              href={GENERAL_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon className="size-4" />
              <span>WhatsApp: {BUSINESS.whatsappDisplay}</span>
            </a>
            <a
              href={TEL_URL}
              className="btn btn-outline-light w-full"
              onClick={() => setOpen(false)}
            >
              <PhoneIcon className="size-4" />
              <span>Call: {BUSINESS.phoneDisplay}</span>
            </a>
            <a
              href={EMAIL_URL}
              className="btn btn-outline-light w-full break-all"
              onClick={() => setOpen(false)}
            >
              <MailIcon className="size-4" />
              <span>{BUSINESS.email}</span>
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2 text-[0.75rem] tracking-[0.18em] text-beige/70 uppercase"
            >
              <InstagramIcon className="size-4" />
              {BUSINESS.instagramHandle}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
