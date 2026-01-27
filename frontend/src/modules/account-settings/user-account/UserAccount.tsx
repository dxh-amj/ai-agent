"use client";

import { Lock, User } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ChangePassword } from "../change-password/ChangePassword";
import { UserDetails } from "../user-details/UserDetails";

const UserAccount = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" />
            {t("pages.account_settings.account")}
          </TabsTrigger>
          <TabsTrigger value="password" className="gap-2">
            <Lock className="h-4 w-4" />
            {t("pages.account_settings.change_password")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>{t("pages.account_settings.account")}</CardTitle>
              <CardDescription>
                {t(
                  "pages.account_settings.to_change_your_personal_details_edit_and_save_from_here"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserDetails />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>{t("pages.account_settings.change_password")}</CardTitle>
              <CardDescription>
                {t("pages.account_settings.to_change_your_password_please_confirm_here")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChangePassword />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { UserAccount };
