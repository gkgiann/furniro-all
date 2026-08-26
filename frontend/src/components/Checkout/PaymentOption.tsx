type PaymentOptionProps = {
  value: "direct" | "cod";
  label: string;
  description: string;
  selected?: string;
  register: (name: "paymentMethod") => object;
};

export function PaymentOption({ value, label, description, selected, register }: PaymentOptionProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="radio"
        value={value}
        {...register("paymentMethod")}
        className="mt-1 h-3.5 w-3.5 shrink-0 appearance-none rounded-full border border-footer-gray bg-primary checked:border-over-primary checked:bg-over-primary"
      />
      <span className="flex flex-col">
        <span className={`text-sm font-medium ${selected === value ? "text-over-primary" : "text-footer-gray"}`}>{label}</span>
        {selected === value && <span className="mt-1 font-light text-footer-gray">{description}</span>}
      </span>
    </label>
  );
}
