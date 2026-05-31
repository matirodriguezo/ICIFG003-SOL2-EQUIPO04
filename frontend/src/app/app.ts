import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category, CartItem, Product, PRODUCTS } from './models/product';
import { MenuComponent, MenuLink } from './components/menu/menu.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { MessageBannerComponent } from './components/message-banner/message-banner.component';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MenuComponent,
    ProductCardComponent,
    CartComponent,
    MessageBannerComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  encapsulation: ViewEncapsulation.None
})
export class App {
  readonly products = PRODUCTS;
  readonly categories: Array<Category | 'Todos'> = ['Todos', 'Perros', 'Gatos', 'Accesorios'];
  readonly navLinks: MenuLink[] = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Promociones', href: '#promociones' },
    { label: 'Contacto', href: '#contacto' }
  ];
  readonly promotions = [
    { title: '20% OFF', text: 'En alimentos premium' },
    { title: 'Envio Gratis', text: 'Compras sobre $30.000' },
    { title: 'Regalo', text: 'Juguete en tu primera compra' }
  ];

  selectedCategory: Category | 'Todos' = 'Todos';
  cartItems: CartItem[] = [];

  formData = {
    name: '',
    email: '',
    message: ''
  };

  errors: FormErrors = {};
  success = false;

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'Todos') {
      return this.products;
    }
    return this.products.filter((product) => product.category === this.selectedCategory);
  }

  get itemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  addToCart(product: Product): void {
    const existing = this.cartItems.find((item) => item.id === product.id);
    if (existing) {
      this.cartItems = this.cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return;
    }
    this.cartItems = [...this.cartItems, { ...product, quantity: 1 }];
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  handleSubmit(): void {
    if (!this.validateForm()) {
      return;
    }

    this.success = true;
    this.formData = { name: '', email: '', message: '' };
    window.setTimeout(() => {
      this.success = false;
    }, 5000);
  }

  clearError(field: keyof FormErrors): void {
    if (this.errors[field]) {
      this.errors = { ...this.errors, [field]: '' };
    }
  }

  private validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!this.formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!this.formData.email.trim()) {
      newErrors.email = 'El correo electronico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
      newErrors.email = 'Por favor ingresa un correo electronico valido';
    }

    if (!this.formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (this.formData.message.trim().length < 20) {
      newErrors.message = 'El mensaje debe tener al menos 20 caracteres';
    }

    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }
}
