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
    <div className="flex flex-col min-h-[80vh] md:min-h-[680px] justify-between py-6 md:py-0">
      {/* HEADER */}
      <div className="flex flex-col gap-8 md:gap-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-black">
            {type === "login" ? "Login to your account" : "Create an account"}
          </h1>
          <p className="text-gray-400 mt-2">
            {type === "login"
              ? "Welcome back! Enter details to start using app!"
              : "Let’s get started with your 30 day trial"}
          </p>
        </div>

        {/* CONDITIONAL UI */}
        {mode === "options" ? (
          <div className="space-y-3">
            <button className="auth-btn" onClick={handleContinue}>
              <Image
                src="/images/icons/google.svg"
                alt=""
                width={20}
                height={20}
              />
              Continue with Google
            </button>

            <button className="auth-btn" onClick={handleContinue}>
              <Image
                src="/images/icons/outlook.svg"
                alt=""
                width={20}
                height={20}
              />
              Continue with Outlook
            </button>

            {/* 🔥 EMAIL BUTTON → SWITCH MODE */}
            <button className="auth-btn" onClick={() => setMode("email")}>
              <Image
                src="/images/icons/email.svg"
                alt=""
                width={20}
                height={20}
              />
              Continue with Email
            </button>

            <button className="auth-btn" onClick={handleContinue}>
              <Image
                src="/images/icons/microsoft.svg"
                alt=""
                width={20}
                height={20}
              />
              Continue with Microsoft 365
            </button>
          </div>
        ) : (
          /* ✅ EMAIL FORM UI */
          <div className="space-y-4">
            {/* Email Input */}
            <div className="flex items-center border border-gray-200 rounded-full p-4 bg-white">
              {/* Left Icon */}
              <Mail size={18} className="text-gray-300" />

              {/* Input */}
              <input
                type="text"
                placeholder="Enter your Email"
                className="ml-3 flex-1 outline-none font-normal text-base bg-transparent text-gray-300 placeholder:text-gray-300"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center border border-gray-200 rounded-full p-4 bg-white">
              {/* Left Icon */}
              <Lock size={18} className="text-gray-300" />

              {/* Input */}
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                className="ml-3 flex-1 outline-none text-base font-normal bg-transparent text-gray-300 placeholder:text-gray-300"
              />

              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="ml-2 text-gray-300 hover:text-gray-400 transition outline-none"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Forgot Password (login only) */}
            {type === "login" && (
              <p className="text-right text-sm text-gray-400 cursor-pointer hover:text-gray-600">
                Forgot Password?
              </p>
            )}
          </div>
        )}
      </div>

      <div>
        {/* CTA Button */}
        {
          mode === "email" &&
           <button
          onClick={handleContinue}
          className="w-full py-3 rounded-full text-white font-medium mb-3"
          style={{
            background:
              "linear-gradient(135deg, #5ba3c9 0%, #4A90B8 60%, #3a7a9e 100%)",
          }}
        >
          {type === "login" ? "Login" : "Create an Account"}
        </button>
        }
       
        {/* SWITCH AUTH */}
        <p className="text-sm text-center text-gray-400">
          {type === "login" ? (
            <>
              Don’t have an account?{" "}
              <Link href="/signup" className="text-primary">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link href="/login" className="text-primary">
                Log in
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
