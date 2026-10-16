import { ChatIcon, QuoteIcon, ShipIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Cta, Reveal, StoneImage } from "@/components/ui/Primitives";
import { BUSINESS, GENERAL_WHATSAPP_URL, TEL_URL, px } from "@/lib/site";

const AUDIENCES = [
  "Stone importers",
  "Wholesalers",
  "Marble & granite distributors",
  "Architects",
  "Interior designers",
  "Developers",
  "Fabricators",
  "Commercial project buyers",
];

const SERVICE_POINTS = [
  {
    icon: ChatIcon,
    title: "Direct Communication",
    copy: "Enquiries are handled directly with the business — on WhatsApp, by phone or through the enquiry form.",
  },
  {
    icon: ShipIcon,
    title: "Export-Oriented Enquiries",
    copy: "Product preference, quantity, dimensions, finish and destination are discussed before commercial details.",
  },
  {
    icon: WhatsAppIcon,
    title: "Visual References on Request",
    copy: "Ask for relevant visual references of the current selection while shortlisting material for your project.",
  },
];

export default function BuyerEnquiries() {
  return (
    <section id="service" className="relative overflow-hidden bg-espresso py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5" direction="left">
            <p className="label-sm flex items-center gap-4 text-champagne">
              <span className="h-px w-10 bg-champagne/60" />
              Buyer Enquiries & Service
            </p>
            <h2 className="mt-6 text-[2rem] leading-[1.08] text-ivory sm:text-[2.6rem]">
              Built for International
              <span className="block text-beige/85 italic">Stone Buyers</span>
            </h2>

            <figure className="mt-9 border-l-2 border-champagne/50 pl-6">
              <QuoteIcon className="size-6 text-champagne/70" />
              <blockquote className="mt-4 font-serif text-[1.5rem] leading-snug text-beige italic sm:text-[1.75rem]">
                {BUSINESS.tagline}
              </blockquote>
              <figcaption className="label-xs mt-4 text-taupe">
                {BUSINESS.name} · {BUSINESS.category}
              </figcaption>
            </figure>

            <div className="mt-10">
              <p className="label-xs text-taupe">Who we work with</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AUDIENCES.map((audience) => (
                  <li
                    key={audience}
                    className="border border-champagne/25 px-3 py-1.5 text-[0.75rem] tracking-[0.06em] text-beige/78 transition-colors hover:border-champagne/60 hover:text-champagne"
                  >
                    {audience}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal direction="right">
              <div className="zoom-frame aspect-16/10 w-full bg-walnut sm:aspect-21/9">
                <StoneImage
                  src={px(30112372, 1600, 900)}
                  alt="Granite and marble slabs being prepared in a stone processing facility"
                  width={1600}
                  height={900}
                />
              </div>
            </Reveal>

            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {SERVICE_POINTS.map((point, index) => {
                const Icon = point.icon;
                return (
                  <Reveal key={point.title} delay={index * 90}>
                    <div className="border-t border-champagne/20 pt-6">
                      <Icon className="size-8 text-champagne" />
                      <h3 className="mt-5 text-[1.15rem] leading-snug text-ivory">{point.title}</h3>
                      <p className="mt-3 text-[0.875rem] leading-relaxed text-beige/70">
                        {point.copy}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal delay={160}>
              <div className="mt-12 flex flex-col gap-5 border border-champagne/20 bg-walnut/60 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <p className="max-w-md text-[0.9375rem] leading-relaxed text-beige/78">
                  Customer testimonials are published only when verified reviews are supplied by the
                  business. Until then, the fastest way to judge our material is to ask for visual
                  references and start a conversation.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Cta href={GENERAL_WHATSAPP_URL} variant="whatsapp" external>
                    Ask a Question
                  </Cta>
                  <Cta href={TEL_URL} variant="outlineLight">
                    Call Us
                  </Cta>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
