`# Configuración Docker para React + Vite

## Estructura del Proyecto

```
.
├── weatherApp/           # Aplicación React
├── .dockerignore        # Archivos a ignorar en el build
├── docker-compose.yml   # Configuración de servicios
└── Dockerfile          # Instrucciones de build
```

## Dockerfile Explicado

```dockerfile
FROM node:23-alpine
```

- Usamos la imagen base de Node.js con Alpine Linux
- Alpine es una distribución ligera que reduce el tamaño de la imagen
- La versión 23 asegura compatibilidad con las últimas características de Node.js

```dockerfile
WORKDIR /app/weatherApp
```

- Establece el directorio de trabajo dentro del contenedor
- Todas las instrucciones siguientes se ejecutarán desde esta ruta
- La estructura /app/weatherApp mantiene una organización clara

```dockerfile
COPY ./weatherApp/package*.json ./
```

- Copia solo los archivos package.json y package-lock.json
- Se hace antes de copiar todo el código para aprovechar el cache de Docker
- Si los package\*.json no cambian, se reutiliza la capa de node_modules

```dockerfile
RUN npm install
```

- Instala las dependencias dentro del contenedor
- Se ejecuta durante el build, no durante el runtime
- Asegura que todas las dependencias estén disponibles antes de copiar el código

```dockerfile
COPY ./weatherApp/. .
```

- Copia todo el código fuente de la aplicación
- Se hace después de npm install para optimizar el cache
- El punto final indica el WORKDIR actual como destino

```dockerfile
CMD ["npm", "run", "dev", "--", "--host"]
```

- Comando que se ejecuta cuando el contenedor inicia
- `--host` permite acceso desde fuera del contenedor
- Usa la sintaxis de array para evitar problemas con el shell

## Docker Compose Explicado

```yaml
version: "3.8"
```

- Especifica la versión del formato de docker-compose
- 3.8 proporciona las características más recientes estables

```yaml
services:
  react-weather:
```

- Define el servicio principal de la aplicación
- El nombre 'react-weather' es un identificador interno

```yaml
build:
  context: .
```

- Indica que debe construir una imagen usando el Dockerfile
- El contexto '.' significa que usa el directorio actual

```yaml
container_name: weatherApp
```

- Nombre específico para el contenedor en ejecución
- Facilita la referencia en comandos docker

```yaml
ports:
  - "3000:3000"
```

- Mapea el puerto 3000 del contenedor al host
- Permite acceder a la aplicación desde el navegador

```yaml
volumes:
  - /app/weatherApp/node_modules
```

- Volumen anónimo para preservar node_modules
- Evita que el montaje del código fuente sobrescriba las dependencias instaladas

```yaml
- ./weatherApp:/app/weatherApp:cached
```

- Monta el código fuente en el contenedor
- `:cached` optimiza el rendimiento en sistemas macOS
- Permite desarrollo en tiempo real (hot reload)

```yaml
environment:
  - HOST=0.0.0.0
```

- Configura variables de entorno
- HOST=0.0.0.0 permite conexiones desde cualquier IP

```yaml
stdin_open: true
```

- Mantiene STDIN abierto
- Necesario para algunas funcionalidades de desarrollo

## Comandos Útiles

```bash
# Construir la imagen
docker-compose build

# Reconstruir sin cache
docker-compose build --no-cache

# Iniciar los servicios
docker-compose up

# Iniciar en segundo plano
docker-compose up -d

# Detener los servicios
docker-compose down

# Ver logs
docker-compose logs -f

# Acceder al shell del contenedor
docker-compose exec react-weather sh
```
