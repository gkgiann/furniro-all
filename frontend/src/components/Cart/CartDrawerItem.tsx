import { Link } from "react-router";
import { getImage } from "@/lib/assets";
import { formatPrice } from "@/utils/price";
import type { CartItem } from "@/stores/cart.store";

type CartDrawerItemProps = {
  item: CartItem;
  onRemove: (id: string) => void;
  onClose: () => void;
};

export function CartDrawerItem({ item, onRemove, onClose }: CartDrawerItemProps) {
  return (
    <div className="flex items-center gap-4">
      <Link to={`/product/${item.id}`} onClick={onClose}>
        <img src={getImage(item.image)} alt={item.name} className="h-26.25 w-26.25 rounded-[10px] object-cover bg-cart" />
      </Link>
      <div className="flex flex-1 flex-col gap-1">
        <p className="text-over-primary">{item.name}</p>
        <p className="flex items-center gap-1 text-[16px] font-light text-over-primary">
          <span>{item.quantity}</span> <span className="mx-1">×</span>{" "}
          <span className="text-[12px] font-medium text-over-secundary">{formatPrice(item.price)}</span>
        </p>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name}`}
        className="flex h-5 w-5 items-center justify-center cursor-pointer transition hover:opacity-70"
      >
        <img src="/Icons/close-item.svg" alt="Remove" className="h-5 w-5" />
      </button>
    </div>
  );
}
