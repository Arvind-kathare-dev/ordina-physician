import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col print:h-auto print:block">

      {/* NAVBAR */}
      <header className="sticky left-0 top-0 z-50 print:hidden">
        <Header />
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full print:block">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-6 print:p-0 print:m-0 print:max-w-none">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto print:hidden">
        <Footer />
      </footer>

    </div>
  );
}