export type TierId = 'bronze' | 'silver' | 'gold' | 'platinum';

export type Tier = {
  id: TierId;
  label: string;
  emoji: string;
  minSpend: number;
  maxSpend: number | null;
  earnRate: number;
  discountBonusPct: number;
  perk: string | null;
};

export const TIERS: Tier[] = [
  { id: 'bronze', label: 'Bronze', emoji: '🥉', minSpend: 0, maxSpend: 2_000_000, earnRate: 0.02, discountBonusPct: 0, perk: null },
  { id: 'silver', label: 'Silver', emoji: '🥈', minSpend: 2_000_000, maxSpend: 5_000_000, earnRate: 0.025, discountBonusPct: 0.5, perk: null },
  { id: 'gold', label: 'Gold', emoji: '🥇', minSpend: 5_000_000, maxSpend: 10_000_000, earnRate: 0.03, discountBonusPct: 1, perk: 'Gold 회원 우선예약 가능' },
  { id: 'platinum', label: 'Platinum', emoji: '💎', minSpend: 10_000_000, maxSpend: null, earnRate: 0.04, discountBonusPct: 1.5, perk: 'Platinum 전담 컨시어지 상담 가능' },
];

export function tierForSpend(spend: number): Tier {
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (spend >= TIERS[i].minSpend) return TIERS[i];
  }
  return TIERS[0];
}

export function nextTier(tier: Tier): Tier | null {
  const idx = TIERS.findIndex((t) => t.id === tier.id);
  return idx >= 0 && idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
}

export function amountToNextTier(spend: number): number {
  const tier = tierForSpend(spend);
  const next = nextTier(tier);
  return next ? Math.max(0, next.minSpend - spend) : 0;
}
