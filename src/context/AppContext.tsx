import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Product, Category } from '../data/products';
import { finalPrice } from '../utils/format';
import { CoinSymbol } from '../types/purchase';
import { ResaleListing, SEED_RESALE_LISTINGS } from '../data/resale';
import { buildSeedPasses, SEED_PASS_COUNT } from '../data/walletSeed';

export const STARTING_BALANCE = 15000;

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
  resaleStatus: 'none' | 'listed';
  resalePrice?: number;
};

type AppState = {
  balance: number;
  purchased: Pass[];
  purchasePass: (product: Product, coin: CoinSymbol, sourceLabel: string) => Pass;
  markUsed: (uid: number) => void;
  totalSaved: number;
  redeemedCount: number;
  resaleListings: ResaleListing[];
  listForResale: (passUid: number, resalePrice: number) => void;
  cancelResale: (passUid: number) => void;
  buyResaleListing: (listingId: string, coin: CoinSymbol, sourceLabel: string) => Pass | undefined;
  resoldCount: number;
};

const AppContext = createContext<AppState | undefined>(undefined);

let uidCounter = SEED_PASS_COUNT + 1;
function nextUid() {
  return uidCounter++;
}

let resaleUidCounter = 1;
function nextResaleId() {
  return `mine-${resaleUidCounter++}`;
}

function makeCode() {
  const n = Math.floor(100000 + Math.random() * 899999);
  return `ZKT-${n}`;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [purchased, setPurchased] = useState<Pass[]>(() => buildSeedPasses());
  const [resaleListings, setResaleListings] = useState<ResaleListing[]>(SEED_RESALE_LISTINGS);
  const [resoldCount, setResoldCount] = useState(0);

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
      resaleStatus: 'none',
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

  const listForResale = useCallback(
    (passUid: number, resalePrice: number) => {
      const pass = purchased.find((p) => p.uid === passUid);
      if (!pass) return;
      setPurchased((prev) =>
        prev.map((p) => (p.uid === passUid ? { ...p, resaleStatus: 'listed', resalePrice } : p))
      );
      setResaleListings((list) => [
        {
          id: nextResaleId(),
          productId: pass.productId,
          title: pass.title,
          merchant: pass.merchant,
          loc: pass.loc,
          cat: pass.cat,
          image: pass.image,
          originalPrice: pass.price,
          resalePrice,
          sellerLabel: 'You',
          ownPassUid: pass.uid,
        },
        ...list,
      ]);
    },
    [purchased]
  );

  const cancelResale = useCallback((passUid: number) => {
    setPurchased((prev) =>
      prev.map((p) => (p.uid === passUid ? { ...p, resaleStatus: 'none', resalePrice: undefined } : p))
    );
    setResaleListings((prev) => prev.filter((l) => l.ownPassUid !== passUid));
  }, []);

  const buyResaleListing = useCallback(
    (listingId: string, coin: CoinSymbol, sourceLabel: string): Pass | undefined => {
      let bought: Pass | undefined;
      setResaleListings((prev) => {
        const listing = prev.find((l) => l.id === listingId);
        if (!listing) return prev;

        const pass: Pass = {
          uid: nextUid(),
          productId: listing.productId,
          title: listing.title,
          merchant: listing.merchant,
          loc: listing.loc,
          cat: listing.cat,
          image: listing.image,
          price: listing.resalePrice,
          saved: listing.originalPrice - listing.resalePrice,
          code: makeCode(),
          used: false,
          coin,
          source: sourceLabel,
          resaleStatus: 'none',
        };
        bought = pass;

        setPurchased((prevPassed) => {
          const withoutSellerCopy = listing.ownPassUid
            ? prevPassed.filter((p) => p.uid !== listing.ownPassUid)
            : prevPassed;
          return [pass, ...withoutSellerCopy];
        });
        setBalance((prevBalance) => Math.max(0, prevBalance - listing.resalePrice / 1300));
        if (listing.ownPassUid) {
          setResoldCount((c) => c + 1);
        }

        return prev.filter((l) => l.id !== listingId);
      });
      return bought;
    },
    []
  );

  const totalSaved = useMemo(() => purchased.reduce((s, p) => s + p.saved, 0), [purchased]);
  const redeemedCount = useMemo(() => purchased.filter((p) => p.used).length, [purchased]);

  const value = useMemo(
    () => ({
      balance,
      purchased,
      purchasePass,
      markUsed,
      totalSaved,
      redeemedCount,
      resaleListings,
      listForResale,
      cancelResale,
      buyResaleListing,
      resoldCount,
    }),
    [
      balance,
      purchased,
      purchasePass,
      markUsed,
      totalSaved,
      redeemedCount,
      resaleListings,
      listForResale,
      cancelResale,
      buyResaleListing,
      resoldCount,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
