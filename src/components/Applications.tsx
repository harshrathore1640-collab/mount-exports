import { ArrowRightIcon } from "@/components/ui/Icons";
import { Cta, Reveal, StoneImage } from "@/components/ui/Primitives";
import { APPLICATIONS } from "@/lib/content";
import { GENERAL_WHATSAPP_URL } from "@/lib/site";

export default function Applications() {
  return (
    <section id="applications" className="relative overflow-hidden bg-beige py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label-sm flex items-center gap-4 text-brown">
              <span className="h-px w-10 bg-brown/50" />
              Stone Applications
            </p>
            <h2 className="mt-6 text-[2.15rem] leading-[1.06] text-walnut sm:text-5xl lg:text-[3.5rem]">
              From Natural Stone to
              <span className="block text-brown italic">Extraordinary Spaces</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[0.975rem] leading-[1.9] text-brown-deep/85">
              Marble and granite shape how a space feels underfoot, in the light and at first glance.
              The applications below are presented as inspiration for how our blocks and slabs are
              used across residential, hospitality and commercial architecture.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12 lg:gap-7">
          {APPLICATIONS.map((application, index) => (
            <Reveal
              key={application.title}
              delay={(index % 3) * 110}
              direction="scale"
              className={application.span}
            >
              <article className="group relative h-full overflow-hidden">
                <div
                  className="zoom-frame relative w-full bg-sandstone"
                  style={{ aspectRatio: application.ratio }}
                >
                  <StoneImage
                    src={application.image}
                    alt={application.alt}
                    width={1400}
                    height={1000}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <span className="label-xs text-champagne">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[1.5rem] leading-tight text-ivory sm:text-[1.85rem]">
                      {application.title}
                    </h3>
                    <p className="mt-3 max-w-lg text-[0.9375rem] leading-relaxed text-beige/80 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                      {application.copy}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-brown/20 pt-9 lg:flex-row lg:items-center">
            <p className="max-w-2xl text-[1rem] leading-relaxed text-brown-deep/85">
              Planning a project in natural stone? Share the application, the stone you have in mind
              and your destination — we will discuss suitable material from the current selection.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Cta href="#products" variant="primary" icon={<ArrowRightIcon className="size-4" />}>
                Browse the Stone
              </Cta>
              <Cta href={GENERAL_WHATSAPP_URL} variant="outlineDark" external>
                Start an Enquiry
              </Cta>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
