import { FAQSection as CommonFAQSection, type FAQItem } from "@/shared/components";

const faqs: FAQItem[] = [
  {
    question: "Can I upgrade or downgrade my plan at any time?",
    answer: "Yes, absolutely. Changes take effect at the end of your current billing cycle.",
  },
  {
    question: "Is my data used to train your public models?",
    answer:
      "No. We have a strict zero-retention policy. Your data is never used to train our base models.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer: "Yes! Contact our sales team with proof of non-profit status to receive 20% off.",
  },
];

export const FAQSection = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <CommonFAQSection title="Frequently Asked Questions" faqs={faqs} variant="compact" />
    </div>
  );
};
