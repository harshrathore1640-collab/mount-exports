import { InstagramIcon, LogoMark, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { BackToTop } from "@/components/ui/Primitives";
import { BUSINESS, EMAIL_URL, GENERAL_WHATSAPP_URL, NAV_LINKS, TEL_URL } from "@/lib/site";

export default function Footer({ productNames }: { productNames: string[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-espresso pt-20 pb-8 text-beige/80 lg:pt-24">
      <div className="hairline-dark absolute inset-x-0 top-0" />

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3.5">
              <LogoMark className="size-11 text-champagne" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[1.3rem] tracking-[0.16em] text-ivory uppercase">
                  {BUSINESS.name}
                </span>
                <span className="mt-2 text-[0.5625rem] tracking-[0.28em] text-champagne/85 uppercase">
                  {BUSINESS.subLabel}
                </span>
              </span>
            </div>
            <p className="mt-7 max-w-sm text-[0.9375rem] leading-[1.9] text-beige/70">
              An established Indian natural-stone export business ({BUSINESS.category}) working with
              marble, granite, blocks and premium slabs for international buyers since{" "}
              {BUSINESS.established}.
            </p>
            <p className="mt-6 font-serif text-[1.15rem] text-champagne italic">
              {BUSINESS.tagline}
            </p>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-3 text-[0.8125rem] tracking-[0.14em] text-beige/75 uppercase transition-colors hover:text-champagne"
            >
              <InstagramIcon className="size-4" />
              {BUSINESS.instagramHandle}
            </a>
          </div>

          {/* navigation */}
          <nav aria-label="Footer navigation" className="lg:col-span-3">
            <p className="label-xs text-taupe">Explore</p>
            <ul className="mt-6 space-y-3.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-beige/80 transition-colors hover:text-champagne"
                  >
                    <span className="h-px w-0 bg-champagne transition-all duration-400 group-hover:w-5" />
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="group inline-flex items-center gap-3 text-[0.9375rem] text-beige/80 transition-colors hover:text-champagne"
                >
                  <span className="h-px w-0 bg-champagne transition-all duration-400 group-hover:w-5" />
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          {/* collection */}
          <nav aria-label="Collection" className="lg:col-span-2">
            <p className="label-xs text-taupe">Collection</p>
            <ul className="mt-6 space-y-3.5">
              {productNames.map((name) => (
                <li key={name}>
                  <a
                    href="#products"
                    className="group inline-flex items-center gap-3 text-[0.9375rem] text-beige/80 transition-colors hover:text-champagne"
                  >
                    <span className="h-px w-0 bg-champagne transition-all duration-400 group-hover:w-5" />
                    {name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#gallery"
                  className="group inline-flex items-center gap-3 text-[0.9375rem] text-beige/80 transition-colors hover:text-champagne"
                >
                  <span className="h-px w-0 bg-champagne transition-all duration-400 group-hover:w-5" />
                  Stone Gallery
                </a>
              </li>
            </ul>
          </nav>

          {/* contact */}
          <div className="lg:col-span-3">
            <p className="label-xs text-taupe">Contact</p>
            <ul className="mt-6 space-y-5">
              <li>
                <a
                  href={TEL_URL}
                  className="flex items-start gap-3 text-[0.9375rem] text-beige/85 transition-colors hover:text-champagne"
                >
                  <PhoneIcon className="mt-0.5 size-4 shrink-0 text-champagne/80" />
                  <span>
                    {BUSINESS.phoneDisplay}
                    <span className="mt-1 block text-[0.75rem] tracking-[0.14em] text-taupe uppercase">
                      Direct Call
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={GENERAL_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[0.9375rem] text-beige/85 transition-colors hover:text-champagne"
                >
                  <WhatsAppIcon className="mt-0.5 size-4 shrink-0 text-whatsapp" />
                  <span>
                    {BUSINESS.whatsappDisplay}
                    <span className="mt-1 block text-[0.75rem] tracking-[0.14em] text-taupe uppercase">
                      WhatsApp Enquiry
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={EMAIL_URL}
                  className="flex items-start gap-3 text-[0.9375rem] text-beige/85 transition-colors hover:text-champagne break-all"
                >
                  <MailIcon className="mt-0.5 size-4 shrink-0 text-champagne/80" />
                  <span>
                    {BUSINESS.email}
                    <span className="mt-1 block text-[0.75rem] tracking-[0.14em] text-taupe uppercase">
                      Email
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-beige/80">
                <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-champagne/80" />
                <div>
                  <p className="text-ivory font-medium">Head Office:</p>
                  <p className="mt-0.5 text-beige/75 text-[0.8125rem]">{BUSINESS.officeAddress}</p>
                  <p className="mt-2 text-ivory font-medium">Processing / Job Work:</p>
                  <p className="mt-0.5 text-beige/75 text-[0.8125rem]">{BUSINESS.jobWorkAddress}</p>
                </div>
              </li>
            </ul>

            <a href="#contact" className="btn btn-outline-light mt-8 !px-6 !py-3.5 text-[0.6875rem]">
              Request a Quote
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-champagne/15 pt-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <p className="text-[0.8125rem] text-beige/55">
              © {year} {BUSINESS.name}. All rights reserved. · {BUSINESS.locationShort}
            </p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
