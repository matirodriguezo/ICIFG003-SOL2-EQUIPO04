import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../models/product';
import { MessageBannerComponent } from '../message-banner/message-banner.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MessageBannerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  @Input({ required: true }) items: CartItem[] = [];
  @Input() itemCount = 0;
  @Input() total = 0;
  @Output() remove = new EventEmitter<number>();
  @Output() checkout = new EventEmitter<void>();
}
