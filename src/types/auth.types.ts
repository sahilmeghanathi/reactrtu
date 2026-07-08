import { LoginFormValues, SignupFormValues } from "@/validations/auth.schema";


export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageSrc?: string;
  imageAlt?: string;
}


export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void | Promise<void>;

  isLoading?: boolean;

  errorMessage?: string;
}

export interface SignupFormProps {
  onSubmit: (values: SignupFormValues) => Promise<void> | void;
  isLoading?: boolean;
  errorMessage?: string | null;
}
