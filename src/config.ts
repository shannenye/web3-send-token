import { Transport } from 'viem';
import { http, createConfig } from 'wagmi';
import { avalancheFuji, Chain } from 'wagmi/chains';
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [avalancheFuji],
  connectors: [
    injected()
  ],
  transports: {
    [avalancheFuji.id]: http('​https://api.avax-test.network/ext/bc/C/rpc'),
  } as Record<Chain['id'], Transport>,
});

declare module 'wagmi' { 
  interface Register { 
    config: typeof config 
  } 
} 
