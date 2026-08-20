import { CoinSymbol } from '../types/purchase';

export type TransactionType = 'deposit' | 'purchase' | 'resale_sold' | 'resale_bought';

export type Transaction = {
  id: string;
  type: TransactionType;
  label: string;
  amount: number;
  coin: CoinSymbol;
  hash: string;
  status: 'confirmed' | 'pending';
  timestamp: number;
};

const HEX = '0123456789abcdef';
export function makeTxHash(): string {
  let out = '0x';
  for (let i = 0; i < 40; i++) out += HEX[Math.floor(Math.random() * HEX.length)];
  return out;
}

export function shortHash(hash: string): string {
  return `${hash.slice(0, 8)}...${hash.slice(-4)}`;
}

export function konetExplorerUrl(hash: string): string {
  return `https://konetexplorer.io/tx/${hash}`;
}

export const TX_TYPE_LABEL: Record<TransactionType, string> = {
  deposit: 'Deposit',
  purchase: 'Purchase',
  resale_sold: 'Resale · Sold',
  resale_bought: 'Resale · Bought',
};
