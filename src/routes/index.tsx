import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { CartDrawer, type CartItem } from "@/components/CartDrawer";
import { Navbar } from "@/components/Navbar";
import { ProductSpotlight } from "@/components/ProductSpotlight";
import {
  PROCESS_STEPS,
  PRODUCTS,
  STUDIO_IMAGES,
  type BagTier,
  type ProductItem,
} from "@/data/products";

const CART_STORAGE_KEY = "canea_shopping_bag_v1";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CANEA — Sustainable Sugarcane Paper Bags, Notebooks & Wrapping" },
      {
        name: "description",
        content:
          "Luxury sustainable paper bags for commercial and retail use, lay-flat notebooks, and botanical paper wrapping crafted from 100% rescued sugarcane fibers.",
      },
      { property: "og:title", content: "CANEA — Sustainable Sugarcane Paper Goods" },
      {
        property: "og:description",
        content:
          "Architectural paper bags, lay-flat notebooks, and botanical paper wrapping crafted from rescued sugarcane bagasse.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const defaultSpotlight = PRODUCTS[3] ?? PRODUCTS[0];
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(defaultSpotlight!);
  const [bagFilter, setBagFilter] = useState<BagTier>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartItem[];
        if (Array.isArray(parsed)) setCartItems(parsed);
      }
    } catch {
      // Ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [cartItems, hydrated]);

  const bagProducts = PRODUCTS.filter((p) => {
    if (p.category !== "bags") return false;
    if (bagFilter === "all") return true;
    return p.bagTier === bagFilter;
  });

  const stationeryProducts = PRODUCTS.filter(
    (p) => p.category === "notebooks" || p.category === "wrapping",
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (
    product: ProductItem,
    finishLabel: string,
    image: string,
    quantity = 1,
  ) => {
    const key = `${product.id}::${finishLabel}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          finish: finishLabel,
          unitLabel: product.unitLabel,
          price: product.price,
          quantity,
          image,
        },
      ];
    });
    setCartOpen(true);
  };

  const handleUpdateQty = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemove = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleInspect = (product: ProductItem) => {
    setSelectedProduct(product);
    const el = document.getElementById("spotlight");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />

      <main>
        {/* Full-bleed Sunlit Plaster Hero inspired directly by reference composition */}
        <section className="relative flex min-h-[88vh] flex-col justify-between overflow-hidden bg-plaster pt-16 lg:min-h-[96vh]">
          <img
            src={STUDIO_IMAGES.hero}
            alt="Sunlit sugarcane fiber paper bag and linen notebook with cherry ribbon on travertine stone"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="sunray-wash pointer-events-none absolute inset-0" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background/80 via-background/25 to-transparent md:h-28" />

          <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-6 pb-10 pt-24 md:grid md:grid-cols-12 md:items-center md:px-12 md:py-0">
            <div className="editorial-reveal md:col-span-4">
              <p className="text-[11px] font-normal tracking-[0.26em] uppercase text-cherry">
                100% Sugarcane Fiber Paper
              </p>
              <h1 className="mt-4 font-serif-display text-5xl font-light leading-[0.98] tracking-[0.04em] uppercase text-foreground sm:text-6xl lg:text-[66px]">
                Paper For
                <br />
                Everyday
                <br />
                Rituals
              </h1>
            </div>

            <div className="hidden md:col-span-4 md:block" />

            <div className="editorial-reveal mt-8 flex justify-start md:col-span-4 md:mt-0 md:justify-end">
              <a
                href="#bags"
                className="group inline-flex items-end gap-4 text-left md:text-right"
              >
                <span className="font-sans text-lg font-light leading-snug tracking-[0.14em] uppercase text-foreground transition-colors group-hover:text-cherry lg:text-[22px]">
                  Explore The
                  <br />
                  Collection
                </span>
                <ArrowDownRight className="mb-1 h-5 w-5 stroke-[1.3] text-cherry transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>
          </div>

          {/* Minimal architectural sustainability strip */}
          <div className="relative z-10 border-t border-foreground/15 bg-background/72 backdrop-blur-[2px]">
            <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-foreground/12 px-6 text-[11px] tracking-[0.2em] uppercase text-foreground/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-12">
              <p className="py-4 sm:pr-6">Zero Wood Pulp · 100% Harvested Bagasse</p>
              <p className="py-4 sm:px-6 sm:text-center">Commercial Bags · Notebooks · Paper Wrapping</p>
              <p className="py-4 sm:pl-6 sm:text-right">Home Compostable Within 90 Days</p>
            </div>
          </div>
        </section>

        {/* Section 1: Varieties of Paper Bags */}
        <section id="bags" className="relative py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="flex flex-col justify-between gap-8 border-b border-border pb-8 md:flex-row md:items-end">
              <div className="max-w-xl">
                <h2 className="font-serif-display text-4xl font-light tracking-[0.03em] text-foreground sm:text-5xl md:text-[54px]">
                  Varieties of Paper Bags
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Pressed from rescued sugarcane stalks into rigid, tree-free retail totes, hospitality takeaway packs, and cherry-sealed gift carriers.
                </p>
              </div>

              <div className="flex flex-wrap gap-6" role="tablist" aria-label="Filter paper bags">
                {(
                  [
                    { id: "all", label: "All Varieties" },
                    { id: "commercial", label: "Commercial Packs" },
                    { id: "retail", label: "Retail & Gift" },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={bagFilter === tab.id}
                    onClick={() => setBagFilter(tab.id)}
                    className={`pb-2 text-[11px] tracking-[0.2em] uppercase transition-colors ${
                      bagFilter === tab.id
                        ? "border-b border-cherry text-cherry"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
              {bagProducts.map((product) => {
                const primarySwatch = product.swatches[0];
                return (
                  <article key={product.id} className="group flex flex-col">
                    <button
                      type="button"
                      onClick={() => handleInspect(product)}
                      className="relative aspect-[3/4] w-full overflow-hidden bg-secondary text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </button>

                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <h3 className="font-serif-display text-2xl font-normal tracking-[0.02em] text-foreground">
                        {product.name}
                      </h3>
                      <p className="text-sm font-normal text-foreground">${product.price}</p>
                    </div>

                    <p className="mt-1 text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                      {product.subtitle} · {product.unitLabel} · {product.gsm}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-4">
                      <div className="flex items-center gap-2">
                        {product.swatches.map((s) => (
                          <span
                            key={s.id}
                            title={s.label}
                            className={`h-3.5 w-3.5 rounded-full ${s.swatchClass}`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          onClick={() => handleInspect(product)}
                          className="editorial-link text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground"
                        >
                          Inspect
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleAddToCart(
                              product,
                              primarySwatch?.label ?? "Natural Bagasse",
                              product.image,
                            )
                          }
                          className="text-[11px] font-normal tracking-[0.18em] uppercase text-cherry transition-opacity hover:opacity-75"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Commercial wholesale capabilities bar */}
            <div className="mt-20 grid grid-cols-1 gap-8 border-t border-border pt-10 md:grid-cols-3">
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-cherry">Commercial Runs</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Tailored wholesale packaging for cafés, fashion boutiques, hotels, and gourmet grocers starting at 250 units.
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-cherry">Blind Debossing</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Ink-free architectural blind impression or soy-based cherry lacquer insignia pressed directly into 180–260 GSM fibers.
                </p>
              </div>
              <div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-cherry">Zero Plastic Laminates</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  High-density sugarcane bagasse cellulose gives crisp structural stand and moisture resistance without synthetic films.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Interactive Atelier Product Spotlight (FORME-inspired layout) */}
        <ProductSpotlight
          products={PRODUCTS}
          selectedProduct={selectedProduct}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
        />

        {/* Section 3: Notebooks, Paper Wrapping & Protective Covers */}
        <section id="stationery" className="relative overflow-hidden bg-secondary/75 py-24 md:py-32">
          <div className="sunray-wash pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="max-w-2xl">
              <h2 className="font-serif-display text-4xl font-light tracking-[0.03em] text-foreground sm:text-5xl md:text-[54px]">
                Notebooks, Wrapping &amp; Covers
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Beyond bags—the same rescued sugarcane fibers shaped into fountain-pen-friendly lay-flat notebooks, crisp wrapping rolls, and rigid protective covers.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
              {stationeryProducts.map((product) => {
                const primarySwatch = product.swatches[0];
                return (
                  <article key={product.id} className="group flex flex-col">
                    <button
                      type="button"
                      onClick={() => handleInspect(product)}
                      className="aspect-[4/5] w-full overflow-hidden bg-card text-left"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    </button>

                    <div className="mt-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                      <div className="max-w-md">
                        <p className="text-[11px] tracking-[0.2em] uppercase text-cherry">
                          {product.subtitle}
                        </p>
                        <h3 className="mt-1.5 font-serif-display text-3xl font-normal text-foreground">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {product.description}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                        <p className="text-lg font-normal text-foreground">
                          ${product.price}{" "}
                          <span className="text-xs tracking-[0.12em] uppercase text-muted-foreground">
                            / {product.unitLabel}
                          </span>
                        </p>
                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleInspect(product)}
                            className="editorial-link text-[11px] tracking-[0.18em] uppercase text-foreground"
                          >
                            Details
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleAddToCart(
                                product,
                                primarySwatch?.label ?? "Standard",
                                product.image,
                              )
                            }
                            className="bg-primary px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:bg-cherry"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 4: Sugarcane-to-Paper Origin Story */}
        <section id="process" className="bg-background py-24 md:py-32">
          <div className="mx-auto max-w-[1440px] px-6 md:px-12">
            <div className="grid grid-cols-1 gap-6 pb-12 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <h2 className="font-serif-display text-4xl font-light leading-[1.06] tracking-[0.02em] text-foreground sm:text-5xl md:text-[56px]">
                  From Harvested Sugarcane
                  <br />
                  <span className="italic text-cherry">to Tactile Paper</span>
                </h2>
              </div>
              <p className="text-sm leading-7 text-muted-foreground lg:col-span-5">
                Every tonne of sugarcane bagasse we reclaim replaces three tonnes of virgin timber pulp—eliminating agricultural field burning while producing naturally speckled, museum-grade paper.
              </p>
            </div>

            <div className="aspect-[16/9] w-full overflow-hidden bg-secondary">
              <img
                src={STUDIO_IMAGES.sugarcaneStory}
                alt="Harvested sugarcane stalks beside dried golden bagasse fibers and handmade sugarcane paper sheets in warm afternoon sunlight"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-14 grid grid-cols-1 gap-10 border-t border-border pt-12 md:grid-cols-3 lg:gap-14">
              {PROCESS_STEPS.map((item) => (
                <div key={item.step}>
                  <span className="font-serif-display text-3xl italic text-cherry">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-serif-display text-2xl font-normal text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-secondary/60">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 px-6 py-16 md:flex-row md:items-end md:px-12">
          <div>
            <p className="font-serif-display text-3xl tracking-[0.22em] text-foreground">
              CANEA
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Tree-free commercial paper bags, lay-flat notebooks, and botanical wrapping crafted from rescued sugarcane fibers.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
            <a href="#bags" className="editorial-link hover:text-cherry">
              Bags
            </a>
            <a href="#spotlight" className="editorial-link hover:text-cherry">
              Spotlight
            </a>
            <a href="#stationery" className="editorial-link hover:text-cherry">
              Notebooks &amp; Wrap
            </a>
            <a href="#process" className="editorial-link hover:text-cherry">
              Process
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-1 text-foreground hover:text-cherry"
            >
              Top <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onClear={() => setCartItems([])}
      />
    </div>
  );
}
