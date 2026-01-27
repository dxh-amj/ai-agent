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

interface PlatformCardProps {
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

export const PlatformCard = ({
  platform,
  connectedAccounts,
  onAdd,
  onDelete,
  isAdding,
  isDeleting,
}: PlatformCardProps) => {
  const Icon = getIcon(platform.provider);
  const styles = getPlatformStyles(platform.provider);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:border-primary/20 dark:hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 group">
      {/* Card Header with Gradient Accent */}
      <div className="relative p-6 pb-5 flex items-start justify-between z-10">
        {/* Subtle background gradient splash */}
        <div
          className={cn(
            "absolute top-0 right-0 w-32 h-32 opacity-[0.03] dark:opacity-[0.05] rounded-bl-full pointer-events-none transition-opacity group-hover:opacity-[0.08]",
            styles.bgGradient
          )}
        />

        <div className="flex items-center gap-4 z-10">
          <div
            className={cn(
              "p-3 rounded-xl shadow-sm ring-1 ring-inset ring-black/5 dark:ring-white/10 transition-transform group-hover:scale-105",
              styles.iconBg,
              styles.iconColor
            )}
          >
            <Icon size={26} stroke={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              {platform.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  connectedAccounts.length > 0
                    ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                    : "bg-slate-300 dark:bg-slate-700"
                )}
              />
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                {connectedAccounts.length} {connectedAccounts.length === 1 ? "account" : "accounts"}{" "}
                connected
              </p>
            </div>
          </div>
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => onAdd(platform.provider)}
          disabled={isAdding}
          className="h-8 text-xs gap-1.5 font-medium bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 z-10"
        >
          <IconPlus size={14} />
          Connect
        </Button>
      </div>

      {/* Connected Accounts List */}
      <div className="flex-1 p-5 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
        {connectedAccounts.length > 0 ? (
          <div className="space-y-3">
            {connectedAccounts.map((account) => (
              <div
                key={account.id}
                className="group/item flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:border-primary/20 dark:hover:border-primary/20"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={cn(
                      "w-2.5 h-2.5 rounded-full ring-2 ring-white dark:ring-slate-900",
                      "bg-emerald-500"
                    )}
                  />
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-none mb-1.5">
                      {account.accountName || "Connected Account"}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded-md">
                        active
                      </span>
                      <p className="text-[10px] text-slate-400 font-mono">ID: {account.id}</p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(account.id)}
                  disabled={isDeleting}
                  className="h-8 w-8 text-slate-400 opacity-0 group-hover/item:opacity-100 transition-all hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg"
                  title="Disconnect account"
                >
                  <IconTrash size={16} />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full min-h-[120px] flex flex-col items-center justify-center text-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full mb-3 opacity-50">
              <Icon stroke={1.5} size={20} className="text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-200">No accounts</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[150px]">
              Connect your first {platform.name} account to get started
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

const getPlatformStyles = (provider: Provider) => {
  switch (provider) {
    case "facebook":
      return {
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-900/20",
        bgGradient: "bg-blue-600",
      };
    case "messenger":
      return {
        iconColor: "text-blue-500 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-900/20",
        bgGradient: "bg-blue-500",
      };
    case "whatsapp":
      return {
        iconColor: "text-green-600 dark:text-green-400",
        iconBg: "bg-green-50 dark:bg-green-900/20",
        bgGradient: "bg-green-600",
      };
    case "telegram":
      return {
        iconColor: "text-sky-500 dark:text-sky-400",
        iconBg: "bg-sky-50 dark:bg-sky-900/20",
        bgGradient: "bg-sky-500",
      };
    case "instagram":
      return {
        iconColor: "text-pink-600 dark:text-pink-400",
        iconBg: "bg-pink-50 dark:bg-pink-900/20",
        bgGradient: "bg-gradient-to-tr from-yellow-400 via-orange-500 to-pink-600",
      };
    default:
      return {
        iconColor: "text-slate-600 dark:text-slate-400",
        iconBg: "bg-slate-50 dark:bg-slate-900/20",
        bgGradient: "bg-slate-600",
      };
  }
};
