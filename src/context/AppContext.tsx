import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Product, Category } from '../data/products';
import { finalPrice } from '../utils/format';
import { CoinSymbol } from '../types/purchase';

export type Pass = {
  uid: number;
  productId: number;
  title: string;
  merchant: string;
  loc: string;
  cat: Category;
  image: string;
  price: number;
  saved: number;
  code: string;
  used: boolean;
  coin: CoinSymbol;
  source: string;
};

type AppState = {
  balance: number;
  purchased: Pass[];
  purchasePass: (product: Product, coin: CoinSymbol, sourceLabel: string) => Pass;
  markUsed: (uid: number) => void;
  totalSaved: number;
  redeemedCount: number;
};

const AppContext = createContext<AppState | undefined>(undefined);

let uidCounter = 1;
function nextUid() {
  return uidCounter++;
}

function makeCode() {
  const n = Math.floor(100000 + Math.random() * 899999);
  return `ZKT-${n}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(1240);
  const [purchased, setPurchased] = useState<Pass[]>([]);

  const purchasePass = useCallback((product: Product, coin: CoinSymbol, sourceLabel: string): Pass => {
    const price = finalPrice(product.price, product.coinPct);
    const pass: Pass = {
      uid: nextUid(),
      productId: product.id,
      title: product.title,
      merchant: product.merchant,
      loc: product.loc,
      cat: product.cat,
      image: product.image,
      price,
      saved: product.price - price,
      code: makeCode(),
      used: false,
      coin,
      source: sourceLabel,
    };
    setPurchased((prev) => [pass, ...prev]);
    // Coin price is quoted in KRW in the mock data; balance is tracked in USDT for
    // display purposes only since there is no real FX/payment backend yet.
    setBalance((prev) => Math.max(0, prev - price / 1300));
    return pass;
  }, []);

  const markUsed = useCallback((uid: number) => {
    setPurchased((prev) => prev.map((p) => (p.uid === uid ? { ...p, used: true } : p)));
  }, []);

  const totalSaved = useMemo(() => purchased.reduce((s, p) => s + p.saved, 0), [purchased]);
  const redeemedCount = useMemo(() => purchased.filter((p) => p.used).length, [purchased]);

  const value = useMemo(
    () => ({ balance, purchased, purchasePass, markUsed, totalSaved, redeemedCount }),
    [balance, purchased, purchasePass, markUsed, totalSaved, redeemedCount]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
