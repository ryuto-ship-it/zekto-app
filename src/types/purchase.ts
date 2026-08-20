export type CoinSymbol = 'USDT' | 'USDC' | 'KRW1';

export const COINS: { symbol: CoinSymbol; network: string }[] = [
  { symbol: 'USDT', network: 'Tron · fee ~0.5' },
  { symbol: 'USDC', network: 'Base · fee ~0.1' },
  { symbol: 'KRW1', network: 'KRW-pegged · fee 0' },
];

export type PaymentSourceType = 'zekto' | 'MetaMask' | 'Trust Wallet';

export type PaymentSource = {
  type: PaymentSourceType;
  label: string;
  sub: string;
};

export function zektoSource(balance: number, coin: CoinSymbol): PaymentSource {
  return {
    type: 'zekto',
    label: 'FuturePass Balance',
    sub: `${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} ${coin} available · instant`,
  };
}
