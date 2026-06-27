import { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { Coin } from "../types/coin";
import { fetchCoinChart } from "../services/coingecko";
import type { ChartPoint } from "../types/coin";
import { formatPrice, formatPercent, isPositive } from "../utils/format";

interface PriceChartProps {
  coin: Coin;
  onClose: () => void;
}

const PERIODS = [
  { label: "24h", days: 1 },
  { label: "7d",  days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];

export function PriceChart({ coin, onClose }: PriceChartProps) {
  const [data, setData] = useState<ChartPoint[]>([]);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const positive = isPositive(coin.price_change_percentage_24h);
  const color = positive ? "#16a34a" : "#dc2626";

  useEffect(() => {
    setData([]); 
    setLoading(true);
    fetchCoinChart(coin.id, days)
      .then(setData)
      .finally(() => setLoading(false));
  }, [coin.id, days]);

  return (
    <div style={{
      background: "#fafafa", border: "1px solid #eee",
      borderRadius: 12, padding: "1.25rem", marginBottom: 20,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src={coin.image} alt={coin.name} width={28} height={28} style={{ borderRadius: 6 }} />
          <span style={{ fontSize: 16, fontWeight: 600 }}>{coin.name}</span>
          <span style={{ fontSize: 13, color: "#aaa", textTransform: "uppercase" }}>{coin.symbol}</span>
          <span style={{ fontSize: 18, fontWeight: 600, marginLeft: 8 }}>{formatPrice(coin.current_price)}</span>
          <span style={{ fontSize: 13, color }}>{formatPercent(coin.price_change_percentage_24h)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {PERIODS.map((p) => (
            <button
              key={p.days}
              onClick={() => setDays(p.days)}
              style={{
                fontSize: 12, fontWeight: 500, padding: "4px 12px",
                borderRadius: 6, border: "none", cursor: "pointer",
                background: days === p.days ? "#e8f5e9" : "transparent",
                color: days === p.days ? "#16a34a" : "#888",
              }}
            >
              {p.label}
            </button>
          ))}
          <button
            onClick={onClose}
            style={{ marginLeft: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: "#aaa" }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Gráfico */}
      {loading ? (
        <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa", fontSize: 13 }}>
          Cargando gráfico...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#aaa" }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11, fill: "#aaa" }} tickLine={false} axisLine={false} tickFormatter={(v) => formatPrice(v)} width={80} />
            <Tooltip
              contentStyle={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, fontSize: 13 }}
              formatter={(v: unknown) => [formatPrice(v as number), "Precio"]}
            />
            <Area type="monotone" dataKey="price" stroke={color} strokeWidth={2} fill="url(#colorGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}