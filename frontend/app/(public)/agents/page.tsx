"use client";

import { useTranslation } from "react-i18next";

import { AgentsPage } from "@/modules/agents/AgentsPage";
import { PageContainer } from "@/shared/components";

const Page = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={t("navigation.agents")}
      description="Find and deploy the perfect AI agent for your needs"
    >
      <AgentsPage />
    </PageContainer>
  );
};

export default Page;
