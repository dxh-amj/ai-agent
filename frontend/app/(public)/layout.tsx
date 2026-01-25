import { Header } from "@/modules/landing/Header";
import { Footer } from "@/shared/components/layout/Footer";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
