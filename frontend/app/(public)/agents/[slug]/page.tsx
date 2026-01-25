import { AgentDetailPage } from "@/modules/agents/AgentDetailPage";

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  return <AgentDetailPage slug={params.slug} />;
};

export default Page;
