// Placeholder $ZEKTO token allocation. These figures are illustrative only —
// swap `value` (percentage points, should sum to 100) for the real allocation
// once it's finalized, without touching the chart/legend rendering code.
export type TokenomicsSlice = {
  key: string;
  label: string;
  value: number;
  color: string;
};

export const TOKENOMICS_ALLOCATION: TokenomicsSlice[] = [
  { key: 'community', label: 'Community & Rewards', value: 32, color: '#6C3FC5' },
  { key: 'ecosystem', label: 'Ecosystem Reserve', value: 22, color: '#E0508A' },
  { key: 'team', label: 'Team & Advisors', value: 18, color: '#0EA5A8' },
  { key: 'partnerships', label: 'Merchant Partnerships', value: 15, color: '#F0B429' },
  { key: 'liquidity', label: 'Liquidity & Escrow', value: 8, color: '#3B5BDB' },
  { key: 'public', label: 'Public Sale', value: 5, color: '#FF7A5C' },
];
