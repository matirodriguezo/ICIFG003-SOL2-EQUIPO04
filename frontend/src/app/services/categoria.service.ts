import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriaProducto } from '../models/backend.models';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/v1/entities/categorias';

  constructor(private http: HttpClient) {}

  findAll(): Observable<CategoriaProducto[]> {
    return this.http.get<CategoriaProducto[]>(this.apiUrl);
  }
}
