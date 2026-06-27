import { useState } from "react";
import { StatCard } from "./components/StatCard";
import { CoinTable } from "./components/CoinTable";
import { useMarketData } from "./hooks/useMarketData";
import { PriceChart } from "./components/PriceChart";
import { SearchBar } from "./components/SearchBar";
import { formatLargeNumber, formatPercent, isPositive } from "./utils/format";
import type { Coin } from "./types/coin";

function App() {
  const { coins, globalData, loading, error } = useMarketData();
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [search, setSearch] = useState("");

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p style={{ padding: "2rem" }}>Cargando...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Crypto Tracker</h1>

      {globalData && (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 }}>
          <StatCard
            label="Market cap global"
            value={formatLargeNumber(globalData.total_market_cap.usd)}
            change={formatPercent(globalData.market_cap_change_percentage_24h_usd)}
            positive={isPositive(globalData.market_cap_change_percentage_24h_usd)}
          />
          <StatCard
            label="Volumen 24h"
            value={formatLargeNumber(globalData.total_volume.usd)}
          />
          <StatCard
            label="Dominancia BTC"
            value={`${Math.round(globalData.market_cap_percentage.btc)}%`}
          />
        </div>
      )}

      {selectedCoin && (
        <PriceChart
          coin={selectedCoin}
          onClose={() => setSelectedCoin(null)}
        />
      )}

      <SearchBar value={search} onChange={setSearch} />
      <CoinTable coins={filteredCoins} onSelectCoin={setSelectedCoin} />
    </div>
  );
}

export default App;