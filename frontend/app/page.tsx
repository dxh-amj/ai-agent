import { Footer } from "@/shared/components/layout/Footer";
import {
  AgentCollaboration,
  AgentShowcase,
  BentoGridSection,
  CTASection,
  FAQSection,
  Header,
  HeroSection,
  IntegrationBar,
  InteractiveFeatures,
  SocialProof,
  TargetUsers,
  TestimonialsSection,
} from "@/modules/landing";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header />
      <main>
        <HeroSection />
        <IntegrationBar />
        <SocialProof />
        <BentoGridSection />
        <InteractiveFeatures />
        <AgentShowcase />
        <AgentCollaboration />
        <TestimonialsSection />
        <TargetUsers />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
