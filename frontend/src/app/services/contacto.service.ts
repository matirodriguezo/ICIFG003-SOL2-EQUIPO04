import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contacto {
  nombre: string;
  email: string;
  mensaje: string;
}

@Injectable({ providedIn: 'root' })
export class ContactoService {
  private apiUrl = '/api/v1/entities/contacto';

  constructor(private http: HttpClient) {}

  enviarContacto(data: Contacto): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}
