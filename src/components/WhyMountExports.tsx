import {
  BlockIcon,
  CalendarIcon,
  ChatIcon,
  EyeIcon,
  FrameIcon,
  GlobeIcon,
} from "@/components/ui/Icons";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Cta, Reveal, StoneImage } from "@/components/ui/Primitives";
import { STRENGTHS } from "@/lib/content";
import { BUSINESS, GENERAL_WHATSAPP_URL, px } from "@/lib/site";

const ICONS = [CalendarIcon, EyeIcon, BlockIcon, ChatIcon, GlobeIcon, FrameIcon];

export default function WhyMountExports() {
  return (
    <section id="why" className="relative overflow-hidden bg-walnut py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label-sm flex items-center gap-4 text-champagne">
                <span className="h-px w-10 bg-champagne/60" />
                Why Mount Exports
              </p>
              <h2 className="mt-6 text-[2.05rem] leading-[1.08] text-ivory sm:text-[2.75rem] lg:text-[3.15rem]">
                Stone Selected for Character.
                <span className="mt-2 block text-beige/85 italic">
                  Service Built Around Your Needs.
                </span>
              </h2>
              <p className="mt-7 text-[0.975rem] leading-[1.9] text-beige/75">
                {BUSINESS.name} works with international stone importers, wholesalers, marble and
                granite distributors, architects, interior designers, developers, fabricators and
                commercial project buyers. Every enquiry is handled directly with the business.
              </p>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Cta href={GENERAL_WHATSAPP_URL} variant="whatsapp" external>
                  Enquire on WhatsApp
                </Cta>
                <Cta
                  href="#contact"
                  variant="outlineLight"
                  icon={<ArrowRightIcon className="size-4" />}
                >
                  Request a Quote
                </Cta>
              </div>
            </Reveal>
          </div>

          <Reveal className="lg:col-span-7" direction="right" delay={80}>
            <div className="relative">
              <div className="zoom-frame aspect-16/11 w-full bg-espresso sm:aspect-16/9 lg:aspect-4/3">
                <StoneImage
                  src={px(37845016, 1400, 1050)}
                  alt="Aerial view of a marble quarry surrounded by greenery"
                  width={1400}
                  height={1050}
                />
              </div>
              <div className="absolute -bottom-8 -left-2 max-w-xs bg-espresso/95 p-6 ring-1 ring-champagne/25 sm:-left-6 lg:-bottom-10">
                <p className="font-serif text-3xl text-champagne">Since {BUSINESS.established}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-beige/80">
                  An established Indian natural-stone export business working with marble, granite,
                  blocks and slabs.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
          {STRENGTHS.map((strength, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <Reveal key={strength.title} delay={index * 80}>
                <div className="group h-full border-t border-champagne/20 pt-7 transition-colors duration-500 hover:border-champagne/60">
                  <div className="flex items-start justify-between gap-5">
                    <Icon className="size-9 text-champagne transition-transform duration-500 group-hover:-translate-y-0.5" />
                    <span className="font-serif text-sm tracking-[0.2em] text-taupe">
                      {strength.index}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[1.35rem] leading-snug text-ivory">{strength.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-beige/70">
                    {strength.copy}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
