"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  type: "login" | "signup";
};

export default function AuthForm({ type }: Props) {
 const router = useRouter();

   const handleClick = () => {
    router.push('/info'); // redirect to info page
  };

  return (
    <div className="h-full space-y-6  flex flex-col justify-around">
      {/* HEADER */}
      <div className="flex flex-col gap-20">
        <div className="flex flex-col gap-1">
            <h1 className="text-4xl text-black font-semibold">{
                type === "login"
              ? "Login to your account"
              : "Create an account"
                }</h1>
            <h3 className="text-lg text-gray-300 font-medium">
                {
                    type === "login"
              ? "Welcome back! Enter details to start using app!"
              : "Let’s get started with your 30 day trial"
                }
            </h3>
        </div>
       

       
          {/* SOCIAL */}
        <div className="space-y-3">
          <button className="auth-btn" onClick={handleClick}>
            <Image
              src="/images/icons/google.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            Continue with Google
          </button>
          <button className="auth-btn" onClick={handleClick}>
            <Image
              src="/images/icons/outlook.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            Continue with Outlook
          </button>

          <button  className="auth-btn" onClick={handleClick}>
            <Image
              src="/images/icons/email.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            Continue with Email
          </button>

          <button className="auth-btn" onClick={handleClick}>
            <Image
              src="/images/icons/microsoft.svg"
              alt="google icon"
              width={20}
              height={20}
            />
            Continue with Microsoft 365
          </button>

         
        </div>
      </div>
      
       {/* Switch */}
          <p className="text-sm text-center text-gray-400">
            {type === "login" ? (
              <>
                Don’t have an account?{" "}
                <Link href="/signup" className="text-primary font-normal text-sm">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-normal text-sm">
                  Log in
                </Link>
              </>
            )}
          </p>

    

    
    </div>
  );
}
