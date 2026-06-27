// Representa una moneda del listado principal
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d_in_currency: number | null;
  sparkline_in_7d: {
    price: number[];
  };
}

// Datos globales del mercado
export interface GlobalMarket {
  active_cryptocurrencies: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  market_cap_percentage: Record<string, number>;
  market_cap_change_percentage_24h_usd: number;
}

// Un punto del gráfico de precios históricos
export interface ChartPoint {
  time: string;
  price: number;
}