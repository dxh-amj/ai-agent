"use client";

import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

import { PageContainer } from "@/shared/components";

const DashboardAgentsPage = dynamic(
  () => import("@/modules/dashboard").then((mod) => mod.DashboardAgentsPage),
  {
    loading: () => <div className="animate-pulse bg-slate-100 dark:bg-slate-800 h-96 rounded-xl" />,
  }
);

const Page = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title={t("navigation.agents")}
      description="Find and deploy the perfect AI agent for your needs"
    >
      <DashboardAgentsPage />
    </PageContainer>
  );
};

export default Page;
