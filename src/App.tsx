import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Container from './Container/Container';
import './App.css';
import { WagmiProvider } from 'wagmi';
import { config } from './config';

const queryClient = new QueryClient(); 

const App: React.FC<{}> = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <div className='App'>
          <Container />
        </div>
      </QueryClientProvider> 
    </WagmiProvider>
  );
}

export default App;
