import * as React from "react";
import { Eye, EyeOff, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  fullWidth?: boolean;
  showPasswordToggle?: boolean; // override auto-detection if needed
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (props, ref) => {
    const {
      className,
      containerClassName,
      labelClassName,
      inputClassName,
      wrapperClassName,
      type = "text",
      label,
      error,
      helperText,
      startIcon,
      endIcon,
      fullWidth,
      disabled,
      id,
      required,
      showPasswordToggle,
      onChange,
      onBlur,
      onFocus,
      ...rest
    } = props;

    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const isPasswordField = type === "password";
    const shouldShowToggle = showPasswordToggle ?? isPasswordField;

    // resolves actual input type based on visibility state
    const resolvedType = isPasswordField
      ? isPasswordVisible
        ? "text"
        : "password"
      : type;

    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const togglePasswordVisibility = () => {
      setIsPasswordVisible((prev) => !prev);
    };

    return (
      <div
        className={cn(
          "flex flex-col gap-1.5",
          fullWidth && "w-full",
          containerClassName,
        )}
      >
        {label && (
          <Label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium",
              disabled && "opacity-60",
              error && "text-destructive",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </Label>
        )}

        <div
          className={cn(
            "relative flex items-center",
            fullWidth && "w-full",
            wrapperClassName,
          )}
        >
          {startIcon && (
            <span className="absolute left-3 flex items-center text-muted-foreground pointer-events-none">
              {startIcon}
            </span>
          )}

          <Input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            required={required}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              startIcon && "pl-9",
              (endIcon || shouldShowToggle) && "pr-9",
              error && "border-destructive focus-visible:ring-destructive/40",
              fullWidth && "w-full",
              inputClassName,
              className,
            )}
            {...rest}
          />

          {/* password toggle takes priority over a custom endIcon */}
          {shouldShowToggle ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={togglePasswordVisibility}
              disabled={disabled}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              aria-pressed={isPasswordVisible}
              className={cn(
                "absolute right-3 flex items-center text-muted-foreground",
                "hover:text-foreground transition-colors",
                "disabled:pointer-events-none disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
              )}
            >
              {isPasswordVisible ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          ) : (
            endIcon && (
              <span className="absolute right-3 flex items-center text-muted-foreground pointer-events-none">
                {endIcon}
              </span>
            )
          )}
        </div>

        {error ? (
          <p id={errorId} className="text-xs text-destructive">
            {error}
          </p>
        ) : (
          helperText && (
            <p id={helperId} className="text-xs text-muted-foreground">
              {helperText}
            </p>
          )
        )}
      </div>
    );
  },
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
