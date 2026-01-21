import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { transformFilterKey } from "@/modules/manage-company/company-list/utils";
import { axios, objectToFormData, toCamelCase, toSnakeCase } from "@/utils";
import { handleApiError } from "@/utils/handleApiError";

import type {
  CompanyDetails,
  CompanyDetailsResponse,
  CompanyListResponse,
  CreateCompanyDTO,
  DeleteUserDTO,
  UpdateCompanyDTO,
} from "@/modules/manage-company/types";
import type { URLParams } from "@/shared/types";
import type { MutationConfig } from "@/utils/reactQuery";
import type { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import type { AxiosError } from "axios";

const GET_COMPANY_DETAILS_URL = (companyId: string) => `/api/core/v1/companies/${companyId}/`;

const getCompanyDetails = async (companyId: string): Promise<CompanyDetailsResponse | null> => {
  try {
    const response = await axios.get(GET_COMPANY_DETAILS_URL(companyId));
    const transformedData: CompanyDetails = toCamelCase(response.data);

    return {
      data: transformedData,
    };
  } catch (error) {
    handleApiError(error);
    return null;
  }
};

interface UseCompanyDetailsOptions {
  companyId: string;
  config?: MutationConfig<typeof getCompanyDetails>;
}

const useCompanyDetails = ({ companyId, config }: UseCompanyDetailsOptions) => {
  return useQuery<CompanyDetailsResponse | null, AxiosError>({
    queryKey: ["company-details", companyId],
    queryFn: () => getCompanyDetails(companyId),
    refetchOnWindowFocus: false,
    ...config,
  });
};

export { useCompanyDetails };

const GET_COMPANY_LIST_URL = (
  { page, pageSize }: URLParams,
  filters?: ColumnFiltersState,
  sorting?: SortingState
): string => {
  let baseUrl = `/api/core/v1/companies/?page=${page}&page_size=${pageSize}`;

  if (filters && Array.isArray(filters) && filters.length > 0) {
    filters.forEach((filter) => {
      if (filter.value) {
        const filterKey = transformFilterKey(filter.id);
        baseUrl += `&${filterKey}=${encodeURIComponent(String(filter.value))}`;
      }
    });
  }

  if (sorting && Array.isArray(sorting) && sorting.length > 0) {
    const sortParam = sorting[0];
    if (sortParam.id) {
      const fieldName = transformFilterKey(sortParam.id);
      const orderingValue = sortParam.desc ? `-${fieldName}` : fieldName;
      baseUrl += `&ordering=${orderingValue}`;
    }
  }

  return baseUrl;
};

export const getCompanyList = async (
  pagination?: PaginationState,
  filters?: ColumnFiltersState,
  sorting?: SortingState
): Promise<CompanyListResponse | null> => {
  const params = {
    page: (pagination?.pageIndex ?? 0) + 1,
    pageSize: pagination?.pageSize ?? 10,
  };

  const apiUrl = GET_COMPANY_LIST_URL(params, filters, sorting);

  try {
    const response: CompanyListResponse = await axios.get(apiUrl);
    const companies = toCamelCase(response.data);
    const paginationResp = toCamelCase(response.pagination);

    return {
      data: companies,
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

interface UseCompanyListOptions {
  pagination?: PaginationState;
  filters?: ColumnFiltersState;
  sorting?: SortingState;
  config?: MutationConfig<typeof getCompanyList>;
  enabled?: boolean;
}

export const useCompanyList = ({
  pagination,
  filters,
  sorting,
  config,
  enabled = true,
}: UseCompanyListOptions = {}) => {
  return useQuery<CompanyListResponse | null, AxiosError>({
    queryKey: ["company-list", pagination, filters, sorting],
    queryFn: () => getCompanyList(pagination, filters, sorting),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    enabled,
    ...config,
  });
};

const CREATE_COMPANY_URL = "/api/core/v1/companies/";

const createCompany = async (data: CreateCompanyDTO): Promise<CompanyListResponse> => {
  const payload = {
    ...toSnakeCase(data),
  };
  const formData = objectToFormData(payload);

  try {
    const response = await axios.post(CREATE_COMPANY_URL, formData, {
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

type CreateCompanyOptions = {
  config?: MutationConfig<typeof createCompany>;
};

const useCreateCompany = ({ config }: CreateCompanyOptions = {}) => {
  return useMutation<CompanyListResponse, AxiosError, CreateCompanyDTO>({
    mutationFn: createCompany,
    ...config,
  });
};

export { useCreateCompany };

const DELETE_USER_URL = (id: number) => `/api/core/v1/companies/${id}/`;

const deleteUser = async (data: DeleteUserDTO): Promise<void> => {
  try {
    await axios.delete(DELETE_USER_URL(data.id));
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

interface UseDeleteUserOptions {
  config?: MutationConfig<typeof deleteUser>;
}

const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  return useMutation<void, AxiosError, DeleteUserDTO>({
    mutationFn: deleteUser,
    ...config,
  });
};

export { useDeleteUser };

const UPDATE_USER_URL = (id: number) => `/api/core/v1/companies/${id}/`;

const updateCompany = async (data: UpdateCompanyDTO): Promise<CompanyListResponse> => {
  const { logo, ...rest } = data;

  const payload = {
    ...toSnakeCase(rest),
    ...(!logo || typeof logo === "string" ? {} : { logo }),
  };

  const formData = objectToFormData(payload);

  try {
    const { data: responseData } = await axios.put(UPDATE_USER_URL(data.id), formData, {
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

type UseUpdateCompanyOptions = {
  config?: MutationConfig<typeof updateCompany>;
};

export const useUpdateCompany = ({ config }: UseUpdateCompanyOptions = {}) => {
  return useMutation<CompanyListResponse, AxiosError, UpdateCompanyDTO>({
    mutationFn: updateCompany,
    ...config,
  });
};
