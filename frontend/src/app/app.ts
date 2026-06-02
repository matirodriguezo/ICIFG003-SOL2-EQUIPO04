import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from './models/product';
import { Producto, CategoriaProducto } from './models/backend.models';
import { ProductoService } from './services/producto.service';
import { CategoriaService } from './services/categoria.service';
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
export class App implements OnInit {
  productos: Producto[] = [];
  categorias: CategoriaProducto[] = [];
  loading = true;
  error = '';

  selectedCategoria = 'Todos';
  cartItems: CartItem[] = [];
  showCart = false;

  readonly navLinks: MenuLink[] = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Ofertas', href: '#promociones' },
    { label: 'Contacto', href: '#contacto' }
  ];

  formData = { name: '', email: '', message: '' };
  errors: FormErrors = {};
  success = false;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.error = '';
    this.productoService.findAll().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
        this.cdr.detectChanges();
        this.loadCategories();
      },
      error: () => {
        this.error = 'No se pudieron cargar los productos. Verifica que el backend esté corriendo en el puerto 8080.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private loadCategories(): void {
    this.categoriaService.findAll().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  get allCategories(): string[] {
    const names = this.categorias.map((c) => c.nombre_categoria);
    return ['Todos', ...names];
  }

  get filteredProducts(): Producto[] {
    if (this.selectedCategoria === 'Todos') {
      return this.productos;
    }
    return this.productos.filter(
      (p) => p.categoria?.nombre_categoria === this.selectedCategoria
    );
  }

  get itemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.precio * item.quantity,
      0
    );
  }

  addToCart(producto: Producto): void {
    const existing = this.cartItems.find((item) => item.id === producto.id);
    if (existing) {
      this.cartItems = this.cartItems.map((item) =>
        item.id === producto.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return;
    }
    this.cartItems = [
      ...this.cartItems,
      {
        id: producto.id,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        imagen: producto.imagen,
        categoria_nombre: producto.categoria?.nombre_categoria ?? '',
        quantity: 1
      }
    ];
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  handleSubmit(): void {
    if (!this.validateForm()) return;
    this.success = true;
    this.formData = { name: '', email: '', message: '' };
    setTimeout(() => {
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
      newErrors.email = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email)) {
      newErrors.email = 'Ingresa un correo válido';
    }
    if (!this.formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (this.formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }
}
