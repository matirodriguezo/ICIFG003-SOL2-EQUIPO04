import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from './models/product';
import { Producto, CategoriaProducto } from './models/backend.models';
import { ProductoService } from './services/producto.service';
import { CategoriaService } from './services/categoria.service';
import { CheckoutService, CheckoutResponse } from './services/checkout.service';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartComponent } from './components/cart/cart.component';
import { MessageBannerComponent } from './components/message-banner/message-banner.component';
import { ToastComponent } from './components/toast/toast.component';
import { validateAndFormatRUT, validateChileanPhone, validateTextOnly, formatRUTWhileTyping } from './utils/rut-validator';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  rut?: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent,
    CartComponent,
    MessageBannerComponent,
    ToastComponent
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
  mobileMenuOpen = false;
  toastMessage = '';

  readonly navLinks: { label: string; href: string }[] = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Productos', href: '#productos' },
    { label: 'Ofertas', href: '#promociones' },
    { label: 'Contacto', href: '#contacto' }
  ];

  formData = { name: '', email: '', message: '' };
  errors: FormErrors = {};
  success = false;

  checkoutForm = { rut: '', nombre: '', apellido: '', correo: '', telefono: '', direccion: '', codigoPromocional: '' };
  checkoutErrors: FormErrors = {};
  showCheckout = false;
  checkoutLoading = false;
  checkoutError = '';
  receipt: CheckoutResponse | null = null;

  constructor(
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private checkoutService: CheckoutService,
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

  get checkoutDiscount(): number {
    if (this.checkoutForm.codigoPromocional === 'PET20') {
      const premiumTotal = this.cartItems
        .filter(item => item.nombre.toLowerCase().includes('premium'))
        .reduce((sum, item) => sum + (item.precio * item.quantity), 0);
      return premiumTotal * 0.20;
    }
    return 0;
  }

  get checkoutShipping(): number {
    if (this.cartItems.length === 0) return 0;
    return this.cartTotal > 30000 ? 0 : 3990;
  }

  get checkoutFinalTotal(): number {
    if (this.cartItems.length === 0) return 0;
    return this.cartTotal - this.checkoutDiscount + this.checkoutShipping;
  }

  get receiptHasRegalo(): boolean {
    if (!this.receipt) return false;
    return this.receipt.items.some((item: any) => item.productoNombre === 'Regalo Sorpresa');
  }

  addToCart(producto: Producto): void {
    const existing = this.cartItems.find((item) => item.id === producto.id);
    if (existing) {
      this.cartItems = this.cartItems.map((item) =>
        item.id === producto.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      this.toastMessage = producto.nombre + ' agregado al carrito';
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
    this.toastMessage = producto.nombre + ' agregado al carrito';
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  openCheckout(codigoPromocional: string = ''): void {
    this.showCart = false;
    this.showCheckout = true;
    this.checkoutForm = { rut: '', nombre: '', apellido: '', correo: '', telefono: '', direccion: '', codigoPromocional };
    this.checkoutErrors = {};
    this.checkoutError = '';
    this.receipt = null;
  }

  closeCheckout(): void {
    this.showCheckout = false;
  }

  confirmCheckout(): void {
    if (!this.validateCheckoutForm()) return;

    this.checkoutLoading = true;
    this.checkoutError = '';

    const items = this.cartItems.map((item) => ({
      productoId: item.id,
      cantidad: item.quantity
    }));

    this.checkoutService.checkout({
      rut: this.checkoutForm.rut,
      nombre: this.checkoutForm.nombre,
      apellido: this.checkoutForm.apellido,
      correo: this.checkoutForm.correo,
      telefono: this.checkoutForm.telefono,
      direccion: this.checkoutForm.direccion,
      codigoPromocional: this.checkoutForm.codigoPromocional,
      items
    }).subscribe({
      next: (response) => {
        this.receipt = response;
        this.checkoutLoading = false;
        this.cartItems = [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.checkoutError = err.message || 'Error al procesar la compra. Intenta nuevamente.';
        this.checkoutLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  private validateCheckoutForm(): boolean {
    const errs: any = {};

    // Validate RUT
    const rutValidation = validateAndFormatRUT(this.checkoutForm.rut);
    if (!rutValidation.isValid) {
      errs.rut = rutValidation.error || 'RUT inválido';
    } else {
      // Update form with formatted RUT
      this.checkoutForm.rut = rutValidation.formatted;
    }

    // Validate Name (only letters and spaces)
    const nameValidation = validateTextOnly(this.checkoutForm.nombre, 'El nombre');
    if (!nameValidation.isValid) {
      errs.nombre = nameValidation.error;
    }

    // Validate Last Name (only letters and spaces)
    const lastNameValidation = validateTextOnly(this.checkoutForm.apellido, 'El apellido');
    if (!lastNameValidation.isValid) {
      errs.apellido = lastNameValidation.error;
    }

    // Validate Email
    if (!this.checkoutForm.correo.trim()) {
      errs.correo = 'El correo es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.checkoutForm.correo)) {
      errs.correo = 'Ingresa un correo válido';
    }

    // Validate Phone
    const phoneValidation = validateChileanPhone(this.checkoutForm.telefono);
    if (!phoneValidation.isValid) {
      errs.telefono = phoneValidation.error;
    }

    // Validate Address
    if (!this.checkoutForm.direccion.trim()) {
      errs.direccion = 'La dirección es obligatoria';
    }

    this.checkoutErrors = errs;
    return Object.keys(errs).length === 0;
  }

  onRUTInput(value: string): void {
    // Format RUT while typing
    this.checkoutForm.rut = formatRUTWhileTyping(value);

    // Clear error when user is typing
    if (this.checkoutErrors.rut) {
      this.clearCheckoutError('rut');
    }
  }

  clearCheckoutError(field: string): void {
    if ((this.checkoutErrors as any)[field]) {
      this.checkoutErrors = { ...this.checkoutErrors, [field]: '' };
    }
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
