import {
  AgentCollaboration,
  AgentShowcase,
  BentoGridSection,
  FAQSection,
  Header,
  HeroSection,
  InteractiveFeatures,
  SocialProof,
  TargetUsers,
  TestimonialsSection,
} from "@/modules/landing";
import { Footer } from "@/shared/components/layout/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <main>
        <HeroSection />

        <SocialProof />
        <BentoGridSection />
        <InteractiveFeatures />
        <AgentShowcase />
        <AgentCollaboration />
        <TestimonialsSection />
        <TargetUsers />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
