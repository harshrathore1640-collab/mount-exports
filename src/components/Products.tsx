"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowRightIcon,
  CloseIcon,
  ExpandIcon,
  LayersIcon,
  WhatsAppIcon,
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

  const close = useCallback(() => setOpenSlug(null), []);

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
    <section id="products" className="relative overflow-hidden bg-espresso py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(196,164,119,0.35) 0 1px, transparent 1px 96px)",
        }}
      />

      <div className="relative mx-auto max-w-[1500px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="label-sm flex items-center gap-4 text-champagne">
              <span className="h-px w-10 bg-champagne/60" />
              The Collection
            </p>
            <h2 className="mt-6 text-[2.15rem] leading-[1.06] text-ivory sm:text-5xl lg:text-[3.5rem]">
              Premium Marble & Granite,
              <span className="block text-beige/85 italic">Presented for International Buyers</span>
            </h2>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <p className="text-[0.975rem] leading-[1.9] text-beige/75">
              Each stone is presented with its natural movement, mineral character and available
              format. Photography is representative of the stone type — the current block and slab
              selection, dimensions and finish options are confirmed directly with the business on
              request.
            </p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={160}>
          <div className="mt-14 flex flex-wrap items-center gap-x-2 gap-y-3 border-y border-champagne/15 py-4">
            <span className="label-xs mr-4 hidden text-taupe sm:block">Filter</span>
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
                    "group inline-flex items-baseline gap-2 px-4 py-2 text-[0.75rem] tracking-[0.16em] uppercase transition-colors duration-300",
                    isActive ? "bg-champagne text-espresso" : "text-beige/75 hover:text-champagne",
                  )}
                >
                  {category}
                  <span
                    className={cn(
                      "font-serif text-[0.6875rem] tracking-normal",
                      isActive ? "text-espresso/70" : "text-taupe",
                    )}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* grid */}
        <div className="mt-14 grid gap-x-7 gap-y-16 sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((product, index) => (
            <Reveal key={product.slug} delay={index * 90} direction="scale" className="h-full">
              <article className="group flex h-full flex-col">
                <div className="relative">
                  <div className="zoom-frame relative aspect-4/5 bg-walnut">
                    <StoneImage
                      src={product.primaryImage}
                      alt={`${product.name} natural stone — ${product.description}`}
                      width={1200}
                      height={1500}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent opacity-80" />
                    {product.slug === "titanium-gold" && (
                      <span className="absolute top-3 left-3 z-10 bg-champagne px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.2em] text-espresso uppercase shadow-md">
                        Own Quarry
                      </span>
                    )}
                    {product.slug === "patagonia" && (
                      <span className="absolute top-3 left-3 z-10 border border-champagne/40 bg-espresso/90 px-2.5 py-1 text-[0.625rem] font-semibold tracking-[0.2em] text-champagne uppercase shadow-md backdrop-blur-sm">
                        Exotic Stone
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setOpenSlug(product.slug)}
                      className="absolute inset-0 flex cursor-pointer items-center justify-center"
                      aria-label={`View details for ${product.name}`}
                    >
                      <span className="inline-flex translate-y-3 items-center gap-2.5 border border-ivory/70 bg-espresso/45 px-5 py-3 text-[0.6875rem] tracking-[0.2em] text-ivory uppercase opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100">
                        <ExpandIcon className="size-4" />
                        View Details
                      </span>
                    </button>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="label-xs text-champagne/85">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="label-xs inline-flex items-center gap-2 text-beige/65">
                      <LayersIcon className="size-4 text-champagne/70" />
                      {product.formatLabel}
                    </span>
                  </div>

                  <h3 className="mt-3 text-[1.65rem] leading-tight text-ivory">{product.name}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-beige/70">
                    {product.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {product.categories.map((category) => (
                      <li
                        key={`${product.slug}-${category}`}
                        className="border border-champagne/25 px-2.5 py-1 text-[0.625rem] tracking-[0.18em] text-beige/70 uppercase"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setOpenSlug(product.slug)}
                      className="group/link inline-flex items-center justify-between gap-3 border-b border-champagne/25 pb-3 text-left text-[0.75rem] tracking-[0.16em] text-ivory uppercase transition-colors hover:border-champagne hover:text-champagne"
                    >
                      View Details
                      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </button>
                    <a
                      href={productWhatsappUrl(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp mt-2 !px-4 !py-3.5 text-[0.6875rem]"
                    >
                      <WhatsAppIcon className="size-4" />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-16 text-center text-beige/70">
            No products in this category yet — the catalogue can be expanded at any time.
          </p>
        )}

        <Reveal delay={120}>
          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-champagne/15 pt-10 lg:flex-row">
            <p className="max-w-xl text-[0.9375rem] leading-relaxed text-beige/70">
              Looking for a specific stone, format or quantity? Tell us the requirement and we will
              discuss suitable material from the current selection.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Cta href="#contact" variant="champagne" icon={<ArrowRightIcon className="size-4" />}>
                Request a Quote
              </Cta>
              <button
                type="button"
                onClick={() => requestQuote("")}
                className="btn btn-outline-light"
              >
                <span>Discuss a Requirement</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* detail modal */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-80 flex items-end justify-center overflow-y-auto bg-ink/85 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
          onClick={close}
        >
          <div
            className="lightbox relative my-auto w-full max-w-5xl border border-champagne/20 bg-walnut shadow-[0_40px_90px_-40px_rgba(0,0,0,0.9)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close product details"
              autoFocus
              className="absolute top-4 right-4 z-10 grid size-11 place-items-center border border-champagne/30 bg-espresso/70 text-beige transition-colors hover:border-champagne hover:text-champagne"
            >
              <CloseIcon className="size-5" />
            </button>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="bg-espresso p-4 sm:p-6">
                <div className="zoom-frame aspect-4/5 bg-walnut">
                  <StoneImage
                    src={activeProduct.primaryImage}
                    alt={`${activeProduct.name} natural stone surface`}
                    priority
                    width={1200}
                    height={1500}
                  />
                </div>
                <div className="zoom-frame mt-4 aspect-16/9 bg-walnut">
                  <StoneImage
                    src={activeProduct.detailImage}
                    alt={`${activeProduct.name} surface detail close-up`}
                    width={1200}
                    height={900}
                  />
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-10">
                <p className="label-xs text-champagne">
                  {activeProduct.formatLabel} · {activeProduct.categories.join(" / ")}
                </p>
                <h3
                  id="product-modal-title"
                  className="mt-4 text-[2rem] leading-tight text-ivory sm:text-[2.6rem]"
                >
                  {activeProduct.name}
                </h3>
                <p className="mt-4 text-[1rem] leading-relaxed text-beige/85 italic">
                  {activeProduct.description}
                </p>
                <div className="hairline-dark my-7" />
                <p className="text-[0.9375rem] leading-[1.9] text-beige/75">
                  {activeProduct.detail}
                </p>

                <dl className="mt-8 space-y-4">
                  <div className="flex gap-6 border-b border-champagne/15 pb-4">
                    <dt className="label-xs w-32 shrink-0 text-taupe">Available as</dt>
                    <dd className="text-[0.9375rem] text-ivory">{activeProduct.formatLabel}</dd>
                  </div>
                  <div className="flex gap-6 border-b border-champagne/15 pb-4">
                    <dt className="label-xs w-32 shrink-0 text-taupe">Category</dt>
                    <dd className="text-[0.9375rem] text-ivory">
                      {activeProduct.categories.join(", ")}
                    </dd>
                  </div>
                  <div className="flex gap-6">
                    <dt className="label-xs w-32 shrink-0 text-taupe">Enquiries</dt>
                    <dd className="text-[0.9375rem] text-ivory">
                      International buyers, distributors, architects, designers, developers and
                      fabricators.
                    </dd>
                  </div>
                </dl>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={productWhatsappUrl(activeProduct.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp flex-1"
                  >
                    <WhatsAppIcon className="size-4" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      requestQuote(activeProduct.name);
                      close();
                    }}
                    className="btn btn-outline-light flex-1"
                  >
                    <span>Request a Quote</span>
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
