"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Cta, StoneImage } from "@/components/ui/Primitives";
import { TRUST_STRIP, type HeroSlide } from "@/lib/content";
import { BUSINESS, GENERAL_WHATSAPP_URL } from "@/lib/site";

const AUTOPLAY_MS = 7000;

export default function Hero({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  useEffect(() => {
    if (paused || count < 2) return;
    timer.current = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, count, go]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") go(index - 1);
      if (event.key === "ArrowRight") go(index + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, go]);

  const active = slides[index];

  return (
    <section
      id="home"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-espresso"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Mount Exports natural stone photography"
    >
      {/* slides */}
      <div className="absolute inset-0">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide.image}
            className="hero-slide absolute inset-0"
            data-active={slideIndex === index}
            aria-hidden={slideIndex !== index}
          >
            <StoneImage
              src={slide.image}
              alt={slide.alt}
              priority={slideIndex === 0}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* cinematic overlays */}
      <div className="absolute inset-0 bg-espresso/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/78 to-espresso/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-espresso/55" />
      <div
        className="absolute inset-0 mix-blend-soft-light"
        style={{ background: "radial-gradient(120% 90% at 20% 20%, #C4A477 0%, transparent 60%)" }}
      />

      {/* content */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-[1500px] flex-col justify-end px-5 pt-36 pb-32 sm:px-8 sm:pb-28 lg:justify-center lg:pt-32 lg:pb-16">
        <div className="hero-copy max-w-4xl">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.625rem] tracking-[0.3em] text-champagne uppercase sm:text-[0.6875rem]">
            <span className="hidden h-px w-14 bg-champagne/70 sm:block" />
            Est. {BUSINESS.established} · Indian Natural Stone Exporter
          </p>

          <h1 className="mt-6 text-[2.65rem] leading-[1.02] text-ivory sm:text-6xl lg:text-[5.1rem]">
            Nature&rsquo;s Finest Stone.
            <span className="mt-1 block text-beige italic sm:mt-2">Delivered Worldwide.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-[0.975rem] leading-[1.85] text-beige/85 sm:text-[1.0625rem]">
            Discover distinctive marble and granite, carefully presented for architectural
            excellence and international projects. From premium blocks to refined slabs,{" "}
            {BUSINESS.name} connects exceptional natural stone with buyers around the world.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:gap-4">
            <Cta href="#products" variant="champagne" icon={<ArrowRightIcon className="size-4" />}>
              Explore Our Collection
            </Cta>
            <Cta
              href={GENERAL_WHATSAPP_URL}
              variant="outlineLight"
              external
              icon={<WhatsAppIcon className="size-4" />}
              ariaLabel="Enquire on WhatsApp"
            >
              Enquire on WhatsApp
            </Cta>
          </div>
        </div>

        {/* trust strip */}
        <div className="mt-14 border-t border-champagne/20 pt-6 lg:mt-20">
          <ul className="grid grid-cols-2 gap-x-5 gap-y-5 lg:grid-cols-4 lg:gap-x-8">
            {TRUST_STRIP.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[7px] size-1.5 shrink-0 rotate-45 bg-champagne" />
                <span className="text-[0.75rem] leading-relaxed tracking-[0.14em] text-beige/85 uppercase sm:text-[0.8125rem]">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* slider controls */}
      <div className="absolute right-5 bottom-8 z-30 flex items-center gap-4 sm:right-8 lg:bottom-12">
        <span className="hidden text-[0.6875rem] tracking-[0.2em] text-beige/70 uppercase md:block">
          {active?.caption}
        </span>
        <div className="flex items-center gap-1.5">
          {slides.map((slide, slideIndex) => (
            <button
              key={`dot-${slide.image}`}
              type="button"
              onClick={() => go(slideIndex)}
              aria-label={`Show slide ${slideIndex + 1}: ${slide.caption}`}
              aria-current={slideIndex === index}
              className="group relative h-8 w-9 overflow-hidden sm:w-12"
            >
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-beige/30 transition-colors group-hover:bg-beige/60" />
              {slideIndex === index && (
                <span
                  key={`progress-${index}`}
                  className="hero-progress absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-champagne"
                />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous hero image"
            className="grid size-11 place-items-center border border-beige/25 text-beige transition-colors hover:border-champagne hover:text-champagne"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next hero image"
            className="grid size-11 place-items-center border border-beige/25 text-beige transition-colors hover:border-champagne hover:text-champagne"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* slide counter */}
      <div className="absolute bottom-8 left-5 z-30 hidden items-center gap-3 font-serif text-beige/80 sm:left-8 lg:flex lg:bottom-12">
        <span className="text-2xl text-champagne">{String(index + 1).padStart(2, "0")}</span>
        <span className="h-px w-10 bg-beige/30" />
        <span className="text-sm tracking-[0.2em]">{String(count).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
