import { Outlet, Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const FEATURES = [
  { label: "Enterprise-grade security", value: "256-bit" },
  { label: "Active teams onboard", value: "12k+" },
  { label: "Average uptime", value: "99.9%" },
] as const;

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left Panel */}
      <div className="flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">YourApp</span>
        </Link>

        <div className="mx-auto w-full max-w-sm py-12">
          <div className="mb-8 space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">         
              Sign in to continue to your account.
            </p>
          </div>

          <Outlet />
        </div>

        <p className="text-center text-xs text-muted-foreground lg:text-left">
          © {new Date().getFullYear()} YourApp, Inc. All rights reserved.
        </p>
      </div>

      {/* Right Panel */}
      <div className="relative hidden overflow-hidden bg-linear-to-br from-teal-700 via-teal-600 to-teal-900 lg:block">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

        {/* Background Image */}
        <img
          src="/auth/auth-hero.jpg"
          alt="Product showcase"
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-overlay"
        />

        <div className="relative flex h-full flex-col justify-end p-12 xl:p-16">
          <blockquote className="space-y-4">
            <p className="text-2xl font-medium leading-snug text-white xl:text-3xl">
              "The fastest way our team has shipped features — from idea to
              production in days, not weeks."
            </p>
            <footer className="text-sm text-teal-100">
              Design Lead, Acme Corp
            </footer>
          </blockquote>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
            {FEATURES.map((feature) => (
              <div key={feature.label}>
                <p className="text-xl font-semibold text-white">
                  {feature.value}
                </p>
                <p className="text-xs leading-tight text-teal-100/80">
                  {feature.label}
                </p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
