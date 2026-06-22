# ─── Etapa 1: Compilación con Maven ───────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /app

# Copiar archivos de configuración de Maven primero (cache de dependencias)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiar el código fuente y compilar el JAR
COPY src ./src
RUN mvn package -DskipTests -B

# ─── Etapa 2: Imagen de ejecución ─────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Crear directorio para logs (requerido por REQ10: logging.file.name)
RUN mkdir -p /app/logs

# Copiar solo el JAR generado desde la etapa de build
COPY --from=builder /app/target/*.jar app.jar

# Puerto expuesto por Spring Boot
EXPOSE 8080

# Arrancar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
