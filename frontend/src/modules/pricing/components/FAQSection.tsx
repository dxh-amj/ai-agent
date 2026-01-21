const faqs = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Yes, absolutely. Changes take effect at the end of your current billing cycle.",
  },
  {
    q: "Is my data used to train your public models?",
    a: "No. We have a strict zero-retention policy. Your data is never used to train our base models.",
  },
  {
    q: "Do you offer discounts for non-profits?",
    a: "Yes! Contact our sales team with proof of non-profit status to receive 20% off.",
  },
];

export const FAQSection = () => {
  return (
    <section className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 pb-24">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-10">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-xl bg-slate-50 border border-slate-100 p-6 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900">
              <h3 className="text-lg font-medium">{faq.q}</h3>
              <span className="material-symbols-outlined shrink-0 transition duration-300 group-open:-rotate-180 text-slate-500">
                expand_more
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-slate-600">{faq.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
};
