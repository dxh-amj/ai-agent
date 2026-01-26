"use client";

import { useTranslation } from "react-i18next";

import { EmailAgentPage } from "@/modules/email-agent";
import { PageContainer } from "@/shared/components";

const Page = () => {
  const { t } = useTranslation();

  return (
    <PageContainer
      title="Email Agent"
      description="Connect your account and let our AI agent handle your email communications."
    >
      <EmailAgentPage />
    </PageContainer>
  );
};

export default Page;
