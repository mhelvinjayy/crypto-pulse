import { useState, useEffect } from 'react';
import { useCrypto } from '../context/useCrypto';

export const useFetchCrypto = () => {
  const { setCoins, currency } = useCrypto();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    const start = Date.now();

    const fetchMarket = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        );
        if (!res.ok) throw new Error('The Market is closed (API Error)');
        const data = await res.json();
        if (!active) return;

        setCoins(data);
      } catch (err) {
        if (!active) return;
        setError(err.message);
      } finally {
        const elapsed = Date.now() - start;
        const remaining = 500 - elapsed;
        if (remaining > 0) {
          setTimeout(() => active && setLoading(false), remaining);
        } else {
          active && setLoading(false);
        }
      }
    };

    fetchMarket();

    return () => {
      active = false;
    };
  }, [currency, setCoins]);

  return { loading, error };
};
