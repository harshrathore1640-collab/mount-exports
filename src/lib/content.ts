import { px } from "@/lib/site";

export type ProductRecord = {
  slug: string;
  name: string;
  description: string;
  detail: string;
  formatLabel: string;
  categories: string[];
  primaryImage: string;
  detailImage: string;
  sortOrder: number;
  featured: boolean;
};

const SHARED_DETAIL =
  "Natural variation in colour, veining and texture is inherent to every block and slab. Share your required dimensions, finish and quantity and we will discuss suitable material from the current selection.";

/** The four existing catalogue products — names preserved exactly. */
export const PRODUCTS: ProductRecord[] = [
  {
    slug: "titanium-gold",
    name: "Titanium Gold",
    description: "Extracted from our own quarry with bold black movement and striking natural character.",
    detail: `${SHARED_DETAIL} Sourced directly from our own quarry, Titanium Gold features a dramatic dark mineral field with strong golden and amber movement — suited to statement flooring, bookmatched feature walls, countertops and architectural facades. Direct quarry ownership guarantees supply continuity and meticulous block grading.`,
    formatLabel: "Own Quarry · Blocks & Slabs",
    categories: ["Granite", "Blocks", "Slabs"],
    primaryImage: px(6634136, 1200, 1500),
    detailImage: px(8350474, 1200, 900),
    sortOrder: 1,
    featured: true,
  },
  {
    slug: "patagonia",
    name: "Patagonia",
    description: "Exotic stone featuring crystalline quartz fields and dramatic natural veining.",
    detail: `${SHARED_DETAIL} Patagonia is an internationally prized exotic stone displaying translucent quartz pockets, warm earthy undertones and dramatic visual movement. Exceptional for backlit feature installations, luxury countertops, and high-end residential and commercial architecture.`,
    formatLabel: "Exotic Blocks & Slabs",
    categories: ["Exotic", "Granite", "Slabs"],
    primaryImage: px(3847501, 1200, 1500),
    detailImage: px(11275360, 1200, 900),
    sortOrder: 2,
    featured: true,
  },
  {
    slug: "rose-heritage",
    name: "Rose Heritage",
    description: "Warm mineral character with an elegant natural appearance.",
    detail: `${SHARED_DETAIL} Rose Heritage carries a soft warm mineral field, presented as premium slabs for interiors, wall cladding and refined surface work.`,
    formatLabel: "Premium Slabs",
    categories: ["Marble", "Slabs"],
    primaryImage: px(4709523, 1200, 1500),
    detailImage: px(4709032, 1200, 900),
    sortOrder: 3,
    featured: true,
  },
  {
    slug: "signature-rose",
    name: "Signature Rose",
    description: "Distinctive texture for premium architectural applications.",
    detail: `${SHARED_DETAIL} Signature Rose is selected for its distinctive texture and used across premium architectural applications, from cladding to bespoke surface details.`,
    formatLabel: "Slabs",
    categories: ["Marble", "Slabs"],
    primaryImage: px(4709542, 1200, 1500),
    detailImage: px(4705839, 1200, 900),
    sortOrder: 4,
    featured: false,
  },
  {
    slug: "silver-earth",
    name: "Silver Earth",
    description: "Natural grey depth and refined stone character.",
    detail: `${SHARED_DETAIL} Silver Earth offers natural grey depth and a calm mineral structure, available in block and slab format for large-format project requirements.`,
    formatLabel: "Blocks & Slabs",
    categories: ["Granite", "Blocks", "Slabs"],
    primaryImage: px(6634138, 1200, 1500),
    detailImage: px(6634151, 1200, 900),
    sortOrder: 5,
    featured: true,
  },
];

export const PRODUCT_CATEGORIES = [
  "All Stone",
  "Marble",
  "Granite",
  "Exotic",
  "Blocks",
  "Slabs",
] as const;

export type HeroSlide = {
  image: string;
  caption: string;
  alt: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    image: px(37845015, 1920, 1080),
    caption: "Quarry faces & extracted blocks",
    alt: "Aerial view of a marble quarry with neat rows of extracted stone blocks",
  },
  {
    image: px(30112371, 1920, 1080),
    caption: "Slab gallery & material selection",
    alt: "Granite and marble slabs arranged in a stone facility for buyer selection",
  },
  {
    image: px(3847501, 1920, 1080),
    caption: "Natural veining in polished marble",
    alt: "Close-up of a white marble surface showing natural veining",
  },
  {
    image: px(14011664, 1920, 1080),
    caption: "Stone in luxury architecture",
    alt: "Luxury hotel foyer with marble floors and a grand staircase",
  },
  {
    image: px(6634154, 1920, 1080),
    caption: "Dark stone with natural movement",
    alt: "Black marble surface with natural white veining",
  },
];

export const TRUST_STRIP = [
  "Established 1996 · Udaipur",
  "Own Quarry for Titanium Gold",
  "Marble, Granite & Patagonia",
  "Worldwide Export Enquiries",
] as const;

export type GalleryRecord = {
  theme: string;
  title: string;
  image: string;
  ratio: string;
  sortOrder: number;
};

export const GALLERY_THEMES = [
  "Statement Facades",
  "Luxury Interiors",
  "Hero Blocks",
  "Architectural Slabs",
  "Natural Movement",
] as const;

export const GALLERY_ITEMS: GalleryRecord[] = [
  {
    theme: "Statement Facades",
    title: "Geometric stone facade",
    image: px(33835673, 1100, 1400),
    ratio: "4/5",
    sortOrder: 1,
  },
  {
    theme: "Luxury Interiors",
    title: "Marble foyer & staircase",
    image: px(14011664, 1100, 780),
    ratio: "3/2",
    sortOrder: 2,
  },
  {
    theme: "Hero Blocks",
    title: "Blocks extracted in rows",
    image: px(37845015, 1100, 1400),
    ratio: "4/5",
    sortOrder: 3,
  },
  {
    theme: "Architectural Slabs",
    title: "Slab gallery selection",
    image: px(30112371, 1100, 780),
    ratio: "3/2",
    sortOrder: 4,
  },
  {
    theme: "Natural Movement",
    title: "Veining in polished marble",
    image: px(4705843, 1100, 1400),
    ratio: "4/5",
    sortOrder: 5,
  },
  {
    theme: "Luxury Interiors",
    title: "Marble walls & warm timber",
    image: px(33685863, 1100, 1500),
    ratio: "3/4",
    sortOrder: 6,
  },
  {
    theme: "Hero Blocks",
    title: "Quarry face working level",
    image: px(36499163, 1100, 780),
    ratio: "3/2",
    sortOrder: 7,
  },
  {
    theme: "Architectural Slabs",
    title: "Slabs stored for export",
    image: px(5827062, 1100, 1400),
    ratio: "4/5",
    sortOrder: 8,
  },
  {
    theme: "Statement Facades",
    title: "Beige stone elevation",
    image: px(36688004, 1100, 780),
    ratio: "3/2",
    sortOrder: 9,
  },
  {
    theme: "Natural Movement",
    title: "Mineral detail close-up",
    image: px(11275360, 1100, 1400),
    ratio: "4/5",
    sortOrder: 10,
  },
  {
    theme: "Luxury Interiors",
    title: "Polished marble corridor",
    image: px(7045766, 1100, 780),
    ratio: "3/2",
    sortOrder: 11,
  },
  {
    theme: "Natural Movement",
    title: "Grey stone mineral field",
    image: px(6634151, 1100, 1400),
    ratio: "4/5",
    sortOrder: 12,
  },
  {
    theme: "Architectural Slabs",
    title: "Granite slabs in processing",
    image: px(30112372, 1100, 780),
    ratio: "3/2",
    sortOrder: 13,
  },
  {
    theme: "Statement Facades",
    title: "Classic stone elevation",
    image: px(24879147, 1100, 1500),
    ratio: "3/4",
    sortOrder: 14,
  },
  {
    theme: "Hero Blocks",
    title: "Stacked stone material",
    image: px(15431625, 1100, 1400),
    ratio: "4/5",
    sortOrder: 15,
  },
];

export type Application = {
  title: string;
  copy: string;
  image: string;
  alt: string;
  span: string;
  ratio: string;
};

export const APPLICATIONS: Application[] = [
  {
    title: "Luxury Residential Interiors",
    copy: "Marble and granite selected for living spaces, stair cores and private feature surfaces.",
    image: px(6587823, 1400, 950),
    alt: "Classic villa hallway with polished marble flooring",
    span: "lg:col-span-7",
    ratio: "4/3",
  },
  {
    title: "Hotel & Hospitality",
    copy: "Large-format stone for lobbies, reception desks and high-traffic hospitality floors.",
    image: px(8312027, 1200, 1400),
    alt: "Modern hotel lobby with marble floors and elegant decor",
    span: "lg:col-span-5",
    ratio: "4/5",
  },
  {
    title: "Feature Walls & Statement Facades",
    copy: "Bold natural movement used as a single architectural statement, inside or out.",
    image: px(33835673, 1200, 1400),
    alt: "Geometric stone facade of a monumental building",
    span: "lg:col-span-5",
    ratio: "4/5",
  },
  {
    title: "Flooring & Wall Cladding",
    copy: "Blocks and slabs prepared for continuous flooring, cladding and bookmatched wall panels.",
    image: px(7045766, 1400, 950),
    alt: "Spacious corridor with marble floor and stairway",
    span: "lg:col-span-7",
    ratio: "4/3",
  },
  {
    title: "Countertops & Vanity Surfaces",
    copy: "Refined slab selection for kitchen countertops, bathroom vanities and furniture tops.",
    image: px(15743384, 1200, 1400),
    alt: "Bathroom interior with marble countertops and gold fixtures",
    span: "lg:col-span-5",
    ratio: "4/5",
  },
  {
    title: "Commercial & Architectural Projects",
    copy: "Material discussions for developers, fabricators and commercial project buyers worldwide.",
    image: px(6758532, 1400, 950),
    alt: "Contemporary commercial lobby interior with stone surfaces",
    span: "lg:col-span-7",
    ratio: "4/3",
  },
];

export type Strength = {
  index: string;
  title: string;
  copy: string;
};

export const STRENGTHS: Strength[] = [
  {
    index: "01",
    title: "Established Heritage",
    copy: "Operating in natural stone since 1996 from Udaipur, Rajasthan, with trusted continuity international buyers rely on.",
  },
  {
    index: "02",
    title: "Own Quarry for Titanium Gold",
    copy: "Direct quarry ownership for Titanium Gold ensures authentic extraction, consistent volume, and prime block selection.",
  },
  {
    index: "03",
    title: "Marble, Granite & Patagonia",
    copy: "Comprehensive portfolio of Indian Marble, Granite, Patagonia, and other rare Exotic Colours in blocks and slabs.",
  },
  {
    index: "04",
    title: "Dedicated Job Work Unit",
    copy: "High-precision cutting, dressing, calibration and finishing executed through our processing unit Jain Grani Marmo.",
  },
  {
    index: "05",
    title: "Worldwide Export Supply",
    copy: "Structured supply coordination and global container shipping for international importers, wholesalers and architects.",
  },
  {
    index: "06",
    title: "Direct Founder Communication",
    copy: "Clear enquiries, product shortlisting, and commercial terms discussed directly with the business on WhatsApp and phone.",
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  copy: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    index: "01",
    title: "Share Your Requirement",
    copy: "Tell us the product, preferred stone, quantity, dimensions, finish and destination.",
  },
  {
    index: "02",
    title: "Product Shortlisting",
    copy: "Discuss suitable stone options and request relevant visual references.",
  },
  {
    index: "03",
    title: "Review & Confirm",
    copy: "Review the selected stone and confirm the commercial details directly with the business.",
  },
  {
    index: "04",
    title: "Export Coordination",
    copy: "Discuss the next steps for supply, shipping arrangements and destination-specific requirements.",
  },
];

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "What products does Mount Exports supply?",
    answer:
      "Mount Exports specializes in Indian Marble, Granite, Patagonia, and other Exotic Colours in blocks and premium slabs. We also operate our own quarry for Titanium Gold.",
  },
  {
    question: "Do you own your own stone quarries?",
    answer:
      "Yes. Mount Exports operates its own quarry for Titanium Gold, ensuring direct-from-source block grading, consistent volume, and verified provenance.",
  },
  {
    question: "Where are Mount Exports' offices and processing facilities located?",
    answer:
      "Our registered office is at 351, 2nd Floor, S. M. Lodha Complex, Near Shastri Circle, Udaipur, Rajasthan 313001. Material processing and job work are conducted at Jain Grani Marmo.",
  },
  {
    question: "Can I enquire about a specific marble or granite block or slab?",
    answer:
      "Yes. Use the “Enquire on WhatsApp” action on any product to open a conversation that already includes the product name, or share the specific dimensions and block/slab requirement you need.",
  },
  {
    question: "Does Mount Exports accept international export enquiries?",
    answer:
      "Yes. International enquiries from stone importers, wholesalers, distributors, architects, interior designers, developers, fabricators and commercial project buyers are welcome. Worldwide container shipping is offered as a core business service.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Submit the enquiry form on this page, email bhagwatisarwa@yahoo.com, or message us on WhatsApp at +91 98292 41343. Quotation details, availability and commercial terms are confirmed directly by the business.",
  },
  {
    question: "What information should I provide for an export enquiry?",
    answer:
      "Please share your stone preference (e.g. Titanium Gold, Patagonia, Indian Marble or Granite), required quantity, dimensions or finish, destination country and your contact details.",
  },
  {
    question: "How can I contact Mount Exports directly?",
    answer:
      "Call +91 98280 40343, WhatsApp +91 98292 41343, email bhagwatisarwa@yahoo.com, message @mountexports07 on Instagram, or visit us at S. M. Lodha Complex, Udaipur, Rajasthan.",
  },
];

export const ABOUT_IMAGES = {
  primary: px(30112371, 1100, 1400),
  primaryAlt: "Marble and granite slabs arranged in a stone facility for buyer selection",
  secondary: px(11275360, 900, 700),
  secondaryAlt: "Close-up of natural marble stone texture in warm earthy tones",
  tertiary: px(37845014, 900, 700),
  tertiaryAlt: "Aerial view of a marble quarry showing the extracted stone terraces",
};

export const EXPORT_IMAGES = {
  port: px(11555089, 1400, 1000),
  portAlt: "Container ships docked at a busy export port with cranes",
  processing: px(30112373, 1100, 1400),
  processingAlt: "Industrial granite cutting machine processing stone slabs",
};

export const FINAL_CTA_IMAGE = {
  src: px(11275360, 1920, 1100),
  alt: "Close-up of natural marble stone texture in warm earthy tones",
};
