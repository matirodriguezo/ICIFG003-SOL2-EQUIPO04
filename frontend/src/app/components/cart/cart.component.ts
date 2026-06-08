import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/product';
import { MessageBannerComponent } from '../message-banner/message-banner.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, MessageBannerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input({ required: true }) items: CartItem[] = [];
  @Input() itemCount = 0;
  @Input() total = 0;
  @Output() remove = new EventEmitter<number>();
  @Output() checkout = new EventEmitter<string>(); // Emite el código

  promoCode = '';
  appliedPromo = '';
  promoError = '';
  promoSuccess = '';

  applyPromo(): void {
    const code = this.promoCode.trim().toUpperCase();
    if (code === 'PET20') {
      const hasPremium = this.items.some(item => item.nombre.toLowerCase().includes('premium'));
      if (hasPremium) {
        this.appliedPromo = code;
        this.promoSuccess = 'Código aplicado. Válido solo para alimentos premium.';
        this.promoError = '';
      } else {
        this.appliedPromo = '';
        this.promoError = 'El código PET20 solo sirve para alimentos premium.';
        this.promoSuccess = '';
      }
    } else if (code === 'NUEVO') {
      this.appliedPromo = code;
      this.promoSuccess = 'Código aplicado correctamente';
      this.promoError = '';
    } else {
      this.appliedPromo = '';
      this.promoError = 'Código inválido';
      this.promoSuccess = '';
    }
  }

  get calculatedDiscount(): number {
    if (this.appliedPromo === 'PET20') {
      const premiumTotal = this.items
        .filter(item => item.nombre.toLowerCase().includes('premium'))
        .reduce((sum, item) => sum + (item.precio * item.quantity), 0);
      return premiumTotal * 0.20;
    }
    return 0;
  }

  get shippingCost(): number {
    if (this.items.length === 0) return 0;
    return this.total > 30000 ? 0 : 3990;
  }

  get finalTotal(): number {
    if (this.items.length === 0) return 0;
    return this.total - this.calculatedDiscount + this.shippingCost;
  }
}
