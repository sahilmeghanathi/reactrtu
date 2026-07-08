import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

import { Label } from "@/components/ui/label";

import { LoginFormProps } from "@/types/auth.types";
import CustomButton from "@/components/custom/CustomButton";
import CustomInput from "@/components/custom/CustomInput";
import { LoginFormValues, loginSchema } from "@/validations/auth.schema";

const LoginForm = ({
  onSubmit,
  isLoading = false,
  errorMessage,
}: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const rememberMe = watch("rememberMe");

  const submitting = isLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {errorMessage && (
        <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <CustomInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        startIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        fullWidth
        autoComplete="email"
        {...register("email")}
      />

      <div className="space-y-1.5">
        <CustomInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          fullWidth
          autoComplete="current-password"
          {...register("password")}
        />

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-teal-600 hover:text-teal-700"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={(event) =>
            setValue("rememberMe", event.target.checked, {
              shouldValidate: true,
            })
          }
          className="h-4 w-4 rounded border-muted-foreground text-teal-600 focus:ring-teal-500"
        />
        <Label
          htmlFor="rememberMe"
          className="cursor-pointer text-sm font-normal text-muted-foreground"
        >
          Remember me for 30 days
        </Label>
      </div>

      <CustomButton
        type="submit"
        label="Sign in"
        loading={submitting}
        loadingText="Signing in..."
        fullWidth
        className="bg-teal-600 hover:bg-teal-700"
      />

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-teal-600 hover:text-teal-700"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
