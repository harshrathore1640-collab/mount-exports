import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";
import { BUSINESS, GENERAL_WHATSAPP_URL } from "@/lib/site";

const title = "Mount Exports — Indian Marble, Granite & Exotic Stone Exporter | Udaipur, India";
const description =
  "Mount Exports is an established Indian natural stone exporter based in Udaipur, Rajasthan since 1996. We deal in Indian Marble, Granite, Patagonia, and Exotic Colours with our own quarry for Titanium Gold and processing at Jain Grani Marmo. Worldwide export supply.";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: {
    default: title,
    template: "%s | Mount Exports",
  },
  description,
  keywords: [
    "marble exporter India",
    "granite exporter Rajasthan",
    "Udaipur marble exporter",
    "Titanium Gold granite quarry",
    "Patagonia quartzite exporter",
    "exotic marble supplier India",
    "Jain Grani Marmo",
    "natural stone blocks and slabs",
    "Mount Exports Udaipur",
    "Indian granite slabs wholesale",
  ],
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BUSINESS.siteUrl,
    siteName: BUSINESS.name,
    title,
    description,
    images: [
      {
        url: "https://images.pexels.com/photos/30112371/pexels-photo-30112371.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Marble and granite slabs arranged in a stone facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#211710",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BUSINESS.name,
  description,
  url: BUSINESS.siteUrl,
  telephone: BUSINESS.phoneDisplay,
  email: BUSINESS.email,
  foundingDate: "1996",
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    streetAddress: "351, Second Floor, S. M. Lodha Complex, Near Shastri Circle",
    addressLocality: "Udaipur",
    addressRegion: "Rajasthan",
    postalCode: "313001",
    addressCountry: "IN",
  },
  sameAs: [BUSINESS.instagramUrl],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: BUSINESS.phoneDisplay,
      contactType: "sales",
      availableLanguage: ["English", "Hindi"],
      url: GENERAL_WHATSAPP_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
        />
        <link rel="preconnect" href="https://images.pexels.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-shell font-sans text-walnut antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso focus:px-5 focus:py-3 focus:text-sm focus:tracking-[0.16em] focus:text-ivory focus:uppercase"
        >
          Skip to content
        </a>
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
