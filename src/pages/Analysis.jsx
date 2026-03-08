import { useMemo } from 'react';
import { useCrypto } from '../context/CryptoContext';
import MarketChart from '../components/MarketChart';

const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
  { label: 'AUD', value: 'AUD' },
];

const Analysis = () => {
  const { currency, setCurrency, coins } = useCrypto();

  const topGainers = useMemo(() => {
    return [...coins]
      .sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0))
      .slice(0, 3);
  }, [coins]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Analysis</h1>
          <p className="text-slate-300 mt-1">Select your currency to update market data globally.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-slate-300">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none"
          >
            {currencies.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Top Movers</h2>
          <div className="space-y-3">
            {topGainers.length === 0 ? (
              <p className="text-slate-400">No market data available yet. Head to Market to load coins.</p>
            ) : (
              topGainers.map((coin) => (
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
                    <div className="text-sm text-emerald-300">
                      {coin.price_change_percentage_24h?.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <MarketChart />
      </section>
    </main>
  );
};

export default Analysis;
