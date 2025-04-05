import type { ReactNode } from "react";
import { useAuth } from "~/client-next/src/contexts/AuthProvider";
import { LoginSheet } from "./LoginSheet";

interface AuthWrapperProps {
  children: ReactNode;
}

export const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { showLoginSheet, setShowLoginSheet } = useAuth();
  return (
    <>
      {children}
      <LoginSheet open={showLoginSheet} onOpenChange={setShowLoginSheet} />
    </>
  );
};
