import { FAQSection as CommonFAQSection, type FAQItem } from "@/shared/components";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

const faqData: FAQItem[] = [
  {
    question: "What is AI Workforce Hub and who is it for?",
    answer:
      "AI Workforce Hub is a multi-agent AI platform that provides 5 specialized AI agents working together. It's designed for businesses of all sizes looking to automate sales, customer support, CRM, marketing, and analytics operations.",
  },
  {
    question: "How do the AI agents work together?",
    answer:
      "Our agents communicate seamlessly through an intelligent orchestration layer. When one agent completes a task, it automatically triggers relevant actions in other agents. For example, when the Sales Agent qualifies a lead, the CRM Agent updates records, and the Marketing Agent initiates personalized follow-ups.",
  },
  {
    question: "Can I integrate with my existing tools?",
    answer:
      "Yes! AI Workforce Hub integrates seamlessly with popular tools like Slack, Salesforce, HubSpot, Zendesk, Twilio, and many more. We also provide APIs and webhooks for custom integrations with your existing workflow.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer 24/7 customer support, dedicated account managers for enterprise clients, comprehensive documentation, and onboarding assistance to help you get started within minutes.",
  },
  {
    question: "Is my data secure with AI Workforce Hub?",
    answer:
      "Absolutely. We use enterprise-grade security with end-to-end encryption, SOC 2 compliance, and regular security audits. Your data is stored in secure, redundant data centers with strict access controls.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is simple! Sign up for our free trial—no credit card required. Connect your existing systems, and your AI workforce will be operational within 5 minutes.",
  },
];

export const FAQSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="flex">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200">
          <CommonFAQSection
            title="Frequently asked questions"
            subtitle="Everything you need to know about AI Workforce Hub. Can't find what you're looking for? Contact our support team."
            faqs={faqData}
            variant="default"
          />
        </div>

        <DecorativeStripesRight />
      </div>
    </section>
  );
};
