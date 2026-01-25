"use client";

import { useTranslation } from "react-i18next";

import { useFormik } from "formik";

import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { useChangeUserPassword } from "./hooks";
import changePasswordSchema from "./schema";

import type { ChangePasswordDTO } from "../types";

const ChangePassword = () => {
  const { handleChangePassword, isPending } = useChangeUserPassword();
  const { t } = useTranslation();
  const schema = changePasswordSchema(t);

  const formik = useFormik<ChangePasswordDTO>({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: schema,

    onSubmit: (values, formik) => {
      handleChangePassword(values, formik);
    },
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <h5 className="mb-1 text-lg font-semibold">
          {t("pages.account_settings.change_password")}
        </h5>
        <p className="text-muted-foreground mb-6">
          {t("pages.account_settings.to_change_your_password_please_confirm_here")}
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-cpwd">{t("fields.current_password")}</Label>
              <Input
                id="text-cpwd"
                autoComplete="current-password"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                name="oldPassword"
                type="password"
                className={
                  formik.touched.oldPassword && Boolean(formik.errors.oldPassword)
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.oldPassword && formik.errors.oldPassword && (
                <p className="text-destructive text-sm">{formik.errors.oldPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-npwd">{t("fields.new_password")}</Label>
              <Input
                id="text-npwd"
                autoComplete="new-password"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                name="newPassword"
                type="password"
                className={
                  formik.touched.newPassword && Boolean(formik.errors.newPassword)
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.newPassword && formik.errors.newPassword && (
                <p className="text-destructive text-sm">{formik.errors.newPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-conpwd">{t("fields.confirm_password")}</Label>
              <Input
                id="text-conpwd"
                autoComplete="new-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                name="confirmPassword"
                type="password"
                className={
                  formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                    ? "border-destructive"
                    : ""
                }
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-destructive text-sm">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex justify-end pt-3">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : t("button.save")}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { ChangePassword };
