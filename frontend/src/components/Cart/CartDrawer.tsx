import clsx from "clsx";
import { useCartStore } from "@/stores/cart.store";
import { useUIStore } from "@/stores/ui.store";
import { CartDrawerFooter } from "./CartDrawerFooter";
import { CartDrawerItem } from "./CartDrawerItem";

export function CartDrawer() {
  const isOpen = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const isEmpty = useCartStore((s) => s.isEmpty());

  return (
    <>
      <div
        onClick={closeCart}
        className={clsx(
          "fixed inset-0 z-40 bg-black/30 transition-opacity",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!isOpen}
      />

      <aside
        className={clsx(
          "fixed top-0 right-0 z-50 flex h-186.5 max-h-[90vh] w-104.25 max-w-[90vw] flex-col bg-primary shadow-xl transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-7 pt-6 pb-6">
          <h2 className="text-2xl font-semibold text-over-primary">
            Shopping Cart
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center cursor-pointer transition hover:opacity-70"
          >
            <img
              src="/Icons/close-cart.svg"
              alt="Close"
              className="h-4.75 w-4.25"
            />
          </button>
        </div>
        <div className="mx-7 h-px max-w-71.75 bg-footer" />

        <div className="flex-1 overflow-y-auto px-7 pt-10.5 pb-6">
          {isEmpty ? (
            <p className="py-20 text-center text-sm text-footer-gray">
              Cart is empty
            </p>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <CartDrawerItem
                  key={item.id}
                  item={item}
                  onRemove={removeItem}
                  onClose={closeCart}
                />
              ))}
            </div>
          )}
        </div>

        {!isEmpty && <CartDrawerFooter />}
      </aside>
    </>
  );
}
