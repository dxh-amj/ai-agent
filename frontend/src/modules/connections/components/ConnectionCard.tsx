import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandMessenger,
  IconBrandTelegram,
  IconBrandWhatsapp,
  IconTrash,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";

import type { Connection } from "../types";

interface ConnectionCardProps {
  connection: Connection;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export const ConnectionCard = ({ connection, onDelete, isDeleting }: ConnectionCardProps) => {
  const Icon = getIcon(connection.provider);

  return (
    <div className="flex flex-col h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all hover:border-primary/20 dark:hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 dark:hover:shadow-primary/10">
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "p-3 rounded-xl bg-slate-50 dark:bg-slate-800",
            getIconColor(connection.provider)
          )}
        >
          <Icon size={28} stroke={1.5} />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(connection.id)}
          disabled={isDeleting}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          title="Delete connection"
        >
          <IconTrash size={18} />
        </Button>
      </div>

      <div className="mb-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          {connection.name}
        </h3>
        {connection.accountName && (
          <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Connected as: {connection.accountName}
          </p>
        )}
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          {connection.description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs px-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          Configure
        </Button>
      </div>
    </div>
  );
};

const getIcon = (provider: Connection["provider"]) => {
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

const getIconColor = (provider: Connection["provider"]) => {
  switch (provider) {
    case "facebook":
      return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
    case "messenger":
      return "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
    case "whatsapp":
      return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
    case "telegram":
      return "text-sky-500 dark:text-sky-400 bg-sky-50 dark:bg-sky-900/20";
    case "instagram":
      return "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-900/20";
    default:
      return "text-slate-600 dark:text-slate-400";
  }
};
