"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRightIcon,
  CloseIcon,
  ExpandIcon,
  LayersIcon,
  WhatsAppIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import { Cta, Reveal, StoneImage } from "@/components/ui/Primitives";
import type { ProductRecord } from "@/lib/content";
import { PRODUCT_CATEGORIES } from "@/lib/content";
import { cn } from "@/lib/cn";
import { productWhatsappUrl } from "@/lib/site";

export const QUOTE_EVENT = "mount-exports:quote-request";

function requestQuote(productName: string) {
  window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: productName }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Products({ products }: { products: ProductRecord[] }) {
  const [filter, setFilter] = useState<string>(PRODUCT_CATEGORIES[0]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [modalActiveImage, setModalActiveImage] = useState<"primary" | "detail">("primary");

  // Listen for category navigation events from StoneCategories showcase or Header
  useEffect(() => {
    const handleCategorySelect = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        setFilter(customEvent.detail);
      }
    };
    window.addEventListener("mount-exports:set-category", handleCategorySelect);
    return () => window.removeEventListener("mount-exports:set-category", handleCategorySelect);
  }, []);

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    map.set(PRODUCT_CATEGORIES[0], products.length);
    for (const product of products) {
      for (const category of product.categories) {
        map.set(category, (map.get(category) ?? 0) + 1);
      }
    }
    return map;
  }, [products]);

  const visible = useMemo(() => {
    if (filter === PRODUCT_CATEGORIES[0]) return products;
    return products.filter((product) => product.categories.includes(filter));
  }, [filter, products]);

  const activeProduct = products.find((product) => product.slug === openSlug) ?? null;

  const close = useCallback(() => {
    setOpenSlug(null);
    setModalActiveImage("primary");
  }, []);

  useEffect(() => {
    if (!activeProduct) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeProduct, close]);

  return (
    <section id="products" className="relative overflow-hidden bg-espresso py-24 sm:py-28 lg:py-36">
      {/* Background Architectural Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(196,164,119,0.35) 0 1px, transparent 1px 110px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 10%, rgba(196,164,119,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[1540px] px-5 sm:px-8">
        {/* Section Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label-sm flex items-center gap-3 text-champagne">
              <span className="h-px w-10 bg-champagne/60" />
              Direct Extraction & Wholesale Portfolio
            </p>
            <h2 className="mt-4 font-serif text-[2.2rem] leading-[1.08] text-ivory sm:text-5xl lg:text-[3.5rem]">
              The Natural Stone
              <span className="ml-3 italic text-champagne/90">Collection</span>
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[0.975rem] leading-[1.85] text-beige/75">
              Every stone is catalogued with authentic high-resolution imagery of real blocks and processed
              slabs. Available for global container export with custom dimensioning, surface finishes, and
              bookmatch pairings on enquiry.
            </p>
          </Reveal>
        </div>

        {/* 4 Main Categories Navigation Bar */}
        <Reveal delay={160}>
          <div className="mt-14 border-y border-champagne/15 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <span className="label-xs mr-3 hidden text-taupe lg:inline-block">Filter Category</span>
                {PRODUCT_CATEGORIES.map((category) => {
                  const isActive = filter === category;
                  const count = counts.get(category) ?? 0;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setFilter(category)}
                      aria-pressed={isActive}
                      className={cn(
                        "group relative inline-flex items-center gap-2.5 px-4 py-2.5 text-[0.75rem] tracking-[0.16em] uppercase transition-all duration-300",
                        isActive
                          ? "border border-champagne bg-champagne text-espresso shadow-[0_4px_20px_rgba(196,164,119,0.35)] font-semibold"
                          : "border border-champagne/20 bg-espresso/40 text-beige/75 hover:border-champagne/60 hover:text-ivory hover:bg-espresso/70",
                      )}
                    >
                      <span>{category}</span>
                      <span
                        className={cn(
                          "font-serif text-[0.6875rem] tracking-normal",
                          isActive ? "text-espresso/80" : "text-taupe group-hover:text-champagne",
                        )}
                      >
                        ({String(count).padStart(2, "0")})
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Filter Breadcrumb */}
              {filter !== PRODUCT_CATEGORIES[0] && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-beige/65">
                    Showing <strong className="text-champagne font-medium">{filter}</strong> ({visible.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => setFilter(PRODUCT_CATEGORIES[0])}
                    className="label-xs text-champagne/70 hover:text-ivory underline underline-offset-4 transition-colors"
                  >
                    View All Stones
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Products Grid */}
        <div className="mt-14 grid gap-x-7 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((product, index) => {
            const isPatagonia = product.slug === "patagonia";
            const isTitaniumGold = product.slug === "titanium-gold";

            return (
              <Reveal key={product.slug} delay={index * 80} direction="scale" className="h-full">
                <article
                  className={cn(
                    "group relative flex h-full flex-col border transition-all duration-500",
                    isPatagonia
                      ? "border-amber-500/25 hover:border-amber-400/60 hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.22)]"
                      : "border-champagne/15 hover:border-champagne/45 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85)]",
                    "bg-espresso/80 backdrop-blur-sm",
                  )}
                >
                  {/* Image Frame */}
                  <div className="relative">
                    <div className="zoom-frame relative aspect-[4/3] w-full overflow-hidden bg-walnut">
                      <StoneImage
                        src={product.primaryImage}
                        alt={`${product.name} natural stone — ${product.description}`}
                        width={1200}
                        height={900}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-65" />

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap gap-2">
                        {isTitaniumGold && (
                          <span className="bg-champagne px-3 py-1 text-[0.625rem] font-semibold tracking-[0.2em] text-espresso uppercase shadow-lg">
                            Own Quarry
                          </span>
                        )}
                        {isPatagonia && (
                          <span className="border border-amber-400/40 bg-espresso/90 px-3 py-1 text-[0.625rem] font-semibold tracking-[0.2em] text-amber-300 uppercase shadow-lg backdrop-blur-md">
                            Translucent Quartzite
                          </span>
                        )}
                        {!isTitaniumGold && !isPatagonia && product.categories.includes("Exotic Stones") && (
                          <span className="border border-champagne/40 bg-espresso/90 px-3 py-1 text-[0.625rem] font-semibold tracking-[0.2em] text-champagne uppercase shadow-md backdrop-blur-sm">
                            Exotic Stone
                          </span>
                        )}
                        {!isTitaniumGold && !isPatagonia && !product.categories.includes("Exotic Stones") && product.categories.includes("Marble") && (
                          <span className="border border-champagne/30 bg-espresso/90 px-3 py-1 text-[0.625rem] font-semibold tracking-[0.2em] text-beige uppercase shadow-md backdrop-blur-sm">
                            Natural Marble
                          </span>
                        )}
                        {!isTitaniumGold && !isPatagonia && !product.categories.includes("Exotic Stones") && product.categories.includes("Granite") && (
                          <span className="border border-champagne/30 bg-espresso/90 px-3 py-1 text-[0.625rem] font-semibold tracking-[0.2em] text-beige uppercase shadow-md backdrop-blur-sm">
                            Export Granite
                          </span>
                        )}
                      </div>

                      {/* Hover Expand Trigger */}
                      <button
                        type="button"
                        onClick={() => setOpenSlug(product.slug)}
                        className="absolute inset-0 flex cursor-pointer items-center justify-center"
                        aria-label={`View details and specifications for ${product.name}`}
                      >
                        <span className="inline-flex translate-y-3 items-center gap-2.5 border border-champagne/60 bg-espresso/70 px-5 py-3 text-[0.6875rem] tracking-[0.2em] text-ivory uppercase opacity-0 backdrop-blur-md transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100">
                          <ExpandIcon className="size-4 text-champagne" />
                          View Specifications
                        </span>
                      </button>
                    </div>

                    {/* Format Strip */}
                    <div className="flex items-center justify-between border-b border-champagne/15 px-6 py-3 bg-walnut/40">
                      <span className="label-xs text-champagne/85">
                        NO. {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="label-xs inline-flex items-center gap-2 text-beige/70">
                        <LayersIcon className="size-3.5 text-champagne/70" />
                        {product.formatLabel}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-serif text-[1.75rem] leading-tight text-ivory group-hover:text-champagne transition-colors duration-300">
                        {product.name}
                      </h3>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-beige/70 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Category Pills */}
                      <ul className="mt-5 flex flex-wrap gap-1.5">
                        {product.categories.map((category) => (
                          <li
                            key={`${product.slug}-${category}`}
                            className="border border-champagne/20 bg-espresso/50 px-2.5 py-1 text-[0.625rem] tracking-[0.16em] text-beige/70 uppercase"
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="mt-7 flex flex-col gap-2.5 border-t border-champagne/15 pt-5">
                      <button
                        type="button"
                        onClick={() => setOpenSlug(product.slug)}
                        className="group/link inline-flex items-center justify-between gap-3 text-left text-[0.75rem] tracking-[0.18em] text-ivory uppercase transition-colors hover:text-champagne cursor-pointer"
                      >
                        <span>Full Specifications</span>
                        <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/link:translate-x-1.5 text-champagne" />
                      </button>
                      <a
                        href={productWhatsappUrl(product.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp mt-2 !py-3 text-[0.6875rem] tracking-[0.16em]"
                      >
                        <WhatsAppIcon className="size-4" />
                        <span>Enquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {visible.length === 0 && (
          <div className="mt-16 text-center border border-champagne/20 bg-espresso/50 p-12 backdrop-blur-md">
            <p className="font-serif text-2xl text-ivory">No stones in this classification currently listed.</p>
            <p className="mt-2 text-sm text-beige/70">
              Mount Exports maintains extensive quarry inventory offline. Contact us directly to enquire about specific stone requirements.
            </p>
            <button
              type="button"
              onClick={() => setFilter(PRODUCT_CATEGORIES[0])}
              className="btn btn-primary mt-6"
            >
              <span>Reset Filter to All Stones</span>
            </button>
          </div>
        )}

        {/* Global Requirement Box */}
        <Reveal delay={120}>
          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-champagne/20 pt-12 lg:flex-row">
            <div>
              <p className="font-serif text-2xl text-ivory">Looking for specific dimensions, finish, or block grading?</p>
              <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-beige/70">
                Share your required dimensions, finish, and destination. Our quarry team will review current block terraces and processing schedules.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row shrink-0">
              <Cta href="#contact" variant="champagne" icon={<ArrowRightIcon className="size-4" />}>
                Request Project Quote
              </Cta>
              <button
                type="button"
                onClick={() => requestQuote("")}
                className="btn btn-outline-light"
              >
                <span>Discuss Requirement</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Enhanced Detail Modal */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-80 flex items-center justify-center overflow-y-auto bg-ink/90 p-3 sm:p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onClick={close}
        >
          <div
            className="lightbox relative my-auto w-full max-w-5xl border border-champagne/30 bg-walnut shadow-[0_40px_100px_-30px_rgba(0,0,0,0.95)]"
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close product details"
              autoFocus
              className="absolute top-4 right-4 z-20 grid size-11 place-items-center border border-champagne/40 bg-espresso/90 text-beige transition-colors hover:border-champagne hover:text-champagne cursor-pointer"
            >
              <CloseIcon className="size-5" />
            </button>

            <div className="grid gap-0 md:grid-cols-12">
              {/* Left Column: Visual Showcase */}
              <div className="bg-espresso p-5 sm:p-7 md:col-span-6 flex flex-col justify-between">
                <div>
                  <div className="zoom-frame aspect-[4/3] sm:aspect-[4/5] bg-ink border border-champagne/20">
                    <StoneImage
                      src={modalActiveImage === "primary" ? activeProduct.primaryImage : activeProduct.detailImage}
                      alt={`${activeProduct.name} natural stone preview`}
                      priority
                      width={1200}
                      height={1500}
                    />
                  </div>

                  {/* Thumbnail View Switcher */}
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setModalActiveImage("primary")}
                      className={cn(
                        "group flex items-center gap-3 border p-2 text-left transition-all cursor-pointer",
                        modalActiveImage === "primary"
                          ? "border-champagne bg-walnut/70 shadow-md"
                          : "border-champagne/20 bg-espresso/50 opacity-70 hover:opacity-100",
                      )}
                    >
                      <div className="size-12 shrink-0 overflow-hidden bg-ink">
                        <StoneImage
                          src={activeProduct.primaryImage}
                          alt="Primary Surface"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div>
                        <p className="label-xs text-champagne">View 1</p>
                        <p className="text-xs text-beige/85">Primary Slab</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalActiveImage("detail")}
                      className={cn(
                        "group flex items-center gap-3 border p-2 text-left transition-all cursor-pointer",
                        modalActiveImage === "detail"
                          ? "border-champagne bg-walnut/70 shadow-md"
                          : "border-champagne/20 bg-espresso/50 opacity-70 hover:opacity-100",
                      )}
                    >
                      <div className="size-12 shrink-0 overflow-hidden bg-ink">
                        <StoneImage
                          src={activeProduct.detailImage}
                          alt="Detail Texture / Quarry Block"
                          width={100}
                          height={100}
                        />
                      </div>
                      <div>
                        <p className="label-xs text-champagne">View 2</p>
                        <p className="text-xs text-beige/85">Detail / Block</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-6 border-t border-champagne/15 pt-4 text-xs text-beige/60 flex items-center justify-between">
                  <span>Photography of authentic material</span>
                  <span className="text-champagne">Mount Exports Selection</span>
                </div>
              </div>

              {/* Right Column: Architectural Specifications */}
              <div className="flex flex-col justify-between p-6 sm:p-10 md:col-span-6 bg-walnut">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="label-xs text-champagne border border-champagne/30 px-2.5 py-1">
                      {activeProduct.formatLabel}
                    </span>
                    <span className="label-xs text-beige/60">
                      {activeProduct.categories.join(" · ")}
                    </span>
                  </div>

                  <h3
                    id="product-modal-title"
                    className="mt-4 font-serif text-[2.1rem] leading-tight text-ivory sm:text-[2.6rem]"
                  >
                    {activeProduct.name}
                  </h3>

                  <p className="mt-3 text-[0.975rem] leading-relaxed text-beige/85 italic">
                    {activeProduct.description}
                  </p>

                  <div className="hairline-dark my-6" />

                  <p className="text-[0.9375rem] leading-[1.85] text-beige/75">
                    {activeProduct.detail}
                  </p>

                  {/* Specifications Table */}
                  <dl className="mt-6 space-y-3.5 border-t border-champagne/15 pt-5 text-sm">
                    <div className="flex justify-between border-b border-champagne/10 pb-2.5">
                      <dt className="text-taupe label-xs">Format Options</dt>
                      <dd className="text-ivory font-medium">{activeProduct.formatLabel}</dd>
                    </div>
                    <div className="flex justify-between border-b border-champagne/10 pb-2.5">
                      <dt className="text-taupe label-xs">Category</dt>
                      <dd className="text-champagne">{activeProduct.categories.join(", ")}</dd>
                    </div>
                    <div className="flex justify-between border-b border-champagne/10 pb-2.5">
                      <dt className="text-taupe label-xs">Processing Unit</dt>
                      <dd className="text-ivory">Jain Grani Marmo, Udaipur</dd>
                    </div>
                    <div className="flex justify-between border-b border-champagne/10 pb-2.5">
                      <dt className="text-taupe label-xs">Finishes</dt>
                      <dd className="text-ivory">Polished, Honed, Leathered, Bookmatched</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-taupe label-xs">Export Logistics</dt>
                      <dd className="text-ivory">FOB / CIF Container Shipping</dd>
                    </div>
                  </dl>
                </div>

                {/* Direct Action Buttons */}
                <div className="mt-8 flex flex-col gap-3 pt-4 border-t border-champagne/15 sm:flex-row">
                  <a
                    href={productWhatsappUrl(activeProduct.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp flex-1 !py-3.5"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>WhatsApp Quote</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      requestQuote(activeProduct.name);
                      close();
                    }}
                    className="btn btn-outline-light flex-1 !py-3.5"
                  >
                    <span>Request Quote</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
