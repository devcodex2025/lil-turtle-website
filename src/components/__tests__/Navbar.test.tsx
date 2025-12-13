import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

// Mock next/navigation's usePathname
const usePathnameMock = vi.fn(() => '/nfts');
vi.mock('next/navigation', () => ({ usePathname: () => usePathnameMock() }));

import Navbar from '../Navbar';

describe('Navbar mobile menu', () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue('/nfts');
    // Simulate mobile viewport by default for these tests
    (global as any).innerWidth = 375;
  });

  it('opens mobile menu and closes on route change', async () => {
    const { rerender } = render(<Navbar />);

    const button = screen.getByLabelText('Open menu');
    expect(button).toBeInTheDocument();
    // Open
    await act(async () => {
      fireEvent.click(button);
    });
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Simulate route change
    usePathnameMock.mockReturnValue('/buy');
    await act(async () => {
      rerender(<Navbar />);
    });

    const closedButton = screen.getByLabelText('Open menu');
    expect(closedButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes mobile menu on window resize to desktop width', async () => {
    render(<Navbar />);
    const button = screen.getByLabelText('Open menu');
    await act(async () => fireEvent.click(button));
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    // Simulate desktop resize
    (global as any).innerWidth = 1024;
    await act(async () => fireEvent(window, new Event('resize')));
    await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'false'));
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
