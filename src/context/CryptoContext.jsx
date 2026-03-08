import { createContext, useState, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useLocalStorage('cryptoCurrency', 'USD');

  return (
    <CryptoContext.Provider value={{ coins, setCoins, currency, setCurrency }}>
      {children}
    </CryptoContext.Provider>
  );
};

export const useCrypto = () => useContext(CryptoContext);
