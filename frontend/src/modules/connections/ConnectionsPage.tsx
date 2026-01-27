"use client";

import { Skeleton } from "@/shared/ui/skeleton";

import { PlatformRow } from "./components/PlatformRow";
import { useConnectionsData } from "./hooks";
import { AVAILABLE_PLATFORMS } from "./service";

export const ConnectionsPage = () => {
  const { connections, isLoading, addConnection, isAdding, deleteConnection, isDeleting } =
    useConnectionsData();

  if (isLoading) {
    return <ConnectionsPageSkeleton />;
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Connections
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Manage your social media integrations and connected accounts.
          </p>
        </div>
      </div>

      {/* Platform Rows Stack */}
      <div className="space-y-4">
        {AVAILABLE_PLATFORMS.map((platform) => {
          const platformConnections = connections.filter((c) => c.provider === platform.provider);

          return (
            <PlatformRow
              key={platform.provider}
              platform={platform}
              connectedAccounts={platformConnections}
              onAdd={addConnection}
              onDelete={deleteConnection}
              isAdding={isAdding}
              isDeleting={isDeleting}
            />
          );
        })}
      </div>
    </div>
  );
};

const ConnectionsPageSkeleton = () => {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => `skeleton-item-${i}`).map((id) => (
          <div
            key={id}
            className="rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-6" />
                  <Skeleton className="w-48 h-4" />
                </div>
              </div>
              <Skeleton className="w-36 h-9 rounded-lg" />
            </div>
            <div className="p-6">
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
