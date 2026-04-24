# 🚀 API Backend Node.js + Docker + MySQL

## 📌 🧑‍🎓 Información del estudiante

* **Nombre:** Jhon Fernando Gómez Quispe
* **ID:** 1613201
* **Carrera:** Ingeniería de Software con Inteligencia Artificial
* **Institución:** SENATI

---

## 📌 📖 Descripción del proyecto

Este proyecto es una **API REST completa** desarrollada con Node.js y Express, conectada a una base de datos MySQL en la nube (Railway) y ejecutada mediante Docker.

🔹 Permite gestionar usuarios, clientes e items
🔹 Incluye autenticación segura con JWT
🔹 Usa validaciones para garantizar datos correctos
🔹 Relaciona clientes con productos
🔹 Está preparado para un sistema de ventas (tipo tienda)

👉 En resumen: es una base funcional de un **sistema de ventas backend profesional**

---

## 🛠 ⚙️ Tecnologías utilizadas

* Node.js
* Express
* MySQL (Railway)
* Docker
* JWT (jsonwebtoken)
* bcryptjs
* cors
* dotenv
* nodemon

---

## 🐳 🐋 Uso de Docker (IMPORTANTE)

### 📦 1. Construir imagen

```bash
docker build -t backend-api .
```

✔ Compila la API dentro de una imagen

---

### 🚀 2. Ejecutar contenedor

```bash
docker run -p 3000:3000 --env-file .env backend-api
```

✔ Inicia el servidor en Docker
✔ Expone la API en [http://localhost:3000](http://localhost:3000)

---

### 📋 3. Ver contenedores activos

```bash
docker ps
```

---

### 🔁 4. Reiniciar contenedor

```bash
docker restart NOMBRE_CONTENEDOR
```

---

### 🧹 5. Eliminar contenedor

```bash
docker stop NOMBRE_CONTENEDOR
docker rm NOMBRE_CONTENEDOR
```

---

### 🧪 6. Entrar al contenedor

```bash
docker exec -it NOMBRE_CONTENEDOR sh
```

---

## ⚙️ ⚡ Configuración del proyecto

### 📥 1. Clonar repositorio

```bash
git clone TU_URL
cd apibackend
```

---

### 📦 2. Instalar dependencias

```bash
npm install
```

---

### ▶️ 3. Ejecutar en desarrollo

```bash
npm run dev
```

---

## 🌐 🔐 Variables de entorno (.env)

```env
PORT=3000
DATABASE_URL=mysql://root:password@host:3306/database
JWT_SECRET=secreto123
```

---

## 🔐 🔑 Autenticación

### 📌 Registro

```http
POST /api/register
```

```json
{
  "email": "user@test.com",
  "password": "1234"
}
```

---

### 📌 Login

```http
POST /api/login
```

✔ Retorna token JWT

---

### 🔒 Uso del token

```http
Authorization: Bearer TU_TOKEN
```

---

## 📦 📦 CRUD Items

* GET `/api/items`
* GET `/api/items/:id`
* POST `/api/items`
* PUT `/api/items/:id`
* DELETE `/api/items/:id`

---

## 👤 👥 CRUD Clientes

### 📌 Validaciones implementadas

✔ DNI: 8 dígitos
✔ Celular: 9 dígitos
✔ Validación de producto existente (item_id)
✔ Relación cliente ↔ item (JOIN)

---

### 📌 Crear cliente

```http
POST /api/clientes
```

---

### 📊 Clientes con producto (JOIN)

```http
GET /api/clientes/detalle
```

✔ Muestra cliente + nombre del producto

---

## 🗄 🧱 Base de datos

### 👤 Tabla: users

* id
* email
* password (encriptado)
* role (user/admin)

---

### 📦 Tabla: items

* id
* nombre
* descripcion
* estado
* created_at

---

### 👥 Tabla: clientes

* id
* nombre
* apellido
* DNI
* celular
* direccion
* item_id (FK)
* tipo_comprobante (boleta / factura)

---

## ⚠️ 🚨 Problemas encontrados y soluciones

### ❌ Error: puerto ocupado en Docker

✔ Solución:

```bash
docker stop CONTAINER
docker rm CONTAINER
```

---

### ❌ Error: req.body undefined

✔ Solución:

```js
app.use(express.json());
```

---

### ❌ Error: auth.js no exporta correctamente

✔ Solución:
corregir export/import a named export

---

### ❌ Error: producto no existe (item_id)

✔ Solución:
validación previa con SELECT en items

---

### ❌ Error: cambios no se reflejan en Docker

✔ Solución:

```bash
docker build -t backend-api .
```

---

## 🧠 🚀 Mejoras implementadas

✔ Validación de datos
✔ Relaciones entre tablas
✔ Seguridad con JWT
✔ Roles base (admin/user)
✔ API lista para sistema de ventas

---

## 💰 📈 Siguiente mejora (nivel pro)

Sistema de ventas completo:

* cliente_id
* item_id
* cantidad
* precio unitario
* total
* fecha

👉 Esto convierte la API en un **POS (punto de venta real)**

---

## 👨‍💻 Autor

**Jhon Fernando Gómez Quispe**
SENATI – Ingeniería de Software con IA

---