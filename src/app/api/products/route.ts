import { getGalleryItems, getProducts } from "@/lib/repository";
import { PRODUCT_CATEGORIES } from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * Read-only catalogue endpoint so the product collection and gallery can be
 * consumed by other tools (or a future admin screen) without scraping the page.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const include = searchParams.get("include");

  const [products, gallery] = await Promise.all([getProducts(), getGalleryItems()]);

  const category = searchParams.get("category");
  const filtered =
    category && category !== PRODUCT_CATEGORIES[0]
      ? products.filter((product) => product.categories.includes(category))
      : products;

  return Response.json({
    ok: true,
    categories: PRODUCT_CATEGORIES,
    products: filtered,
    ...(include === "gallery" ? { gallery } : {}),
  });
}
