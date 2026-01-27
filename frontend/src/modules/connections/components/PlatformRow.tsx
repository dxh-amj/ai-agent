import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandMessenger,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";

import type { Connection, Provider } from "../types";

interface PlatformRowProps {
  platform: {
    provider: Provider;
    name: string;
    icon: string;
    description: string;
  };
  connectedAccounts: Connection[];
  onAdd: (provider: Provider) => void;
  onDelete: (id: string) => void;
  isAdding: boolean;
  isDeleting: boolean;
}

export const PlatformRow = ({
  platform,
  connectedAccounts,
  onAdd,
  onDelete,
  isAdding,
  isDeleting,
}: PlatformRowProps) => {
  const Icon = getIcon(platform.provider);
  // We keep icon colors for brand recognition, but actions are now standardized
  const styles = getPlatformIconStyles(platform.provider);

  return (
    <div className="w-full rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Platform Header Row */}
      <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Platform Icon */}
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-slate-50 dark:bg-slate-800/50",
              styles.iconColor
            )}
          >
            <Icon size={26} stroke={1.5} />
          </div>

          {/* Platform Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              {platform.name}
              {connectedAccounts.length > 0 && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                  {connectedAccounts.length} Connected
                </span>
              )}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5 hidden sm:block">
              {platform.description}
            </p>
          </div>
        </div>

        {/* Action: Connect */}
        <Button
          size="sm"
          onClick={() => onAdd(platform.provider)}
          disabled={isAdding}
          className="gap-2 font-semibold h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white shadow-sm"
        >
          <IconPlus size={16} />
          <span className="hidden sm:inline">Connect Account</span>
          <span className="sm:hidden">Connect</span>
        </Button>
      </div>

      {/* Connected Accounts Table/List */}
      <div>
        {connectedAccounts.length > 0 ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-50/50 dark:bg-slate-800/30 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <div className="col-span-4">Account</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-3">Details</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {connectedAccounts.map((account) => (
              <div
                key={account.id}
                className="group flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 p-4 sm:px-6 sm:py-4 items-start sm:items-center hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
              >
                {/* Account Name */}
                <div className="col-span-4 flex items-center gap-3 w-full">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {account.accountName || "Connected Account"}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    Active
                  </span>
                </div>

                {/* Details (ID/Date) */}
                <div className="col-span-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  ID: {account.id}
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end w-full sm:w-auto mt-2 sm:mt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(account.id)}
                    disabled={isDeleting}
                    className="text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 gap-2 h-8 font-semibold"
                  >
                    <IconTrash size={16} />
                    <span className="hidden sm:inline">Disconnect</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800 mb-3">
              <span className="material-symbols-outlined text-2xl text-slate-300 dark:text-slate-600">
                link_off
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              No accounts connected for {platform.name}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions for styling
const getIcon = (provider: Provider) => {
  switch (provider) {
    case "facebook":
      return IconBrandFacebook;
    case "messenger":
      return IconBrandMessenger;
    case "whatsapp":
      return IconBrandWhatsapp;
    case "telegram":
      return IconBrandTelegram;
    case "instagram":
      return IconBrandInstagram;
    default:
      return IconBrandFacebook;
  }
};

const getPlatformIconStyles = (provider: Provider) => {
  // Only minimal branding for the icon itself, everything else is standard theme
  switch (provider) {
    case "facebook":
      return { iconColor: "text-blue-600 dark:text-blue-400" };
    case "messenger":
      return { iconColor: "text-blue-500 dark:text-blue-400" };
    case "whatsapp":
      return { iconColor: "text-green-600 dark:text-green-400" };
    case "telegram":
      return { iconColor: "text-sky-500 dark:text-sky-400" };
    case "instagram":
      return { iconColor: "text-pink-600 dark:text-pink-400" };
    default:
      return { iconColor: "text-muted-foreground" };
  }
};
