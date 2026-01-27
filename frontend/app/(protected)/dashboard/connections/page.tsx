"use client";

import { ConnectionsPage } from "@/modules/connections";
import { PageContainer } from "@/shared/components";

const Page = () => {
  return (
    <PageContainer title="Connections" description="Connect and manage your social media channels">
      <ConnectionsPage />
    </PageContainer>
  );
};

export default Page;
