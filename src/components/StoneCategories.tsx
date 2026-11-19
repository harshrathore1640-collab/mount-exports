"use client";

import { useCallback } from "react";
import { ArrowRightIcon, SparklesIcon, LayersIcon } from "@/components/ui/Icons";
import { Reveal, StoneImage } from "@/components/ui/Primitives";
import { STONE_CATEGORIES, type StoneCategory } from "@/lib/content";

export const CATEGORY_SELECT_EVENT = "mount-exports:set-category";

export function selectStoneCategory(categoryName: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CATEGORY_SELECT_EVENT, { detail: categoryName }));
    const target = document.getElementById("products");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

export default function StoneCategories() {
  const handleCategoryClick = useCallback((category: StoneCategory) => {
    selectStoneCategory(category.filterKey);
  }, []);

  return (
    <section id="categories" className="relative isolate overflow-hidden bg-ink py-24 sm:py-28 lg:py-36">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 55% at 50% 25%, rgba(196,164,119,0.25) 0%, transparent 75%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(196,164,119,0.3) 0 1px, transparent 1px 120px)",
        }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-champagne/15 pb-12 lg:flex-row lg:items-end">
          <Reveal className="max-w-3xl">
            <p className="label-sm flex items-center gap-3 text-champagne">
              <span className="h-px w-10 bg-champagne/60" />
              Primary Stone Classifications
            </p>
            <h2 className="mt-4 font-serif text-[2.2rem] leading-[1.08] text-ivory sm:text-5xl lg:text-[3.5rem]">
              Four Pillars of
              <span className="ml-3 italic text-champagne/90">Natural Stone</span>
            </h2>
            <p className="mt-5 text-[0.975rem] leading-[1.8] text-beige/75">
              Direct from quarry sources and precision processing units in Udaipur, Rajasthan.
              Select any category to inspect available blocks, processed slabs, and export specifications.
            </p>
          </Reveal>

          <Reveal delay={120} className="shrink-0">
            <div className="flex items-center gap-3 border border-champagne/20 bg-espresso/60 px-5 py-3 text-xs tracking-[0.2em] text-champagne uppercase backdrop-blur-md">
              <SparklesIcon className="size-4 text-champagne animate-pulse" />
              <span>Worldwide Container Supply</span>
            </div>
          </Reveal>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {STONE_CATEGORIES.map((cat, index) => {
            const isPatagonia = cat.id === "patagonia";
            return (
              <Reveal
                key={cat.id}
                delay={index * 110}
                direction="scale"
                className="h-full"
              >
                <article
                  onClick={() => handleCategoryClick(cat)}
                  className={`group relative flex h-full cursor-pointer flex-col overflow-hidden border transition-all duration-500 ${
                    isPatagonia
                      ? "border-amber-500/30 hover:border-amber-400/70 hover:shadow-[0_20px_60px_-15px_rgba(245,158,11,0.25)]"
                      : "border-champagne/15 hover:border-champagne/50 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]"
                  } bg-espresso/70 backdrop-blur-md`}
                >
                  {/* Image container */}
                  <div className="zoom-frame relative aspect-[4/5] w-full overflow-hidden bg-walnut">
                    <StoneImage
                      src={cat.image}
                      alt={`${cat.name} — ${cat.tagline}`}
                      width={1000}
                      height={1250}
                    />

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-75" />

                    {/* Glowing highlight for Patagonia */}
                    {isPatagonia && (
                      <div className="pointer-events-none absolute inset-0 bg-radial from-amber-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    )}

                    {/* Top Badges */}
                    <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2">
                      <span className="label-xs border border-champagne/40 bg-espresso/80 px-2.5 py-1 text-champagne uppercase backdrop-blur-md">
                        {cat.badge}
                      </span>
                      <span className="font-serif text-[0.875rem] text-champagne/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Bottom floating summary on image */}
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="label-xs text-champagne/80 tracking-[0.2em]">
                        {cat.subtitle}
                      </p>
                      <h3 className="mt-1 font-serif text-[1.85rem] leading-tight text-ivory group-hover:text-champagne transition-colors duration-300">
                        {cat.name}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 pt-5">
                    <div>
                      <p className="text-[0.875rem] leading-relaxed text-beige/75">
                        {cat.description}
                      </p>

                      {/* Characteristics Pills */}
                      <ul className="mt-5 space-y-1.5 border-t border-champagne/15 pt-4">
                        {cat.characteristics.map((trait) => (
                          <li
                            key={trait}
                            className="flex items-center gap-2 text-[0.75rem] tracking-[0.08em] text-beige/65"
                          >
                            <span className="size-1 rounded-full bg-champagne/70" />
                            <span>{trait}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card Footer with Click Action */}
                    <div className="mt-7 border-t border-champagne/15 pt-4">
                      <div className="flex items-center justify-between text-[0.75rem] tracking-[0.16em] text-champagne uppercase transition-colors group-hover:text-ivory">
                        <span className="inline-flex items-center gap-2">
                          <LayersIcon className="size-3.5 text-champagne/70" />
                          {cat.countHint}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <span>Explore</span>
                          <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
