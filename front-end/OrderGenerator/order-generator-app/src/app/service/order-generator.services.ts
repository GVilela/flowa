import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Portfolio } from '../models/portfolio';
import { PortfolioForm } from '../models/portfolio-form';


@Injectable({ providedIn: 'root' })
export class PortfolioService {
// private readonly API_BASE = '/api'; //se tivesse um host para a API
private readonly API_BASE = 'https://localhost:7099/api';

portfolios = signal<Portfolio[]>([]);

  constructor(private http: HttpClient) {this.getPortfolios();}
  
  getPortfolios() {     
    return this.http.get<Portfolio[]>(`${this.API_BASE}/Portfolio/generate`).subscribe();
  }
  
  sendPortfolio(payload: PortfolioForm) {
    return this.http.post(`${this.API_BASE}/SetOrderGenerator`, payload);  
  }
}