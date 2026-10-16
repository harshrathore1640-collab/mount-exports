import About from "@/components/About";
import Applications from "@/components/Applications";
import BuyerEnquiries from "@/components/BuyerEnquiries";
import Contact from "@/components/Contact";
import ExportSection from "@/components/ExportSection";
import FaqSection from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import Products from "@/components/Products";
import WhyMountExports from "@/components/WhyMountExports";
import { FAQS, HERO_SLIDES } from "@/lib/content";
import { getGalleryItems, getProducts } from "@/lib/repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [products, gallery] = await Promise.all([getProducts(), getGalleryItems()]);
  const productNames = products.map((product) => product.name);

  return (
    <>
      <Header />
      <main id="main">
        <Hero slides={HERO_SLIDES} />
        <About />
        <Products products={products} />
        <Gallery items={gallery} />
        <Applications />
        <WhyMountExports />
        <ExportSection productNames={productNames} />
        <Process />
        <BuyerEnquiries />
        <Contact productNames={productNames} />
        <FaqSection faqs={FAQS} />
        <FinalCta />
      </main>
      <Footer productNames={productNames} />
    </>
  );
}
