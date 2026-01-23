"use client";

import { useTranslation } from "react-i18next";

const DashboardPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
      </div>

      <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
        <h2 className="text-xl font-semibold">Dashboard Content</h2>
        <p className="mt-2 text-muted-foreground">
          This is your dashboard. More content will be added here soon.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
