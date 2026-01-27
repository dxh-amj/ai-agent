import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandMessenger,
  IconBrandTelegram,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import { AVAILABLE_PLATFORMS } from "../service";

import type { Provider } from "../types";

interface AddConnectionDialogProps {
  onAdd: (provider: Provider) => void;
  isAdding: boolean;
}

export const AddConnectionDialog = ({ onAdd, isAdding }: AddConnectionDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (provider: Provider) => {
    onAdd(provider);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Connection</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Connection</DialogTitle>
          <DialogDescription>Select a platform to connect to your agent.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {AVAILABLE_PLATFORMS.map((platform) => {
            const Icon = getIcon(platform.provider);
            const colorClass = getIconColor(platform.provider);
            return (
              <button
                key={platform.provider}
                onClick={() => handleSelect(platform.provider)}
                disabled={isAdding}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-left"
              >
                <div className={cn("p-2 rounded-lg", colorClass)}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">{platform.name}</h4>
                  <p className="text-xs text-muted-foreground">{platform.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper functions duplicated to avoid circular deps or moved to utils in future
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

const getIconColor = (provider: Provider) => {
  switch (provider) {
    case "facebook":
      return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
    case "messenger":
      return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
    case "whatsapp":
      return "text-green-600 bg-green-50 dark:bg-green-900/20";
    case "telegram":
      return "text-sky-500 bg-sky-50 dark:bg-sky-900/20";
    case "instagram":
      return "text-pink-600 bg-pink-50 dark:bg-pink-900/20";
    default:
      return "text-slate-600";
  }
};
