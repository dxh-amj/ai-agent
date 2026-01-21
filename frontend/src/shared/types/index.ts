export interface Preferences {
  id: number;
  language: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

interface Group {
  id: string;
  name: string;
  code: string;
}

interface Company {
  id: string;
  name: string;
}

interface MenuItem {
  id: number;
  name: string;
  routePath: string;
  languageKey: string;
  icon: string | null;
  parent: number | null;
  children?: MenuItem[];
}

interface UserProfile {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  profilePictureUrl: string | null;
  company: Company;
  isActive: boolean;
  isOnline: boolean;
  isDeleted: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  mfaEnabled: boolean;
  groups: Group[];
  permissions: MenuItem[];
  preferences: Preferences;
  lastLogin: string | null;
  dateJoined: string;
}

interface ResponseMetadata {
  path: string;
  timestamp: string;
  status: string;
  message: string;
  errors: unknown;
}

interface UserProfileResponse extends ResponseMetadata {
  data: UserProfile;
}

interface LoginDTO {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface Tokens {
  access: string;
  refresh: string;
}

interface LoggedInUsedData {
  tokens: Tokens;
  user: UserProfile;
}

interface MFAData {
  mfaRequired: boolean;
  mfaToken: string;
  mfaType?: "sms" | "totp";
  phoneNo?: string;
}

interface LoginResponse extends ResponseMetadata, Partial<MFAData> {
  data?: LoggedInUsedData;
}

interface LogoutResponse extends ResponseMetadata {
  data: null;
}

interface DropdownEntity {
  label: string;
  value: string;
}

interface Country {
  id: string;
  name: string;
  code: string;
}

type ExportFormat = "csv" | "json" | "html" | "tsv" | "yaml";

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

export type {
  Company,
  Country,
  DropdownEntity,
  ExportFormat,
  Group,
  LoggedInUsedData,
  LoginDTO,
  LoginResponse,
  LogoutResponse,
  MenuItem,
  MFAData,
  Pagination,
  ResponseMetadata,
  Tokens,
  URLParams,
  UserProfile,
  UserProfileResponse,
};
