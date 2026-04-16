export interface TradeForm {
  portfolioId: string;
  symbol: string;
  value: number;
  side: 'BUY' | 'SELL';
  quantity: number;
}