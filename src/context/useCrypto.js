import { useContext } from 'react';
import { CryptoContext } from './cryptoContextObject';

export const useCrypto = () => useContext(CryptoContext);
