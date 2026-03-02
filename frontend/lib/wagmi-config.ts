import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { avalanche, avalancheFuji } from "viem/chains";

const rpcUrl =
  process.env.NEXT_PUBLIC_RPC_URL ?? "https://api.avax-test.network/ext/bc/C/rpc";

export const config = createConfig({
  chains: [avalancheFuji, avalanche],
  connectors: [injected()],
  transports: {
    [avalancheFuji.id]: http(rpcUrl),
    [avalanche.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC ?? "https://api.avax.network/ext/bc/C/rpc"),
  },
});
