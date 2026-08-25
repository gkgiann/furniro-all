import { useNavigate } from "react-router";
import { useCartStore } from "../../stores/cart.store";

export function CheckoutButton() {
  const isEmpty = useCartStore((s) => s.isEmpty);
  const navigate = useNavigate();

  function handleCheckout() {
    if (isEmpty()) return;
    navigate("/checkout");
  }

  return (
    <button
      disabled={isEmpty()}
      className="w-fit text-[20px] py-3.5 px-14.5 rounded-2xl border border-black cursor-pointer transition hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
}
