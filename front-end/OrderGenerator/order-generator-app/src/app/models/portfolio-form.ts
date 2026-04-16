export interface PortfolioForm {
  portfolioId: string;
  symbol: string;
  value: number;
  side: 'BUY' | 'SELL';
  quantity: number;
}