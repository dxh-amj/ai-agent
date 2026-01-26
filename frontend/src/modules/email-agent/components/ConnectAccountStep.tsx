import { toast } from "sonner";

import {
  useConnectAccount,
  useConnectedAccounts,
  useDisconnectAccount,
} from "@/modules/email-agent";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Spinner } from "@/shared/ui/spinner";

export const ConnectAccountStep = ({ onNext }: { onNext: (accountId: string) => void }) => {
  const { data: accounts, isLoading } = useConnectedAccounts();
  const { mutate: connect, isPending: isConnecting } = useConnectAccount();
  const { mutate: disconnect, isPending: isDisconnecting } = useDisconnectAccount();

  const handleConnect = () => {
    // Determine a fake email based on disconnected accounts or random
    const mockEmail = `user.${Math.floor(Math.random() * 1000)}@gmail.com`;
    connect(mockEmail, {
      onSuccess: () => {
        toast.success("Account connected successfully");
      },
    });
  };

  const handleDisconnect = (id: string) => {
    disconnect(id, {
      onSuccess: () => toast.success("Account disconnected"),
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connect Gmail Account</CardTitle>
          <CardDescription>
            Connect one or more Gmail accounts to start sending emails.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center py-8">
            <Button
              onClick={() => handleConnect()}
              disabled={isConnecting}
              className="gap-3 h-12 px-6 rounded-full text-base font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
            >
              {isConnecting ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" /> Connecting...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Connect Gmail Account
                </>
              )}
            </Button>
          </div>

          <div className="space-y-3 mt-6">
            <h3 className="text-sm font-medium text-muted-foreground">Connected Accounts</h3>
            {accounts?.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No accounts connected yet.</p>
            ) : (
              <div className="grid gap-3">
                {accounts?.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm border border-slate-100">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{account.email}</p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {account.provider} • Connected
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onNext(account.id)}
                        className="text-primary hover:text-primary hover:bg-primary/5"
                      >
                        Select
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisconnect(account.id)}
                        disabled={isDisconnecting}
                        className="text-destructive hover:text-destructive hover:bg-destructive/5"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
