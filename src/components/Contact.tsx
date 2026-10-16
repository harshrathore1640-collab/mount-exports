import {
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { Reveal, StoneImage } from "@/components/ui/Primitives";
import EnquiryForm from "@/components/EnquiryForm";
import { BUSINESS, EMAIL_URL, GENERAL_WHATSAPP_URL, TEL_URL, px } from "@/lib/site";

const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(
  BUSINESS.mapsEmbedQuery,
)}&output=embed`;

export default function Contact({ productNames }: { productNames: string[] }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-beige py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label-sm flex items-center gap-4 text-brown">
              <span className="h-px w-10 bg-brown/50" />
              Contact & Request a Quote
            </p>
            <h2 className="mt-6 text-[2.15rem] leading-[1.06] text-walnut sm:text-5xl lg:text-[3.4rem]">
              Tell Us the Stone.
              <span className="block text-brown italic">We&rsquo;ll Take It from There.</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[0.975rem] leading-[1.9] text-brown-deep/85">
              Share your requirement below and the details open as a prefilled WhatsApp message. You
              can also call or message us directly — enquiries are answered by the business.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* details */}
          <div className="lg:col-span-5">
            <Reveal direction="left">
              <ul className="divide-y divide-sandstone/70 border-y border-sandstone/70">
                <li className="flex items-start gap-5 py-6">
                  <span className="grid size-11 shrink-0 place-items-center border border-brown/30 text-brown">
                    <PhoneIcon className="size-5" />
                  </span>
                  <div>
                    <p className="label-xs text-taupe">Direct Phone</p>
                    <a
                      href={TEL_URL}
                      className="mt-2 block font-serif text-[1.45rem] text-walnut transition-colors hover:text-brown"
                    >
                      {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-5 py-6">
                  <span className="grid size-11 shrink-0 place-items-center border border-whatsapp/40 text-whatsapp">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <div>
                    <p className="label-xs text-taupe">WhatsApp Enquiry</p>
                    <a
                      href={GENERAL_WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block font-serif text-[1.45rem] text-walnut transition-colors hover:text-whatsapp"
                    >
                      {BUSINESS.whatsappDisplay}
                    </a>
                    <p className="mt-1 text-[0.8125rem] text-brown-deep/70">
                      Instant stone availability, photos & container export quotes.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-5 py-6">
                  <span className="grid size-11 shrink-0 place-items-center border border-brown/30 text-brown">
                    <MailIcon className="size-5" />
                  </span>
                  <div>
                    <p className="label-xs text-taupe">Email</p>
                    <a
                      href={EMAIL_URL}
                      className="mt-2 block font-serif text-[1.25rem] text-walnut transition-colors hover:text-brown break-all"
                    >
                      {BUSINESS.email}
                    </a>
                    <p className="mt-1 text-[0.8125rem] text-brown-deep/70">
                      Send project drawings, specs, and BOQs.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-5 py-6">
                  <span className="grid size-11 shrink-0 place-items-center border border-brown/30 text-brown">
                    <InstagramIcon className="size-5" />
                  </span>
                  <div>
                    <p className="label-xs text-taupe">Instagram</p>
                    <a
                      href={BUSINESS.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 block font-serif text-[1.45rem] text-walnut transition-colors hover:text-brown"
                    >
                      {BUSINESS.instagramHandle}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-5 py-6">
                  <span className="grid size-11 shrink-0 place-items-center border border-brown/30 text-brown">
                    <MapPinIcon className="size-5" />
                  </span>
                  <div>
                    <p className="label-xs text-taupe">Head / Registered Office</p>
                    <p className="mt-2 font-serif text-[1.15rem] leading-snug text-walnut">
                      {BUSINESS.officeAddress}
                    </p>
                    <div className="mt-3.5 space-y-1.5 border-t border-sandstone/60 pt-3 text-[0.84rem] text-brown-deep/85">
                      <p>
                        <span className="font-semibold text-walnut">Job Work / Processing:</span>{" "}
                        {BUSINESS.jobWorkAddress}
                      </p>
                      <p>
                        <span className="font-semibold text-walnut">Quarry:</span>{" "}
                        {BUSINESS.quarryOwnership}
                      </p>
                      <p>
                        <span className="font-semibold text-walnut">Specialization:</span>{" "}
                        {BUSINESS.specialization}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={140} direction="scale">
              <figure className="mt-10">
                <div className="relative border border-sandstone/70 bg-ivory p-2">
                  <iframe
                    title={`Map showing ${BUSINESS.location}`}
                    src={MAP_EMBED}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-72 w-full grayscale-[35%] sm:h-80"
                    style={{ border: 0 }}
                  />
                </div>
                <figcaption className="mt-4 flex items-center gap-3 text-[0.8125rem] text-brown-deep/75">
                  <span className="h-px w-8 bg-brown/40" />
                  {BUSINESS.officeAddressShort} — view on Google Maps
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={180}>
              <div className="zoom-frame mt-10 hidden aspect-21/9 w-full bg-sandstone lg:block">
                <StoneImage
                  src={px(4705833, 1400, 700)}
                  alt="Beige marble and granite tile surface texture"
                  width={1400}
                  height={700}
                />
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal className="lg:col-span-7" direction="right" delay={80}>
            <div className="bg-ivory p-6 shadow-[0_40px_90px_-60px_rgba(56,38,28,0.85)] sm:p-10">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="label-xs text-brown">Enquiry Form</p>
                  <h3 className="mt-3 text-[1.85rem] leading-tight text-walnut sm:text-[2.2rem]">
                    Request a Quote
                  </h3>
                </div>
                <p className="label-xs text-taupe">Fields marked * are required</p>
              </div>
              <div className="hairline my-8" />
              <EnquiryForm
                variant="full"
                productNames={productNames}
                source="contact-form"
                tone="light"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
