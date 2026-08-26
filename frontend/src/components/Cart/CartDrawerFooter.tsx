import { useCartStore } from "@/stores/cart.store";
import { useUIStore } from "@/stores/ui.store";
import { formatPrice } from "@/utils/price";
import { useNavigate } from "react-router";

export function CartDrawerFooter() {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const navigate = useNavigate();
  const onClose = useUIStore((s) => s.closeCart);

  return (
    <div className="px-7 py-6">
      <div className="flex items-center gap-25 pb-6">
        <span className="text-base  text-over-primary">Subtotal</span>
        <span className="text-base font-semibold text-over-secundary">
          {formatPrice(subtotal)}
        </span>
      </div>
      <div className="-mx-7 h-px bg-footer" />
      <div className="flex justify-center gap-3 pt-6">
        <button
          onClick={() => {
            onClose();
            navigate("/cart");
          }}
          className="rounded-full border border-over-primary bg-primary px-7.5 py-1.5 text-xs font-medium text-over-primary transition hover:bg-over-primary hover:text-primary cursor-pointer"
        >
          Cart
        </button>
        <button
          onClick={() => {
            onClose();
            navigate("/checkout");
          }}
          className="rounded-full border border-over-primary bg-primary px-7.5 py-1.5 text-xs font-medium text-over-primary transition hover:bg-over-primary hover:text-primary cursor-pointer"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
