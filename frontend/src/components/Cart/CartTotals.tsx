import { formatPrice } from "@/utils/price";
import { useCartStore } from "../../stores/cart.store";
import { CheckoutButton } from "./CheckoutButton";

export function CartTotals() {
  const subtotal = useCartStore((s) => s.getSubtotal());
  const total = useCartStore((s) => s.getTotal());

  return (
    <div className="col-span-1 bg-cart mx-auto lg:mx-0 lg:w-auto px-10 pb-16 pt-4 sm:px-18.75 sm:pb-20 flex justify-center items-center flex-col max-h-97">
      <h1 className="font-bold text-[32px]">Card Totals</h1>
      <div className="flex flex-col gap-7.5 mt-15 mb-10.5">
        <div className="flex gap-14">
          Subtotal:{" "}
          <span className="text-footer-gray">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex gap-14 text-nowrap">
          Total:{" "}
          <span className="text-over-secundary font-medium text-xl">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      <CheckoutButton />
    </div>
  );
}
