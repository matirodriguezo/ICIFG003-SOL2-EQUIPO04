import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      let message = 'Ocurrió un error inesperado. Intenta nuevamente.';
      if (error.status === 0) {
        message = 'No se puede conectar con el servidor. Verifica que el backend esté corriendo (puerto 8080).';
      } else if (error.status === 404) {
        message = 'Recurso no encontrado en el servidor.';
      } else if (error.status === 400) {
        message = error.error || 'Solicitud inválida. Revisa los datos ingresados.';
      } else if (error.status >= 500) {
        message = 'Error del servidor. Intenta nuevamente más tarde.';
      }
      return throwError(() => new Error(message));
    })
  );
};
