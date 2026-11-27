import heroImage from "@/assets/hero-canea.jpg";
import bagAtelierImage from "@/assets/bag-atelier-tote.jpg";
import bagCommercialImage from "@/assets/bag-commercial-trio.jpg";
import bagBottleImage from "@/assets/bag-bottle-carry.jpg";
import notebookCherryImage from "@/assets/notebook-cherry-edition.jpg";
import wrappingCoversImage from "@/assets/paper-wrapping-covers.jpg";
import sugarcaneStoryImage from "@/assets/sugarcane-fibers-story.jpg";

export type ProductCategory = "bags" | "notebooks" | "wrapping";
export type BagTier = "all" | "commercial" | "retail";

export interface SwatchOption {
  id: string;
  label: string;
  swatchClass: string;
  image: string;
}

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  bagTier?: "commercial" | "retail";
  breadcrumb: string;
  price: number;
  unitLabel: string;
  gsm: string;
  description: string;
  details: string;
  sizeMaterials: string;
  shippingNote: string;
  image: string;
  gallery: string[];
  swatches: SwatchOption[];
}

export const STUDIO_IMAGES = {
  hero: heroImage,
  sugarcaneStory: sugarcaneStoryImage,
};

export const PRODUCTS: ProductItem[] = [
  {
    id: "atelier-cord-tote",
    name: "Atelier Cord Bag",
    subtitle: "Boutique Retail Carry",
    category: "bags",
    bagTier: "retail",
    breadcrumb: "PAPER BAGS / RETAIL",
    price: 42,
    unitLabel: "Pack of 25",
    gsm: "240 GSM Bagasse",
    description:
      "Architectural gusseted retail bag pressed from unbleached sugarcane fibers, finished with braided cherry cotton cord handles and reinforced folded base.",
    details:
      "Supports up to 6 kg load without synthetic lamination. Blind-deboss ready for boutiques, studios, and concept stores.",
    sizeMaterials:
      "28 × 34 × 12 cm · 100% rescued sugarcane bagasse pulp (240 GSM) · Unwaxed vegetable starch adhesive · Braided cotton cord.",
    shippingNote:
      "Ships flat-packed in zero-plastic sugarcane cartons within 2–4 business days. Commercial custom runs start at 250 units.",
    image: bagAtelierImage,
    gallery: [bagAtelierImage, heroImage, bagCommercialImage],
    swatches: [
      { id: "cherry-cord", label: "Cherry Cord", swatchClass: "bg-cherry", image: bagAtelierImage },
      { id: "raw-cane", label: "Raw Bagasse", swatchClass: "bg-plaster", image: bagCommercialImage },
      { id: "cane-olive", label: "Cane Olive", swatchClass: "bg-cane-olive", image: bagBottleImage },
    ],
  },
  {
    id: "commercial-carry-trio",
    name: "Commercial Carry Trio",
    subtitle: "Hospitality & Flagship Pack",
    category: "bags",
    bagTier: "commercial",
    breadcrumb: "PAPER BAGS / COMMERCIAL",
    price: 68,
    unitLabel: "Pack of 60",
    gsm: "180 GSM Bagasse",
    description:
      "Three graduated flat-handle takeaway and retail bags engineered for bakeries, cafés, and commercial counters with visible natural cane flecks.",
    details:
      "Includes 20 Small, 20 Medium, and 20 Tall bags. Grease-resistant dense fiber weave with zero PFAS coatings.",
    sizeMaterials:
      "Small 20×24 cm · Medium 26×32 cm · Tall 24×44 cm · 180 GSM chlorine-free sugarcane fiber paper · Folded flat paper handles.",
    shippingNote:
      "Bulk pallet dispatch available for commercial accounts with recurring monthly replenishment pricing.",
    image: bagCommercialImage,
    gallery: [bagCommercialImage, bagAtelierImage, bagBottleImage],
    swatches: [
      { id: "raw-cane", label: "Raw Bagasse", swatchClass: "bg-plaster", image: bagCommercialImage },
      { id: "cherry-cord", label: "Cherry Cord", swatchClass: "bg-cherry", image: bagAtelierImage },
      { id: "cane-olive", label: "Cane Olive", swatchClass: "bg-cane-olive", image: bagBottleImage },
    ],
  },
  {
    id: "reserve-gift-carrier",
    name: "Reserve Seal Carrier",
    subtitle: "Tall Bottle & Gift Bag",
    category: "bags",
    bagTier: "retail",
    breadcrumb: "PAPER BAGS / GIFTING",
    price: 38,
    unitLabel: "Pack of 20",
    gsm: "260 GSM Bagasse",
    description:
      "Slender sculptural gift and bottle bag with a crisp fold-over top secured by a glossy cherry-red sugarcane paper tamper band.",
    details:
      "Rigid double-walled bottom holds glass vessels, rolled prints, or artisan boxes with quiet precision.",
    sizeMaterials:
      "12 × 36 × 11 cm · 260 GSM pressed sugarcane board · Soy-ink lacquered cherry closure seal.",
    shippingNote:
      "Delivered flat with pre-scored creases and matching cherry seals. Composts fully within 90 days.",
    image: bagBottleImage,
    gallery: [bagBottleImage, bagAtelierImage, wrappingCoversImage],
    swatches: [
      { id: "cherry-seal", label: "Cherry Seal", swatchClass: "bg-cherry", image: bagBottleImage },
      { id: "raw-cane", label: "Raw Bagasse", swatchClass: "bg-plaster", image: bagCommercialImage },
      { id: "cane-olive", label: "Cane Olive", swatchClass: "bg-cane-olive", image: wrappingCoversImage },
    ],
  },
  {
    id: "sola-cherry-notebook",
    name: "Sola Lay-Flat Notebook",
    subtitle: "Cherry Lacquer & Raw Linen Editions",
    category: "notebooks",
    breadcrumb: "NOTEBOOKS / SOLA EDITION",
    price: 28,
    unitLabel: "Single Volume",
    gsm: "120 GSM Unbleached",
    description:
      "A little tactile, quietly sculptural. Sola pairs a smooth cherry-lacquer or raw sugarcane cloth cover with 192 bleed-proof unbleached bagasse pages.",
    details:
      "Smyth-sewn binding opens completely flat at 180°. Fountain-pen friendly with delicate micro-flecks of natural sugarcane stalk.",
    sizeMaterials:
      "A5 (14.8 × 21 cm) · 192 dotted or blank pages · 120 GSM acid-free sugarcane paper · Recycled cotton bookmark ribbon.",
    shippingNote:
      "Ships in protective sugarcane paper sleeves. Custom corporate embossed notebook editions available from 50 copies.",
    image: notebookCherryImage,
    gallery: [notebookCherryImage, heroImage, wrappingCoversImage],
    swatches: [
      { id: "cherry-lacquer", label: "Cherry Lacquer", swatchClass: "bg-cherry", image: notebookCherryImage },
      { id: "cane-olive", label: "Cane Olive", swatchClass: "bg-cane-olive", image: wrappingCoversImage },
      { id: "raw-bagasse", label: "Raw Bagasse", swatchClass: "bg-plaster", image: heroImage },
    ],
  },
  {
    id: "botanical-wrap-covers",
    name: "Botanical Wrap & Covers Set",
    subtitle: "Sugarcane Wrapping Rolls & Book Jackets",
    category: "wrapping",
    breadcrumb: "PAPER WRAPPING / COVERS",
    price: 34,
    unitLabel: "3 Rolls + 4 Covers",
    gsm: "95–220 GSM Bagasse",
    description:
      "Crisp sugarcane wrapping rolls, botanical-pressed gift sheets, and rigid protective paper covers bundled with cherry cotton twine.",
    details:
      "Folds cleanly without cracking along edges. Designed for luxury retail wrapping, editorial book jackets, and archival document covers.",
    sizeMaterials:
      "3 wrapping rolls (70 × 200 cm, 95 GSM) · 4 heavy-board paper covers (220 GSM) · 100% tree-free sugarcane fibers.",
    shippingNote:
      "Plastic-free tube packaging. Wholesale roll lengths (50 m counter rolls) available for retail shops.",
    image: wrappingCoversImage,
    gallery: [wrappingCoversImage, notebookCherryImage, bagBottleImage],
    swatches: [
      { id: "cane-olive", label: "Cane Olive", swatchClass: "bg-cane-olive", image: wrappingCoversImage },
      { id: "cherry-twine", label: "Cherry Twine", swatchClass: "bg-cherry", image: notebookCherryImage },
      { id: "raw-bagasse", label: "Raw Bagasse", swatchClass: "bg-plaster", image: bagBottleImage },
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Rescued Sugarcane Bagasse",
    body: "After harvest mills press juice from sugarcane stalks, we collect the dry fibrous residue—turning agricultural waste into high-strength cellulose without felling a single tree.",
  },
  {
    step: "02",
    title: "Sun-Cured, Chlorine-Free Pulp",
    body: "Clean fibers are washed in closed-loop water baths and pressed unbleached, preserving the warm limestone hue and subtle botanical flecks unique to every sheet.",
  },
  {
    step: "03",
    title: "Architectural Paper Goods",
    body: "Each sheet is converted into commercial paper bags, thread-sewn notebooks, wrapping rolls, and protective covers that return cleanly to earth within 90 days.",
  },
];