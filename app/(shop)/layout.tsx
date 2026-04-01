// app/(shop)/layout.tsx
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Sidebar from "@/components/common/sidebar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1 container mx-auto px-4 py-8 gap-8">
        <aside className="hidden md:block w-64 shrink-0">
          <Sidebar/>
        </aside>
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}