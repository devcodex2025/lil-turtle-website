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

const TOKEN_ADDRESS = '14XEVKV9LJJFWc7epbdd1W9E1a1JivB2st8sx4nCboop';

export async function fetchTokenInfo(): Promise<TokenInfo | null> {
    try {
        // 1. Fetch Token Info
        const tokenResponse = await fetch(`https://api.geckoterminal.com/api/v2/networks/solana/tokens/${TOKEN_ADDRESS}`);
        const tokenData = await tokenResponse.json();

        if (!tokenData.data || !tokenData.data.attributes) return null;

        const tokenAttrs = tokenData.data.attributes;
        const topPoolId = tokenData.data.relationships?.top_pools?.data?.[0]?.id;
        const pairAddress = topPoolId ? topPoolId.replace('solana_', '') : '';

        let priceChange24h = 0;

        // 2. Fetch Pool Info (if pair exists) to get 24h change
        if (pairAddress) {
            try {
                const poolResponse = await fetch(`https://api.geckoterminal.com/api/v2/networks/solana/pools/${pairAddress}`);
                const poolData = await poolResponse.json();
                if (poolData.data && poolData.data.attributes) {
                    priceChange24h = parseFloat(poolData.data.attributes.price_change_percentage?.h24 || '0');
                }
            } catch (e) {
                console.warn('Error fetching pool info:', e);
            }
        }

        return {
            price: tokenAttrs.price_usd,
            priceChange24h: priceChange24h,
            marketCap: parseFloat(tokenAttrs.fdv_usd || '0'),
            liquidity: parseFloat(tokenAttrs.total_reserve_in_usd || '0'),
            volume24h: parseFloat(tokenAttrs.volume_usd?.h24 || '0'),
            pairAddress: pairAddress,
            symbol: tokenAttrs.symbol
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
