import { Reveal } from "@/components/ui/Primitives";
import { PROCESS_STEPS } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label-sm flex items-center gap-4 text-brown">
              <span className="h-px w-10 bg-brown/50" />
              Export Enquiry Process
            </p>
            <h2 className="mt-6 text-[2.15rem] leading-[1.06] text-walnut sm:text-5xl lg:text-[3.4rem]">
              A Clear Path from Enquiry
              <span className="block text-brown italic">to Export Coordination</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[0.975rem] leading-[1.9] text-brown-deep/85">
              Four straightforward steps, handled directly with the business — so international
              buyers always know what happens next.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 border-l border-sandstone lg:mt-20 lg:border-l-0">
          <span
            aria-hidden="true"
            className="absolute top-7 right-0 left-0 hidden h-px bg-gradient-to-r from-sandstone via-sandstone/70 to-transparent lg:block"
          />
          <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.index} delay={index * 110} as="li">
                <div className="relative pl-8 lg:pl-0">
                  <span className="absolute top-2 -left-[5.5px] size-2.5 rotate-45 bg-brown ring-4 ring-ivory lg:static lg:block lg:size-auto lg:bg-transparent lg:ring-0">
                    <span className="hidden font-serif text-[2.75rem] leading-none text-sandstone lg:block">
                      {step.index}
                    </span>
                  </span>

                  <div className="lg:mt-6 lg:border-t lg:border-sandstone lg:pt-6">
                    <span className="label-xs text-champagne lg:hidden">Step {step.index}</span>
                    <span className="label-xs hidden text-taupe lg:block">
                      Step {step.index}
                    </span>
                    <h3 className="mt-3 text-[1.4rem] leading-snug text-walnut lg:mt-3 lg:pr-6">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-brown-deep/80 lg:pr-6">
                      {step.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
