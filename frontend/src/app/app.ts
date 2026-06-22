import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from './models/product';
import { Producto, CategoriaProducto } from './models/backend.models';
import { ProductoService } from './services/producto.service';
import { CategoriaService } from './services/categoria.service';
import { CheckoutService, CheckoutResponse } from './services/checkout.service';
import { ContactoService } from './services/contacto.service';
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
  @ViewChild(CartComponent) cartComponent!: CartComponent;

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
  contactError = '';
  contactLoading = false;

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
    private contactoService: ContactoService,
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
    const currentQty = existing ? existing.quantity : 0;
    if (currentQty >= producto.stock) {
      this.toastMessage = `Stock insuficiente de "${producto.nombre}" (disponible: ${producto.stock})`;
      return;
    }
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
        if (this.cartComponent) {
          this.cartComponent.promoCode = '';
          this.cartComponent.appliedPromo = '';
          this.cartComponent.promoError = '';
          this.cartComponent.promoSuccess = '';
        }
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
    if (!this.checkoutForm.rut.trim()) {
      errs.rut = 'El RUT es obligatorio';
    } else {
      const rutValidation = validateAndFormatRUT(this.checkoutForm.rut);
      if (!rutValidation.isValid) {
        errs.rut = rutValidation.error || 'RUT inválido';
      } else {
        this.checkoutForm.rut = rutValidation.formatted;
      }
    }

    // Validate Name (only letters and spaces)
    if (!this.checkoutForm.nombre.trim()) {
      errs.nombre = 'El nombre es obligatorio';
    } else if (this.checkoutForm.nombre.trim().length < 2) {
      errs.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else {
      const nameValidation = validateTextOnly(this.checkoutForm.nombre, 'El nombre');
      if (!nameValidation.isValid) {
        errs.nombre = nameValidation.error;
      }
    }

    // Validate Last Name (only letters and spaces)
    if (!this.checkoutForm.apellido.trim()) {
      errs.apellido = 'El apellido es obligatorio';
    } else if (this.checkoutForm.apellido.trim().length < 2) {
      errs.apellido = 'El apellido debe tener al menos 2 caracteres';
    } else {
      const lastNameValidation = validateTextOnly(this.checkoutForm.apellido, 'El apellido');
      if (!lastNameValidation.isValid) {
        errs.apellido = lastNameValidation.error;
      }
    }

    // Validate Email
    const correo = this.checkoutForm.correo.trim();
    if (!correo) {
      errs.correo = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      errs.correo = 'Ingresa un correo válido (ej: nombre@dominio.cl)';
    }

    // Validate Phone
    if (!this.checkoutForm.telefono.trim()) {
      errs.telefono = 'El teléfono es obligatorio';
    } else {
      const phoneValidation = validateChileanPhone(this.checkoutForm.telefono);
      if (!phoneValidation.isValid) {
        errs.telefono = phoneValidation.error;
      }
    }

    // Validate Address
    if (!this.checkoutForm.direccion.trim()) {
      errs.direccion = 'La dirección es obligatoria';
    } else if (this.checkoutForm.direccion.trim().length < 5) {
      errs.direccion = 'Ingresa una dirección más detallada';
    }

    this.checkoutErrors = errs;
    return Object.keys(errs).length === 0;
  }

  onRUTInput(value: string): void {
    this.checkoutForm.rut = formatRUTWhileTyping(value);
    if (this.checkoutErrors.rut) {
      this.clearCheckoutError('rut');
    }
  }

  onPhoneInput(value: string): void {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (cleaned.startsWith('+')) {
      cleaned = '+' + cleaned.replace(/\+/g, '');
    }
    if (cleaned.length > 12) {
      cleaned = cleaned.slice(0, 12);
    }
    this.checkoutForm.telefono = cleaned;
    if (this.checkoutErrors.telefono) {
      this.clearCheckoutError('telefono');
    }
  }

  clearCheckoutError(field: string): void {
    if ((this.checkoutErrors as any)[field]) {
      this.checkoutErrors = { ...this.checkoutErrors, [field]: '' };
    }
  }

  handleSubmit(): void {
    if (!this.validateForm()) return;

    this.contactLoading = true;
    this.contactError = '';
    this.success = false;

    this.contactoService.enviarContacto({
      nombre: this.formData.name,
      email: this.formData.email,
      mensaje: this.formData.message
    }).subscribe({
      next: () => {
        this.success = true;
        this.contactLoading = false;
        this.formData = { name: '', email: '', message: '' };
        this.cdr.detectChanges();
        setTimeout(() => {
          this.success = false;
          this.cdr.detectChanges();
        }, 5000);
      },
      error: (err) => {
        this.contactError = err.message || 'Error al enviar el mensaje. Intenta nuevamente.';
        this.contactLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  retryLoadData(): void {
    this.loadData();
  }

  clearError(field: keyof FormErrors): void {
    if (this.errors[field]) {
      this.errors = { ...this.errors, [field]: '' };
    }
  }

  private validateForm(): boolean {
    const newErrors: FormErrors = {};
    const name = this.formData.name.trim();
    if (!name) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    } else if (name.length > 100) {
      newErrors.name = 'El nombre no puede exceder los 100 caracteres';
    }
    const email = this.formData.email.trim();
    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingresa un correo válido (ej: nombre@dominio.cl)';
    }
    const message = this.formData.message.trim();
    if (!message) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    } else if (message.length > 1000) {
      newErrors.message = 'El mensaje no puede exceder los 1000 caracteres';
    }
    this.errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }
}
