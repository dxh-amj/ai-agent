import { AgentDetailPage } from "@/modules/agents/AgentDetailPage";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AgentDetailPage slug={slug} />;
}
