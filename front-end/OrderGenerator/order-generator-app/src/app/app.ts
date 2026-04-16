import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Portfolio } from './models/portfolio';
import { CommonModule } from '@angular/common';
import { PortfolioService } from './service/order-generator.services';
import { PortfolioForm } from './models/portfolio-form';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true
})

export class AppComponent implements OnInit{  

  portfolios: any; 
  success = signal(false);
  
  portfolioForm: FormGroup;
  symbols = ["PETR4", "VALE3", "VIIA4"];

    
  constructor(private fb: FormBuilder, private portfolioService: PortfolioService) {

    this.portfolioForm = this.fb.group({
      portfolioId: ['', Validators.required],
      symbol: ['', Validators.required],      
      price: ['', [Validators.required, Validators.min(0.01), Validators.max(999.99)]],      
      quantity: ['', [Validators.required, Validators.min(1), Validators.max(99999)]],
      side: ['BUY', Validators.required]
    });    
  }

  ngOnInit() {
    this.portfolios= this.portfolioService.getPortfolios();

    this.portfolioForm = this.fb.group<PortfolioFormControls>({    
    portfolioId: new FormControl('', { validators: [Validators.required] }),    
    symbol: new FormControl('', { validators: [Validators.required] }),  
    quantity: new FormControl(0, { validators: [Validators.required, Validators.min(1)] }),    
    price: new FormControl(0, { validators: [Validators.required, Validators.min(0.01)] }),    
    side: new FormControl<"BUY" | "SELL" | null>(null, { validators: [Validators.required] })  });
  }


  selectedPortfolio = computed(() => {  
    const id = this.portfolioForm?.get('portfolioId')?.value;    
    return this.portfolios().find((w: Portfolio) => w.portfolioId === id);
  });

  formatCurrency(event: any) {
    let value = event.target.value.replace(/\D/g, "");
    value = (Number(value) / 100).toFixed(2);
    this.portfolioForm.patchValue({ price: value }, { emitEvent: false });
  }

  private initForm() {
    this.portfolioForm = this.fb.group<PortfolioFormControls>({
    portfolioId: new FormControl('', { nonNullable: false, validators: [Validators.required] }),
    symbol: new FormControl('', { nonNullable: false, validators: [Validators.required] }),
    price: new FormControl(null, { nonNullable: false, validators: [Validators.required, Validators.min(0.01)] }),
    quantity: new FormControl(null, { nonNullable: false, validators: [Validators.required, Validators.min(1)] }),
    side: new FormControl('BUY', { nonNullable: false, validators: [Validators.required] })  
    });
  }

  onConfirm() {
    if (this.portfolioForm.valid) {
      const payload: PortfolioForm = {
        ...this.portfolioForm.value,
        price: Number(this.portfolioForm.value.price),
        quantity: Number(this.portfolioForm.value.quantity)
      };
      
      console.log('Payload enviado:', payload);      
      this.success.set(true);
      setTimeout(() => this.success.set(false), 3000);
    }
  }

  onClear() {
    this.portfolioForm.reset({ side: 'BUY', portfolioId: '' });
    this.success.set(false);
  }
}

export type PortfolioFormControls = {
  portfolioId: FormControl<string | null>;
  symbol: FormControl<string | null>;
  price: FormControl<number | null>;
  side: FormControl<'BUY' | 'SELL' | null>;
  quantity: FormControl<number | null>;
};