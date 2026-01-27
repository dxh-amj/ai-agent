"use client";

import dynamic from "next/dynamic";
import { use } from "react";

const AgentDetailPage = dynamic(
  () => import("@/modules/agents").then((mod) => mod.AgentDetailPage),
  {
    loading: () => <div className="animate-pulse bg-slate-100 dark:bg-slate-800 h-96 rounded-xl" />,
  }
);

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Page = ({ params }: PageProps) => {
  const { slug } = use(params);
  return <AgentDetailPage slug={slug} />;
};

export default Page;
