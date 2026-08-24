import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { register as registerUser } from "@/services/auth.service";
import PageBanner from "@/components/Shop/PageBanner";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required.")
      .min(2, "Name must be at least 2 characters."),
    email: z.email("Email is required."),
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      const apiMessage = axiosError.response?.data?.error;
      toast.error(apiMessage ?? "Failed to create account.");
    }
  }

  return (
    <div>
      <PageBanner
        breadcrumbCurrent="Register"
        breadcrumbHome="Home"
        title="Register"
      />

      <div className="max-w-100 mx-auto px-4 py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <h2 className="text-2xl font-semibold text-over-primary">Register</h2>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="name"
              className="text-sm font-medium text-over-primary"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Abc"
              {...register("name")}
              className="w-full rounded-lg border border-footer-gray bg-primary px-4 py-3 text-sm text-primary-text outline-none placeholder:text-footer-gray focus:border-over-secundary"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-over-primary"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Abc@def.com"
              {...register("email")}
              className="w-full rounded-lg border border-footer-gray bg-primary px-4 py-3 text-sm text-primary-text outline-none placeholder:text-footer-gray focus:border-over-secundary"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-over-primary"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full rounded-lg border border-footer-gray bg-primary px-4 py-3 text-sm text-primary-text outline-none placeholder:text-footer-gray focus:border-over-secundary"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-over-primary"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword")}
              className="w-full rounded-lg border border-footer-gray bg-primary px-4 py-3 text-sm text-primary-text outline-none placeholder:text-footer-gray focus:border-over-secundary"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-over-secundary px-8 py-3 text-sm font-semibold text-primary transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Loading..." : "SIGN UP"}
          </button>

          <p className="text-center text-sm text-primary-text-100">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-over-secundary hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
