import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let message = 'Ocurrió un error inesperado';
      if (error.status === 0) {
        message = 'No se puede conectar con el servidor. Verifica tu conexión.';
      } else if (error.status === 404) {
        message = 'Recurso no encontrado';
      } else if (error.status === 400) {
        message = error.error || 'Solicitud inválida';
      } else if (error.status >= 500) {
        message = 'Error del servidor. Intenta nuevamente más tarde.';
      }
      console.error(`[Error ${error.status}]:`, message);
      return throwError(() => new Error(message));
    })
  );
};
