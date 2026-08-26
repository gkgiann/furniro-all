import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import PageBanner from "@/components/Shop/PageBanner";
import Benefits from "@/components/Benefits/Benefits";
import { Input } from "@/components/ui/Input";
import { checkoutSchema, type CheckoutFormData } from "@/schemas/checkout.schema";
import { formatPrice } from "@/utils/price";
import { useCartStore } from "@/stores/cart.store";

export function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTotal = useCartStore((s) => s.getTotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const isEmpty = useCartStore((s) => s.isEmpty);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: undefined },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (isEmpty()) navigate("/shop", { replace: true });
  }, [isEmpty, navigate]);

  async function handleZipBlur(e: React.FocusEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length !== 8) return;
    try {
      const res = await fetch(`https://viacep.com.br/ws/${raw}/json/`);
      const data = await res.json();
      if (data.erro) {
        toast.error("ZIP Code not found.");
        return;
      }
      if (data.logradouro) setValue("streetAddress", data.logradouro, { shouldValidate: true });
      if (data.localidade) setValue("townCity", data.localidade, { shouldValidate: true });
      if (data.uf) setValue("province", data.uf, { shouldValidate: true });
      setValue("country", "Brazil", { shouldValidate: true });
    } catch {
      toast.error("Failed to fetch address.");
    }
  }

  function onSubmit(_data: CheckoutFormData) {
    if (isEmpty()) {
      toast.error("Cart is empty.");
      return;
    }
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/shop");
  }

  return (
    <div>
      <PageBanner breadcrumbCurrent="Checkout" breadcrumbHome="Home" title="Checkout" />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="max-w-310 mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="mb-8 text-4xl font-semibold text-over-primary">Billing details</h2>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input id="firstName" label="First Name" placeholder="Abc" error={errors.firstName?.message} {...register("firstName")} />
                <Input id="lastName" label="Last Name" placeholder="Abc" error={errors.lastName?.message} {...register("lastName")} />
              </div>
              <Input id="companyName" label="Company Name (Optional)" {...register("companyName")} />
              <Input
                id="zipCode"
                label="ZIP Code"
                placeholder="00000-000"
                error={errors.zipCode?.message}
                {...register("zipCode")}
                onBlur={handleZipBlur}
              />
              <Input id="country" label="Country / Region" placeholder="Brazil" error={errors.country?.message} {...register("country")} />
              <Input id="streetAddress" label="Street address" error={errors.streetAddress?.message} {...register("streetAddress")} />
              <Input id="townCity" label="Town / City" error={errors.townCity?.message} {...register("townCity")} />
              <Input id="province" label="Province" error={errors.province?.message} {...register("province")} />
              <Input id="addOnAddress" label="Add-on address" {...register("addOnAddress")} />
              <Input
                id="emailAddress"
                label="Email address"
                type="email"
                placeholder="Abc@def.com"
                error={errors.emailAddress?.message}
                {...register("emailAddress")}
              />
              <Input placeholder="Additional information" textarea rows={1} {...register("additionalInformation")} />
            </div>
          </div>
          <div className="lg:pt-14">
            <div className="pb-6">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-2xl text-over-primary">Product</span>
                <span className="font-medium text-2xl text-over-primary">Subtotal</span>
              </div>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-footer-gray">
                      {item.name} <span className="text-over-primary text-xs">× {item.quantity}</span>
                    </span>
                    <span className="text-over-primary font-light">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5.5 flex justify-between">
                <span className="text-over-primary">Subtotal</span>
                <span className="font-light text-over-primary">{formatPrice(getSubtotal())}</span>
              </div>
              <div className="mt-3 flex justify-between">
                <span className="text-over-primary">Total</span>
                <span className="font-bold text-2xl text-over-secundary">{formatPrice(getTotal())}</span>
              </div>
              <div className="mt-6 flex flex-col gap-4 border-t border-footer pt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="direct"
                    {...register("paymentMethod")}
                    className="mt-1 h-3.5 w-3.5 shrink-0 appearance-none rounded-full border border-footer-gray bg-primary checked:border-over-primary checked:bg-over-primary"
                  />
                  <span className="flex flex-col">
                    <span className={`${paymentMethod === "direct" ? "text-over-primary" : "text-footer-gray"}`}>Direct Bank Transfer</span>
                    {paymentMethod === "direct" && (
                      <span className="mt-1 font-light text-footer-gray">
                        Make your payment directly into our bank account. Please use your Order ID as the payment
                        reference. Your order will not be shipped until the funds have cleared in our account.
                      </span>
                    )}
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value="cod"
                    {...register("paymentMethod")}
                    className="mt-1 h-3.5 w-3.5 shrink-0 appearance-none rounded-full border border-footer-gray bg-primary checked:border-over-primary checked:bg-over-primary"
                  />
                  <span className="flex flex-col">
                    <span className={`${paymentMethod === "cod" ? "text-over-primary" : "text-footer-gray"}`}>Cash On Delivery</span>
                    {paymentMethod === "cod" && (
                      <span className="mt-1 font-light text-footer-gray">
                        Pay with cash upon delivery. Your order will be shipped and you can pay when it arrives at your address.
                      </span>
                    )}
                  </span>
                </label>
                {errors.paymentMethod && <p className="text-sm text-red-500">{errors.paymentMethod.message}</p>}
                <p className="font-light">
                  Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our{" "}
                  <span className="font-semibold text-over-primary">privacy policy.</span>
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting || isEmpty()}
                  className="mt-2 w-full max-w-79.5 self-center rounded-2xl border border-over-primary bg-primary px-7 py-4 text-xl text-over-primary transition hover:bg-over-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Placing..." : "Place order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Benefits />
    </div>
  );
}
