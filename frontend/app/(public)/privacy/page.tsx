import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { DecorativeStripes, DecorativeStripesRight } from "@/shared/ui/decorative-stripes";

const PrivacyPage = () => {
  return (
    <section className="w-full bg-white">
      <div className="flex">
        <DecorativeStripes />

        <div className="flex-1 border-x border-slate-200 py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mx-auto">
              <h1 className="text-5xl font-extrabold mb-4 ai-robotic-gradient">Privacy Policy</h1>
              <p className="text-slate-500 mb-12 font-medium">Last updated: January 26, 2026</p>

              <div className="prose prose-slate lg:prose-lg max-w-none space-y-12 text-slate-700">
          <section className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <span className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm">
                01
              </span>
              Introduction
            </h2>
            <p className="leading-relaxed">
              At <strong>AgentKit</strong>, we are committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, and safeguard your information when you
              use our AI agent orchestration platform. Our mission is to provide powerful automation
              while maintaining the highest standards of data integrity.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 underline decoration-primary/30 underline-offset-8">
              Data We Collect
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Personal Information</h3>
                <p className="text-sm">
                  Name, email address, billing information, and account preferences used to manage
                  your subscription and identify you on the platform.
                </p>
              </div>
              <div className="p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Orchestration Data</h3>
                <p className="text-sm border-l-4 border-primary pl-4">
                  Input prompts, agent configurations, and workflow definitions. This data is
                  essential for our &quot;multi-agent&quot; collaboration engine to function correctly.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 underline decoration-primary/30 underline-offset-8">
              AI Data Handling & Processing
            </h2>
            <p className="mb-6">
              To provide our AI capabilities, we partner with leading model providers (e.g., OpenAI,
              Anthropic, Google).
            </p>
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="font-bold text-primary">A.</div>
                <p className="text-sm">
                  <strong>Non-Training Clause:</strong> By default, we request our sub-processors
                  NOT to use your data to train their foundation models.
                </p>
              </li>
              <li className="flex gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                <div className="font-bold text-primary">B.</div>
                <p className="text-sm">
                  <strong>Encryption:</strong> All data transmitted to AI models is encrypted using
                  TLS 1.3. Data at rest is encrypted with AES-256.
                </p>
              </li>
            </ul>
          </section>

          <section className="border-t border-slate-100 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p>
              You have the right to access, export, or delete your data at any time. If you wish to
              opt-out of certain data processing activities, you can do so in your account settings
              or by contacting our privacy officer.
            </p>
            <div className="mt-8 p-6 glass rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">Privacy Officer</p>
                <p className="text-sm text-slate-500">privacy@agentkit.ai</p>
              </div>
              <Button size="lg" asChild className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                <Link href="/contact">Contact Office</Link>
              </Button>
            </div>
          </section>
            </div>
          </div>
          </div>
        </div>

        <DecorativeStripesRight />
      </div>
    </section>
  );
};

export default PrivacyPage;
