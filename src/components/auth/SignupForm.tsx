import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { User, Mail, AlertCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import { SignupFormProps } from "@/types/auth.types";
import { SignupFormValues, signupSchema } from "@/validations/auth.schema";
import CustomInput from "../custom/CustomInput";
import CustomButton from "../custom/CustomButton";

const SignupForm = ({ onSubmit, isLoading, errorMessage }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
    mode: "onBlur",
  });

  const agreeToTerms = watch("agreeToTerms");
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
        label="Full name"
        type="text"
        placeholder="Jane Doe"
        startIcon={<User className="h-4 w-4" />}
        error={errors.fullName?.message}
        fullWidth
        autoComplete="name"
        {...register("fullName")}
      />

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

      <CustomInput
        label="Password"
        type="password"
        placeholder="Create a strong password"
        error={errors.password?.message}
        helperText={
          !errors.password
            ? "8+ characters, upper & lowercase, number, symbol"
            : undefined
        }
        fullWidth
        autoComplete="new-password"
        {...register("password")}
      />

      <CustomInput
        label="Confirm password"
        type="password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        fullWidth
        autoComplete="new-password"
        {...register("confirmPassword")}
      />

      <div className="space-y-1">
        <div className="flex items-start gap-2">
          <input
            id="agreeToTerms"
            type="checkbox"
            checked={agreeToTerms}
            onChange={(event) =>
              setValue("agreeToTerms", event.target.checked, {
                shouldValidate: true,
              })
            }
            className="mt-1 h-4 w-4 rounded border-muted-foreground text-teal-600 focus:ring-teal-500"
          />
          <Label
            htmlFor="agreeToTerms"
            className="text-sm font-normal text-muted-foreground cursor-pointer leading-snug"
          >
            I agree to the{" "}
            <Link
              to="/terms"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              Privacy Policy
            </Link>
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-xs text-destructive pl-6">
            {errors.agreeToTerms.message}
          </p>
        )}
      </div>

      <CustomButton
        type="submit"
        label="Create account"
        loading={submitting}
        loadingText="Creating account..."
        fullWidth
        className="bg-teal-600 hover:bg-teal-700"
      />

      <p className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
