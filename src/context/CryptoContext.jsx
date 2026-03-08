import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CryptoContext } from './cryptoContextObject';

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useLocalStorage('cryptoCurrency', 'USD');

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
