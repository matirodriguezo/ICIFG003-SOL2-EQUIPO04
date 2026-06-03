import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CheckoutItem {
  productoId: number;
  cantidad: number;
}

export interface CheckoutRequest {
  nombre: string;
  correo: string;
  items: CheckoutItem[];
}

export interface ItemResponse {
  productoNombre: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface CheckoutResponse {
  carritoId: number;
  fecha: string;
  clienteNombre: string;
  clienteCorreo: string;
  total: number;
  items: ItemResponse[];
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private apiUrl = 'http://localhost:8080/api/v1/checkout';

  constructor(private http: HttpClient) {}

  checkout(data: CheckoutRequest): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(this.apiUrl, data);
  }
}
