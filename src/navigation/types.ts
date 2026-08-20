import { CoinSymbol, PaymentSource } from '../types/purchase';

export type RootStackParamList = {
  Tabs: undefined;
  ProductDetail: { productId: number; resaleId?: string };
  Purchase: { productId: number; resaleId?: string };
  QRCode: { passUid: number };
  Merchant: { merchantId: string };
  WalletConnect: { currentCoin: CoinSymbol; onSelectSource: (source: PaymentSource) => void; hideZekto?: boolean };
  Resell: { passUid: number };
  MySales: undefined;
  ChatList: { listingId: string };
  ChatRoom: { listingId: string; threadId: string };
  AddFunds: undefined;
  TransactionHistory: undefined;
  TierInfo: undefined;
};

export type TabParamList = {
  Discover: undefined;
  Wallet: undefined;
  Map: undefined;
  Profile: undefined;
};
