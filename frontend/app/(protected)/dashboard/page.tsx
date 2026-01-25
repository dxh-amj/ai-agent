"use client";

import { useTranslation } from "react-i18next";

import { PageContainer } from "@/shared/components";

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("dashboard.title")} description={t("dashboard.welcome")}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("dashboard.title")}
          </h1>
          <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-8 text-card-foreground shadow-sm">
          <h2 className="text-xl font-semibold text-foreground">{t("dashboard.content_title")}</h2>
          <p className="mt-2 text-muted-foreground">{t("dashboard.content_description")}</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
