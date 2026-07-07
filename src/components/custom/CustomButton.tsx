import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import { VariantProps } from "class-variance-authority";

export interface CustomButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
  label: string;
}

const CustomButton = (props: CustomButtonProps) => {
  const {
    className,
    loading,
    loadingText,
    startIcon,
    endIcon,
    fullWidth,
    disabled,
    variant,
    size,
    asChild,
    label,
  } = props;

  const isDisabled = disabled || loading;

  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      disabled={isDisabled}
      className={cn(
        fullWidth && "w-full",
        "inline-flex items-center justify-center gap-2",
        className,
      )}
      {...props}
    >
      <>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingText}
          </>
        ) : (
          <>
            {startIcon && (
              <span className="flex items-center">{startIcon}</span>
            )}

            {label}

            {endIcon && <span className="flex items-center">{endIcon}</span>}
          </>
        )}
      </>
    </Button>
  );
};

export default CustomButton;
