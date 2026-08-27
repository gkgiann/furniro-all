import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label?: string;
  id?: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
};

export function Input({ label, id, error, textarea, rows, className, ...props }: InputProps) {
  const baseClass =
    "w-full rounded-lg border border-footer-gray bg-primary p-5 text-sm text-primary-text outline-none placeholder:text-footer-gray focus:border-over-secundary";

  return (
    <div className="flex flex-col gap-5.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-over-primary">
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          id={id}
          rows={rows ?? 4}
          className={clsx(baseClass, "resize-none", className)}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input id={id} className={clsx(baseClass, className)} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
