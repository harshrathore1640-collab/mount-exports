import { ArrowRightIcon } from "@/components/ui/Icons";
import { Cta, Reveal, StoneImage } from "@/components/ui/Primitives";
import { ABOUT_IMAGES } from "@/lib/content";
import { BUSINESS, GENERAL_WHATSAPP_URL } from "@/lib/site";

const HIGHLIGHTS = [
  "Established in 1996 in Udaipur, Rajasthan",
  "Own quarry for Titanium Gold",
  "Indian Marble, Granite & Patagonia",
  "Processing facility at Jain Grani Marmo",
];

const TIMELINE = [
  {
    marker: "1996",
    title: "Established in Udaipur",
    copy: "Mount Exports begins working with natural stone in Udaipur, Rajasthan, India.",
  },
  {
    marker: "Quarry",
    title: "Titanium Gold Quarry",
    copy: "Operating our own quarry for Titanium Gold, ensuring authentic extraction and consistent volume.",
  },
  {
    marker: "Today",
    title: "Marble, Granite & Patagonia",
    copy: "Comprehensive portfolio of Indian Marble, Granite, Patagonia and Exotic Colours with processing at Jain Grani Marmo.",
  },
  {
    marker: "Worldwide",
    title: "Worldwide Export Supply",
    copy: "Export-oriented supply with worldwide container shipping for international importers and commercial projects.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-24 lg:py-36">
      <div className="pointer-events-none absolute -top-24 -right-24 size-[26rem] rounded-full bg-beige/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-[1500px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-20">
        {/* image collage */}
        <Reveal className="mb-14 sm:mb-20 lg:col-span-6 lg:mb-0" direction="left">
          <div className="relative max-w-[36rem]">
            <div className="zoom-frame relative aspect-4/5 w-full bg-beige-deep">
              <StoneImage
                src={ABOUT_IMAGES.primary}
                alt={ABOUT_IMAGES.primaryAlt}
                width={1100}
                height={1400}
              />
            </div>

            <div className="absolute -right-2 -bottom-14 hidden w-56 border-8 border-ivory sm:block lg:-right-10 lg:w-64">
              <div className="zoom-frame aspect-4/3 bg-sandstone">
                <StoneImage
                  src={ABOUT_IMAGES.secondary}
                  alt={ABOUT_IMAGES.secondaryAlt}
                  width={900}
                  height={700}
                />
              </div>
            </div>

            <div className="absolute -top-8 -left-3 hidden lg:block">
              <div className="w-44 border-8 border-ivory">
                <div className="zoom-frame aspect-square bg-sandstone">
                  <StoneImage
                    src={ABOUT_IMAGES.tertiary}
                    alt={ABOUT_IMAGES.tertiaryAlt}
                    width={900}
                    height={700}
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 left-4 flex items-center gap-4 bg-espresso px-6 py-5 text-ivory shadow-[0_24px_50px_-30px_rgba(33,23,16,0.9)] lg:-left-6 lg:bottom-14">
              <span className="font-serif text-4xl text-champagne">1996</span>
              <span className="h-10 w-px bg-champagne/35" />
              <span className="label-xs max-w-[9rem] text-beige/85">
                Since {BUSINESS.established}
                <br />
                {BUSINESS.locationShort}
              </span>
            </div>
          </div>
        </Reveal>

        {/* editorial copy */}
        <div className="lg:col-span-6 lg:pl-6">
          <Reveal>
            <p className="label-sm flex items-center gap-4 text-brown">
              <span className="h-px w-10 bg-brown/50" />
              Our Story
            </p>
            <h2 className="mt-6 text-[2.15rem] leading-[1.08] text-walnut sm:text-5xl lg:text-[3.4rem]">
              A Legacy in Natural Stone Since {BUSINESS.established}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mt-7 text-[1rem] leading-[1.9] text-brown-deep/90">
              {BUSINESS.name} is an established Indian natural-stone exporter based in Udaipur,
              Rajasthan, dealing in Indian Marble, Granite, Patagonia, and other Exotic Colours in
              blocks and premium slabs. Operating our own quarry for Titanium Gold and processing
              through our job work facility at Jain Grani Marmo, we ensure complete control from
              quarry extraction to high-precision finishing.
            </p>
            <p className="mt-5 text-[1rem] leading-[1.9] text-brown-deep/80">
              Worldwide container shipping is offered as part of our export service. Enquiries are
              handled directly with the business — from material shortlisting and custom cuts
              through to commercial terms and international port logistics.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="flex items-start gap-3 border-t border-sandstone/60 pt-4">
                  <span className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-champagne" />
                  <span className="text-[0.9375rem] leading-snug text-walnut">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={280}>
            <ol className="mt-12 space-y-6 border-l border-sandstone/70 pl-7">
              {TIMELINE.map((entry) => (
                <li key={entry.marker} className="relative">
                  <span className="absolute top-2 -left-[2.15rem] size-2.5 rotate-45 bg-brown ring-4 ring-ivory" />
                  <p className="label-xs text-champagne">{entry.marker}</p>
                  <h3 className="mt-2 text-xl text-walnut">{entry.title}</h3>
                  <p className="mt-1.5 max-w-md text-[0.9375rem] leading-relaxed text-brown-deep/80">
                    {entry.copy}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-12 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <Cta href="#products" variant="primary" icon={<ArrowRightIcon className="size-4" />}>
                View the Collection
              </Cta>
              <Cta href={GENERAL_WHATSAPP_URL} variant="outlineDark" external>
                Talk to Us on WhatsApp
              </Cta>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
