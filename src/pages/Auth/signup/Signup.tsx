import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "@/components/auth/SignupForm";
import { SignupFormValues } from "@/validations/auth.schema";
import { authService } from "@/services/auth.service";
import { useAuthContext } from "@/providers/AuthProvider";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (values: SignupFormValues) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await authService.signup({
        email: values.email,
        password: values.password,
        name: values.fullName,
      });

      login(response.token.accessToken, response.user);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <SignupForm
        onSubmit={handleSignup}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
    </div>
  );
}
