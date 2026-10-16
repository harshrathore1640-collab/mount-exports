import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Product catalogue. Rows are seeded from `src/lib/content.ts` on first read so
 * the business can add or reorder stones without touching the components.
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  detail: text("detail").notNull().default(""),
  formatLabel: text("format_label").notNull(),
  categories: jsonb("categories").$type<string[]>().notNull(),
  primaryImage: text("primary_image").notNull(),
  detailImage: text("detail_image").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Editorial gallery entries grouped by visual theme. */
export const galleryItems = pgTable(
  "gallery_items",
  {
    id: serial("id").primaryKey(),
    theme: text("theme").notNull(),
    title: text("title").notNull(),
    image: text("image").notNull(),
    ratio: text("ratio").notNull().default("4/5"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("gallery_theme_title_idx").on(table.theme, table.title)],
);

/**
 * Buyer enquiries captured by the site forms. Every submission is stored and
 * then handed to the visitor as a prefilled WhatsApp message — nothing is
 * presented as "sent" until the buyer presses send in WhatsApp.
 */
export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name"),
  email: text("email"),
  phone: text("phone"),
  country: text("country"),
  productInterest: text("product_interest"),
  quantity: text("quantity"),
  dimensionsFinish: text("dimensions_finish"),
  message: text("message"),
  source: text("source").notNull().default("website"),
  whatsappUrl: text("whatsapp_url").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type GalleryItem = typeof galleryItems.$inferSelect;
export type Enquiry = typeof enquiries.$inferSelect;
