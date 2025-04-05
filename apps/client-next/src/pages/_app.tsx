import { ApolloProvider } from "@apollo/client";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import type { HttpTransport } from "viem";
import { http } from "viem";
import { VIEM_CHAINS } from "@libs/constants";
import { useGraphqlClient } from "@libs/graphql";
import { AuthWrapper } from "~/client-next/src/components/LoginSheet/AuthWrapper";
import { AuthProvider } from "~/client-next/src/contexts/AuthProvider";
import { WalletProvider } from "~/client-next/src/contexts/WalletProvider";
import "../../public/globals-client.css";

const queryClient = new QueryClient();
const chains = [Object.values(VIEM_CHAINS)[0], ...Object.values(VIEM_CHAINS).slice(1)] as const;
const transports = Object.fromEntries(chains.map((chain) => [chain.id, http()])) as Record<number, HttpTransport>;
export const wagmiConfig = createConfig({ chains, transports });

const App = ({ Component, pageProps: { sessions, ...pageProps } }: AppProps) => {
  const client = useGraphqlClient();

  return (
    <WalletProvider>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={wagmiConfig}>
          <AuthProvider>
            <AuthWrapper>
              <ApolloProvider client={client}>
                <Component {...pageProps} />
              </ApolloProvider>
            </AuthWrapper>
          </AuthProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </WalletProvider>
  );
};

export default App;
