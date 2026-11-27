import { Minus, Plus, Trash2, X, Check } from "lucide-react";
import { useState } from "react";

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  finish: string;
  unitLabel: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemove: (key: string) => void;
  onClear: () => void;
}

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
}: CartDrawerProps) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setOrderPlaced(true);
    onClear();
  };

  const handleClose = () => {
    setOrderPlaced(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-label="Shopping bag">
      <div className="fixed inset-0 bg-foreground/30 backdrop-blur-[2px]" onClick={handleClose} />

      <aside className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-border bg-card text-foreground shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif-display text-2xl font-normal tracking-[0.08em] uppercase">
            Your Bag
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close shopping bag"
            className="p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-5 w-5 stroke-[1.4]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {orderPlaced ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-cherry text-accent-foreground">
                <Check className="h-5 w-5 stroke-[1.6]" />
              </div>
              <h3 className="font-serif-display text-3xl font-normal">Order Reserved</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Thank you for choosing tree-free sugarcane paper. Your preview order has been recorded locally.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-8 border border-primary bg-primary px-8 py-3 text-[11px] tracking-[0.2em] uppercase text-primary-foreground transition-colors hover:border-cherry hover:bg-cherry"
              >
                Continue Browsing
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-serif-display text-2xl text-foreground">Your bag is empty</p>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                Explore our sugarcane paper bags, lay-flat notebooks, and botanical wrapping rolls.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5 first:pt-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 shrink-0 object-cover bg-secondary"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-serif-display text-lg leading-tight">{item.name}</p>
                        <p className="mt-1 text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                          {item.finish} · {item.unitLabel}
                        </p>
                      </div>
                      <p className="text-sm font-normal">${item.price * item.quantity}</p>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-foreground/80 hover:text-cherry"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.key, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center text-foreground/80 hover:text-cherry"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(item.key)}
                        aria-label={`Remove ${item.name}`}
                        className="text-muted-foreground transition-colors hover:text-cherry"
                      >
                        <Trash2 className="h-4 w-4 stroke-[1.4]" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && !orderPlaced && (
          <div className="border-t border-border bg-background/60 px-6 py-5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">Subtotal</span>
              <span className="font-serif-display text-2xl">${subtotal}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              100% plastic-free sugarcane carton shipping calculated at checkout.
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              className="mt-5 w-full bg-primary py-3.5 text-[11px] font-normal tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-cherry"
            >
              Reserve Order
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}