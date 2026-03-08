import { useEffect, useMemo, useRef } from 'react';
import { useCrypto } from '../context/CryptoContext';
import { useFetchCrypto } from '../hooks/useFetchCrypto';
import { useLocalStorage } from '../hooks/useLocalStorage';
import MarketChart from '../components/MarketChart';

const LoadingSpinner = () => (
  <div className="flex items-center gap-2 text-slate-200">
    <div className="h-4 w-4 rounded-full animate-pulse bg-cyan-400" />
    <span>Scanning Blockchain...</span>
  </div>
);

const coinMatches = (coin, query) => {
  const lower = query.trim().toLowerCase();
  if (!lower) return true;
  return (
    coin.name.toLowerCase().includes(lower) ||
    coin.symbol.toLowerCase().includes(lower) ||
    coin.id.toLowerCase().includes(lower)
  );
};

const Home = () => {
  const { coins, currency } = useCrypto();
  const { loading, error } = useFetchCrypto();
  const [query, setQuery] = useLocalStorage('cryptoSearch', '');
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(
    () => coins.filter((coin) => coinMatches(coin, query)),
    [coins, query]
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Market Pulse</h1>
          <p className="text-slate-300 mt-1">Top 10 cryptocurrencies by market cap ({currency})</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search coins..."
            className="rounded-md border border-slate-700 bg-slate-950 px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
          />
          <span className="text-sm text-slate-400">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>
        </div>
      </header>

      <section className="mt-10">
        {loading ? (
          <div className="rounded-xl bg-slate-900 p-6">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="rounded-xl bg-rose-900 p-6 text-rose-100">
            <strong className="block">Error:</strong>
            {error}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl bg-slate-900 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Market Snapshot</h2>
              <div className="space-y-3">
                {filtered.map((coin) => {
                  const change = coin.price_change_percentage_24h;
                  const changeClass = change >= 0 ? 'text-emerald-300' : 'text-rose-300';
                  return (
                    <div
                      key={coin.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-slate-950 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <img src={coin.image} alt={coin.name} className="h-10 w-10 rounded-full" />
                        <div>
                          <div className="font-semibold text-white">{coin.name}</div>
                          <div className="text-sm text-slate-400">{coin.symbol.toUpperCase()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">
                          {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency,
                          }).format(coin.current_price)}
                        </div>
                        <div className={`text-sm ${changeClass}`}>
                          {change != null ? `${change.toFixed(2)}%` : '—'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <MarketChart />
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
