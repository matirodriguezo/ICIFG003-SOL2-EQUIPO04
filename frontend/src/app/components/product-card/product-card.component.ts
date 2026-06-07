import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/backend.models';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input({ required: true }) producto!: Producto;
  @Output() add = new EventEmitter<Producto>();

  added = false;

  constructor(private cdr: ChangeDetectorRef) {}

  handleAdd(): void {
    if (this.added) return;
    this.added = true;
    this.cdr.detectChanges();
    this.add.emit(this.producto);
    setTimeout(() => {
      this.added = false;
      this.cdr.detectChanges();
    }, 1000);
  }
}
