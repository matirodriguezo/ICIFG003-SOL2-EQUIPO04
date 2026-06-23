# PetShop - Equipo 04

Plataforma web de comercio electrónico para una tienda de mascotas, desarrollada como solución para la Solemne 2 (ICIFG003). El sistema cuenta con un catálogo dinámico de productos, carrito de compras con sistema de promociones, validación de datos para clientes chilenos (RUT, teléfono) y está completamente containerizado con Docker.

## Arquitectura

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Frontend    │     │   Backend    │     │   Base de    │
│  Angular 21  │────>│ Spring Boot  │────>│   Datos      │
│  + Nginx     │     │  Java 17     │     │   MySQL 8.0  │
│  :80         │     │  :8080       │     │   :3306      │
└──────────────┘     └──────────────┘     └──────────────┘
       │                    │                     │
       └────────────────────┴─────────────────────┘
                      Docker Compose
                   Red interna: petshop-net
```

Los tres servicios se ejecutan en contenedores Docker orquestados con Docker Compose, conectados por una red interna `petshop-net`. El frontend usa Nginx para servir la SPA y hacer proxy reverso de las rutas `/api` hacia el backend.

## Tecnologías

**Frontend:**
- Angular 21 (Standalone Components)
- TypeScript
- CSS puro (Flexbox y CSS Grid)
- Bootstrap 5.3
- Vitest (pruebas unitarias)

**Backend:**
- Java 17 + Spring Boot 2.5.9
- Spring Data JPA / Hibernate
- MySQL 8.0
- Maven
- Lombok
- Spring Security + JWT (dependencias incluidas)

**Infraestructura:**
- Docker Desktop
- Docker Compose
- Nginx 1.27 (Alpine)
- Volúmenes persistentes para MySQL y logs

## Ramas del Proyecto

| Rama | Propósito |
|------|-----------|
| **DEV** | Desarrollo activo. Se trabaja directamente aquí, se hacen cambios, pruebas y commits. Puede tener código en progreso. |
| **QA** | Código estable y testeado. Se mergea desde DEV cuando la funcionalidad está completa y probada. Se ejecuta con Docker Compose para validación. |
| **main** | Versión de entrega final sol anterior. |

Flujo de trabajo recomendado:
```bash
# Trabajar en DEV
git checkout DEV
# ... hacer cambios, commits ...

# Cuando está listo, pasar a QA
git checkout QA
git merge DEV
docker compose up -d
```

## Requisitos Previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Node.js](https://nodejs.org/) y npm (para desarrollo local)
- [Angular CLI](https://angular.io/cli) (para desarrollo local)
- [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) (para desarrollo local)
- [MySQL 8.0](https://dev.mysql.com/downloads/installer/) (solo para desarrollo local sin Docker)

## Ejecución con Docker (QA - recomendado)

```bash
git checkout QA
docker compose up -d
```

Esto levanta tres contenedores:
- `petshop-db` — MySQL 8.0 con la base de datos `petshop`
- `petshop-backend` — API Spring Boot en Java 17
- `petshop-frontend` — Angular compilado servido por Nginx

La base de datos se inicializa automáticamente con datos de prueba (3 categorías y 18 productos).

**Servicios expuestos:**
| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:80 |
| Backend API | http://localhost:8080 |
| MySQL | localhost:3306 (usuario: root, password: 1234) |

### Comandos útiles

```bash
docker compose up -d          # Levantar servicios en segundo plano
docker compose down           # Detener y eliminar contenedores
docker compose down -v        # Detener y eliminar también volúmenes (borra datos)
docker compose logs -f        # Ver logs en tiempo real
docker compose logs -f backend # Ver solo logs del backend
```

## Ejecución Local sin Docker (DEV)

### Backend

1. Asegúrate de tener MySQL 8.0 corriendo localmente.
2. Crea una base de datos llamada `petshop`.
3. Configura las credenciales en `backend/src/main/resources/application.properties` si es necesario.
4. Ejecuta:
```bash
cd backend
mvn spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
ng serve
```

El frontend se conectará al backend en `http://localhost:8080` mediante el proxy configurado en `proxy.conf.json`.

## Características Principales

- Catálogo dinámico de productos con categorías
- Carrito de compras con panel deslizante
- Códigos promocionales (`PET20` = 20% descuento en productos premium, `NUEVO` = regalo sorpresa)
- Checkout con cálculo de subtotal, descuento, envío (gratis sobre $30.000 CLP) y total
- Validación de RUT chileno con formato automático
- Validación de teléfono y campos de solo texto
- Persistencia de logs del backend
- Seed data ejecutada al iniciar (inserciones idempotentes)
