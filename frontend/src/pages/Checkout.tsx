import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { z } from "zod";
import PageBanner from "@/components/Shop/PageBanner";
import Benefits from "@/components/Benefits/Benefits";
import { formatPrice } from "@/utils/price";
import { useCartStore } from "@/stores/cart.store";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First Name is required."),
  lastName: z.string().min(1, "Last Name is required."),
  companyName: z.string().optional(),
  zipCode: z
    .string()
    .min(1, "ZIP Code is required.")
    .regex(/^\d{5}-?\d{3}$/, "Enter a valid ZIP Code (8 digits)."),
  country: z.string().min(1, "Country / Region is required."),
  streetAddress: z.string().min(1, "Street address is required."),
  townCity: z.string().min(1, "Town / City is required."),
  province: z.string().min(1, "Province is required."),
  addOnAddress: z.string().optional(),
  emailAddress: z.email("Email is required."),
  additionalInformation: z.string().optional(),
  paymentMethod: z.enum(["direct", "cod"], {
    error: "Select a payment method.",
  }),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

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
    defaultValues: {
      paymentMethod: undefined,
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    if (isEmpty()) {
      navigate("/shop", { replace: true });
    }
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
      if (data.logradouro)
        setValue("streetAddress", data.logradouro, { shouldValidate: true });
      if (data.localidade)
        setValue("townCity", data.localidade, { shouldValidate: true });
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

  const inputClass =
    "w-full rounded-[10px] border border-footer-gray bg-primary p-4 text-primary-text outline-none placeholder:text-footer-gray focus:border-over-secundary";
  const labelClass = "font-medium text-over-primary";
  const errorClass = "text-red-500";

  return (
    <div>
      <PageBanner
        breadcrumbCurrent="Checkout"
        breadcrumbHome="Home"
        title="Checkout"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="max-w-310 mx-auto px-4 py-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left: Billing details */}
          <div>
            <h2 className="mb-8 text-4xl font-semibold text-over-primary">
              Billing details
            </h2>

            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className={labelClass}>
                    First Name
                  </label>
                  <input
                    id="firstName"
                    placeholder="Abc"
                    {...register("firstName")}
                    className={inputClass}
                  />
                  {errors.firstName && (
                    <p className={errorClass}>{errors.firstName.message}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className={labelClass}>
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    placeholder="Abc"
                    {...register("lastName")}
                    className={inputClass}
                  />
                  {errors.lastName && (
                    <p className={errorClass}>{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="companyName" className={labelClass}>
                  Company Name (Optional)
                </label>
                <input
                  id="companyName"
                  {...register("companyName")}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="zipCode" className={labelClass}>
                  ZIP Code
                </label>
                <input
                  id="zipCode"
                  placeholder="00000-000"
                  {...register("zipCode")}
                  onBlur={handleZipBlur}
                  className={inputClass}
                />
                {errors.zipCode && (
                  <p className={errorClass}>{errors.zipCode.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="country" className={labelClass}>
                  Country / Region
                </label>
                <input
                  id="country"
                  placeholder="Brazil"
                  {...register("country")}
                  className={inputClass}
                />
                {errors.country && (
                  <p className={errorClass}>{errors.country.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="streetAddress" className={labelClass}>
                  Street address
                </label>
                <input
                  id="streetAddress"
                  {...register("streetAddress")}
                  className={inputClass}
                />
                {errors.streetAddress && (
                  <p className={errorClass}>{errors.streetAddress.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="townCity" className={labelClass}>
                  Town / City
                </label>
                <input
                  id="townCity"
                  {...register("townCity")}
                  className={inputClass}
                />
                {errors.townCity && (
                  <p className={errorClass}>{errors.townCity.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="province" className={labelClass}>
                  Province
                </label>
                <input
                  id="province"
                  {...register("province")}
                  className={inputClass}
                />
                {errors.province && (
                  <p className={errorClass}>{errors.province.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="addOnAddress" className={labelClass}>
                  Add-on address
                </label>
                <input
                  id="addOnAddress"
                  {...register("addOnAddress")}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="emailAddress" className={labelClass}>
                  Email address
                </label>
                <input
                  id="emailAddress"
                  type="email"
                  placeholder="Abc@def.com"
                  {...register("emailAddress")}
                  className={inputClass}
                />
                {errors.emailAddress && (
                  <p className={errorClass}>{errors.emailAddress.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <textarea
                  placeholder="Additional information"
                  {...register("additionalInformation")}
                  rows={1}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Right: Summary + Payment */}
          <div className="lg:pt-14">
            <div className="pb-6">
              <div className="flex justify-between mb-4">
                <span className="font-medium text-2xl text-over-primary">
                  Product
                </span>
                <span className="font-medium text-2xl text-over-primary">
                  Subtotal
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-footer-gray">
                      {item.name}{" "}
                      <span className="text-over-primary text-xs">
                        × {item.quantity}
                      </span>
                    </span>
                    <span className="text-over-primary font-light">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5.5 flex justify-between">
                <span className="text-over-primary">Subtotal</span>
                <span className="font-light text-over-primary">
                  {formatPrice(getSubtotal())}
                </span>
              </div>

              <div className="mt-3 flex justify-between">
                <span className="text-over-primary">Total</span>
                <span className="font-bold text-2xl text-over-secundary">
                  {formatPrice(getTotal())}
                </span>
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
                    <span
                      className={`${paymentMethod === "direct" ? "text-over-primary" : "text-footer-gray"}`}
                    >
                      Direct Bank Transfer
                    </span>
                    {paymentMethod === "direct" && (
                      <span className="mt-1 font-light text-footer-gray">
                        Make your payment directly into our bank account. Please
                        use your Order ID as the payment reference. Your order
                        will not be shipped until the funds have cleared in our
                        account.
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
                    <span
                      className={`${paymentMethod === "cod" ? "text-over-primary" : "text-footer-gray"}`}
                    >
                      Cash On Delivery
                    </span>
                    {paymentMethod === "cod" && (
                      <span className="mt-1 font-light text-footer-gray">
                        Pay with cash upon delivery. Your order will be shipped
                        and you can pay when it arrives at your address.
                      </span>
                    )}
                  </span>
                </label>

                {errors.paymentMethod && (
                  <p className={errorClass}>{errors.paymentMethod.message}</p>
                )}

                <p className="font-light">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our{" "}
                  <span className="font-semibold text-over-primary">
                    privacy policy.
                  </span>
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
