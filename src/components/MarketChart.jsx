import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useCrypto } from '../context/useCrypto';

const MarketChart = () => {
  const { coins, currency } = useCrypto();

  const chartData = coins.map((coin) => ({
    name: coin.symbol.toUpperCase(),
    price: coin.current_price,
  }));

  return (
    <div className="h-80 w-full p-4 bg-slate-900 rounded-xl mt-6">
      <h2 className="text-white mb-4">Price Trend ({currency})</h2>
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#0f172a', border: 'none' }}
            formatter={(value, name) => {
              if (name === 'price') return [
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency,
                }).format(value),
                'Price',
              ];
              return [value, name];
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#22d3ee"
            strokeWidth={3}
            dot={{ r: 4, fill: '#22d3ee' }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarketChart;
