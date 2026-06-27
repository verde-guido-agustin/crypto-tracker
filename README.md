# Crypto Tracker

Dashboard de criptomonedas en tiempo real construido con React y TypeScript.

## Demo
[crypto-tracker-guido-verde.vercel.app](crypto-tracker-guido-verde.vercel.app)

## Features
- Precios en tiempo real de las top 30 criptomonedas
- Gráfico de precio histórico (24h, 7d, 30d, 90d)
- Stats globales del mercado (market cap, volumen, dominancia BTC)
- Buscador por nombre y símbolo
- Auto-refresh cada 60 segundos

## Stack
- React + TypeScript
- Recharts para los gráficos
- CoinGecko API (pública, sin API key)
- Vite
- Deploy en Vercel

## Correr localmente
```bash
git clone https://github.com/verde-guido-agustin/crypto-tracker
cd crypto-tracker
npm install
npm run dev
```