"use client";

import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex p-6">
      {/* LEFT SIDE */}
      <div className="relative hidden lg:flex w-1/2  rounded-3xl overflow-hidden max-w-[755px]
      ">
        {/* Background Image */}
       <div className="absolute inset-0">

  {/* Background Image */}
  <div
    className="absolute inset-0 z-10 bg-cover bg-center"
    style={{
      backgroundImage: "url('/images/auth-image.png')",
    }}
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-card-gradient" />

</div>

        {/* Content */}
        <div className="relative z-10  text-white flex flex-col  justify-between w-full">
          {/* Logo */}
          <div className="text-lg font-semibold bg-white rounded-2xl flex items-center justify-center  w-[58px] h-[58px] mt-6 ml-6">
            <Image
              src="/images/logo/ordina-logo.svg"
              alt="logo"
              width={35}
              height={35}
            />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 w-full bg-img-gradient p-6">
            <p className="text-2xl font-medium leading-relaxed">
              Lorem impsum is a simply dummy text Lorem impsum is a simply dummy
              text Lorem impsum is a simply dummy text Lorem impsum is a simply
              dummy text
            </p>
            <div className=" flex gap-4 items-center justify-between">
              <div>
                <p className="text-xl font-medium">Dr. James Miller</p>
                <p className="text-base opacity-80">General Physician</p>
              </div>
              <div className="flex gap-3">
                <button className="w-10 h-10 border border-white/50 rounded-full flex items-center justify-center">
                  ←
                </button>
                <button className="w-10 h-10 border border-white/50 rounded-full flex items-center justify-center">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex  justify-center p-6">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
