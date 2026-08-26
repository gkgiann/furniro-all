import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { register as registerUser } from "@/services/auth.service";
import PageBanner from "@/components/Shop/PageBanner";
import { Input } from "@/components/ui/Input";
import { registerSchema, type RegisterFormData } from "@/schemas/auth.schema";

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

          <Input id="name" label="Name" placeholder="Abc" error={errors.name?.message} {...register("name")} />
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="Abc@def.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <Input
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

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
