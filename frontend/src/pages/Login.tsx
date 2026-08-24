import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { z } from "zod";
import { login } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import PageBanner from "@/components/Shop/PageBanner";

const loginSchema = z.object({
  email: z.email("Enter a valid email."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: { pathname: string } } | null)?.from
      ?.pathname ?? "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginFormData) {
    try {
      const res = await login(data);
      useAuthStore.getState().setAuth(res.token, res.user);

      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : ((err as { response?: { data?: { error?: string } } })?.response
              ?.data?.error ?? "Invalid credentials.");

      const axiosError = err as { response?: { data?: { error?: string } } };
      const apiMessage = axiosError.response?.data?.error;
      toast.error(apiMessage ?? message);
    }
  }

  return (
    <div>
      <PageBanner
        breadcrumbCurrent="Login"
        breadcrumbHome="Home"
        title="Login"
      />

      <div className="max-w-100 mx-auto px-4 py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <h2 className="text-2xl font-semibold text-over-primary">Login</h2>

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

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-over-secundary px-8 py-3 text-sm font-semibold text-primary transition hover:opacity-90 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Loading..." : "LOGIN"}
          </button>

          <p className="text-center text-sm text-primary-text-100">
            Not registered yet?{" "}
            <Link
              to="/register"
              state={location.state}
              className="font-medium text-over-secundary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
