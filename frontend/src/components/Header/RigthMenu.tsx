import clsx from "clsx";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/auth.store";
import { useCartStore } from "../../stores/cart.store";

type RightMenuProps = {
  className?: string;
};
const RightMenu = ({ className }: RightMenuProps) => {
  const totalItems = useCartStore((s) => s.getTotalItems());
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const LinkHover: string = "hover:cursor-pointer hover:scale-110 transition";

  function handleLogout() {
    logout();
    toast.success("Logged out.");
    navigate("/");
  }

  return (
    <div className={clsx("flex items-center gap-[33.66px]", className)}>
      {user ? (
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-over-secundary text-sm font-medium text-primary">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <button
            onClick={handleLogout}
            className="cursor-pointer text-sm font-medium text-over-primary hover:text-over-secundary transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className={clsx(LinkHover)}>
          <img
            src="/Icons/alert.svg"
            alt="User"
            className={clsx("max-h-[18.66px]")}
          />
        </Link>
      )}
      <Link to="/cart" className={clsx(LinkHover, "relative")}>
        <img
          src="/Icons/shop.svg"
          alt="Ícone de usuário"
          className={clsx("max-h-[22.05px]")}
        />
        {totalItems > 0 && (
          <span
            className={clsx(
              "absolute -top-3 -right-3",
              "w-4.5 h-4.5",
              "rounded-full",
              "bg-over-secundary",
              "text-white text-xs font-bold",
              "flex justify-center items-center",
            )}
          >
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
};
export default RightMenu;
