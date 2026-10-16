import { ArrowRightIcon, GlobeIcon, PhoneIcon, ShipIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Cta, Reveal, StoneImage } from "@/components/ui/Primitives";
import EnquiryForm from "@/components/EnquiryForm";
import { EXPORT_IMAGES } from "@/lib/content";
import { BUSINESS, GENERAL_WHATSAPP_URL, TEL_URL } from "@/lib/site";

const REQUIREMENTS = [
  "Product preference — marble, granite, blocks or slabs",
  "Required quantity and, where known, dimensions or finish",
  "Destination country for the export discussion",
  "Your contact details for a direct reply",
];

export default function ExportSection({ productNames }: { productNames: string[] }) {
  return (
    <section id="export" className="relative isolate overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <StoneImage
          src={EXPORT_IMAGES.port}
          alt={EXPORT_IMAGES.portAlt}
          width={1400}
          height={1000}
        />
      </div>
      <div className="absolute inset-0 bg-espresso/82" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/88 to-espresso/45" />

      <div className="relative mx-auto grid max-w-[1500px] gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="label-sm flex items-center gap-4 text-champagne">
              <span className="h-px w-10 bg-champagne/60" />
              International Export & Shipping
            </p>
            <h2 className="mt-6 text-[2.1rem] leading-[1.06] text-ivory sm:text-[2.9rem] lg:text-[3.4rem]">
              Indian Natural Stone.
              <span className="mt-2 block text-beige/85 italic">Worldwide Opportunities.</span>
            </h2>
            <p className="mt-7 max-w-xl text-[1rem] leading-[1.9] text-beige/78">
              {BUSINESS.name} welcomes international enquiries for marble, granite, natural stone
              blocks and slabs. Share your product preferences, required quantity and destination to
              begin a discussion about availability and export requirements.
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ul className="mt-10 space-y-4 border-t border-champagne/20 pt-8">
              {REQUIREMENTS.map((requirement) => (
                <li key={requirement} className="flex items-start gap-4">
                  <ShipIcon className="mt-0.5 size-5 shrink-0 text-champagne/85" />
                  <span className="text-[0.9375rem] leading-relaxed text-beige/80">
                    {requirement}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Cta
                href={GENERAL_WHATSAPP_URL}
                variant="whatsapp"
                external
                icon={<WhatsAppIcon className="size-4" />}
              >
                WhatsApp Enquiry
              </Cta>
              <Cta href={TEL_URL} variant="outlineLight" icon={<PhoneIcon className="size-4" />}>
                {BUSINESS.phoneDisplay}
              </Cta>
            </div>
            <p className="mt-6 flex items-start gap-3 text-[0.8125rem] leading-relaxed text-beige/60">
              <GlobeIcon className="mt-0.5 size-4 shrink-0 text-champagne/70" />
              Shipping timelines, rates, documentation and destination-specific requirements are
              discussed directly with the business for each enquiry.
            </p>
          </Reveal>

          <Reveal delay={240} direction="scale">
            <figure className="mt-12 hidden max-w-sm lg:block">
              <div className="zoom-frame aspect-4/3 bg-walnut ring-1 ring-champagne/20">
                <StoneImage
                  src={EXPORT_IMAGES.processing}
                  alt={EXPORT_IMAGES.processingAlt}
                  width={1100}
                  height={820}
                />
              </div>
              <figcaption className="mt-4 text-[0.8125rem] leading-relaxed text-beige/60">
                Stone processing and slab preparation for export requirements.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6" direction="right" delay={100}>
          <div className="bg-ivory p-6 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.95)] sm:p-10">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="label-xs text-brown">Product Requirement</p>
                <h3 className="mt-3 text-[1.75rem] leading-tight text-walnut sm:text-[2.1rem]">
                  Start an Export Enquiry
                </h3>
              </div>
              <span className="hidden font-serif text-4xl text-sandstone sm:block">01</span>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-brown-deep/80">
              Four fields are enough to begin. Your details open as a prefilled WhatsApp message to{" "}
              {BUSINESS.whatsappDisplay}.
            </p>
            <div className="mt-8">
              <EnquiryForm
                variant="compact"
                productNames={productNames}
                source="export-section"
                tone="light"
              />
            </div>
            <a
              href="#contact"
              className="group mt-8 inline-flex items-center gap-3 border-t border-sandstone/70 pt-6 text-[0.75rem] tracking-[0.16em] text-brown uppercase transition-colors hover:text-walnut"
            >
              Use the full enquiry form
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
