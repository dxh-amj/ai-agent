#!/bin/bash

# Colors for output
RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
CYAN='\033[36m'
RESET='\033[0m'

# Function to convert kebab-case to PascalCase
to_pascal_case() {
    echo "$1" | sed 's/-\([a-z]\)/\U\1/g' | sed 's/^\([a-z]\)/\U\1/'
}

# Function to convert kebab-case to camelCase
to_camel_case() {
    echo "$1" | sed 's/-\([a-z]\)/\U\1/g'
}

# Function to create details component
create_details_component() {
    local route_name="$1"
    local component_name="$2"
    local module_dir="$3"

    echo -e "${CYAN}Creating details component...${RESET}" >&2
    read -p "Enter details component name (e.g., product-details): " details_name

    local details_dir="$module_dir/$details_name"
    mkdir -p "$details_dir"

    local pascal_details_name=$(to_pascal_case "$details_name")

    # Create DetailsComponent.tsx
    cat > "$details_dir/$pascal_details_name.tsx" << EOF
"use client";

import { useTranslation } from "react-i18next";

import { Avatar, Box, CardContent, Grid2 as Grid, Typography } from "@mui/material";

import { BlankCard, CircularLoader } from "@/shared/components";

import { useGet${component_name}Details } from "./hooks";
import { InfoSection } from "./info-section";

const ${component_name}Details = ({ id }: { id: string }) => {
  const { details, isLoading } = useGet${component_name}Details(id);
  const { t } = useTranslation();

  if (isLoading) return <CircularLoader />;

  if (!details) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        {t("${route_name}_details.not_found")}
      </Box>
    );
  }

  const infoFields = [
    { label: "label.name", value: details?.data?.name || "-" },
    { label: "label.description", value: details?.data?.description || "-" },
  ];

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <BlankCard>
          <CardContent>
            <Box textAlign="center" display="flex" justifyContent="center" mb={3}>
              <Box>
                <Avatar
                  src={details?.data?.imageUrl}
                  alt={details?.data?.name || "${component_name}"}
                  sx={{ width: 120, height: 120, mx: "auto", mb: 2 }}
                >
                  <Typography variant="h2" fontSize={32}>
                    {details?.data?.name ? details.data.name.charAt(0).toUpperCase() : "${component_name:0:1}"}
                  </Typography>
                </Avatar>
                <Typography variant="h6" color="textSecondary">
                  {details?.data?.name}
                </Typography>
              </Box>
            </Box>

            <InfoSection
              title={t("${route_name}_details.basic_information")}
              fields={infoFields}
            />
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
  );
};

export { ${component_name}Details };
EOF

    # Create hooks.ts
    cat > "$details_dir/hooks.ts" << EOF

import { use${component_name}Details } from "@/services/$route_name/service";

const useGet${component_name}Details = (id: string) => {
  const { data: details, isLoading } = use${component_name}Details({ ${component_name,,}Id: id });

  return {
    details,
    isLoading,
  };
};

export { useGet${component_name}Details };
EOF

    # Create info-section.tsx
    cat > "$details_dir/info-section.tsx" << EOF
import { useTranslation } from "react-i18next";

import { Box, Divider, Grid2 as Grid, Typography } from "@mui/material";

export const InfoSection = ({
  title,
  fields,
}: {
  title: string;
  fields: Array<{ label: string; value: string }>;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Box mb={2}>
        <Typography variant="h6" fontWeight="medium">
          {title}
        </Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
      </Box>
      <Grid container spacing={2}>
        {fields.map((field, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6 }}>
            <Box mb={1} display="flex" alignItems="center">
              <Typography variant="subtitle2" sx={{ minWidth: "180px", fontWeight: "bold" }}>
                {t(field.label)}
              </Typography>
              <Typography variant="body1">{field.value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
EOF

    echo "$details_name"
}

# Function to create list component
create_list_component() {
    local route_name="$1"
    local component_name="$2"
    local module_dir="$3"
    local update_name="$4"
    local pascal_update_name="$5"

    echo -e "${CYAN}Creating list component...${RESET}" >&2
    read -p "Enter list component name (e.g., product-list): " list_name

    local list_dir="$module_dir/$list_name"
    mkdir -p "$list_dir"

    local pascal_list_name=$(to_pascal_case "$list_name")
    local camel_case_route_name=$(echo "$route_name" | sed 's/-\([a-z]\)/\U\1/g')

    # Create ListComponent.tsx
    cat > "$list_dir/$pascal_list_name.tsx" << EOF
"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/navigation";

import { Avatar, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { IconEye } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";

import { ColumnFilter } from "@/shared/components";
import DataTable from "@/shared/ui/table/DataTable";

import { Update${component_name}Dialog } from "../$update_name/$pascal_update_name";

import { use${component_name}Data } from "./hook";

import type { ${component_name} } from "../types";

const ${component_name}List = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    ${camel_case_route_name}s,
    isLoading,
    refetch,
    setColumnFilters,
    pagination,
    setPagination,
    sorting,
    setSorting,
  } = use${component_name}Data();

  const columnHelper = useMemo(() => createColumnHelper<${component_name}>(), []);

  const columnConfig = useMemo(
    () => [
      {
        id: "name",
        accessorKey: "name",
        label: "column.name",
        renderCell: (info: any) => (
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={info.row.original.imageUrl}
              alt={info.getValue()}
              sx={{ width: 40, height: 40 }}
            >
              <Typography variant="h6" fontSize={16}>
                {info.getValue() ? info.getValue().charAt(0).toUpperCase() : "${component_name:0:1}"}
              </Typography>
            </Avatar>
            <Typography variant="subtitle1" fontWeight={600}>
              {info.getValue()}
            </Typography>
          </Stack>
        ),
      },
      {
        id: "description",
        accessorKey: "description",
        label: "column.description",
      },
    ],
    []
  );

  const columns = useMemo(() => {
    const baseColumns = columnConfig.map((col) =>
      columnHelper.accessor(col.accessorKey as any, {
        id: col.id,
        header: () => t(col.label),
        enableSorting: false,
        enableColumnFilter: false,
        cell: (info) =>
          col.renderCell ? (
            col.renderCell(info)
          ) : (
            <Typography color="textSecondary">{info.getValue()}</Typography>
          ),
      })
    );

    const actionsColumn = columnHelper.display({
      id: "actions",
      header: () => t("column.actions"),
      cell: (info) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title={t("tooltip.view_details")} placement="bottom">
            <IconButton
              size="small"
              color="primary"
              onClick={() => router.push(\`/$route_name/\${info.row.original.id}\`)}
            >
              <IconEye width={18} />
            </IconButton>
          </Tooltip>
          <Update${component_name}Dialog key={info.row.original.id} ${component_name,,}={info.row.original} />
        </Stack>
      ),
    });

    return [...baseColumns, actionsColumn];
  }, [columnHelper, columnConfig, t, router]);

  const configurableColumns = columnConfig.map((c) => c.id);

  return (
    <DataTable
      title={t("${route_name}_management.list")}
      data={${camel_case_route_name}s?.data ?? []}
      isLoading={isLoading}
      columns={columns}
      filterComponent={ColumnFilter}
      setColumnFilters={setColumnFilters}
      enableRowSelection={false}
      configurableColumns={configurableColumns}
      refetch={refetch}
      pagination={pagination}
      setPagination={setPagination}
      sorting={sorting}
      setSorting={setSorting}
      enableServerSideSorting
      pageCount={${camel_case_route_name}s?.pagination?.totalPages ?? 0}
    />
  );
};

export { ${component_name}List };
EOF

    # Create hook.ts
    cat > "$list_dir/hook.ts" << EOF
import { useState } from "react";

import { INITIAL_PAGINATION } from "@/utils";

import type { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { use${component_name}List } from "@/services/$route_name/service";

export const use${component_name}Data = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>(INITIAL_PAGINATION);
  const [sorting, setSorting] = useState<SortingState>([]);

  const {
    data: ${camel_case_route_name}s,
    isLoading,
    refetch,
  } = use${component_name}List({
    pagination,
    filters: columnFilters,
    sorting,
  });

  return {
    ${camel_case_route_name}s,
    isLoading,
    refetch,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
    sorting,
    setSorting,
  };
};
EOF

    # Create utils.ts
    cat > "$list_dir/utils.ts" << EOF
const transformFilterKey = (key: string): string => {
  switch (key.toLowerCase()) {
    case "description":
      return "description";
    default:
      return key;
  }
};

export { transformFilterKey };
EOF

    echo "$list_name"
}

# Function to create create component
create_create_component() {
    local route_name="$1"
    local component_name="$2"
    local module_dir="$3"

    echo -e "${CYAN}Creating create component...${RESET}" >&2
    read -p "Enter create component name (e.g., create-product): " create_name

    local create_dir="$module_dir/$create_name"
    mkdir -p "$create_dir"

    local pascal_create_name=$(to_pascal_case "$create_name")

    # Create CreateComponent.tsx
    cat > "$create_dir/$pascal_create_name.tsx" << EOF
"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { CustomFormLabel, CustomTextField } from "@devxhub/form-elements";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
} from "@mui/material";
import { IconX } from "@tabler/icons-react";
import { useFormik } from "formik";

import { Can } from "@/providers/Can";
import { ConfirmationDialog } from "@/shared/components";
import { useConfirmation, useDialogController } from "@/shared/hooks";

import { use${component_name}Creation } from "./hooks";
import { create${component_name}Schema } from "./schema";

const Create${component_name}Dialog = () => {
  const { t } = useTranslation();
  const userSchema = create${component_name}Schema(t);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { open, handleOpen, handleClose } = useDialogController();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },

    validationSchema: userSchema,

    onSubmit: (values) => {
      handleCreate${component_name}(values, formik);
    },
  });

  const { isPending, handleCreate${component_name} } = use${component_name}Creation(
    handleClose,
    formik
  );

  const {
    showConfirmation,
    handleClose: handleDirtyClose,
    handleConfirmClose,
    handleCancelClose,
  } = useConfirmation({
    formik,
    onConfirmClose: handleClose,
    onCancelClose: handleClose,
  });

  return (
    <>
      <Can I="add" a="$route_name" passThrough>
        {(allowed) => (
          <Button variant="contained" color="primary" disabled={!allowed} onClick={handleOpen}>
            {t("button.create")} {t("column.$route_name")}
          </Button>
        )}
      </Can>

      <Dialog open={open} onClose={handleDirtyClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {t("button.create")} {t("column.$route_name")}
            <IconButton aria-label={t("common.close")} onClick={handleDirtyClose}>
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("user_management.to_create_a_new_$route_name_please_complete_the_form_provided_below")}
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Box sx={{ width: "100%" }}>
                <CustomFormLabel htmlFor="name">{t("label.name")}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <CustomFormLabel htmlFor="description">{t("label.description")}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Box>
              <Box sx={{ display: "none" }}>
                <Button ref={submitRef} type="submit">
                  {t("button.create")}
                </Button>
              </Box>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDirtyClose}>
            {t("button.cancel")}
          </Button>
          <Button
            onClick={() => submitRef.current?.click()}
            loading={isPending}
            disabled={isPending}
          >
            {t("common.create")}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />
    </>
  );
};

export { Create${component_name}Dialog };
EOF

    # Create hooks.ts
    cat > "$create_dir/hooks.ts" << EOF
import toast from "react-hot-toast";

import { queryClient } from "@/utils";

import { useCreate${component_name} } from "@/services/$route_name/service";
import type { FormikHelpers } from "formik";
import type { Create${component_name}DTO } from "../types";

const use${component_name}Creation = (
  handleClose: () => void,
  _formik: FormikHelpers<Create${component_name}DTO>
) => {
  const { mutate, isPending } = useCreate${component_name}();

  const handleCreate${component_name} = (
    values: Create${component_name}DTO,
    formik: FormikHelpers<Create${component_name}DTO>
  ) => {
    mutate(values, {
      onSuccess: () => {
        handleClose();
        toast.success("${component_name} has been successfully created");
        queryClient.invalidateQueries({ queryKey: ["$route_name-list"] });
        formik.resetForm();
      },
    });
  };

  return {
    isPending,
    handleCreate${component_name},
  };
};

export { use${component_name}Creation };
EOF

    # Create schema.ts
    cat > "$create_dir/schema.ts" << EOF
import * as yup from "yup";

import type { TFunction } from "i18next";

export const create${component_name}Schema = (t: TFunction) => {
  return yup.object({
    name: yup.string().required(t("validation.name_is_required")),
    description: yup.string(),
  });
};
EOF
}

# Function to create delete component
create_delete_component() {
    local route_name="$1"
    local component_name="$2"
    local module_dir="$3"

    echo -e "${CYAN}Creating delete component...${RESET}" >&2
    read -p "Enter delete component name (e.g., delete-product): " delete_name

    local delete_dir="$module_dir/$delete_name"
    mkdir -p "$delete_dir"

    local pascal_delete_name=$(to_pascal_case "$delete_name")

    # Create DeleteComponent.tsx
    cat > "$delete_dir/$pascal_delete_name.tsx" << EOF
"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { IconTrash, IconX } from "@tabler/icons-react";

import { Can } from "@/providers/Can";
import { useDialogController } from "@/shared/hooks";

import { use${component_name}Deletion } from "./hooks";

import type { Delete${component_name}Props } from "../types";
import type { FC } from "react";

const Delete${component_name}Dialog: FC<Delete${component_name}Props> = ({ ${component_name,,}Id }) => {
  const { open, handleOpen, handleClose } = useDialogController();
  const { handleDelete${component_name}, isLoading } = use${component_name}Deletion(handleClose);
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDialogClose = () => {
    handleClose();
    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  };

  return (
    <>
      <Can I="delete" a="$route_name" passThrough>
        {(allowed) => (
          <Tooltip title={t("tooltip.delete_$route_name")} placement="bottom">
            <span>
              <IconButton
                ref={buttonRef}
                size="small"
                color="error"
                disabled={!allowed}
                onClick={handleOpen}
              >
                <IconTrash width={18} />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Can>

      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        keepMounted={false}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {t("user_management.confirm_${component_name}_deletion")}
            <IconButton aria-label={t("common.close")} onClick={handleClose}>
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("user_management.are_you_sure_you_want_to_delete_${component_name}_this_action_is_permanent")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDialogClose}>
            {t("actions.disagree")}
          </Button>
          <Button
            loading={isLoading}
            disabled={isLoading}
            onClick={() => handleDelete${component_name}(${component_name,,}Id)}
          >
            {t("actions.agree")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export { Delete${component_name}Dialog };
EOF

    # Create hooks.ts
    cat > "$delete_dir/hooks.ts" << EOF
import toast from "react-hot-toast";

import { queryClient } from "@/utils";
import { useDelete${component_name} } from "@/services/$route_name/service";

const use${component_name}Deletion = (handleClose: () => void) => {
  const { mutate, isPending } = useDelete${component_name}();

  const handleDelete${component_name} = (id: number) => {
    const values = { id };
    mutate(values, {
      onSuccess: () => {
        toast.success("${component_name} has been successfully deleted");
        queryClient.invalidateQueries({ queryKey: ["$route_name-list"] });
        handleClose();
      },
    });
  };

  return {
    handleDelete${component_name},
    isLoading: isPending,
  };
};

export { use${component_name}Deletion };
EOF
}

# Function to create update component
create_update_component() {
    local route_name="$1"
    local component_name="$2"
    local module_dir="$3"
    local update_name="$4"
    local pascal_update_name="$5"

    local update_dir="$module_dir/$update_name"

    # Create UpdateComponent.tsx
    cat > "$update_dir/$pascal_update_name.tsx" << EOF
"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";

import { CustomFormLabel, CustomTextField } from "@devxhub/form-elements";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { IconEdit, IconX } from "@tabler/icons-react";
import { useFormik } from "formik";

import { Can } from "@/providers/Can";
import { ConfirmationDialog } from "@/shared/components";
import { useConfirmation, useDialogController } from "@/shared/hooks";

import { use${component_name}Update } from "./hooks";
import { update${component_name}Schema } from "./schema";

import type { Update${component_name}DialogProps } from "../types";
import type { FC } from "react";

const Update${component_name}Dialog: FC<Update${component_name}DialogProps> = ({ ${component_name,,} }) => {
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { open, handleOpen, handleClose } = useDialogController();
  const { t } = useTranslation();
  const ${component_name,,}Schema = update${component_name}Schema(t);

  const formik = useFormik({
    initialValues: {
      id: ${component_name,,}.id || 1,
      name: ${component_name,,}.name || "",
      description: ${component_name,,}.description || "",
    },

    enableReinitialize: true,
    validationSchema: ${component_name,,}Schema,

    onSubmit: (values) => {
      handleUpdate${component_name}(values, formik);
    },
  });

  const { handleUpdate${component_name}, isPending } = use${component_name}Update(
    handleClose,
    formik,
    open
  );

  const {
    showConfirmation,
    handleClose: handleDirtyClose,
    handleConfirmClose,
    handleCancelClose,
  } = useConfirmation({
    formik,
    onConfirmClose: handleClose,
    onCancelClose: handleClose,
  });

  return (
    <>
      <Can I="change" a="$route_name" passThrough>
        {(allowed) => (
          <Tooltip title={t("tooltip.update_$route_name")} placement="bottom">
            <span>
              <IconButton size="small" color="primary" onClick={handleOpen} disabled={!allowed}>
                <IconEdit width={18} />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Can>

      <Dialog open={open} onClose={handleDirtyClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {t("button.update")} {t("column.$route_name")}
            <IconButton aria-label={t("common.close")} onClick={handleDirtyClose}>
              <IconX />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("user_management.to_update_${component_name}_details_please_fill_out_all_the_required_fields")}
          </DialogContentText>
          <form onSubmit={formik.handleSubmit}>
            <Stack>
              <Box sx={{ width: "100%" }}>
                <CustomFormLabel htmlFor="name">{t("label.name")}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <CustomFormLabel htmlFor="description">{t("label.description")}</CustomFormLabel>
                <CustomTextField
                  fullWidth
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Box>
              <Box sx={{ display: "none" }}>
                <Button ref={submitRef} type="submit">
                  {t("button.update")}
                </Button>
              </Box>
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleDirtyClose} disabled={isPending}>
            {t("button.cancel")}
          </Button>
          <Button
            onClick={() => submitRef.current?.click()}
            loading={isPending}
            disabled={isPending || !formik.dirty}
          >
            {t("common.update")}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onConfirm={handleConfirmClose}
        onCancel={handleCancelClose}
      />
    </>
  );
};

export { Update${component_name}Dialog };
EOF

    # Create hooks.ts
    cat > "$update_dir/hooks.ts" << EOF
import toast from "react-hot-toast";

import { queryClient } from "@/utils";

import { useUpdate${component_name} } from "@/services/$route_name/service";
import type { FormikHelpers } from "formik";
import type { Update${component_name}DTO } from "../types";

const use${component_name}Update = (
  handleClose: () => void,
  formik: FormikHelpers<Update${component_name}DTO>,
  _enabled = true
) => {
  const { mutate, isPending } = useUpdate${component_name}();

  const handleUpdate${component_name} = (
    values: Update${component_name}DTO,
    formik: FormikHelpers<Update${component_name}DTO>
  ) => {
    mutate(values, {
      onSuccess: () => {
        toast.success("${component_name} has been successfully updated");
        queryClient.invalidateQueries({ queryKey: ["$route_name-list"] });
        handleClose();
        formik.resetForm();
      },
    });
  };

  return {
    isPending,
    handleUpdate${component_name},
  };
};

export { use${component_name}Update };
EOF

    # Create schema.ts
    cat > "$update_dir/schema.ts" << EOF
import { create${component_name}Schema } from "../$create_name/schema";

import type { TFunction } from "i18next";

export const update${component_name}Schema = (t: TFunction) => create${component_name}Schema(t);
EOF
}

# Function to create index.ts and types.ts
create_module_files() {
    local route_name="$1"
    local component_name="$2"
    local module_dir="$3"
    local details_folder="$4"
    local list_folder="$5"

    echo -e "${CYAN}Creating module index and types files...${RESET}" >&2

    # Create index.ts
    cat > "$module_dir/index.ts" << EOF
export { ${component_name}Details } from "./$details_folder/$pascal_details_name";
export { ${component_name}List } from "./$list_folder/$pascal_list_name";
EOF

    # Create types.ts
    cat > "$module_dir/types.ts" << EOF
import type { Pagination } from "@/shared/types";

export interface ${component_name} {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

interface ${component_name}ListResponse {
  data: ${component_name}[];
  pagination?: Pagination;
}

export type { ${component_name}ListResponse };

interface ${component_name}DetailsResponse {
  data: ${component_name};
}

export type { ${component_name} as ${component_name}Details, ${component_name}DetailsResponse };

interface Create${component_name}DTO {
  name: string;
  description: string;
}

export type { Create${component_name}DTO };

interface Delete${component_name}Props {
  ${component_name,,}Id: number;
}

interface Delete${component_name}DTO {
  id: number;
}

export type { Delete${component_name}DTO, Delete${component_name}Props };

interface Update${component_name}DTO extends Create${component_name}DTO {
  id: number;
}

interface Update${component_name}DialogProps {
  ${component_name,,}: ${component_name};
}

export type { Update${component_name}DialogProps, Update${component_name}DTO };
EOF
}

# Function to create service files
create_service_files() {
    local route_name="$1"
    local component_name="$2"
    local service_dir="$3"
    local list_folder="$4"

    echo -e "${CYAN}Creating service files...${RESET}" >&2

    # Convert route_name to camelCase for variable names
    local camel_case_route_name=$(echo "$route_name" | sed 's/-\([a-z]\)/\U\1/g')

    # Ensure service directory exists
    mkdir -p "$service_dir"

    # Create service.ts
    cat > "$service_dir/service.ts" << EOF
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { transformFilterKey } from "@/modules/$route_name/$list_folder/utils";
import { axios, objectToFormData, toCamelCase, toSnakeCase } from "@/utils";
import { handleApiError } from "@/utils/handleApiError";

import type {
  Create${component_name}DTO,
  Delete${component_name}DTO,
  ${component_name}Details,
  ${component_name}DetailsResponse,
  ${component_name}ListResponse,
  Update${component_name}DTO,
} from "@/modules/$route_name/types";
import type { URLParams } from "@/shared/types";
import type { MutationConfig } from "@/utils/reactQuery";
import type { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import type { AxiosError } from "axios";

// API URLs
const GET_${component_name^^}_DETAILS_URL = (${component_name,,}Id: string) => \`/api/core/v1/${route_name}s/\${${component_name,,}Id}/\`;
const CREATE_${component_name^^}_URL = "/api/core/v1/${route_name}s/";
const DELETE_${component_name^^}_URL = (id: number) => \`/api/core/v1/${route_name}s/\${id}/\`;
const UPDATE_${component_name^^}_URL = (id: number) => \`/api/core/v1/${route_name}s/\${id}/\`;

const GET_${component_name^^}_LIST_URL = (
  { page, pageSize }: URLParams,
  filters?: ColumnFiltersState,
  sorting?: SortingState
): string => {
  let baseUrl = \`/api/core/v1/${route_name}s/?page=\${page}&page_size=\${pageSize}\`;

  if (filters && Array.isArray(filters) && filters.length > 0) {
    filters.forEach((filter) => {
      if (filter.value) {
        const filterKey = transformFilterKey(filter.id);
        baseUrl += \`&\${filterKey}=\${encodeURIComponent(String(filter.value))}\`;
      }
    });
  }

  if (sorting && Array.isArray(sorting) && sorting.length > 0) {
    const sortParam = sorting[0];
    if (sortParam.id) {
      const fieldName = transformFilterKey(sortParam.id);
      const orderingValue = sortParam.desc ? \`-\${fieldName}\` : fieldName;
      baseUrl += \`&ordering=\${orderingValue}\`;
    }
  }

  return baseUrl;
};

// API Functions
const get${component_name}Details = async (${component_name,,}Id: string): Promise<${component_name}DetailsResponse | null> => {
  try {
    const response = await axios.get(GET_${component_name^^}_DETAILS_URL(${component_name,,}Id));
    const transformedData: ${component_name}Details = toCamelCase(response.data);

    return {
      data: transformedData,
    };
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

export const get${component_name}List = async (
  pagination?: PaginationState,
  filters?: ColumnFiltersState,
  sorting?: SortingState
): Promise<${component_name}ListResponse | null> => {
  const params = {
    page: (pagination?.pageIndex ?? 0) + 1,
    pageSize: pagination?.pageSize ?? 10,
  };

  const apiUrl = GET_${component_name^^}_LIST_URL(params, filters, sorting);

  try {
    const response: ${component_name}ListResponse = await axios.get(apiUrl);
    const ${camel_case_route_name}s = toCamelCase(response.data);
    const paginationResp = toCamelCase(response.pagination);

    return {
      data: ${camel_case_route_name}s,
      pagination: {
        totalPages: paginationResp?.numPages,
        currentPage: paginationResp?.currentPage,
        pageSize: paginationResp?.pageSize,
        totalCount: paginationResp?.totalCount,
      },
    };
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

const create${component_name} = async (data: Create${component_name}DTO): Promise<${component_name}ListResponse> => {
  const payload = {
    ...toSnakeCase(data),
  };
  const formData = objectToFormData(payload);

  try {
    const response = await axios.post(CREATE_${component_name^^}_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

const delete${component_name} = async (data: Delete${component_name}DTO): Promise<void> => {
  try {
    await axios.delete(DELETE_${component_name^^}_URL(data.id));
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

const update${component_name} = async (data: Update${component_name}DTO): Promise<${component_name}ListResponse> => {
  const payload = {
    ...toSnakeCase(data),
  };

  const formData = objectToFormData(payload);

  try {
    const { data: responseData } = await axios.put(UPDATE_${component_name^^}_URL(data.id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return responseData;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

// React Query Hooks
interface Use${component_name}DetailsOptions {
  ${component_name,,}Id: string;
  config?: MutationConfig<typeof get${component_name}Details>;
}

const use${component_name}Details = ({ ${component_name,,}Id, config }: Use${component_name}DetailsOptions) => {
  return useQuery<${component_name}DetailsResponse | null, AxiosError>({
    queryKey: ["${route_name}-details", ${component_name,,}Id],
    queryFn: () => get${component_name}Details(${component_name,,}Id),
    refetchOnWindowFocus: false,
    ...config,
  });
};

interface Use${component_name}ListOptions {
  pagination?: PaginationState;
  filters?: ColumnFiltersState;
  sorting?: SortingState;
  config?: MutationConfig<typeof get${component_name}List>;
  enabled?: boolean;
}

export const use${component_name}List = ({
  pagination,
  filters,
  sorting,
  config,
  enabled = true,
}: Use${component_name}ListOptions = {}) => {
  return useQuery<${component_name}ListResponse | null, AxiosError>({
    queryKey: ["${route_name}-list", pagination, filters, sorting],
    queryFn: () => get${component_name}List(pagination, filters, sorting),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    enabled,
    ...config,
  });
};

type Create${component_name}Options = {
  config?: MutationConfig<typeof create${component_name}>;
};

const useCreate${component_name} = ({ config }: Create${component_name}Options = {}) => {
  return useMutation<${component_name}ListResponse, AxiosError, Create${component_name}DTO>({
    mutationFn: create${component_name},
    ...config,
  });
};

interface UseDelete${component_name}Options {
  config?: MutationConfig<typeof delete${component_name}>;
}

const useDelete${component_name} = ({ config }: UseDelete${component_name}Options = {}) => {
  return useMutation<void, AxiosError, Delete${component_name}DTO>({
    mutationFn: delete${component_name},
    ...config,
  });
};

type UseUpdate${component_name}Options = {
  config?: MutationConfig<typeof update${component_name}>;
};

export const useUpdate${component_name} = ({ config }: UseUpdate${component_name}Options = {}) => {
  return useMutation<${component_name}ListResponse, AxiosError, Update${component_name}DTO>({
    mutationFn: update${component_name},
    ...config,
  });
};

// Exports
export { useCreate${component_name}, useDelete${component_name}, use${component_name}Details };
EOF
}

# Main execution
main() {
    local route_name="$1"
    local component_name="$2"

    if [ -z "$route_name" ] || [ -z "$component_name" ]; then
        echo -e "${RED}Error: route_name and component_name are required${RESET}"
        exit 1
    fi

    local module_dir="frontend/src/modules/$route_name"
    local service_dir="frontend/src/services/$route_name"

    # Create all components and get folder names
    local details_folder=$(create_details_component "$route_name" "$component_name" "$module_dir")

    # Get update component info first
    echo -e "${CYAN}Creating update component...${RESET}" >&2
    read -p "Enter update component name (e.g., update-product): " update_name
    local update_dir="$module_dir/$update_name"
    mkdir -p "$update_dir"
    local pascal_update_name=$(to_pascal_case "$update_name")

    local list_folder=$(create_list_component "$route_name" "$component_name" "$module_dir" "$update_name" "$pascal_update_name")
    create_create_component "$route_name" "$component_name" "$module_dir"
    create_delete_component "$route_name" "$component_name" "$module_dir"
    create_update_component "$route_name" "$component_name" "$module_dir" "$update_name" "$pascal_update_name"
    create_module_files "$route_name" "$component_name" "$module_dir" "$details_folder" "$list_folder"
    create_service_files "$route_name" "$component_name" "$service_dir" "$list_folder"

    echo -e "${GREEN}All components created successfully!${RESET}"
}

# Run main function with arguments
main "$1" "$2"
