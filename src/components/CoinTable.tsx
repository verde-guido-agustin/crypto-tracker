import type { Coin } from "../types/coin";
import { formatPrice, formatLargeNumber, formatPercent, isPositive } from "../utils/format";

interface CoinTableProps {
  coins: Coin[];
  onSelectCoin: (coin: Coin) => void;
}

export function CoinTable({ coins, onSelectCoin }: CoinTableProps) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #eee", textAlign: "left" }}>
            <th style={{ padding: "8px 12px", color: "#888", fontWeight: 500 }}>#</th>
            <th style={{ padding: "8px 12px", color: "#888", fontWeight: 500 }}>Moneda</th>
            <th style={{ padding: "8px 12px", color: "#888", fontWeight: 500, textAlign: "right" }}>Precio</th>
            <th style={{ padding: "8px 12px", color: "#888", fontWeight: 500, textAlign: "right" }}>24h</th>
            <th style={{ padding: "8px 12px", color: "#888", fontWeight: 500, textAlign: "right" }}>7d</th>
            <th style={{ padding: "8px 12px", color: "#888", fontWeight: 500, textAlign: "right" }}>Market cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              onClick={() => onSelectCoin(coin)}
              style={{ borderBottom: "1px solid #f5f5f5", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "12px", color: "#aaa" }}>{coin.market_cap_rank}</td>
              <td style={{ padding: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <img src={coin.image} alt={coin.name} width={24} height={24} style={{ borderRadius: 4 }} />
                  <span style={{ fontWeight: 500 }}>{coin.name}</span>
                  <span style={{ color: "#aaa", fontSize: 12, textTransform: "uppercase" }}>{coin.symbol}</span>
                </div>
              </td>
              <td style={{ padding: "12px", textAlign: "right", fontWeight: 500 }}>
                {formatPrice(coin.current_price)}
              </td>
              <td style={{
                padding: "12px", textAlign: "right",
                color: isPositive(coin.price_change_percentage_24h) ? "#16a34a" : "#dc2626"
              }}>
                {formatPercent(coin.price_change_percentage_24h)}
              </td>
              <td style={{
                padding: "12px", textAlign: "right",
                color: isPositive(coin.price_change_percentage_7d_in_currency) ? "#16a34a" : "#dc2626"
              }}>
                {formatPercent(coin.price_change_percentage_7d_in_currency)}
              </td>
              <td style={{ padding: "12px", textAlign: "right", color: "#555" }}>
                {formatLargeNumber(coin.market_cap)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}