import { ShoppingBag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const NAV_LINKS = [
  { label: "Bags", href: "#bags" },
  { label: "Spotlight", href: "#spotlight" },
  { label: "Notebooks & Wrap", href: "#stationery" },
  { label: "The Process", href: "#process" },
];

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/92 backdrop-blur-md"
          : "border-b border-foreground/15 bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:px-12">
        <a
          href="#top"
          className="font-serif-display text-2xl font-normal tracking-[0.22em] text-foreground md:text-[26px]"
        >
          CANEA
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="editorial-link text-[11px] font-normal tracking-[0.2em] uppercase text-foreground/85 transition-colors hover:text-cherry"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag, ${cartCount} items`}
            className="group relative flex items-center gap-2 py-1 text-[11px] tracking-[0.18em] uppercase text-foreground transition-colors hover:text-cherry"
          >
            <ShoppingBag className="h-[18px] w-[18px] stroke-[1.4]" />
            <span className="hidden sm:inline">Bag</span>
            {cartCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-cherry px-1 text-[10px] font-medium text-accent-foreground">
                {cartCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="p-1 text-foreground md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5 stroke-[1.5]" /> : <Menu className="h-5 w-5 stroke-[1.5]" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="flex flex-col gap-4 border-t border-border bg-background/98 px-6 py-6 backdrop-blur-md md:hidden"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs tracking-[0.2em] uppercase text-foreground/90 hover:text-cherry"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}