"use client";

import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white p-4 md:p-8">
      <div className="w-full max-w-[1440px] flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12 xl:gap-20">
        {/* LEFT SIDE - Illustration */}
        <div className="relative hidden lg:flex flex-[1.2] xl:flex-1 rounded-[32px] overflow-hidden min-h-[700px] max-h-[900px]">
          {/* Background Image Container */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 z-10 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/auth-image.png')",
              }}
            />
            <div className="absolute inset-0 bg-card-gradient" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 text-white flex flex-col justify-between w-full h-full">
            {/* Logo */}
            <div className="bg-white rounded-2xl flex items-center justify-center w-14 h-14 mt-8 ml-8 shadow-sm">
              <Image
                src="/images/logo/ordina-logo.svg"
                alt="logo"
                width={32}
                height={32}
              />
            </div>

            {/* Testimonial/Text Area */}
            <div className="bg-img-gradient p-8 xl:p-10">
              <p className="text-xl xl:text-2xl font-medium leading-snug mb-8">
                Lorem impsum is a simply dummy text Lorem impsum is a simply dummy
                text Lorem impsum is a simply dummy text Lorem impsum is a simply
                dummy text
              </p>
              <div className="flex items-center justify-between border-t border-white/20 pt-6">
                <div>
                  <p className="text-lg xl:text-xl font-semibold">Dr. James Miller</p>
                  <p className="text-sm xl:text-base text-white/80">General Physician</p>
                </div>
                <div className="flex gap-4">
                  <button className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    ←
                  </button>
                  <button className="w-10 h-10 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="flex-1 flex flex-col justify-center items-center py-4 lg:py-0">
          <div className="w-full max-w-[420px] lg:max-w-[450px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
