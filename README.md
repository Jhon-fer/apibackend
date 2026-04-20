# 🚀 API Backend Node.js

## 📌 Información del estudiante

* **Nombre:** Jhon Fernando Gómez Quispe
* **ID:** 1613201
* **Carrera:** Ingeniería de Software con Inteligencia Artificial
* **Institución:** SENATI

---

## 📌 Descripción del proyecto

Este proyecto consiste en el desarrollo de una **API REST** utilizando Node.js y Express, conectada a una base de datos MySQL en la nube (Railway).

Incluye:

* CRUD completo de items
* Sistema de autenticación (registro y login)
* Encriptación de contraseñas
* Generación de tokens JWT
* Protección de rutas

---

## 🛠 Tecnologías utilizadas

* Node.js
* Express
* MySQL (Railway)
* jsonwebtoken (JWT)
* bcryptjs
* cors
* dotenv
* nodemon

---

## ⚙️ Instalación y ejecución

### 📥 1. Clonar el proyecto

```bash
git clone TU_URL_DEL_REPOSITORIO
cd api-backend
```

---

### 📦 2. Inicializar proyecto (si fuera desde cero)

```bash
npm init -y
```

---

### 📚 3. Instalar dependencias principales

```bash
npm install express mysql2 dotenv jsonwebtoken bcryptjs cors
```

---

### 🛠 4. Instalar dependencia de desarrollo

```bash
npm install nodemon --save-dev
```

---

### ⚙️ 5. Configurar variables de entorno

Crear archivo `.env`:

```env
DATABASE_URL=mysql://root:TU_PASSWORD@TU_HOST:PUERTO/TU_DB
```

---

### ▶️ 6. Ejecutar el servidor

```bash
npm run dev
```

Servidor disponible en:
http://localhost:3000

---

## 🔐 Autenticación

### 📌 Registro

**POST** `/register`

```json
{
  "email": "user@correo.com",
  "password": "1234"
}
```

---

### 📌 Login

**POST** `/login`

```json
{
  "email": "user@correo.com",
  "password": "1234"
}
```

✔ Retorna un token JWT

---

## 🔒 Uso del token

Para acceder a rutas protegidas:

```
Authorization: Bearer TU_TOKEN
```

---

## 📦 CRUD de Items

### Obtener todos

**GET** `/api/items`

### Obtener por ID

**GET** `/api/items/:id`

### Crear item

**POST** `/api/items`

```json
{
  "nombre": "Producto",
  "descripcion": "Ejemplo",
  "estado": true
}
```

### Actualizar item

**PUT** `/api/items/:id`

### Eliminar item

**DELETE** `/api/items/:id`

---

## 🗄 Base de datos

Base de datos MySQL alojada en Railway.

### Tabla: items

* id (INT, PK)
* nombre (VARCHAR)
* descripcion (TEXT)
* estado (BOOLEAN)
* created_at (TIMESTAMP)

### Tabla: users

* id (INT, PK)
* email (VARCHAR)
* password (TEXT encriptado)

---

## ⚠️ Problemas encontrados y soluciones

### ❌ Error: ejecución de scripts bloqueada (PowerShell)

* **Problema:** npm no funcionaba
* **Solución:**

```bash
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

### ❌ Error: módulo no encontrado

* **Problema:** faltaba archivo `auth.js`
* **Solución:** crear carpeta `middleware` y archivo correspondiente

---

### ❌ Error: conexión a base de datos externa

* **Problema:** `ENOTFOUND`
* **Solución:** migración de InfinityFree a Railway

---

### ❌ Error: login inseguro

* **Problema:** uso de usuarios en memoria
* **Solución:** implementación con MySQL + bcrypt + JWT

---

### ❌ Error: rutas sin protección

* **Problema:** acceso sin autenticación
* **Solución:** uso de middleware JWT

---

## ✅ Estado del proyecto

✔ API REST funcional
✔ CRUD completo
✔ Base de datos en la nube
✔ Autenticación segura
✔ Rutas protegidas con JWT

---

## 📦 Repositorio

Proyecto alojado en GitHub.

---

## 👨‍💻 Autor

**Jhon Fernando Gómez Quispe**
Estudiante de Ingeniería de Software con IA – SENATI
