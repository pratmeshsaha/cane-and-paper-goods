import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import type { ProductItem } from "@/data/products";

interface ProductSpotlightProps {
  products: ProductItem[];
  selectedProduct: ProductItem;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem, finishLabel: string, image: string, quantity: number) => void;
}

type AccordionKey = "details" | "materials" | "shipping";

export function ProductSpotlight({
  products,
  selectedProduct,
  onSelectProduct,
  onAddToCart,
}: ProductSpotlightProps) {
  const firstSwatch = selectedProduct.swatches[0];
  const [activeSwatchId, setActiveSwatchId] = useState<string>(firstSwatch?.id ?? "");
  const [activeImage, setActiveImage] = useState<string>(selectedProduct.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [openSection, setOpenSection] = useState<AccordionKey | null>("details");
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    const initialSwatch = selectedProduct.swatches[0];
    setActiveSwatchId(initialSwatch?.id ?? "");
    setActiveImage(selectedProduct.image);
    setQuantity(1);
    setJustAdded(false);
  }, [selectedProduct]);

  const activeSwatch =
    selectedProduct.swatches.find((s) => s.id === activeSwatchId) ?? selectedProduct.swatches[0];

  const handleSwatchClick = (swatchId: string, swatchImage: string) => {
    setActiveSwatchId(swatchId);
    setActiveImage(swatchImage);
  };

  const toggleSection = (key: AccordionKey) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const handleAdd = () => {
    onAddToCart(
      selectedProduct,
      activeSwatch?.label ?? "Natural Bagasse",
      activeImage,
      quantity,
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const accordionItems: { key: AccordionKey; label: string; body: string }[] = [
    { key: "details", label: "Details", body: selectedProduct.details },
    { key: "materials", label: "Size & Materials", body: selectedProduct.sizeMaterials },
    { key: "shipping", label: "Shipping & Commercial Orders", body: selectedProduct.shippingNote },
  ];

  return (
    <section id="spotlight" className="border-y border-border bg-card py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p className="text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
            Atelier Spotlight — Inspect Material &amp; Finish
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {products.map((item) => {
              const isCurrent = item.id === selectedProduct.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectProduct(item)}
                  className={`pb-1 text-[11px] tracking-[0.16em] uppercase transition-colors ${
                    isCurrent
                      ? "border-b border-cherry text-cherry"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left studio gallery mirroring vertical thumbnail rail + tall portrait */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[84px_1fr] lg:col-span-7">
            <div className="order-2 flex gap-3 sm:order-1 sm:flex-col">
              {selectedProduct.gallery.map((thumb, idx) => {
                const isSelected = activeImage === thumb;
                return (
                  <button
                    key={`${selectedProduct.id}-thumb-${idx}`}
                    type="button"
                    onClick={() => setActiveImage(thumb)}
                    aria-label={`View ${selectedProduct.name} angle ${idx + 1}`}
                    className={`aspect-square w-20 shrink-0 overflow-hidden border transition-all sm:w-full ${
                      isSelected
                        ? "border-cherry opacity-100"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={thumb} alt="" className="h-full w-full object-cover" />
                  </button>
                );
              })}
            </div>

            <div className="order-1 aspect-[4/5] w-full overflow-hidden bg-secondary sm:order-2">
              <img
                src={activeImage}
                alt={selectedProduct.name}
                className="h-full w-full object-cover transition-all duration-700"
              />
            </div>
          </div>

          {/* Right editorial specification column */}
          <div className="flex flex-col justify-center lg:col-span-5">
            <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              {selectedProduct.breadcrumb}
            </p>

            <div className="mt-3 flex items-baseline justify-between gap-4">
              <h2 className="font-serif-display text-4xl font-normal tracking-[0.04em] uppercase text-foreground md:text-[42px]">
                {selectedProduct.name}
              </h2>
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <p className="text-xl font-normal tracking-wide text-foreground">
                ${selectedProduct.price}
              </p>
              <span className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
                {selectedProduct.unitLabel} · {selectedProduct.gsm}
              </span>
            </div>

            {/* Signature circular swatches (Cherry, Cane Olive, Raw Bagasse) */}
            <div className="mt-6">
              <div className="flex items-center gap-3">
                {selectedProduct.swatches.map((swatch) => {
                  const active = swatch.id === activeSwatch?.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => handleSwatchClick(swatch.id, swatch.image)}
                      aria-label={`Select ${swatch.label} finish`}
                      title={swatch.label}
                      className={`h-7 w-7 rounded-full p-[3px] transition-all ${
                        active ? "ring-1 ring-foreground ring-offset-2 ring-offset-card" : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <span className={`block h-full w-full rounded-full ${swatch.swatchClass}`} />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs tracking-[0.12em] uppercase text-muted-foreground">
                  {activeSwatch?.label}
                </span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-foreground/80">
              {selectedProduct.description}
            </p>

            {/* Hairline expandable rows */}
            <div className="mt-8 border-t border-border">
              {accordionItems.map((row) => {
                const isOpen = openSection === row.key;
                return (
                  <div key={row.key} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => toggleSection(row.key)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between py-4 text-left text-[11px] font-normal tracking-[0.2em] uppercase text-foreground transition-colors hover:text-cherry"
                    >
                      <span>{row.label}</span>
                      {isOpen ? (
                        <Minus className="h-3.5 w-3.5 stroke-[1.5] text-cherry" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 stroke-[1.5] text-muted-foreground" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                        {row.body}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Quantity stepper + Espresso ADD TO CART button */}
            <div className="mt-8 flex items-stretch gap-3">
              <div className="flex items-center border border-border bg-background/50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="flex h-12 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-cherry"
                >
                  <Minus className="h-3.5 w-3.5 stroke-[1.5]" />
                </button>
                <span className="w-10 text-center text-sm font-normal">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                  className="flex h-12 w-10 items-center justify-center text-foreground/80 transition-colors hover:text-cherry"
                >
                  <Plus className="h-3.5 w-3.5 stroke-[1.5]" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 px-6 text-[11px] font-normal tracking-[0.24em] uppercase transition-colors duration-300 ${
                  justAdded
                    ? "bg-cherry text-accent-foreground"
                    : "bg-primary text-primary-foreground hover:bg-cherry"
                }`}
              >
                {justAdded ? "Added to Bag" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}