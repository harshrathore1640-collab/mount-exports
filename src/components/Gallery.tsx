"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  ExpandIcon,
} from "@/components/ui/Icons";
import { Reveal, StoneImage } from "@/components/ui/Primitives";
import type { GalleryRecord } from "@/lib/content";
import { GALLERY_THEMES } from "@/lib/content";
import { cn } from "@/lib/cn";

const FILTERS = ["All Themes", ...GALLERY_THEMES] as string[];

export default function Gallery({ items }: { items: GalleryRecord[] }) {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === FILTERS[0] ? items : items.filter((item) => item.theme === filter)),
    [filter, items],
  );

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (direction: number) =>
      setLightbox((current) => {
        if (current === null) return current;
        return (current + direction + visible.length) % visible.length;
      }),
    [visible.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, close, step]);

  const current = lightbox !== null ? visible[lightbox] : null;

  return (
    <section id="gallery" className="relative bg-shell py-24 lg:py-32">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label-sm flex items-center gap-4 text-brown">
              <span className="h-px w-10 bg-brown/50" />
              Stone Gallery
            </p>
            <h2 className="mt-6 text-[2.15rem] leading-[1.06] text-walnut sm:text-5xl lg:text-[3.5rem]">
              Surfaces, Blocks & Spaces
              <span className="block text-brown italic">in Natural Detail</span>
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[0.975rem] leading-[1.9] text-brown-deep/85">
              An editorial view of the material world we work in — statement facades, luxury
              interiors, hero blocks, architectural slabs and the natural movement that makes every
              stone different. Select any image to view it larger.
            </p>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-wrap gap-2 border-y border-sandstone/60 py-4">
            {FILTERS.map((theme) => {
              const isActive = filter === theme;
              return (
                <button
                  key={theme}
                  type="button"
                  onClick={() => setFilter(theme)}
                  aria-pressed={isActive}
                  className={cn(
                    "px-4 py-2 text-[0.6875rem] tracking-[0.18em] uppercase transition-all duration-300",
                    isActive
                      ? "bg-brown text-ivory"
                      : "text-brown-deep/80 hover:bg-beige hover:text-walnut",
                  )}
                >
                  {theme}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="masonry mt-10">
          {visible.map((item, index) => (
            <Reveal key={`${item.title}-${item.image}`} delay={(index % 6) * 70} direction="scale">
              <button
                type="button"
                onClick={() => setLightbox(index)}
                className="group relative block w-full text-left"
                aria-label={`Open ${item.title} in the gallery viewer`}
              >
                <span
                  className="zoom-frame relative block w-full bg-beige-deep"
                  style={{ aspectRatio: item.ratio }}
                >
                  <StoneImage
                    src={item.image}
                    alt={`${item.title} — ${item.theme} natural stone photography`}
                    width={1100}
                    height={1400}
                  />
                  <span className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/85 via-espresso/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="label-xs text-champagne">{item.theme}</span>
                    <span className="mt-2 flex items-center justify-between gap-4 font-serif text-xl text-ivory">
                      {item.title}
                      <ExpandIcon className="size-5 shrink-0" />
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="lightbox fixed inset-0 z-90 flex flex-col bg-ink/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${current.title} — enlarged view`}
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div>
              <p className="label-xs text-champagne">{current.theme}</p>
              <p className="mt-1.5 font-serif text-lg text-ivory sm:text-2xl">{current.title}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden font-serif text-beige/70 sm:block">
                {String((lightbox ?? 0) + 1).padStart(2, "0")} / {String(visible.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={close}
                aria-label="Close gallery viewer"
                autoFocus
                className="grid size-11 place-items-center border border-champagne/35 text-beige transition-colors hover:border-champagne hover:text-champagne"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
          </div>

          <div
            className="flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous gallery image"
              className="mr-2 grid size-12 shrink-0 place-items-center border border-beige/25 text-beige transition-colors hover:border-champagne hover:text-champagne sm:mr-5"
            >
              <ChevronLeftIcon className="size-5" />
            </button>

            <figure className="flex min-h-0 max-w-5xl flex-1 items-center justify-center">
              <img
                src={current.image}
                alt={`${current.title} — ${current.theme}`}
                className="max-h-[74vh] w-auto max-w-full object-contain"
                onError={(event) => {
                  event.currentTarget.src = "/images/stone-fallback.jpg";
                }}
              />
            </figure>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next gallery image"
              className="ml-2 grid size-12 shrink-0 place-items-center border border-beige/25 text-beige transition-colors hover:border-champagne hover:text-champagne sm:ml-5"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
