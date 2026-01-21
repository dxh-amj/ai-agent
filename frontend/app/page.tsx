import {
  AgentCollaboration,
  AgentShowcase,
  BentoGridSection,
  FAQSection,
  Header,
  HeroSection,
  ImpactSection,
  InteractiveFeatures,
  TestimonialsSection,
} from "@/modules/landing";
import { Footer } from "@/shared/components/layout/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <main>
        <HeroSection />

        <ImpactSection />
        <BentoGridSection />
        <InteractiveFeatures />
        <AgentShowcase />
        <AgentCollaboration />
        <TestimonialsSection />

        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
