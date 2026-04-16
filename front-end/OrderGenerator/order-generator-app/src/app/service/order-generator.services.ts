import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { TradeForm } from '../models/tradeform';


@Injectable({ providedIn: 'root' })
export class PortfolioService {
private readonly API_BASE = '/api';

portfolios = signal<Portfolio[]>([]);

  constructor(private http: HttpClient) {this.getPortfolios();}
  
  getPortfolios() {     
    return this.http.get<Portfolio[]>(`${this.API_BASE}/Portfolio/generate`).subscribe(data => this.portfolios.set(data));
  }
  
  sendTrade(payload: TradeForm) {
    return this.http.post(`${this.API_BASE}/OrderAccumulator`, payload);  
  }
}