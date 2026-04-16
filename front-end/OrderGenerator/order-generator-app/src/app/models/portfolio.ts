export interface Portfolio {
  portfolioId: string;
  name: string;
  document: number; 
  totalValue: number;
  assets: string[];
  riskExposure: number;
  assetsCount: number;
  updatedAt: string;
}
