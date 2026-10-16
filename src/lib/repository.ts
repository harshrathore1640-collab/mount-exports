import { asc } from "drizzle-orm";
import { db } from "@/db";
import { enquiries, galleryItems, products } from "@/db/schema";
import {
  GALLERY_ITEMS,
  PRODUCTS,
  type GalleryRecord,
  type ProductRecord,
} from "@/lib/content";
import { buildEnquiryMessage, whatsappUrl } from "@/lib/site";

/**
 * The site is data-driven but must never render blank: every read falls back to
 * the curated content module if the database is unreachable (for example during
 * a build before the database exists).
 */

let seedPromise: Promise<void> | null = null;

function seedCatalogue(): Promise<void> {
  if (!db) return Promise.resolve();
  if (!seedPromise) {
    seedPromise = (async () => {
      if (!db) return;
      await db
        .insert(products)
        .values(PRODUCTS)
        .onConflictDoNothing({ target: products.slug });

      await db
        .insert(galleryItems)
        .values(GALLERY_ITEMS.map((item) => ({ ...item })))
        .onConflictDoNothing({ target: [galleryItems.theme, galleryItems.title] });
    })().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }
  return seedPromise;
}

function toProductRecord(row: typeof products.$inferSelect): ProductRecord {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    detail: row.detail,
    formatLabel: row.formatLabel,
    categories: Array.isArray(row.categories) ? row.categories : [],
    primaryImage: row.primaryImage,
    detailImage: row.detailImage,
    sortOrder: row.sortOrder,
    featured: row.featured,
  };
}

export async function getProducts(): Promise<ProductRecord[]> {
  if (!db) return PRODUCTS;
  try {
    await seedCatalogue();
    const rows = await db.select().from(products).orderBy(asc(products.sortOrder));
    if (rows.length > 0) return rows.map(toProductRecord);
  } catch (error) {
    console.error("[mount-exports] product catalogue falling back to static content:", error);
  }
  return PRODUCTS;
}

function toGalleryRecord(row: typeof galleryItems.$inferSelect): GalleryRecord {
  return {
    theme: row.theme,
    title: row.title,
    image: row.image,
    ratio: row.ratio,
    sortOrder: row.sortOrder,
  };
}

export async function getGalleryItems(): Promise<GalleryRecord[]> {
  if (!db) return GALLERY_ITEMS;
  try {
    await seedCatalogue();
    const rows = await db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder));
    if (rows.length > 0) return rows.map(toGalleryRecord);
  } catch (error) {
    console.error("[mount-exports] gallery falling back to static content:", error);
  }
  return GALLERY_ITEMS;
}

export type EnquiryInput = {
  fullName: string;
  companyName?: string;
  email?: string;
  phone?: string;
  country?: string;
  productInterest?: string;
  quantity?: string;
  dimensionsFinish?: string;
  message?: string;
  source?: string;
};

export type EnquiryResult = {
  ok: boolean;
  saved: boolean;
  whatsappUrl: string;
  message: string;
};

export async function createEnquiry(input: EnquiryInput): Promise<EnquiryResult> {
  const message = buildEnquiryMessage(input);
  const url = whatsappUrl(message);

  if (!db) {
    return { ok: true, saved: false, whatsappUrl: url, message };
  }

  try {
    await db.insert(enquiries).values({
      fullName: input.fullName,
      companyName: input.companyName?.trim() || null,
      email: input.email?.trim() || null,
      phone: input.phone?.trim() || null,
      country: input.country?.trim() || null,
      productInterest: input.productInterest?.trim() || null,
      quantity: input.quantity?.trim() || null,
      dimensionsFinish: input.dimensionsFinish?.trim() || null,
      message: input.message?.trim() || null,
      source: input.source ?? "website",
      whatsappUrl: url,
    });
    return { ok: true, saved: true, whatsappUrl: url, message };
  } catch (error) {
    console.error("[mount-exports] enquiry could not be stored:", error);
    return { ok: true, saved: false, whatsappUrl: url, message };
  }
}
