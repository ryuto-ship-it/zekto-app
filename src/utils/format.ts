export function won(n: number): string {
  return '₩' + Math.round(n).toLocaleString('en-US');
}

export function finalPrice(price: number, pct: number): number {
  return price * (1 - pct / 100);
}

export function imgUrl(base: string, width: number): string {
  return `${base}?w=${width}&q=80&auto=format&fit=crop`;
}
