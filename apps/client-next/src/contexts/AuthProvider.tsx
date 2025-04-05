import { usePrivy, useWallets } from "@privy-io/react-auth";
import type { User } from "@privy-io/react-auth";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  authenticated: boolean;
  showLoginSheet: boolean;
  setShowLoginSheet: (show: boolean) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { ready, authenticated, user } = usePrivy();
  const { wallets } = useWallets();
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  console.log(ready, authenticated, showLoginSheet, user, wallets);

  useEffect(() => {
    if (ready && !authenticated) {
      setShowLoginSheet(true);
      return;
    }
    if (ready && authenticated) {
      setShowLoginSheet(false);
    }
  }, [ready, authenticated]);

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        showLoginSheet,
        setShowLoginSheet,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};
