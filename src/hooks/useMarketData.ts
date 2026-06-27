import { useState, useEffect } from "react";
import type { Coin, GlobalMarket } from "../types/coin";
import { fetchCoins, fetchGlobalData } from "../services/coingecko";

interface UseMarketDataReturn {
  coins: Coin[];
  globalData: GlobalMarket | null;
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useMarketData(): UseMarketDataReturn {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [globalData, setGlobalData] = useState<GlobalMarket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);

      // Traemos las dos cosas en paralelo para ser más rápidos
      const [coinsData, global] = await Promise.all([
        fetchCoins(),
        fetchGlobalData(),
      ]);

      setCoins(coinsData);
      setGlobalData(global);
    } catch (e) {
      setError("No se pudieron cargar los datos. Verificá tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();

    // Auto-refresh cada 60 segundos
    const interval = setInterval(load, 60_000);

    // Cleanup: cuando el componente se desmonta, cancela el interval
    return () => clearInterval(interval);
  }, []);

  return { coins, globalData, loading, error, refresh: load };
}