import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { Product, Category } from '../data/products';
import { finalPrice } from '../utils/format';
import { CoinSymbol } from '../types/purchase';
import { ResaleListing, ChatThread, SEED_RESALE_LISTINGS, seedChatThread } from '../data/resale';
import { buildSeedPasses, SEED_PASS_COUNT } from '../data/walletSeed';
import { Transaction, TransactionType, makeTxHash } from '../data/transactions';
import { Tier, tierForSpend } from '../data/tiers';

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

export type PurchaseResult = { pass: Pass; earnedPoints: number };

type AppState = {
  balance: number;
  purchased: Pass[];
  purchasePass: (product: Product, coin: CoinSymbol, sourceLabel: string, pointsUsed?: number) => PurchaseResult;
  markUsed: (uid: number) => void;
  totalSaved: number;
  redeemedCount: number;
  resaleListings: ResaleListing[];
  listForResale: (passUid: number, resalePrice: number, description: string) => void;
  cancelResale: (passUid: number) => void;
  buyResaleListing: (listingId: string, coin: CoinSymbol, sourceLabel: string) => PurchaseResult | undefined;
  resoldCount: number;
  points: number;
  lifetimeSpend: number;
  tier: Tier;
  toggleLike: (listingId: string) => void;
  bumpListingViews: () => void;
  bumpListing: (listingId: string) => void;
  updateListingPrice: (listingId: string, newPrice: number) => void;
  sendChatMessage: (listingId: string, threadId: string, text: string) => void;
  markThreadRead: (listingId: string, threadId: string) => void;
  totalUnreadMessages: number;
  transactions: Transaction[];
  addFunds: (amount: number, coin: CoinSymbol, sourceLabel: string) => void;
  activeRegionName: string | null;
  setActiveRegionName: (name: string | null) => void;
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

let txCounter = 1;
function nextTxId() {
  return `tx-${txCounter++}`;
}

function makeCode() {
  const n = Math.floor(100000 + Math.random() * 899999);
  return `ZKT-${n}`;
}

function buildSeedTransactions(passes: Pass[]): Transaction[] {
  const now = Date.now();
  return passes
    .map((p, i) => ({
      id: `seed-tx-${p.uid}`,
      type: 'purchase' as TransactionType,
      label: p.title,
      amount: p.price / 1300,
      coin: p.coin,
      hash: makeTxHash(),
      status: 'confirmed' as const,
      timestamp: now - (passes.length - i) * 3 * 60 * 60 * 1000,
    }))
    .reverse();
}

const AUTO_REPLIES = [
  "Great, let me know when you're free!",
  "Sounds good, I'll send payment now.",
  'Can you hold it for me for an hour?',
  'Perfect, sending the payment shortly.',
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [balance, setBalance] = useState(STARTING_BALANCE);
  const [purchased, setPurchased] = useState<Pass[]>(() => buildSeedPasses());
  const [resaleListings, setResaleListings] = useState<ResaleListing[]>(SEED_RESALE_LISTINGS);
  const [resoldCount, setResoldCount] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>(() => buildSeedTransactions(buildSeedPasses()));
  const [activeRegionName, setActiveRegionName] = useState<string | null>(null);
  const [points, setPoints] = useState(() => {
    const seedSpend = buildSeedPasses().reduce((s, p) => s + p.price, 0);
    return Math.round(seedSpend * tierForSpend(seedSpend).earnRate);
  });

  const lifetimeSpend = useMemo(() => purchased.reduce((s, p) => s + p.price, 0), [purchased]);
  const tier = useMemo(() => tierForSpend(lifetimeSpend), [lifetimeSpend]);

  const pushTransaction = useCallback((t: Omit<Transaction, 'id' | 'hash' | 'status' | 'timestamp'>) => {
    setTransactions((prev) => [
      {
        ...t,
        id: nextTxId(),
        hash: makeTxHash(),
        status: 'confirmed',
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  const purchasePass = useCallback(
    (product: Product, coin: CoinSymbol, sourceLabel: string, pointsUsed = 0): PurchaseResult => {
      // Tier members get an extra stablecoin-only discount on top of the product's base coinPct.
      const price = finalPrice(product.price, product.coinPct + tier.discountBonusPct);
      const pointsRedeemed = Math.max(0, Math.min(pointsUsed, price));
      const payable = price - pointsRedeemed;
      const earnedPoints = Math.round(payable * tier.earnRate);
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
      setBalance((prev) => Math.max(0, prev - payable / 1300));
      setPoints((prev) => prev - pointsRedeemed + earnedPoints);
      pushTransaction({ type: 'purchase', label: product.title, amount: payable / 1300, coin });
      return { pass, earnedPoints };
    },
    [pushTransaction, tier]
  );

  const markUsed = useCallback((uid: number) => {
    setPurchased((prev) => prev.map((p) => (p.uid === uid ? { ...p, used: true } : p)));
  }, []);

  const listForResale = useCallback(
    (passUid: number, resalePrice: number, description: string) => {
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
          description: description.trim() || undefined,
          views: Math.floor(3 + Math.random() * 6),
          likes: 0,
          likedByMe: false,
          status: 'active',
          chats: [seedChatThread()],
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
    (listingId: string, coin: CoinSymbol, sourceLabel: string): PurchaseResult | undefined => {
      let result: PurchaseResult | undefined;
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
        const earnedPoints = Math.round(listing.resalePrice * tier.earnRate);
        result = { pass, earnedPoints };

        setPurchased((prevPassed) => {
          const withoutSellerCopy = listing.ownPassUid
            ? prevPassed.filter((p) => p.uid !== listing.ownPassUid)
            : prevPassed;
          return [pass, ...withoutSellerCopy];
        });
        setBalance((prevBalance) => Math.max(0, prevBalance - listing.resalePrice / 1300));
        setPoints((prev) => prev + earnedPoints);
        if (listing.ownPassUid) {
          setResoldCount((c) => c + 1);
          pushTransaction({ type: 'resale_sold', label: `Sold: ${listing.title}`, amount: listing.resalePrice / 1300, coin });
          // Keep the seller's own listing around (marked sold) so it still shows up in My Sales.
          return prev.map((l) => (l.id === listingId ? { ...l, status: 'sold' as const } : l));
        }
        pushTransaction({ type: 'resale_bought', label: listing.title, amount: listing.resalePrice / 1300, coin });

        return prev.filter((l) => l.id !== listingId);
      });
      return result;
    },
    [pushTransaction, tier]
  );

  const toggleLike = useCallback((listingId: string) => {
    setResaleListings((prev) =>
      prev.map((l) =>
        l.id === listingId ? { ...l, likedByMe: !l.likedByMe, likes: l.likes + (l.likedByMe ? -1 : 1) } : l
      )
    );
  }, []);

  const bumpListingViews = useCallback(() => {
    setResaleListings((prev) =>
      prev.map((l) => (l.status === 'active' ? { ...l, views: l.views + Math.floor(Math.random() * 3) } : l))
    );
  }, []);

  const bumpListing = useCallback((listingId: string) => {
    setResaleListings((prev) => {
      const found = prev.find((l) => l.id === listingId);
      if (!found) return prev;
      const bumped = { ...found, views: found.views + Math.floor(2 + Math.random() * 4) };
      return [bumped, ...prev.filter((l) => l.id !== listingId)];
    });
  }, []);

  const updateListingPrice = useCallback((listingId: string, newPrice: number) => {
    setResaleListings((prev) => {
      const listing = prev.find((l) => l.id === listingId);
      if (listing?.ownPassUid) {
        setPurchased((prevPassed) =>
          prevPassed.map((p) => (p.uid === listing.ownPassUid ? { ...p, resalePrice: newPrice } : p))
        );
      }
      return prev.map((l) => (l.id === listingId ? { ...l, resalePrice: newPrice } : l));
    });
  }, []);

  const sendChatMessage = useCallback((listingId: string, threadId: string, text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setResaleListings((prev) =>
      prev.map((l) => {
        if (l.id !== listingId) return l;
        return {
          ...l,
          chats: l.chats.map((c) =>
            c.id === threadId
              ? { ...c, messages: [...c.messages, { id: `m-${Date.now()}`, sender: 'me', text: trimmed, time: 'now' }] }
              : c
          ),
        };
      })
    );
    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      setResaleListings((prev) =>
        prev.map((l) => {
          if (l.id !== listingId) return l;
          return {
            ...l,
            chats: l.chats.map((c) =>
              c.id === threadId
                ? {
                    ...c,
                    unread: 0,
                    messages: [...c.messages, { id: `m-${Date.now()}-r`, sender: 'buyer', text: reply, time: 'now' }],
                  }
                : c
            ),
          };
        })
      );
    }, 1400);
  }, []);

  const markThreadRead = useCallback((listingId: string, threadId: string) => {
    setResaleListings((prev) =>
      prev.map((l) => {
        if (l.id !== listingId) return l;
        return { ...l, chats: l.chats.map((c) => (c.id === threadId ? { ...c, unread: 0 } : c)) };
      })
    );
  }, []);

  const addFunds = useCallback(
    (amount: number, coin: CoinSymbol, sourceLabel: string) => {
      setBalance((prev) => prev + amount);
      pushTransaction({ type: 'deposit', label: `Deposit via ${sourceLabel}`, amount, coin });
    },
    [pushTransaction]
  );

  const totalSaved = useMemo(() => purchased.reduce((s, p) => s + p.saved, 0), [purchased]);
  const redeemedCount = useMemo(() => purchased.filter((p) => p.used).length, [purchased]);
  const totalUnreadMessages = useMemo(
    () =>
      resaleListings
        .filter((l) => l.ownPassUid)
        .reduce((sum, l) => sum + l.chats.reduce((s, c) => s + c.unread, 0), 0),
    [resaleListings]
  );

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
      toggleLike,
      bumpListingViews,
      bumpListing,
      updateListingPrice,
      sendChatMessage,
      markThreadRead,
      totalUnreadMessages,
      transactions,
      addFunds,
      activeRegionName,
      setActiveRegionName,
      points,
      lifetimeSpend,
      tier,
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
      toggleLike,
      bumpListingViews,
      bumpListing,
      updateListingPrice,
      sendChatMessage,
      markThreadRead,
      totalUnreadMessages,
      transactions,
      addFunds,
      activeRegionName,
      points,
      lifetimeSpend,
      tier,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
