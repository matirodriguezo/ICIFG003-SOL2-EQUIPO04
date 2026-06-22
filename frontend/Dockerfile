# ─── Etapa 1: Compilación de Angular ──────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar manifiestos de dependencias (cache eficiente)
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copiar el resto del código fuente
COPY . .

# Compilar Angular en modo producción
RUN npm run build -- --configuration production

# ─── Etapa 2: Servidor Nginx ───────────────────────────────────────────────────
FROM nginx:1.27-alpine

# Eliminar la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados de Angular al directorio de Nginx
# Angular 21 con @angular/build produce la salida en dist/<project>/browser/
COPY --from=builder /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
