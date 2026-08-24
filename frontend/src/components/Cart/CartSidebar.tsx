import clsx from "clsx";
import { Link, useNavigate } from "react-router";
import { getImage } from "@/lib/assets";
import { formatPrice } from "@/utils/price";
import { useCartStore } from "@/stores/cart.store";
import { useUIStore } from "@/stores/ui.store";

export function CartSidebar() {
  const isOpen = useUIStore((s) => s.isCartOpen);
  const closeCart = useUIStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const getSubtotal = useCartStore((s) => s.getSubtotal());
  const isEmpty = useCartStore((s) => s.isEmpty());
  const navigate = useNavigate();

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
                <div key={item.id} className="flex items-center gap-4">
                  <Link to={`/product/${item.id}`} onClick={closeCart}>
                    <img
                      src={getImage(item.image)}
                      alt={item.name}
                      className="h-26.25 w-26.25 rounded-[10px] object-cover bg-cart"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-over-primary">{item.name}</p>
                    <p className="flex items-center gap-1 text-[16px] font-light text-over-primary">
                      <span>{item.quantity}</span>{" "}
                      <span className="mx-1">×</span>{" "}
                      <span className="text-[12px] font-medium text-over-secundary">
                        {formatPrice(item.price)}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="flex h-5 w-5 items-center justify-center cursor-pointer transition hover:opacity-70"
                  >
                    <img
                      src="/Icons/close-item.svg"
                      alt="Remove"
                      className="h-5 w-5"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <div className="px-7 py-6">
            <div className="flex items-center gap-25 pb-6">
              <span className="text-base  text-over-primary">Subtotal</span>
              <span className="text-base font-semibold text-over-secundary">
                {formatPrice(getSubtotal)}
              </span>
            </div>
            <div className="-mx-7 h-px bg-footer" />

            <div className="flex justify-center gap-3 pt-6">
              <button
                onClick={() => {
                  closeCart();
                  navigate("/cart");
                }}
                className="rounded-full border border-over-primary bg-primary px-7.5 py-1.5 text-xs font-medium text-over-primary transition hover:bg-over-primary hover:text-primary cursor-pointer"
              >
                Cart
              </button>
              <button
                onClick={() => {
                  closeCart();
                  navigate("/checkout");
                }}
                className="rounded-full border border-over-primary bg-primary px-7.5 py-1.5 text-xs font-medium text-over-primary transition hover:bg-over-primary hover:text-primary cursor-pointer"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
