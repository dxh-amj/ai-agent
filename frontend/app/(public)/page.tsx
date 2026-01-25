import {
  AgentCollaboration,
  AgentShowcase,
  BentoGridSection,
  FAQSection,
  HeroSection,
  ImpactSection,
  InteractiveFeatures,
  SocialProof,
  TestimonialsSection,
} from "@/modules/landing";

export const metadata = {
  title: "AI Agent Platform - Automate Your Business with Intelligent Agents",
  description:
    "Deploy a workforce of specialized AI agents to handle your sales, support, and marketing. Scale your operations with intelligent automation.",
};

const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <SocialProof />
      <AgentShowcase />
      <InteractiveFeatures />
      <BentoGridSection />
      <AgentCollaboration />
      <ImpactSection />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default LandingPage;
