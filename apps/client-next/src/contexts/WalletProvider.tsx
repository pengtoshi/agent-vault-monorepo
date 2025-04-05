import { PrivyProvider } from "@privy-io/react-auth";

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID as string;

  return (
    <PrivyProvider
      appId={appId}
      clientId={clientId}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};
