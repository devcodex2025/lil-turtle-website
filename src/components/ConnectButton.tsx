"use client";

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import styled from 'styled-components';

// Custom styling for the wallet button to match our theme
// We use a wrapper since WalletMultiButton has its own styles
export default function ConnectButton() {
    return (
        <div className="wallet-adapter-button-trigger">
            <WalletMultiButton style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '9999px',
                color: '#fff',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 'bold',
                height: '40px',
                padding: '0 24px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
            }} />
            <style jsx global>{`
        .wallet-adapter-button {
          font-family: var(--font-outfit) !important;
        }
        .wallet-adapter-button:hover {
          background-color: rgba(0, 255, 157, 0.2) !important;
          border-color: #00ff9d !important;
          color: #00ff9d !important;
        }
        .wallet-adapter-dropdown-list {
          background: #0a0f0a !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .wallet-adapter-dropdown-list-item {
          font-family: var(--font-outfit) !important;
        }
        .wallet-adapter-dropdown-list-item:hover {
          background-color: rgba(0, 255, 157, 0.1) !important;
        }
      `}</style>
        </div>
    );
}
