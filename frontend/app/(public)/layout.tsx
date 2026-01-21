import { Header } from "@/modules/landing/Header";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="pt-16">{children}</main>
    </>
  );
};

export default PublicLayout;
