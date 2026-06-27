import type { Coin, GlobalMarket, ChartPoint } from "../types/coin";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Trae las top 30 monedas con sparkline de 7 días
export async function fetchCoins(): Promise<Coin[]> {
  const res = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=24h,7d`
  );

  if (!res.ok) {
    throw new Error(`Error al obtener monedas: ${res.status}`);
  }

  return res.json();
}

// Trae los datos globales del mercado
export async function fetchGlobalData(): Promise<GlobalMarket> {
  const res = await fetch(`${BASE_URL}/global`);

  if (!res.ok) {
    throw new Error(`Error al obtener datos globales: ${res.status}`);
  }

  const json = await res.json();
  return json.data;
}

// Trae el historial de precios de una moneda para el gráfico
export async function fetchCoinChart(
  coinId: string,
  days: number
): Promise<ChartPoint[]> {
  const res = await fetch(
    `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  );

  if (!res.ok) {
    throw new Error(`Error al obtener gráfico: ${res.status}`);
  }

  const json = await res.json();

  // La API devuelve [timestamp, precio], lo convierte a { time, price }
  const points: ChartPoint[] = json.prices.map(([ts, price]: [number, number]) => ({
    time: new Date(ts).toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "short",
    }),
    price: Math.round(price * 100) / 100,
  }));

  if (points.length <= 80) return points;
  const step = Math.ceil(points.length / 80);
  return points.filter((_, i) => i % step === 0);
}