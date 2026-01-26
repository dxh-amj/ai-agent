import { ContactForm } from "@/modules/contact";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

export default function ContactPage() {
  return (
    <section className="w-full bg-white">
      <div className="flex">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200 py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-primary" />
                </span>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Contact Support
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold mb-8 leading-tight">
                Get in touch with <br />
                <span className="ai-robotic-gradient">AgentKit Expert.</span>
              </h1>

              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                Have questions about orchestrating your AI agents? Our team of experts is here to
                help you scale your automation strategy and optimize your workflows.
              </p>

              <div className="space-y-8">
                <ContactInfoItem
                  icon="mail"
                  title="Email Us"
                  content="support@agentkit.ai"
                  description="Our support team usually responds within 24 hours."
                />
                <ContactInfoItem
                  icon="chat_bubble"
                  title="Live Chat"
                  content="Available in-app"
                  description="Available for Enterprise customers 24/7."
                />
              </div>
            </div>

            {/* Right Form Card */}
            <div className="glass-card p-10 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50">
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Send us a message</h2>
                <p className="text-slate-500">We'll get back to you as soon as possible.</p>
              </div>

              <ContactForm />
            </div>
          </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </section>
  );
}

const ContactInfoItem = ({
  icon,
  title,
  content,
  description,
}: {
  icon: string;
  title: string;
  content: string;
  description: string;
}) => (
  <div className="flex gap-6 items-start">
    <div className="size-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center shrink-0">
      <span className="material-symbols-outlined text-primary text-2xl">{icon}</span>
    </div>
    <div>
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-xl font-bold text-slate-900 mb-1">{content}</p>
      <p className="text-sm text-slate-500">{description}</p>
    </div>
  </div>
);
