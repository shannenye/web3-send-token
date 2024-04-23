import React, { useEffect, useMemo, useState } from "react";
import './Container.css';
import SendForm from "../SendForm/SendForm";
import { getDefaultProvider, formatEther, Contract } from 'ethers';
import { TOKEN_TYPE } from "./data";
import { useConnect } from "wagmi";
const genericErc20Abi = require("./erc20.abi.json"); // ERC20 ABI

const Container: React.FC<{}> = () => {
  const network = "https://api.avax-test.network/ext/bc/C/rpc";
  const provider = getDefaultProvider(network);
  const address = "0x5EC0fA36e450a56EA57621cCF94fD8F687520Fe1"; 
  const tokenContractAddress = '0x5425890298aed601595a70AB815c96711a31Bc65';
  const [balance, setBalance] = useState(0);
  const [tokenType, setTokenType] = useState(TOKEN_TYPE.USDC);
  const { connectors, connect } = useConnect()
  
  const contract = useMemo(() => {
    return new Contract(  
      tokenContractAddress,  
      genericErc20Abi,  
      provider  
    ); 
  }, [provider]); 
  
  useEffect(() => {
    
  }, [])
  
  useEffect(() => {
    // Get user's AVAX or USDC Balance and save to state
    if (tokenType === TOKEN_TYPE.AVAX) {
      const getAVAXBalance = async (): Promise<any> => {
        provider.getBalance(address).then((balance: bigint) => {
          // convert a currency unit from wei to ether
          const balanceInAvax = formatEther(balance);
          setBalance(+balanceInAvax);
          // balance: 2 AVAX
        });
      }; 
      
      getAVAXBalance();
    } else if (tokenType === TOKEN_TYPE.USDC) {
      const getUSDCBalance = async (): Promise<any> => {
        const USDCBalance = await contract.balanceOf(address);
        const formattedBalance = Number(USDCBalance) / (10**6);

        setBalance(formattedBalance);
      }
      
      getUSDCBalance();
    }
  }, [tokenType, provider, contract])
  

  
  return (
    <div className='container'>
      {connectors.map((connector: any) => (
        <button key={connector.uid} onClick={() => connect({ connector })}>
          {connector.name}
        </button>
      ))}
      <SendForm balance={balance} tokenType={tokenType} />
    </div>
  );
};

export default Container;
