import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Cta, Reveal, StoneImage } from "@/components/ui/Primitives";
import { FINAL_CTA_IMAGE } from "@/lib/content";
import { BUSINESS, GENERAL_WHATSAPP_URL } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      <div className="absolute inset-0">
        <StoneImage
          src={FINAL_CTA_IMAGE.src}
          alt={FINAL_CTA_IMAGE.alt}
          width={1920}
          height={1100}
        />
      </div>
      <div className="absolute inset-0 bg-espresso/78" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-espresso/60 to-espresso/80" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-28 text-center sm:px-8 lg:py-40">
        <Reveal>
          <p className="label-sm mx-auto flex w-fit items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-champagne/60" />
            Begin the Conversation
            <span className="h-px w-10 bg-champagne/60" />
          </p>
          <h2 className="mx-auto mt-8 max-w-4xl text-[2.2rem] leading-[1.05] text-ivory sm:text-6xl lg:text-[4.2rem]">
            Your Next Project Begins
            <span className="block text-beige/90 italic">with the Right Stone.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-[1rem] leading-[1.9] text-beige/80">
            Explore our natural stone collection and connect with {BUSINESS.name} for product and
            international export enquiries.
          </p>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Cta href="#products" variant="champagne" icon={<ArrowRightIcon className="size-4" />}>
              Explore Products
            </Cta>
            <Cta
              href={GENERAL_WHATSAPP_URL}
              variant="outlineLight"
              external
              icon={<WhatsAppIcon className="size-4" />}
            >
              Start a WhatsApp Enquiry
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
