"use client";

import { useTranslation } from "react-i18next";

import { Lock, Settings, User } from "lucide-react";

import { Card, CardContent } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

import { ChangePassword } from "../change-password/ChangePassword";
import { UserDetails } from "../user-details/UserDetails";

const UserAccount = () => {
  const { t } = useTranslation();

  return (
    <div className="grid gap-6">
      <Card>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="account"
              className="data-[state=active]:border-primary gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <User className="h-5 w-5" />
              {t("pages.account_settings.account")}
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:border-primary gap-2 rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Lock className="h-5 w-5" />
              {t("pages.account_settings.change_password")}
            </TabsTrigger>
          </TabsList>
          <CardContent className="p-6">
            <TabsContent value="account" className="mt-0">
              <UserDetails />
            </TabsContent>
            <TabsContent value="password" className="mt-0">
              <ChangePassword />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export { UserAccount };
