import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useGraphqlClient } from "@libs/graphql";
import { AuthWrapper } from "~/client-next/src/components/LoginSheet/AuthWrapper";
import { AuthProvider } from "~/client-next/src/contexts/AuthProvider";
import { WalletProvider } from "~/client-next/src/contexts/WalletProvider";
import "../../public/globals-client.css";

const App = ({ Component, pageProps: { sessions, ...pageProps } }: AppProps) => {
  const client = useGraphqlClient();

  return (
    <WalletProvider>
      <AuthProvider>
        <AuthWrapper>
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </AuthWrapper>
      </AuthProvider>
    </WalletProvider>
  );
};

export default App;
