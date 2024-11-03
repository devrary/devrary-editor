"use client";
import { WagmiProvider, createConfig, http } from "wagmi";
import { berachainTestnetbArtio } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";

if (!process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID) {
  throw new Error("WAGMI_PROJECT_ID is required");
}
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [berachainTestnetbArtio],
    transports: {
      // RPC URL for each chain
      [berachainTestnetbArtio.id]: http(
        `${process.env.NEXT_PUBLIC_BERACHAIN_RPC_URL}`
      ),
    },

    walletConnectProjectId: `${process.env.NEXT_PUBLIC_WAGMI_PROJECT_ID}`,
    appName: "Berachain meme generator",
    appDescription: "Berachain meme generator",
  })
);

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

const Web3Provider = ({ children }: Props) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Web3Provider;
