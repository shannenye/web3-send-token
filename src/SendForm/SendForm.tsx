import React, { useState } from "react";
import { useSendTransaction } from 'wagmi' 
import { parseEther } from 'viem' 
import { ReactComponent as BookIcon } from '../SVGs/Book.svg';
import './SendForm.css';

export interface SendFormType {
  balance: number,
  tokenType: string
}

const SendForm: React.FC<SendFormType> = ({ balance, tokenType }) => {
  const [recipient, setRecipient] = useState('');
  const [amountToSend, setAmountToSend] = useState(0.0);
  const { data: hash, sendTransaction } = useSendTransaction();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    sendTransaction({ to: recipient as `0x${string}`, value: parseEther(`${amountToSend}`) }) ;
  }
  
  return (
    <form className='send-form' onSubmit={handleSubmit}>
      <label htmlFor='address' className='send-form-label'>
        <div className='send-form-label-name'>
          Send To
        </div>
        <div className='send-form-input-wrapper'>
          <input 
            id='address'
            type='text'
            value={recipient}
            placeholder='Enter 0x Address'
            autoComplete='off'
            className='send-form-input'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setRecipient(e.target.value);
            }}
          />
          <span className='send-form-icon'>
            <BookIcon />
          </span>
        </div>
      </label>
      
      <label htmlFor="amount" className='send-form-label'>
        <div className='send-form-label-name'>
          Amount
          <span className='send-form-label-subtext'>
            Balance&#58; {balance} {tokenType}
          </span>
        </div>
        
        <div className='send-form-input-wrapper'>
          <input 
            id='amount'
            type='number'
            value={amountToSend}
            placeholder='0.0'
            className='send-form-input amount'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              setAmountToSend(+e.target.value);
            }}
          />
          <button
            className='send-form-max-btn'
            onClick={(e) => {
              e.preventDefault();
              setAmountToSend(balance);
            }}
          >
            Max
          </button>
        </div>
      </label>
      
      <button 
        className='send-form-btn'
        type='submit'
      >
        Send USDC
      </button>

      {hash && <div className='send-form-completed'>Transaction Hash: {hash}</div>} 
    </form>
  );
};

export default SendForm;