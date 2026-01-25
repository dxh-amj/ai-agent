"use client";

import dayjs from "dayjs";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import {
  CustomCountrySelect,
  CustomPhoneInput,
  CustomSelect,
  CustomTextField,
  CustomTimezoneSelect,
} from "@/shared/form-elements";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { SelectItem } from "@/shared/ui/select";

import { useProfile } from "./hooks";
import accountSchema from "./schema";

import type { DropdownOption } from "../types";

const UserDetails = () => {
  const {
    user,
    genderList,
    countryList,
    timezoneList,
    handleUpdateUser,
    profilePicture,
    setProfilePicture,
    isPending,
    isLoading,
  } = useProfile();
  const { t } = useTranslation();
  const schema = accountSchema(t);

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      profilePicture: user?.profile?.profilePictureUrl ?? "",
      gender: user?.profile?.gender?.id ?? "",
      birthDate: user?.profile?.dateOfBirth
        ? dayjs(user?.profile?.dateOfBirth).format("YYYY-MM-DD")
        : "",
      address: user?.profile?.address ?? "",
      country: user?.profile?.country?.id?.toString() ?? "",
      designation: user?.profile?.designation ?? "",
      timezone: user?.preferences?.timezone?.id?.toString() ?? "",
    },

    enableReinitialize: true,
    validationSchema: schema,

    onSubmit: (values) => {
      handleUpdateUser(values);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={formik.handleSubmit}>
        {/* Profile Picture Section */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h5 className="mb-1 text-lg font-semibold">
              {t("pages.account_settings.change_profile")}
            </h5>
            <p className="text-muted-foreground mb-6">
              {t("pages.account_settings.change_your_profile_picture_from_here")}
            </p>
            <div className="flex flex-col items-center justify-center text-center">
              <Avatar className="mb-4 h-28 w-28">
                <AvatarImage src={formik.values.profilePicture} alt="user" />
                <AvatarFallback className="text-4xl">
                  {user?.firstName ? user.firstName.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="my-3 flex justify-center gap-2">
                <Button variant="default" asChild>
                  <label className="cursor-pointer">
                    {t("button.upload")}
                    <input
                      hidden
                      accept="image/*"
                      name="profilePicture"
                      type="file"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (file) {
                          setProfilePicture(file);
                          const imageUrl = URL.createObjectURL(file);
                          formik.setFieldValue("profilePicture", imageUrl);
                        }
                      }}
                    />
                  </label>
                </Button>
                <Button
                  variant="outline"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                  disabled={!profilePicture}
                  onClick={() => {
                    setProfilePicture(null);
                    formik.resetForm();
                  }}
                  type="button"
                >
                  {t("button.reset")}
                </Button>
              </div>
              <p className="text-muted-foreground mb-4 text-sm">
                {t("validation.allowed_jpg_gif_or_png_max_size_of_800kb")}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details Section */}
        <Card>
          <CardContent className="pt-6">
            <h5 className="mb-1 text-lg font-semibold">
              {t("pages.account_settings.personal_details")}
            </h5>
            <p className="text-muted-foreground mb-6">
              {t("pages.account_settings.to_change_your_personal_details_edit_and_save_from_here")}
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* First Name */}
              <div>
                <Label htmlFor="firstName" className="mb-1.5 block">
                  {t("fields.first_name")}
                </Label>
                <CustomTextField
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={
                    formik.touched.firstName ? (formik.errors.firstName as string) : undefined
                  }
                />
              </div>

              {/* Last Name */}
              <div>
                <Label htmlFor="lastName" className="mb-1.5 block">
                  {t("fields.last_name")}
                </Label>
                <CustomTextField
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={
                    formik.touched.lastName ? (formik.errors.lastName as string) : undefined
                  }
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="mb-1.5 block">
                  Email
                </Label>
                <CustomTextField
                  id="email"
                  name="email"
                  value={formik.values.email}
                  readOnly
                  className="cursor-not-allowed bg-muted/50"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone" className="mb-1.5 block">
                  {t("fields.phone")}
                </Label>
                <CustomPhoneInput
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone ? (formik.errors.phone as string) : undefined}
                />
              </div>

              {/* Date of Birth */}
              <div>
                <Label htmlFor="birthDate" className="mb-1.5 block">
                  {t("fields.date_of_birth")}
                </Label>
                <CustomTextField
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  value={formik.values.birthDate ?? ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    formik.setFieldValue("birthDate", e.target.value);
                  }}
                  error={formik.touched.birthDate && Boolean(formik.errors.birthDate)}
                  helperText={
                    formik.touched.birthDate ? (formik.errors.birthDate as string) : undefined
                  }
                />
              </div>

              {/* Gender */}
              <div>
                <Label htmlFor="gender" className="mb-1.5 block">
                  {t("fields.gender")}
                </Label>
                <CustomSelect
                  id="gender"
                  value={formik.values.gender}
                  onValueChange={(value) => formik.setFieldValue("gender", value)}
                  placeholder={t("placeholders.select_gender")}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender ? (formik.errors.gender as string) : undefined}
                >
                  {genderList?.map((option: DropdownOption) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </CustomSelect>
              </div>

              {/* Designation */}
              <div>
                <Label htmlFor="designation" className="mb-1.5 block">
                  {t("fields.designation")}
                </Label>
                <CustomTextField
                  id="designation"
                  name="designation"
                  value={formik.values.designation}
                  onChange={formik.handleChange}
                  error={formik.touched.designation && Boolean(formik.errors.designation)}
                  helperText={
                    formik.touched.designation ? (formik.errors.designation as string) : undefined
                  }
                />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="address" className="mb-1.5 block">
                  {t("fields.address")}
                </Label>
                <CustomTextField
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={
                    formik.touched.address ? (formik.errors.address as string) : undefined
                  }
                />
              </div>

              {/* Country */}
              <div>
                <Label htmlFor="country" className="mb-1.5 block">
                  {t("fields.country")}
                </Label>
                <CustomCountrySelect
                  id="country"
                  value={formik.values.country}
                  onChange={(value) => formik.setFieldValue("country", value)}
                  options={countryList ?? []}
                  placeholder={t("placeholders.choose_a_country")}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                  helperText={
                    formik.touched.country ? (formik.errors.country as string) : undefined
                  }
                />
              </div>

              {/* Timezone */}
              <div>
                <Label htmlFor="timezone" className="mb-1.5 block">
                  {t("fields.timezone")}
                </Label>
                <CustomTimezoneSelect
                  id="timezone"
                  value={formik.values.timezone}
                  onChange={(value) => formik.setFieldValue("timezone", value)}
                  options={timezoneList ?? []}
                  placeholder={t("placeholders.choose_a_timezone")}
                  error={formik.touched.timezone && Boolean(formik.errors.timezone)}
                  helperText={
                    formik.touched.timezone ? (formik.errors.timezone as string) : undefined
                  }
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button type="submit" disabled={isPending || !formik.dirty}>
                {isPending ? "Saving..." : t("button.save")}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => formik.resetForm()}
                disabled={isPending || !formik.dirty}
              >
                {t("button.cancel")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export { UserDetails };
