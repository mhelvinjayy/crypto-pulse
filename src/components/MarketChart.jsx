import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useCrypto } from '../context/CryptoContext';

const MarketChart = () => {
  const { coins } = useCrypto();

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
    change: coin.price_change_percentage_24h,
  }));

  const getBarColor = (change) => {
    if (change == null) return '#22d3ee';
    return change >= 0 ? '#34d399' : '#f87171';
  };

  return (
    <div className="h-80 w-full p-4 bg-slate-900 rounded-xl mt-6">
      <h2 className="text-white mb-4">Price Comparison (USD)</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', border: 'none' }}
            formatter={(value, name) => {
              if (name === 'price') return [`$${value.toLocaleString()}`, 'Price'];
              return [value, name];
            }}
          />
          <Bar dataKey="price" radius={[4, 4, 0, 0]}>
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={getBarColor(entry.change)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
