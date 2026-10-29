import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

// Mock next/navigation's usePathname
const usePathnameMock = vi.fn(() => '/');
vi.mock('next/navigation', () => ({ usePathname: () => usePathnameMock() }));

import Navbar from '../Navbar';

describe('Navbar mobile menu', () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue('/');
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

  it('removes inline font-size on buy while preserving server-set class', async () => {
    // simulate server-side class presence
    document.documentElement.classList.add('force-platform-font');

    usePathnameMock.mockReturnValue('/');
    const { rerender } = render(<Navbar />);
    // non-buy should preserve the class
    expect(document.documentElement.classList.contains('force-platform-font')).toBe(true);

    // Navigate to buy page
    usePathnameMock.mockReturnValue('/buy');
    await act(async () => rerender(<Navbar />));
    // buy page should remove the force class
    expect(document.documentElement.classList.contains('force-platform-font')).toBe(false);
  });

  it('removes inline font-size if injected after mount', async () => {
    usePathnameMock.mockReturnValue('/');
    render(<Navbar />);

    // Simulate a third-party widget injecting inline font-size
    document.documentElement.style.fontSize = '10px';

    // MutationObserver in Navbar should remove it quickly
    await waitFor(() => expect(document.documentElement.style.fontSize).toBe(''));
  });

  it('mobile button is hidden on desktop even if html font-size is injected', async () => {
    usePathnameMock.mockReturnValue('/');

    // Simulate desktop viewport
    (global as any).innerWidth = 1400;
    // Simulate third-party polluting font-size before mount
    document.documentElement.style.fontSize = '10px';

    render(<Navbar />);

    // Ensure matchMedia/resize observers settle
    await act(async () => fireEvent(window, new Event('resize')));

    // Mobile button should be present but hidden via runtime class
    const mobileButton = screen.getByLabelText('Open menu');
    expect(mobileButton).toHaveClass('hidden');

    // Desktop nav link should be visible
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeVisible();
  });

  it('restores layout and force-platform-font when navigating away from /buy', async () => {
    // Start on buy page with server-set class present
    document.documentElement.classList.add('force-platform-font');
    usePathnameMock.mockReturnValue('/buy');

    // Simulate Jupiter injecting an inline font-size while on buy
    document.documentElement.style.fontSize = '10px';

    // Render on buy page
    const { rerender } = render(<Navbar />);

    // On /buy we should not have the force class
    expect(document.documentElement.classList.contains('force-platform-font')).toBe(false);

    // Now navigate to non-buy page and simulate desktop viewport
    usePathnameMock.mockReturnValue('/');
    (global as any).innerWidth = 1400;

    await act(async () => rerender(<Navbar />));

    // MutationObserver effect + resize dispatch should clear inline font-size and restore class
    await waitFor(() => expect(document.documentElement.style.fontSize).toBe(''));
    await waitFor(() => expect(document.documentElement.classList.contains('force-platform-font')).toBe(true));

    // Mobile button should be hidden on desktop
    const mobileButton = screen.getByLabelText('Open menu');
    expect(mobileButton).toHaveClass('hidden');
  });
});
