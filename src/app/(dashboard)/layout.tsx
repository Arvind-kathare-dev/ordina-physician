import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col">

      {/* NAVBAR */}
      <header className="sticky left-0 top-0 z-50 ">
        <Navbar />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-6">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto">
        <Footer />
      </footer>

    </div>
  );
}