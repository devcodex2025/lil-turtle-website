export interface TokenInfo {
    price: string;
    priceChange24h: number;
    marketCap: number;
    liquidity: number;
    volume24h: number;
    pairAddress: string;
    symbol: string;
}

export interface ChartDataPoint {
    time: number;
    value: number;
}

export const TOKEN_ADDRESS = 'CVGcZCShuPZJKAHe3VE4FBR4jo6jpL9Z9xP9Wigmpump';

export async function fetchTokenInfo(): Promise<TokenInfo | null> {
    try {
        // Pools endpoint — works for bonding-curve (pump.fun) tokens and for graduated pools
        const poolsResponse = await fetch(`https://api.geckoterminal.com/api/v2/networks/solana/tokens/${TOKEN_ADDRESS}/pools`);
        const poolsData = await poolsResponse.json();

        const pool = poolsData.data?.[0];
        if (!pool || !pool.attributes) return null;

        const priceUsd = pool.attributes.token_price_usd || pool.attributes.base_token_price_usd;
        if (!priceUsd) return null;

        // Derive symbol from pool name, e.g. "LILTURTLE / SOL"
        const symbol = ((pool.attributes.name || '').split('/')[0] || '').trim().toUpperCase() || 'LILTURTLE';

        return {
            price: priceUsd,
            priceChange24h: parseFloat(pool.attributes.price_change_percentage?.h24 || '0'),
            marketCap: parseFloat(pool.attributes.market_cap_usd || pool.attributes.fdv_usd || '0'),
            liquidity: parseFloat(pool.attributes.reserve_in_usd || '0'),
            volume24h: parseFloat(pool.attributes.volume_usd?.h24 || '0'),
            pairAddress: pool.attributes.address,
            symbol,
        };
    } catch (error) {
        console.error('Error fetching token info:', error);
        return null;
    }
}

export async function fetchChartData(pairAddress: string, timeframe: '1H' | '24H' | '7D' | '1M'): Promise<ChartDataPoint[]> {
    try {
        // Map timeframe to GeckoTerminal format
        // day, hour, minute
        let gtTimeframe = 'hour';
        let limit = 24;
        let aggregate = 1;

        switch (timeframe) {
            case '1H':
                gtTimeframe = 'minute';
                aggregate = 1; // 1 minute candles
                limit = 60;
                break;
            case '24H':
                gtTimeframe = 'hour';
                aggregate = 1; // 1 hour candles
                limit = 24;
                break;
            case '7D':
                gtTimeframe = 'hour';
                aggregate = 4; // 4 hour candles
                limit = 42; // 7 * 6
                break;
            case '1M':
                gtTimeframe = 'day';
                aggregate = 1; // 1 day candles
                limit = 30;
                break;
        }

        const response = await fetch(`https://api.geckoterminal.com/api/v2/networks/solana/pools/${pairAddress}/ohlcv/${gtTimeframe}?aggregate=${aggregate}&limit=${limit}`);
        const data = await response.json();

        if (!data.data || !data.data.attributes || !data.data.attributes.ohlcv_list) return [];

        // OHLCV format: [timestamp, open, high, low, close, volume]
        // We'll use close price for the line chart
        const points: ChartDataPoint[] = data.data.attributes.ohlcv_list.map((item: number[]) => ({
            time: item[0],
            value: item[4]
        })).reverse(); // API returns newest first, we want oldest first for chart

        return points;
    } catch (error) {
        console.error('Error fetching chart data:', error);
        return [];
    }
}
