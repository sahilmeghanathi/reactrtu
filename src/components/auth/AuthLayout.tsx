 import * as React from "react";
 import { Sparkles } from "lucide-react";

 import { cn } from "@/lib/utils";
 import { AuthLayoutProps } from "@/types/auth.types";
import { Link } from "react-router-dom";

 const FEATURES = [
   { label: "Enterprise-grade security", value: "256-bit" },
   { label: "Active teams onboard", value: "12k+" },
   { label: "Average uptime", value: "99.9%" },
 ] as const;

 const AuthLayout = ({
   children,
   title,
   subtitle,
   imageSrc = "/auth/auth-hero.jpg",
   imageAlt = "Product showcase",
 }: AuthLayoutProps) => {
   return (
     <div className="min-h-screen w-full grid lg:grid-cols-2 bg-background">
       {/* Left: form panel */}
       <div className="flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-24">
         <Link to="/" className="flex items-center gap-2 w-fit">
           <div className="h-8 w-8 rounded-lg bg-teal-600 flex items-center justify-center">
             <Sparkles className="h-4 w-4 text-white" />
           </div>
           <span className="font-semibold text-lg tracking-tight">YourApp</span>
         </Link>

         <div className="w-full max-w-sm mx-auto py-12">
           <div className="mb-8 space-y-2">
             <h1 className="text-2xl font-semibold tracking-tight text-foreground">
               {title}
             </h1>
             <p className="text-sm text-muted-foreground">{subtitle}</p>
           </div>

           {children}
         </div>

         <p className="text-xs text-muted-foreground text-center lg:text-left">
           © {new Date().getFullYear()} YourApp, Inc. All rights reserved.
         </p>
       </div>

       {/* Right: image panel */}
       <div className="hidden lg:block relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-teal-900">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_50%)]" />

         <img
           src={imageSrc}
           alt={imageAlt}
           className="object-cover mix-blend-overlay opacity-40"
           sizes="50vw"
         />

         <div className="relative h-full flex flex-col justify-end p-12 xl:p-16">
           <blockquote className="space-y-4">
             <p className="text-2xl xl:text-3xl font-medium text-white leading-snug">
               "The fastest way our team has shipped features — from idea to
               production in days, not weeks."
             </p>
             <footer className="text-sm text-teal-100">
               Design Lead, Acme Corp
             </footer>
           </blockquote>

           <div className="mt-10 grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
             {FEATURES.map((f) => (
               <div key={f.label} className="space-y-1">
                 <p className="text-xl font-semibold text-white">{f.value}</p>
                 <p className="text-xs text-teal-100/80 leading-tight">
                   {f.label}
                 </p>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default AuthLayout;