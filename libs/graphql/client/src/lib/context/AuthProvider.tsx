"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { useAccount, useDisconnect } from "wagmi";
import { AuthTokenManager } from "../client";
import { useLazyFindUser } from "../requests";
import type { UserResponse } from "../types";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  signIn: () => void;
  viewAccount: () => void;
  updateUserInfo: () => Promise<UserResponse | null>;
  address?: string;
  chainId?: number;
  userInfo?: UserResponse | null;
}>({
  isAuthenticated: false,
  signIn: () => {},
  viewAccount: () => {},
  updateUserInfo: async () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { open } = useWeb3Modal();
  const { address, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  const cookies = useMemo(() => new Cookies(), []);
  const [accessToken, setAccessToken] = useState(cookies.get(AuthTokenManager.authCookieKey.accessToken));

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [findUserInfo] = useLazyFindUser();
  const [userInfo, setUserInfo] = useState<UserResponse | null>(null);

  const updateUserInfo = async () => {
    if (!isAuthenticated) return null;
    const response = await findUserInfo();
    const fetchedUserInfo = response.data?.findUser;
    if (fetchedUserInfo) {
      setUserInfo(fetchedUserInfo);
      return fetchedUserInfo;
    }
    return null;
  };

  const handleSignIn = () => {
    /* Disconnect existing connection */
    disconnect();
    AuthTokenManager.removeToken();

    /* New connection */
    open({ view: "Connect" });
  };

  const handleViewAccount = () => {
    open({ view: "Account" });
  };

  // NOTE: Update cookie to internal state
  useEffect(() => {
    const handleCookieChange = () => {
      setAccessToken(cookies.get(AuthTokenManager.authCookieKey.accessToken));
    };
    cookies.addChangeListener(handleCookieChange);
    return () => {
      cookies.removeChangeListener(handleCookieChange);
    };
  }, [cookies]);

  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true);
      updateUserInfo();
      return;
    }
    setIsAuthenticated(false);
    setUserInfo(null);
  }, [address, chainId, accessToken]);

  const providerValue = useMemo(() => {
    return {
      isAuthenticated,
      signIn: () => handleSignIn(),
      viewAccount: () => handleViewAccount(),
      updateUserInfo,
      address,
      chainId,
      userInfo,
    };
  }, [isAuthenticated, address, chainId, userInfo]);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
