import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Mail, AlertCircle } from "lucide-react";

import { Label } from "@/components/ui/label";
import CustomButton from "@/components/custom/CustomButton";
import CustomInput from "@/components/custom/CustomInput";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

export type ForgotPasswordFormValues = z.input<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onSubmit: (values: ForgotPasswordFormValues) => Promise<void>;
  isLoading?: boolean;
  errorMessage?: string | null;
  successMessage?: string | null;
}

const ForgotPasswordForm = ({
  onSubmit,
  isLoading = false,
  errorMessage,
  successMessage,
}: ForgotPasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const submitting = isLoading || isSubmitting;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {errorMessage && (
        <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="rounded-md border border-teal-300 bg-teal-50 px-3 py-2.5 text-sm text-teal-900">
          {successMessage}
        </div>
      )}

      <div className="space-y-1.5">
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
      </div>

      <CustomButton
        type="submit"
        label="Send reset link"
        loading={submitting}
        loadingText="Sending..."
        fullWidth
        className="bg-teal-600 hover:bg-teal-700"
      />

      <p className="text-sm text-center text-muted-foreground">
        Remembered your password?{" "}
        <Link to="/login" className="text-teal-600 hover:text-teal-700 font-medium">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
