# 🚀 Docker End‑to‑End Guide: Spring Boot (Maven) + React (Vite)

A quick, copy‑paste friendly checklist to go from **local code ➜ Docker images ➜ push to Docker Hub ➜ run from Docker Hub**.

---

## ✅ Prerequisites

- Install **Docker Desktop** (or Docker Engine) and **Docker Compose**.
- Create a **Docker Hub** account and run `docker login`.
- Backend uses **Java 17** (adjust if needed), frontend uses **Node 18**.
- Your repos are separate:
  - **Backend repo** (Spring Boot + Maven)
  - **Frontend repo** (React + Vite)

---

## 🧱 Backend (Spring Boot + Maven)

### 1) Make sure your JAR is executable

**pom.xml** must include the Spring Boot plugin:

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

Build the fat JAR:

```bash
mvn clean package spring-boot:repackage -DskipTests
```

Quick test (outside Docker):

```bash
java -jar target/<your-app>-0.0.1-SNAPSHOT.jar
```

### 2) Backend Dockerfile (in backend repo root)

```dockerfile
# ---- Buildless, runtime-only image ----
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY target/*SNAPSHOT.jar app.jar
# Optional: profile/env tuning via JAVA_OPTS
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
```

### 3) (Optional but recommended) CORS via env var

**application.properties** bridge to env var (relaxed binding):

```properties
# Map environment var FRONTEND_URL -> property frontend.url (with fallback)
frontend.url=${FRONTEND_URL:http://localhost:3000}
```

Use it in **SecurityConfig**:

```java
@Value("${frontend.url:http://localhost:3000}")
private String allowedOrigin;
```

CORS bean (simplified):

```java
@Bean
public CorsConfigurationSource corsConfigurationSource() {
  CorsConfiguration cfg = new CorsConfiguration();
  cfg.setAllowedOrigins(List.of(allowedOrigin));
  cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS","PATCH"));
  cfg.setAllowedHeaders(List.of("*"));
  cfg.setAllowCredentials(true);
  UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
  src.registerCorsConfiguration("/**", cfg);
  return src;
}
```

> If you need multiple origins, pass `FRONTEND_URLS` as comma‑separated and split in code.

### 4) Backend + DB docker-compose (backend repo)

Create **docker-compose.yml** to run Postgres + pgAdmin + backend:

```yaml
version: "3.8"

services:
  postgres:
    image: postgres:16
    container_name: postgres-container
    restart: always
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass123
      POSTGRES_DB: testdb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d testdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  pgadmin:
    image: dpage/pgadmin4
    container_name: pgadmin-container
    restart: always
    environment:
      PGADMIN_DEFAULT_EMAIL: admin@admin.com
      PGADMIN_DEFAULT_PASSWORD: admin123
    ports:
      - "5050:80"
    depends_on:
      - postgres

  springboot-app:
    build:
      context: .
      dockerfile: Dockerfile
    image: yourdockerhub/spring-be:latest # change to your Docker Hub repo
    container_name: springboot-container
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/testdb
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: pass123
      # For CORS — choose one of these based on your scenario:
      FRONTEND_URL: http://localhost:3000
      # FRONTEND_URL: http://host.docker.internal:3000        # frontend on host, backend in Docker (Win/Mac)
      # FRONTEND_URL: http://192.168.0.123:3000               # use LAN IP if needed (Linux or multi-device)
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:
```

Run everything:

```bash
docker compose up --build
```

---

## 🎨 Frontend (React + Vite)

### 1) Production Dockerfile (multi-stage + Nginx)

Place in **frontend repo** root:

```dockerfile
# ---- Build stage ----
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Runtime (Nginx) ----
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
# SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf** (frontend repo root):

```nginx
server {
  listen 80;
  root /usr/share/nginx/html;
  index index.html;
  location / {
    try_files $uri /index.html;
  }
}
```

### 2) Simple frontend-only docker-compose (frontend repo)

```yaml
version: "3.8"
services:
  frontend-app:
    build:
      context: .
      dockerfile: Dockerfile
    image: yourdockerhub/task-management-ui:latest # change to your repo
    container_name: task-management-ui
    ports:
      - "3000:80" # open http://localhost:3000
    environment:
      # If your backend is on localhost:8080 on the host
      - VITE_API_BASE_URL=http://localhost:8080/
      # If your backend runs in compose as `springboot-app`, use: http://springboot-app:8080/ (same compose file)
```

### 3) Access env var in React code (build‑time)

```ts
const API = import.meta.env.VITE_API_BASE_URL;
```

> Build‑time vars are baked into the static bundle. Changing them requires rebuild.

### 4) Optional: runtime env injection (no rebuild)

Use `window._env_` + entrypoint to generate `env-config.js` at container start.

- Add `env-config.js` placeholder in your repo (optional):

```js
window._env_ = { API_BASE_URL: "http://localhost:8080/" };
```

- Reference it in `index.html` **before** your app script:

```html
<script src="/env-config.js"></script>
```

- Update Dockerfile to copy an entrypoint:

```dockerfile
# after copying dist
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
```

- `docker-entrypoint.sh`:

```sh
#!/bin/sh
cat <<EOF > /usr/share/nginx/html/env-config.js
window._env_ = { API_BASE_URL: "${API_BASE_URL}" };
EOF
exec "$@"
```

- Use it at runtime:

```bash
docker run -p 3000:80 -e API_BASE_URL=http://localhost:8080 yourdockerhub/task-management-ui:latest
```

- In React, read it with fallback:

```ts
const API =
  (window as any)._env_?.API_BASE_URL || import.meta.env.VITE_API_BASE_URL;
```

---

## 🐳 Build Images Locally

From **backend repo**:

```bash
docker build -t yourdockerhub/spring-be:1.0.0 .
```

From **frontend repo**:

```bash
docker build -t yourdockerhub/task-management-ui:1.0.0 .
```

(Or use `:latest` if you prefer.)

---

## ⬆️ Push Images to Docker Hub

```bash
docker login
# tag if not already named with your Docker Hub namespace
docker tag yourdockerhub/spring-be:1.0.0 yourdockerhub/spring-be:1.0.0
docker tag yourdockerhub/task-management-ui:1.0.0 yourdockerhub/task-management-ui:1.0.0
# push
docker push yourdockerhub/spring-be:1.0.0
docker push yourdockerhub/task-management-ui:1.0.0
```

> Replace `yourdockerhub/...` with your actual Docker Hub username/repo, e.g. `trishita1902/task-management-ui:1.0.0`.

---

## ⬇️ Pull & Run Locally **from Docker Hub**

Run backend:

```bash
docker run -d --name springboot-container -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/testdb \
  -e SPRING_DATASOURCE_USERNAME=user \
  -e SPRING_DATASOURCE_PASSWORD=pass123 \
  -e FRONTEND_URL=http://localhost:3000 \
  yourdockerhub/spring-be:1.0.0
```

Run frontend:

```bash
docker run -d --name task-management-ui -p 3000:80 \
  -e API_BASE_URL=http://localhost:8080/ \
  yourdockerhub/task-management-ui:1.0.0
```

> If your backend is also containerized in compose, point the UI to that container/service name within the same compose network.

---

## 🧪 Quick Curl Test

```bash
curl -X POST http://localhost:8080/generate-token \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@email.com","password":"test@123"}'
```

---

## 🛠️ Troubleshooting Cheatsheet

- **CORS errors**

  - Ensure `FRONTEND_URL` matches the browser origin exactly (scheme + host + port).
  - On Win/Mac: use `http://host.docker.internal:3000` when backend is in Docker and frontend on host.
  - On Linux: add to compose `extra_hosts: ["host.docker.internal:host-gateway"]` or use your LAN IP.
  - Temporarily allow all to verify cause: `cfg.setAllowedOrigins(List.of("*"))`.

- **Nginx 404**

  - Make sure `COPY --from=build /app/dist /usr/share/nginx/html` is correct.
  - Add SPA rule `try_files $uri /index.html;` in `nginx.conf`.
  - Rebuild without cache if needed: `docker build --no-cache -t ... .`

- **DB connection fails at startup**

  - Use service name in JDBC URL: `jdbc:postgresql://postgres:5432/db`.
  - Keep `depends_on` + `healthcheck` for Postgres.

- **`localhost` confusion**

  - Inside container, `localhost` is the container itself. Use service names (in compose) or `host.docker.internal` / LAN IP to reach host.

- **Check logs**
  - `docker logs <container>`
  - `docker compose ps` / `docker ps`

---

## 📁 Optional: All-in-one compose (backend + db + frontend)

Use only if both repos are available together:

```yaml
version: "3.8"
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass123
      POSTGRES_DB: testdb
    ports: ["5432:5432"]
    volumes: ["postgres_data:/var/lib/postgresql/data"]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d testdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  springboot-app:
    image: yourdockerhub/spring-be:1.0.0 # or build: { context: ../backend }
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/testdb
      SPRING_DATASOURCE_USERNAME: user
      SPRING_DATASOURCE_PASSWORD: pass123
      FRONTEND_URL: http://frontend-app:80
    ports: ["8080:8080"]
    depends_on:
      postgres:
        condition: service_healthy

  frontend-app:
    image: yourdockerhub/task-management-ui:1.0.0 # or build: { context: ../frontend }
    environment:
      API_BASE_URL: http://springboot-app:8080/
    ports: ["3000:80"]
    depends_on: [springboot-app]

volumes:
  postgres_data:
```

---

## 🧾 Handy Commands

- Build image: `docker build -t name:tag .`
  (Ex: `docker build task-management-ui`)
- Run container: `docker run -d -p HOST:CONTAINER name:tag`
- compose container: `docker compose up` //only compose after build
- Compose up: `docker compose up --build` //compose with build

---

- Login: `docker login`
- Tag for Hub: `docker tag local:tag user/repo:tag`
  (Ex: `docker tag task-management-ui trishita1902/task-management-ui:latest`)

- Push: `docker push user/repo:tag`
- Pull: `docker pull user/repo:tag`
- Logs: `docker logs -f <container>`

---

**You’re set.** Duplicate this file into each repo and tweak the names/tags/ports. When in doubt, check the Troubleshooting section ✨
