import React from 'react';
import { vi } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';

// Stub the heavy HeroClient (3D canvas) to avoid ResizeObserver / WebGL needs in jsdom
vi.mock('../HeroClient', () => ({ default: () => <div data-testid="hero-client-mock" /> }));

import Hero from '../Hero';

describe('Hero layout', () => {
  it('uses Tailwind grid classes and does not set inline grid style', async () => {
    const { container } = render(<Hero />);

    // Find the container with the layout classes
    const layout = container.querySelector('.max-w-7xl');
    expect(layout).toBeTruthy();

    // Ensure the responsive classes are present
    expect(layout?.classList.contains('grid-cols-1')).toBe(true);
    expect(layout?.classList.contains('lg:grid-cols-2')).toBe(true);

    // There should be no inline gridTemplateColumns style (we rely on CSS)
    expect((layout?.getAttribute('style') || '')).not.toContain('grid-template-columns');

    // Simulate resize to a large desktop viewport and ensure no JS toggles the layout
    act(() => {
      (global as any).innerWidth = 1400;
      window.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      expect(layout?.classList.contains('grid-cols-1')).toBe(true);
      expect(layout?.classList.contains('lg:grid-cols-2')).toBe(true);
    });
  });
});
