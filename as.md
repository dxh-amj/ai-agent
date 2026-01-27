# Project Architecture & Coding Standards

This document defines the coding style, architecture patterns, and conventions for a **Next.js 14+ enterprise application** with TypeScript, React Query, and Formik. This guide is UI-library agnostic and works with any component library (MUI, shadcn/ui, Chakra, etc.).

---

## 🏗️ Project Structure Overview

```
src/
├── app/                    # Next.js App Router (Pages & Layouts)
├── modules/                # Feature-based business logic modules
├── shared/                 # Reusable utilities shared across modules
├── types/                  # Global TypeScript types
├── utils/                  # Utility functions and helpers
├── config/                 # Application configuration
├── languages/              # i18n translation files
├── providers/              # React Context providers
└── middleware.ts           # Next.js middleware
```

---

## 📁 Module Architecture Pattern

### Module Hierarchy

Each **module** represents a business domain (e.g., `parking`, `services`, `auth`). Modules contain **sub-modules** that group related features.

```
modules/
└── {domain}/                        # e.g., parking, services, auth
    └── {sub-module}/                # e.g., manage-lots, manage-facilities
        ├── index.ts                 # Public exports barrel
        └── {feature}/               # e.g., create-parking-lot, facility-list
            ├── {Component}.tsx      # Main React component (PascalCase)
            ├── hooks.ts             # Feature-specific custom hooks
            ├── service.ts           # API service with React Query hooks
            ├── schema.ts            # Yup validation schema
            ├── types.ts             # Feature-specific TypeScript types
            ├── utils.ts             # Feature-specific utility functions
            ├── components/          # Sub-components (if needed)
            └── index.ts             # Feature exports (optional)
```

### Module Types

#### Type 1: Single Service Feature (Auth-style)

When a feature has **one API call** (like login, register):

```
modules/auth/
├── index.ts                         # Exports all forms
├── login/
│   ├── LoginForm.tsx
│   ├── hooks.ts
│   ├── schema.ts
│   ├── service.ts                   # Single service file
│   └── types.ts
├── register/
│   ├── RegisterForm.tsx
│   ├── hooks.ts
│   ├── schema.ts
│   ├── service.ts
│   └── types.ts
└── forgot-password/
    └── ...
```

**Key Pattern**: Single `service.ts` file when feature has only one API endpoint.

#### Type 2: CRUD Feature Module (Facilities-style)

When a module has **full CRUD operations** with separate folders per operation:

```
modules/services/
└── manage-facilities/
    ├── index.ts                     # Exports main components
    ├── create-facility/
    │   ├── CreateFacility.tsx
    │   ├── hooks.ts
    │   ├── schema.ts
    │   ├── service.ts               # CREATE mutation
    │   └── types.ts
    ├── update-facility/
    │   ├── UpdateFacility.tsx
    │   ├── hooks.ts
    │   ├── schema.ts
    │   ├── service.ts               # UPDATE mutation
    │   └── types.ts
    ├── delete-facility/
    │   ├── DeleteFacility.tsx
    │   ├── hooks.ts
    │   ├── service.ts               # DELETE mutation
    │   └── types.ts
    ├── facility-list/
    │   ├── FacilityList.tsx
    │   ├── hooks.ts
    │   ├── types.ts
    │   └── utils.ts
    └── facility-details/
        ├── FacilityDetails.tsx
        ├── hooks.ts
        ├── service.ts               # GET single item query
        ├── index.ts
        └── types.ts
```

**Key Pattern**: Each CRUD operation has its own folder with dedicated `service.ts`.

#### Type 3: Multiple Services Feature (Upsert-style)

When a **single feature** needs **multiple API calls** (e.g., create + update + fetch related data):

```
modules/services/
└── manage-subscription-plans/
    └── upsert-subscription/
        ├── hooks.ts                 # Combines all services
        ├── schema.ts
        ├── types.ts                 # Shared types for the feature
        ├── components/              # Feature sub-components
        │   ├── FacilitiesSection.tsx
        │   ├── PlanDurationModal.tsx
        │   ├── UpdateSubscriptionButton.tsx
        │   └── UpsetSubscriptions.tsx
        └── services/                # ⬅️ services FOLDER (plural)
            ├── types.ts             # Service-specific types
            ├── createSubscription.ts
            ├── updateSubscription.ts
            └── getFeatures.ts
```

**Key Pattern**: Use `services/` folder (plural) instead of `service.ts` when:

- Feature combines Create + Update (upsert pattern)
- Feature needs additional data fetching alongside mutations
- Multiple related API endpoints serve one UI feature

**Service File Naming in `services/` folder:**

```
services/
├── types.ts                         # Shared types for services
├── create{Entity}.ts                # POST - Create mutation
├── update{Entity}.ts                # PUT/PATCH - Update mutation
├── delete{Entity}.ts                # DELETE - Delete mutation
├── get{Entity}.ts                   # GET single item
├── get{Entity}List.ts               # GET list with pagination
└── get{RelatedData}.ts              # GET related/supporting data
```

**Example: `services/createSubscription.ts`**

```typescript
import { axios, handleApiError, toSnakeCase } from "@/utils";
import type { MutationConfig } from "@/utils/reactQuery";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { SubscriptionDTO } from "../types"; // Import from parent types.ts

const CREATE_SUBSCRIPTION_URL = "/api/plans/v1/workspace/plans/";

const createSubscription = async (data: SubscriptionDTO): Promise<void> => {
  // ... implementation
};

type CreateSubscriptionOptions = {
  config?: MutationConfig<typeof createSubscription>;
};

const useSubscriptionCreate = ({ config }: CreateSubscriptionOptions = {}) => {
  return useMutation<void, AxiosError, SubscriptionDTO>({
    mutationFn: createSubscription,
    ...config,
  });
};

export { useSubscriptionCreate };
```

**Example: `services/getFeatures.ts`** (supporting data fetch)

```typescript
import { useQuery } from "@tanstack/react-query";
import { axios, handleApiError, toCamelCase } from "@/utils";
import type { MutationConfig } from "@/utils/reactQuery";
import type { AxiosError } from "axios";
import type { FeaturesResponse } from "./types"; // Import from services/types.ts

const GET_FEATURES_URL = "/api/plans/v1/workspace/plan-features/";

const getFeatures = async (): Promise<FeaturesResponse | null> => {
  // ... implementation
};

interface UseFeaturesOptions {
  config?: MutationConfig<typeof getFeatures>;
}

const useFeatures = ({ config }: UseFeaturesOptions = {}) => {
  return useQuery<FeaturesResponse | null, AxiosError>({
    queryKey: ["features"],
    queryFn: getFeatures,
    refetchOnWindowFocus: false,
    ...config,
  });
};

export { useFeatures, type FeaturesResponse };
```

**Example: `services/types.ts`** (service-specific types)

```typescript
interface FeatureCheckbox {
  id: number;
  code: string;
  title: string;
  dataType: "boolean";
}

interface FeatureLimit {
  id: number;
  code: string;
  title: string;
  dataType: "integer";
}

interface FeaturesResponse {
  features: {
    featureCheckbox: FeatureCheckbox[];
    featureLimit: FeatureLimit[];
  };
}

export type { FeatureCheckbox, FeatureLimit, FeaturesResponse };
```

---

## 📄 File Conventions & Templates

### 1. Service File (`service.ts`)

Services contain API calls wrapped in React Query hooks.

```typescript
// modules/{domain}/{sub-module}/{feature}/service.ts

import { useMutation, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { axios, toCamelCase, toSnakeCase, objectToFormData } from "@/utils";
import { handleApiError } from "@/utils/handleApiError";
import type { MutationConfig, QueryConfig } from "@/utils/reactQuery";
import type { CreateEntityDTO, EntityResponse } from "./types";

// 1. Define API URL (use function for dynamic params)
const CREATE_ENTITY_URL = "/api/{version}/workspace/{resource}/";
const GET_ENTITY_URL = (id: string) => `/api/{version}/workspace/{resource}/${id}/`;

// 2. Define API function
const createEntity = async (data: CreateEntityDTO): Promise<void> => {
  const payload = toSnakeCase(data);
  const formData = objectToFormData(payload);

  try {
    await axios.post(CREATE_ENTITY_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

// 3. Define Options type for the hook
// Pattern: {Action}{Entity}Options with optional config
type CreateEntityOptions = {
  config?: MutationConfig<typeof createEntity>;
};

// 4. Export React Query hook with destructured options (default to empty object)
const useCreateEntity = ({ config }: CreateEntityOptions = {}) => {
  return useMutation<void, AxiosError, CreateEntityDTO>({
    mutationFn: createEntity,
    ...config,
  });
};

export { useCreateEntity };
```

#### Options Type Pattern (Critical)

Every React Query hook **MUST** have an associated Options type:

```typescript
// For Mutations
type {Action}{Entity}Options = {
  config?: MutationConfig<typeof {actionEntity}>;
};

// For Queries
interface Use{Entity}ListOptions {
  pagination?: PaginationState;
  filters?: FilterType;
  sorting?: SortingState;
  enabled?: boolean;
  config?: QueryConfig<typeof get{Entity}List>;
}

// For Detail Queries
interface Use{Entity}DetailsOptions {
  {entity}Id: string;
  config?: QueryConfig<typeof get{Entity}Details>;
}
```

**Examples:**

```typescript
// Mutation Options
type CreateParkingLotOptions = {
  config?: MutationConfig<typeof createParkingLot>;
};

type UpdateFacilityOptions = {
  config?: MutationConfig<typeof updateFacility>;
};

type DeleteFacilityOptions = {
  config?: MutationConfig<typeof deleteFacility>;
};

// Query Options
interface UseFacilityListOptions {
  pagination?: PaginationState;
  filters?: FilterType;
  sorting?: SortingState;
  enabled?: boolean;
  config?: QueryConfig<typeof getFacilityList>;
}

interface UseFacilityDetailsOptions {
  facilityId: string;
  config?: QueryConfig<typeof getFacilityDetails>;
}
```

**Hook Usage with Options:**

```typescript
// Mutation hook - destructure with default empty object
const useCreateParkingLot = ({ config }: CreateParkingLotOptions = {}) => {
  return useMutation<void, AxiosError, CreateParkingLotDTO>({
    mutationFn: createParkingLot,
    ...config,
  });
};

// Query hook - destructure all options
const useFacilityDetails = ({ facilityId, config }: UseFacilityDetailsOptions) => {
  return useQuery<FacilityDetailsResponse | null, AxiosError>({
    queryKey: ["facility-details", facilityId],
    queryFn: () => getFacilityDetails(facilityId),
    ...config,
  });
};
```

#### Service Patterns by Operation Type:

| Operation | HTTP Method | React Query Hook | Return Type |
| --------- | ----------- | ---------------- | ----------- |
| Create    | POST        | `useMutation`    | `void`      |
| Update    | PUT/PATCH   | `useMutation`    | `void`      |
| Delete    | DELETE      | `useMutation`    | `void`      |
| Get One   | GET         | `useQuery`       | `Response`  |
| Get List  | GET         | `useQuery`       | `Response`  |

### 2. Hooks File (`hooks.ts`)

Feature hooks orchestrate business logic, combining services with UI state.

```typescript
// modules/{domain}/{sub-module}/{feature}/hooks.ts

import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import type { FormikHelpers } from "formik";

import { useToast } from "@/shared/hooks";
import { queryClient } from "@/utils";

import { useCreateEntityMutation } from "./service";
import type { CreateEntityDTO, EntityFormValues } from "./types";

type UseEntityCreationOptions = {
  onSuccess?: () => void;
};

const useEntityCreation = (
  { onSuccess }: UseEntityCreationOptions = {},
  formik: FormikHelpers<EntityFormValues>
) => {
  const { t } = useTranslation();
  const { mutate, isPending } = useCreateEntityMutation();
  const { showSuccess } = useToast();

  const handleCreateEntity = (
    values: EntityFormValues,
    formik: FormikHelpers<EntityFormValues>
  ) => {
    mutate(values as CreateEntityDTO, {
      onSuccess: () => {
        onSuccess?.();
        showSuccess("entity_has_been_successfully_created", {
          entity: t("entities.your_entity"),
        });
        queryClient.invalidateQueries({ queryKey: ["entity-list"] });
        formik.resetForm();
      },
    });
  };

  return { handleCreateEntity, isPending };
};

export { useEntityCreation };
```

### 3. Types File (`types.ts`)

```typescript
// modules/{domain}/{sub-module}/{feature}/types.ts

// DTO for API requests (Data Transfer Object)
interface CreateEntityDTO {
  name: string;
  code: string;
  price: string;
  isActive: boolean;
}

// Form values may extend DTO with UI-specific fields
interface EntityFormValues extends CreateEntityDTO {
  id?: number; // Present only for updates
}

// API Response types
interface Entity {
  id: number;
  name: string;
  code: string;
  price: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface EntityListResponse {
  data: Entity[];
  pagination: {
    totalPages: number;
    currentPage: number;
    pageSize: number;
    totalCount: number;
  };
}

interface EntityDetailsResponse {
  data: Entity;
}

export type {
  CreateEntityDTO,
  EntityFormValues,
  Entity,
  EntityListResponse,
  EntityDetailsResponse,
};
```

### 4. Schema File (`schema.ts`)

```typescript
// modules/{domain}/{sub-module}/{feature}/schema.ts

import type { TFunction } from "i18next";
import * as yup from "yup";

export const entitySchema = (t: TFunction) => {
  return yup.object({
    name: yup.string().required(t("validation.field_is_required", { field: t("fields.name") })),
    code: yup.string().required(t("validation.field_is_required", { field: t("fields.code") })),
    price: yup
      .number()
      .typeError(t("validation.field_must_be_number", { field: t("fields.price") }))
      .transform((value, originalValue) => (originalValue === "" ? undefined : value))
      .required(t("validation.field_is_required", { field: t("fields.price") }))
      .min(
        0,
        t("validation.field_must_be_at_least_min", {
          field: t("fields.price"),
          min: 0,
        })
      ),
    isActive: yup.boolean().optional(),
  });
};
```

### 5. Component File (`{ComponentName}.tsx`)

```tsx
// modules/{domain}/{sub-module}/{feature}/{ComponentName}.tsx

"use client";

import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

// UI Components - import from your UI library (MUI, shadcn/ui, etc.)
import { Button, Dialog, Input, Label } from "@/shared/ui";

import { Can } from "@/providers/Can";
import { ConfirmationDialog } from "@/shared/components";
import { useConfirmation, useDialogController } from "@/shared/hooks";

import { useEntityCreation } from "./hooks";
import { entitySchema } from "./schema";
import type { EntityFormValues } from "./types";

const CreateEntityDialog = () => {
  const { t } = useTranslation();
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const { open, handleOpen, handleClose } = useDialogController();

  const formik = useFormik<EntityFormValues>({
    initialValues: {
      name: "",
      code: "",
      price: "",
      isActive: true,
    },
    validationSchema: entitySchema(t),
    onSubmit: (values) => {
      handleCreateEntity(values, formik);
    },
  });

  const { handleCreateEntity, isPending } = useEntityCreation({ onSuccess: handleClose }, formik);

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
      <Can I="add" a="entity" passThrough>
        {(allowed) => (
          <Button disabled={!allowed} onClick={handleOpen}>
            {t("crud_actions.create", { entity: t("entities.entity") })}
          </Button>
        )}
      </Can>

      <Dialog open={open} onClose={handleDirtyClose}>
        {/* Dialog content with form */}
      </Dialog>

      <ConfirmationDialog
        open={showConfirmation}
        onClose={handleCancelClose}
        onConfirm={handleConfirmClose}
      />
    </>
  );
};

export { CreateEntityDialog };
```

### 6. Index File (`index.ts`)

Barrel exports for public API of the module:

```typescript
// modules/{domain}/{sub-module}/index.ts

export { EntityList } from "./entity-list/EntityList";
export { EntityDetails } from "./entity-details/EntityDetails";

// Only export what needs to be imported from outside
// Internal components are imported directly in the module
```

---

## 📂 Shared Layer Architecture

### `/shared/api/` - Global API Services

For APIs used across multiple modules (dropdowns, user profile, etc.):

```typescript
// shared/api/getEntityList.ts

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginationState, SortingState } from "@tanstack/react-table";
import type { AxiosError } from "axios";

import { axios, toCamelCase } from "@/utils";
import { handleApiError } from "@/utils/handleApiError";
import type { FilterType, URLParams } from "@/types";
import type { MutationConfig } from "@/utils/reactQuery";

// URL builder with query params
const GET_ENTITY_LIST_URL = (
  params?: URLParams,
  filters?: FilterType,
  sorting?: SortingState
): string => {
  let baseUrl = `/api/v1/workspace/entities/`;
  const query: string[] = [];

  if (params?.page) query.push(`page=${params.page}`);
  if (params?.pageSize) query.push(`page_size=${params.pageSize}`);

  // Add filters and sorting...

  if (query.length > 0) {
    baseUrl += `?${query.join("&")}`;
  }

  return baseUrl;
};

// API function
export const getEntityList = async (
  pagination?: PaginationState,
  filters?: FilterType,
  sorting?: SortingState
): Promise<EntityListResponse | null> => {
  // Implementation...
};

// Hook options interface
interface UseEntityListOptions {
  pagination?: PaginationState;
  filters?: FilterType;
  sorting?: SortingState;
  enabled?: boolean;
  config?: MutationConfig<typeof getEntityList>;
}

// React Query hook
export const useEntityList = ({
  pagination,
  filters,
  sorting,
  enabled = true,
}: UseEntityListOptions = {}) => {
  return useQuery<EntityListResponse | null, AxiosError>({
    queryKey: ["entity-list", pagination, filters, sorting],
    queryFn: () => getEntityList(pagination, filters, sorting),
    placeholderData: keepPreviousData,
    enabled,
  });
};
```

### `/shared/hooks/` - Reusable Hooks

```typescript
// shared/hooks/useToast.ts

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useToast = () => {
  const { t } = useTranslation();

  const showSuccess = (key: string, params?: Record<string, any>) => {
    toast.success(t(`messages.success.${key}`, params));
  };

  const showError = (key: string, params?: Record<string, any>) => {
    toast.error(t(`messages.error.${key}`, params));
  };

  return { showSuccess, showError };
};
```

### `/shared/components/` - Reusable Components

```
shared/components/
├── index.ts                 # Barrel exports
├── ConfirmationDialog.tsx
├── CircularLoader.tsx
├── breadcrumb/
├── page-container/
└── {component-name}/
    ├── {ComponentName}.tsx
    └── index.ts
```

### `/shared/form-elements/` or `/shared/ui/` - Form Components

Customized form components (adapt to your UI library - MUI, shadcn/ui, etc.):

- `Input` / `TextField`
- `Select`
- `Switch`
- `Label` / `FormLabel`
- `Checkbox`
- `Button`

---

## 🛣️ App Router (Pages)

### Route Structure

```
app/
├── layout.tsx                       # Root layout
├── (protected)/                     # Authenticated routes
│   ├── layout.tsx                   # Protected layout with sidebar
│   ├── page.tsx                     # Dashboard
│   ├── (parking)/
│   │   └── manage-lots/
│   │       ├── page.tsx             # List page
│   │       └── [lot-id]/
│   │           └── page.tsx         # Details page
│   └── (services)/
│       └── manage-facilities/
│           ├── page.tsx
│           └── [facility-id]/
│               └── page.tsx
├── (public)/
│   └── auth/
│       ├── login/page.tsx
│       └── register/page.tsx
└── (subscription)/
    └── onboarding/
```

### Page Component Pattern

```tsx
// app/(protected)/(services)/manage-facilities/page.tsx

"use client";

import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

import { Breadcrumb, CircularLoader, PageContainer } from "@/shared/components";

// Lazy load module component
const FacilityList = dynamic(
  () => import("@/modules/services/manage-facilities").then((mod) => mod.FacilityList),
  { loading: () => <CircularLoader /> }
);

const ManageFacilities = () => {
  const { t } = useTranslation();

  const BCrumb = [
    { to: "/", title: t("breadcrumb.home") },
    { title: t("navigation.manage_facilities") },
  ];

  return (
    <PageContainer
      title={t("navigation.manage_facilities")}
      description="Manage facilities, pricing, and inventory"
    >
      <Breadcrumb title={t("navigation.manage_facilities")} items={BCrumb} />
      <FacilityList />
    </PageContainer>
  );
};

export default ManageFacilities;
```

### Details Page Pattern

```tsx
// app/(protected)/(services)/manage-facilities/[facility-id]/page.tsx

"use client";

import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

import { Breadcrumb, PageContainer } from "@/shared/components";

const FacilityDetails = dynamic(() =>
  import("@/modules/services/manage-facilities/facility-details").then((mod) => mod.FacilityDetails)
);

const FacilityDetailsPage = () => {
  const { t } = useTranslation();

  const BCrumb = [
    { to: "/", title: t("breadcrumb.home") },
    { to: "/manage-facilities", title: t("navigation.manage_facilities") },
    { title: t("navigation.facility_details") },
  ];

  return (
    <PageContainer
      title={t("navigation.facility_details")}
      description="View detailed facility information"
    >
      <Breadcrumb title={t("navigation.facility_details")} items={BCrumb} showBackButton />
      <FacilityDetails />
    </PageContainer>
  );
};

export default FacilityDetailsPage;
```

---

## 🔧 Utilities (`/utils`)

### Core Utilities

| Utility             | Purpose                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `axios.ts`          | Configured Axios instance with interceptors                      |
| `handleApiError.ts` | Centralized API error handling                                   |
| `formats.ts`        | Data transformation (`toCamelCase`, `toSnakeCase`, `formatDate`) |
| `reactQuery.ts`     | Query client config & type helpers                               |
| `constants.ts`      | Application constants                                            |

### Data Transformation

```typescript
// Always convert API responses to camelCase
const data = toCamelCase(response.data);

// Always convert request payloads to snake_case
const payload = toSnakeCase(formData);

// Use objectToFormData for multipart requests
const formData = objectToFormData(payload);
```

### Error Handling

```typescript
// In service functions, always wrap API calls
try {
  const response = await axios.post(URL, data);
  return toCamelCase(response.data);
} catch (error) {
  handleApiError(error);
  return Promise.reject(error);
}
```

---

## 🎯 Naming Conventions

### Files & Folders

| Type       | Convention     | Example              |
| ---------- | -------------- | -------------------- |
| Modules    | kebab-case     | `manage-facilities`  |
| Features   | kebab-case     | `create-facility`    |
| Components | PascalCase.tsx | `CreateFacility.tsx` |
| Hooks      | camelCase.ts   | `hooks.ts`           |
| Services   | camelCase.ts   | `service.ts`         |
| Types      | camelCase.ts   | `types.ts`           |
| Schemas    | camelCase.ts   | `schema.ts`          |
| Utils      | camelCase.ts   | `utils.ts`           |

### Code Naming

| Type             | Convention              | Example                             |
| ---------------- | ----------------------- | ----------------------------------- |
| Components       | PascalCase              | `CreateFacilityDialog`              |
| Hooks            | use + PascalCase        | `useFacilityCreation`               |
| Mutation hooks   | use + Entity + Mutation | `useCreateFacilityMutation`         |
| Query hooks      | use + EntityList        | `useFacilityList`                   |
| API functions    | verb + Entity           | `createFacility`, `getFacilityList` |
| Types (DTO)      | EntityDTO               | `CreateFacilityDTO`                 |
| Types (Response) | EntityResponse          | `FacilityDetailsResponse`           |
| Constants        | SCREAMING_SNAKE         | `CREATE_FACILITY_URL`               |

---

## 📋 Query Keys Convention

```typescript
// List queries
["entity-list"][("entity-list", pagination, filters, sorting)][
  // Detail queries
  ("entity-details", entityId)
][
  // Related queries
  ("entity-items", entityId)
];
```

### Cache Invalidation

```typescript
// After mutations, invalidate related queries
queryClient.invalidateQueries({ queryKey: ["entity-list"] });
queryClient.invalidateQueries({ queryKey: ["entity-details", entityId] });
```

---

## 🌐 Internationalization (i18n)

### Translation Keys Structure

```json
{
  "entities": {
    "facility": "Facility",
    "parking_lot": "Parking Lot"
  },
  "fields": {
    "name": "Name",
    "code": "Code"
  },
  "crud_actions": {
    "create": "Create {{entity}}",
    "update": "Update {{entity}}",
    "delete": "Delete {{entity}}"
  },
  "messages": {
    "success": {
      "entity_has_been_successfully_created": "{{entity}} has been successfully created",
      "entity_has_been_successfully_updated": "{{entity}} has been successfully updated",
      "entity_has_been_successfully_deleted": "{{entity}} has been successfully deleted"
    }
  },
  "validation": {
    "field_is_required": "{{field}} is required",
    "field_must_be_number": "{{field}} must be a number"
  }
}
```

### Usage

```typescript
const { t } = useTranslation();

// With interpolation
t("crud_actions.create", { entity: t("entities.facility") });
// Output: "Create Facility"

// In schema
t("validation.field_is_required", { field: t("fields.name") });
// Output: "Name is required"
```

---

## 🔐 Authorization (CASL)

```tsx
import { Can } from "@/providers/Can";

// In components
<Can I="add" a="facility" passThrough>
  {(allowed) => (
    <Button disabled={!allowed} onClick={handleOpen}>
      Create Facility
    </Button>
  )}
</Can>;
```

---

## 📊 List Data Hook Pattern

Hook pattern for managing list data with pagination, filtering, and sorting (works with any table/list UI):

```typescript
// In list hooks - works with @tanstack/react-table or any table library
import type { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";

const useEntityListData = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data, isLoading, refetch } = useEntityList({
    pagination,
    filters: columnFilters,
    sorting,
  });

  return {
    data,
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
```

---

## Providers Architecture

### Provider Hierarchy (Root Layout)

```tsx
// app/layout.tsx

const RootLayout = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextTopLoader color="#5D87FF" />
        <QueryProvider>
          {" "}
          {/* React Query Provider */}
          <MyApp>{children}</MyApp> {/* Theme Provider */}
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
};
```

### Provider Files

```
providers/
├── AbilityProvider.tsx    # CASL authorization context
├── Can.tsx                # CASL Can component
└── QueryProvider.tsx      # React Query client provider
```

### QueryProvider

```tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/utils/reactQuery";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      {children}
    </QueryClientProvider>
  );
};
```

### AbilityProvider (CASL)

```tsx
"use client";

import { createContext } from "react";
import { createMongoAbility } from "@casl/ability";
import type { MongoAbility, ReactNode } from "@casl/ability";

export const AbilityContext = createContext<MongoAbility>(createMongoAbility([]));

export const AbilityProvider = ({
  children,
  ability,
}: {
  children: ReactNode;
  ability: MongoAbility;
}) => {
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};
```

---

## 📝 Form Elements Pattern

### Custom Form Components (`/shared/form-elements/` or `/shared/ui/`)

Create styled form components with consistent theming. Adapt to your UI library:

```typescript
// Available form elements (naming may vary by UI library)
Input / TextField; // Text input
Select; // Dropdown select
Switch; // Toggle switch
Checkbox; // Checkbox
Label / FormLabel; // Form labels
PasswordInput; // Password with visibility toggle
DatePicker; // Date selection
TimePicker; // Time selection
DateTimePicker; // Combined date/time
Autocomplete / Combobox; // Autocomplete dropdown
MultiSelect; // Multi-select dropdown
PhoneInput; // Phone number input
RadioGroup; // Radio buttons
Slider; // Slider input
```

### Usage Pattern

```tsx
// Import from your UI library wrapper
import { Label, Input, Select, Switch } from "@/shared/ui";
// Or from form-elements
import { FormField, FormInput, FormSelect } from "@/shared/form-elements";

// With Formik
<div>
  <Label htmlFor="name">{t("fields.name")}</Label>
  <Input
    id="name"
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    error={formik.touched.name && Boolean(formik.errors.name)}
  />
  {formik.touched.name && formik.errors.name && <span className="error">{formik.errors.name}</span>}
</div>;
```

---

## 🪝 Shared Hooks Pattern

### Available Shared Hooks (`/shared/hooks/`)

| Hook                     | Purpose                                             |
| ------------------------ | --------------------------------------------------- |
| `useToast`               | Show success/error toast notifications              |
| `useDialogController`    | Manage dialog open/close state                      |
| `useConfirmation`        | Handle dirty form confirmation dialogs              |
| `useSystemConfig`        | Access system configuration (currency, date format) |
| `useInfiniteScroll`      | Handle infinite scroll behavior                     |
| `useInfiniteDataFetch`   | Infinite query with React Query                     |
| `useSocket`              | WebSocket connection management                     |
| `useSocketNotifications` | Real-time notifications                             |
| `useUserSubscription`    | User subscription status                            |

### useDialogController

```typescript
const useDialogController = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return { open, handleOpen, handleClose, setOpen };
};

// Usage
const { open, handleOpen, handleClose } = useDialogController();
```

### useConfirmation (Dirty Form Check)

```typescript
const {
  showConfirmation,
  handleClose: handleDirtyClose, // Use this instead of direct close
  handleConfirmClose, // Confirm discard changes
  handleCancelClose, // Cancel and stay
} = useConfirmation({
  formik,
  onConfirmClose: handleClose,
  onCancelClose: handleClose,
});
```

### useSystemConfig

```typescript
const { decimalPlace, currency, dateFormat, timeFormat, dateTimeFormat } = useSystemConfig();

// Usage
formatDecimal(price, decimalPlace);
`${amount} ${currency?.symbol}`;
formatDate(date, dateFormat);
```

---

## 🔐 Authentication Pattern (react-query-auth)

### Auth Configuration (`utils/auth.tsx`)

```typescript
import { configureAuth } from "react-query-auth";

import { login } from "@/modules/auth/login/service";
import { register } from "@/modules/auth/register/service";
import { logOut } from "@/shared/api/logout";
import { getUser } from "@/shared/api/userProfile";

const authConfig = {
  userFn: async () => await getUser(),
  loginFn: async (data: LoginDTO) => await login(data),
  registerFn: async (data: RegisterDTO) => await register(data),
  logoutFn: async (data: unknown) => await logOut(data as string),
};

export const { useUser, useLogin, useRegister, useLogout } = configureAuth(authConfig);
```

### Usage in Components

```typescript
import { useLogin, useUser, useLogout } from "@/utils/auth";

// Login
const { mutate: login, isPending } = useLogin();
login(credentials, { onSuccess: () => router.push("/") });

// Get current user
const { data: user, isLoading } = useUser();

// Logout
const { mutate: logout } = useLogout();
```

---

## 🛡️ Middleware Pattern

### Next.js Middleware (`middleware.ts`)

```typescript
import { NextResponse } from "next/server";
import { ASSESS_TOKEN } from "@/utils/constants";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get(ASSESS_TOKEN)?.value ?? null;
  const { pathname } = request.nextUrl;
  const isAuthPath = pathname.startsWith("/auth");

  // Redirect to login if no token and not on auth page
  if (!token && !isAuthPath) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Redirect to home if has token and on auth page
  if (token && isAuthPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|.*\\.svg$|.*\\.png$).*)"],
};
```

---

## ⚙️ Configuration Pattern

### Environment Variables (`config/index.ts`)

```typescript
export const ROOT_API_URL = process.env.NEXT_PUBLIC_ROOT_API_URL as string;
export const WEBSOCKET_BASE_URL = process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL as string;
export const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY as string;
export const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
export const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_KEY as string;
export const RECAPTCHA_ENABLED = process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true";
```

### Constants (`utils/constants.ts`)

```typescript
export const ASSESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const LANGUAGE = "language";
export const CURRENCY = "currency";

export const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";
export const DEFAULT_TIME_FORMAT = "HH:mm";
export const DEFAULT_DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
export const DEFAULT_DECIMAL_FORMAT = 2;

export const INITIAL_PAGINATION = { pageIndex: 0, pageSize: 10 };
export const INITIAL_FILTERS: ColumnFiltersState = [];
```

---

## 🚫 Anti-Patterns to Avoid

1. **Don't** put API calls directly in components
2. **Don't** skip the service layer for mutations
3. **Don't** use raw string keys for translations
4. **Don't** forget to invalidate queries after mutations
5. **Don't** mix snake_case and camelCase in the frontend
6. **Don't** create oversized components - split into hooks
7. **Don't** skip error handling in API functions
8. **Don't** hardcode URLs - use constants
9. **Don't** create service files without Options type for React Query hooks
10. **Don't** forget `"use client"` directive for client components
11. **Don't** skip dirty form confirmation for dialogs with forms

---

## 🔄 Data Flow

```
Page (app/)
    ↓ imports
Module Component (modules/{domain}/{sub-module}/{feature}/)
    ↓ uses
Feature Hook (hooks.ts)
    ↓ calls
Service Hook (service.ts)
    ↓ calls
Axios Instance (utils/axios.ts)
    ↓ sends
API Server
```

---

## 💡 Quick Reference

### Import Aliases

```typescript
import { ... } from "@/utils";           // Utilities
import { ... } from "@/shared/api";      // Shared API hooks
import { ... } from "@/shared/hooks";    // Shared hooks
import { ... } from "@/shared/components"; // Shared components
import { ... } from "@/shared/form-elements"; // Form components
import { ... } from "@/types";           // Global types
import { ... } from "@/config";          // Configuration
import { ... } from "@/providers/Can";   // Authorization
```

### Common Hook Pattern

```typescript
// Feature-specific hook that combines everything
const useFeature = () => {
  // External hooks
  const { t } = useTranslation();
  const { showSuccess } = useToast();

  // Service hooks
  const { mutate, isPending } = useServiceMutation();

  // Handler
  const handleAction = (values: DTO) => {
    mutate(values, {
      onSuccess: () => {
        showSuccess("key", { params });
        queryClient.invalidateQueries({ queryKey: ["list"] });
      },
    });
  };

  return { handleAction, isPending };
};
```

---

## Infinite Scroll Pattern

### useInfiniteDataFetch

```typescript
import { useInfiniteDataFetch } from "@/shared/hooks";

const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteDataFetch({
  queryKey: ["infinite-entities", filters],
  queryFn: ({ pageParam = 1 }) => getEntities({ page: pageParam, ...filters }),
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.pagination.currentPage < lastPage.pagination.totalPages
      ? lastPage.pagination.currentPage + 1
      : undefined;
  },
  enabled: true,
});
```

### useInfiniteScroll

```typescript
import { useInfiniteScroll } from "@/shared/hooks";

const { handleScroll } = useInfiniteScroll({
  hasNextPage,
  isLoading: isFetchingNextPage,
  onLoadMore: fetchNextPage,
  threshold: 0.1,
});

<Box onScroll={handleScroll} sx={{ overflowY: "auto", maxHeight: 400 }}>
  {items.map((item) => (
    <ItemCard key={item.id} {...item} />
  ))}
</Box>;
```

---

## 🔌 WebSocket Pattern

### useSocket Hook

```typescript
import { useSocket } from "@/shared/hooks";

const { socket, isConnected } = useSocket({
  url: buildWebSocketUrl("/ws/notifications/"),
  onMessage: (data) => {
    // Handle incoming message
  },
  onConnect: () => console.log("Connected"),
  onDisconnect: () => console.log("Disconnected"),
});
```

---

## 📁 Global Types (`/types`)

### Base Types (`types/base.ts`)

```typescript
import type { ColumnFiltersState } from "@tanstack/react-table";

interface URLParams {
  page: number;
  pageSize: number;
}

interface Pagination {
  totalPages: number;
  currentPage?: number;
  pageSize?: number;
  totalCount?: number;
}

type FilterType = ColumnFiltersState;

interface BaseApiResponse<T> {
  path: string;
  timestamp: string;
  status: "success" | "fail";
  message: string;
  data: T;
  errors: string | null;
}

export type { BaseApiResponse, Pagination, URLParams, FilterType };
```

---

## 🎯 Dynamic Import Pattern

Always use dynamic imports for module components in pages:

```tsx
import dynamic from "next/dynamic";
import { CircularLoader } from "@/shared/components";

// With loading state
const EntityList = dynamic(
  () => import("@/modules/domain/sub-module").then((mod) => mod.EntityList),
  { loading: () => <CircularLoader /> }
);

// Without loading state (for dialogs/modals)
const CreateEntityDialog = dynamic(() =>
  import("../create-entity/CreateEntity").then((mod) => mod.CreateEntityDialog)
);
```

---

## 📋 Complete Feature Checklist

### Creating a New CRUD Module

- [ ] Create module folder: `modules/{domain}/{sub-module}/`
- [ ] Create `index.ts` with barrel exports
- [ ] **For Single Service Features:**
  - [ ] Create `service.ts` with API function + React Query hook + Options type
- [ ] **For Multiple Service Features:**
  - [ ] Create `services/` folder
  - [ ] Add individual service files (`createEntity.ts`, `updateEntity.ts`, etc.)
  - [ ] Add `services/types.ts` for service-specific types
- [ ] For each operation (create/update/delete/list/details):
  - [ ] Create feature folder
  - [ ] Add `types.ts` with DTOs and response types
  - [ ] Add `hooks.ts` for business logic orchestration
  - [ ] Add `schema.ts` for form validation (if form exists)
  - [ ] Add `{Component}.tsx` for UI
  - [ ] Add `utils.ts` if needed for transformations
  - [ ] Add `components/` folder for sub-components (if needed)
- [ ] Create page in `app/(protected)/{route-group}/{route}/page.tsx`
- [ ] Add detail page `app/(protected)/{route-group}/{route}/[entity-id]/page.tsx`
- [ ] Add translations in `languages/*.json`
- [ ] Add permissions if needed
- [ ] Add to sidebar navigation

### File Generation Order

1. `types.ts` - Define data structures first
2. `service.ts` or `services/` - API layer with Options types
3. `schema.ts` - Validation rules
4. `hooks.ts` - Business logic
5. `{Component}.tsx` - UI components
6. `components/` - Sub-components
7. `index.ts` - Export public API
