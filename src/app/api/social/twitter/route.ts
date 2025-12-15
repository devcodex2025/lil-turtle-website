import { NextResponse } from 'next/server';

export async function GET() {
    // Requires TWITTER_BEARER_TOKEN in .env.local
    const token = process.env.TWITTER_BEARER_TOKEN;

    if (!token) {
        // Fallback for demo / development without keys
        return NextResponse.json({
            followers: 1200, // Default demo value
            mock: true
        });
    }

    try {
        // Lil Turtle Username: @LilTurtleSol (example - replace with actual if known or make configurable)
        // Ideally we resolve username to ID first, or just use user lookup by username
        // Endpoint: https://api.twitter.com/2/users/by/username/:username
        // Lil Turtle Username: @lilturtlenft (found in Footer.tsx)
        const username = 'lilturtlenft';

        const res = await fetch(`https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        if (!res.ok) {
            throw new Error(`Twitter API error: ${res.statusText}`);
        }

        const data = await res.json();
        const followers = data.data?.public_metrics?.followers_count;

        return NextResponse.json({ followers });

    } catch (error) {
        console.error('Failed to fetch Twitter stats:', error);
        return NextResponse.json({ followers: 0, error: 'Failed to fetch' }, { status: 500 });
    }
}
