import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Lil Turtle - Premium Memecoin & NFT Collection';
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#020402',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 20,
                    }}
                >
                    {/* Turtle Icon Representation */}
                    <div
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            background: '#00ff9d',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 20,
                            boxShadow: '0 0 40px rgba(0, 255, 157, 0.4)',
                        }}
                    >
                        <div style={{ fontSize: 60 }}>🐢</div>
                    </div>
                </div>
                <div
                    style={{
                        fontSize: 80,
                        fontWeight: 'bold',
                        color: '#00ff9d',
                        marginBottom: 10,
                        textShadow: '0 0 20px rgba(0, 255, 157, 0.3)',
                    }}
                >
                    LIL TURTLE
                </div>
                <div
                    style={{
                        fontSize: 32,
                        color: 'white',
                        opacity: 0.8,
                        marginTop: 10,
                        textAlign: 'center',
                        maxWidth: '80%',
                    }}
                >
                    Premium Memecoin & NFT Collection on Solana
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
