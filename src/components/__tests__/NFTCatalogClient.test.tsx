import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import NFTCatalogClient from '../NFTCatalogClient';

// Mock next/navigation hooks used by the component
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: () => {} }),
  useSearchParams: () => ({ get: () => null })
}));

beforeEach(() => {
  // Mock fetch to return a successful response for Mini group
  global.fetch = vi.fn((input: any) => {
    const url = typeof input === 'string' ? input : input?.url;
    if (url && url.includes('/api/nfts/status')) {
      const results = { 'Mini-1': true, 'Mini-2': false, 'Mini-3': false };
      return Promise.resolve({ ok: true, json: async () => ({ status: 'ok', results }) } as any);
    }
    return Promise.resolve({ ok: true, json: async () => ({}) } as any);
  }) as any;
});

describe('NFTCatalogClient status checks', () => {
  it('hides checking indicator after initial check completes', async () => {
    const nfts = [
      { id: 'Mini-1', title: 'Mini 1', image: '/1.webp', collection: 'Abstract Lil Turtle Mini', rarity: 'Common', isSoldChecked: false },
      { id: 'Mini-2', title: 'Mini 2', image: '/2.webp', collection: 'Abstract Lil Turtle Mini', rarity: 'Common', isSoldChecked: false },
      { id: 'Mini-3', title: 'Mini 3', image: '/3.webp', collection: 'Abstract Lil Turtle Mini', rarity: 'Common', isSoldChecked: false },
    ];
    render(<NFTCatalogClient nfts={nfts as any} />);

    // Initially indicator should be present because initial check starts
    expect(screen.getByText('Checking on-chain status...')).toBeInTheDocument();

    // Wait for fetch to complete and indicator to disappear
    await waitFor(() => expect(screen.queryByText('Checking on-chain status...')).not.toBeInTheDocument());
  });
});
