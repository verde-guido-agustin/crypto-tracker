// Formatea un número como precio en USD
export function formatPrice(value: number | null): string {
  if (value == null) return "—";

  if (value >= 1) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Para precios muy chicos (ej: monedas debajo de $1)
  return `$${value.toFixed(6)}`;
}

// Formatea market cap y volúmenes grandes (M, B, T)
export function formatLargeNumber(value: number | null): string {
  if (value == null) return "—";
  if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
  return `$${value.toLocaleString("en-US")}`;
}

// Formatea un porcentaje con signo y 2 decimales
export function formatPercent(value: number | null): string {
  if (value == null) return "—";
  const rounded = Math.round(value * 100) / 100;
  return `${rounded > 0 ? "+" : ""}${rounded.toFixed(2)}%`;
}

// Devuelve true si el porcentaje es positivo (para colorear verde/rojo)
export function isPositive(value: number | null): boolean {
  return value != null && value >= 0;
}