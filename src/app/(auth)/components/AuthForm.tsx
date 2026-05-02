"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  type: "login" | "signup";
};

type ViewMode = "options" | "email";

export default function AuthForm({ type }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<ViewMode>("options");
  const [show, setShow] = useState(false);

  const handleContinue = () => {
    router.push("/info");
  };

  return (
    <div className="flex flex-col w-full h-full justify-center py-6 lg:py-0">
      {/* HEADER */}
      <div className="flex flex-col gap-10 md:gap-12">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold text-slate-900 tracking-tight">
            {type === "login" ? "Login to your account" : "Create an account"}
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            {type === "login"
              ? "Welcome back! Enter details to start using app!"
              : "Let’s get started with your 30 day trial"}
          </p>
        </div>

        {/* CONDITIONAL UI */}
        {mode === "options" ? (
          <div className="grid gap-3.5">
            <button className="auth-btn" onClick={handleContinue}>
              <Image
                src="/images/icons/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>Continue with Google</span>
            </button>

            <button className="auth-btn" onClick={handleContinue}>
              <Image
                src="/images/icons/outlook.svg"
                alt="Outlook"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>Continue with Outlook</span>
            </button>

            {/* EMAIL BUTTON → SWITCH MODE */}
            <button className="auth-btn" onClick={() => setMode("email")}>
              <Image
                src="/images/icons/email.svg"
                alt="Email"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>Continue with Email</span>
            </button>

            <button className="auth-btn" onClick={handleContinue}>
              <Image
                src="/images/icons/microsoft.svg"
                alt="Microsoft"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>Continue with Microsoft 365</span>
            </button>
          </div>
        ) : (
          /* EMAIL FORM UI */
          <div className="space-y-5">
            {/* Email Input */}
            <div className="group flex items-center border border-slate-200 rounded-2xl px-5 py-4 bg-white focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
              <Mail size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                placeholder="Enter your Email"
                className="ml-4 flex-1 outline-none font-medium text-slate-700 placeholder:text-slate-400 bg-transparent"
              />
            </div>

            {/* Password Input */}
            <div className="group flex items-center border border-slate-200 rounded-2xl px-5 py-4 bg-white focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/5 transition-all">
              <Lock size={18} className="text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                className="ml-4 flex-1 outline-none font-medium text-slate-700 placeholder:text-slate-400 bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="ml-2 text-slate-400 hover:text-slate-600 transition outline-none"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot Password (login only) */}
            {type === "login" && (
              <div className="flex justify-end">
                <button className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                  Forgot Password?
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 md:mt-12">
        {/* CTA Button */}
        {mode === "email" && (
          <button
            onClick={handleContinue}
            className="w-full py-4 rounded-2xl text-white font-bold text-lg mb-6 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] transition-all"
            style={{
              background:
                "linear-gradient(135deg, #5ba3c9 0%, #4A90B8 60%, #3a7a9e 100%)",
            }}
          >
            {type === "login" ? "Login" : "Create an Account"}
          </button>
        )}

        {/* SWITCH AUTH */}
        <p className="text-sm text-center text-slate-500 font-medium">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">
                Log in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
