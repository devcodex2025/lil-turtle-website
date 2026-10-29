# 🐢 Lil Turtle

**Community Memecoin on Solana**

## 🌟 About

Lil Turtle is not just a memecoin; it's a lifestyle. We combine high-end aesthetics with community-driven tokenomics.

- **Token**: `$LILTURTLE` on Solana — [pump.fun](https://pump.fun/coin/CVGcZCShuPZJKAHe3VE4FBR4jo6jpL9Z9xP9Wigmpump)
- **Vibe**: Chill, steady, and stylish. "Small steps matter."
- **Website**: [lilturtle.fun](https://www.lilturtle.fun)

## 🎨 3D Character

Meet Lil Turtle – the most stylish token in your portfolio. The interactive 3D model (React Three Fiber) is rendered on the home page.

## 🔧 Token configuration

The token address is defined in a few components (`Hero`, `TokenLaunch`, `Footer`, `services/tokenData.ts`, `api/holders`). Search for the mint address to update it in one pass:

```
CVGcZCShuPZJKAHe3VE4FBR4jo6jpL9Z9xP9Wigmpump
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## 📦 Environment variables

- `NEXT_PUBLIC_SOLANA_RPC_URL` — custom Solana RPC for the holders API (optional, defaults to the public mainnet RPC).
