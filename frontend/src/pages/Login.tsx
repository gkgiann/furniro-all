import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router";
import { login } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import PageBanner from "@/components/Shop/PageBanner";
import { Input } from "@/components/ui/Input";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { AxiosError } from "axios";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
      let message = "Error logging in. Please try again.";

      if (err instanceof AxiosError && err.response) {
        message =
          err.response.data.error ?? "Error logging in. Please try again.";
      }

      toast.error(message);
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

          <Input id="email" label="Email" type="email" placeholder="Abc@def.com" error={errors.email?.message} {...register("email")} />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

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
