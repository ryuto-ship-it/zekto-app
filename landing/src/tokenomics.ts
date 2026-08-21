// Standalone copy of ../../src/config/tokenomics.ts — kept separate since
// this landing page is its own Vite project. These figures are illustrative
// only; swap `value` (should sum to 100) for the real allocation once it's
// finalized, in both this file and the app's copy.
export type TokenomicsSlice = {
  key: string;
  label: string;
  value: number;
  color: string;
};

export const TOKENOMICS_ALLOCATION: TokenomicsSlice[] = [
  { key: 'community', label: 'Community & Rewards', value: 32, color: '#B18CFF' },
  { key: 'ecosystem', label: 'Ecosystem Reserve', value: 22, color: '#FF6FA5' },
  { key: 'team', label: 'Team & Advisors', value: 18, color: '#3DD9C5' },
  { key: 'partnerships', label: 'Merchant Partnerships', value: 15, color: '#F5C24C' },
  { key: 'liquidity', label: 'Liquidity & Escrow', value: 8, color: '#6C8CFF' },
  { key: 'public', label: 'Public Sale', value: 5, color: '#FF8A5C' },
];
