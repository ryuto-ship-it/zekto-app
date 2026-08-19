import { CoinSymbol, PaymentSource } from '../types/purchase';

export type RootStackParamList = {
  Tabs: undefined;
  ProductDetail: { productId: number };
  Purchase: { productId: number };
  QRCode: { passUid: number };
  Merchant: { merchantId: string };
  WalletConnect: { currentCoin: CoinSymbol; onSelectSource: (source: PaymentSource) => void };
};

export type TabParamList = {
  Discover: undefined;
  Wallet: undefined;
  Map: undefined;
  Profile: undefined;
};
