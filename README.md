
---

# 🚀 Full Stack System - Node.js + React + MySQL + Docker + Railway

<p align="left">

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Framework-black?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange?logo=jsonwebtokens&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-Cloud-0B0D0E?logo=railway&logoColor=white)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)

</p>

---

# 👨‍🎓 Información del proyecto

- **Nombre:** Jhon Fernando Gómez Quispe  
- **ID:** 1613201  
- **Carrera:** Ingeniería de Software con IA  
- **Institución:** SENATI  

---

# 📌 Descripción general

Sistema **Full Stack moderno** que simula una plataforma tipo:

> 🧾 Sistema de ventas (ERP / POS básico)

Incluye backend robusto, frontend moderno y base de datos relacional.

---

# 🏗 Arquitectura del sistema

```

Frontend (React + Vite)  →  Backend (Node.js + Express)  →  MySQL (Railway)

````

---

# ⚙️ TECNOLOGÍAS

## Backend
- Node.js
- Express
- MySQL (Railway)
- JWT Authentication
- Docker
- bcryptjs

## Frontend
- React
- Vite
- Axios / Fetch API

---

# 🚀 BACKEND (API)

## 📦 Instalación

```bash
npm install
````

---

## ▶️ Ejecutar en desarrollo

```bash
npm run dev
```

---

## 🐳 Ejecutar con Docker

```bash
docker build -t backend-api .
docker run -p 3000:3000 --env-file .env backend-api
```

---

## 🌐 URL API

```
http://localhost:3000/api
```

---

## 🔐 Autenticación

### Login

```
POST /api/login
```

### Registro

```
POST /api/register
```

---

## 📦 CRUD Principal

* Users
* Items
* Clientes

---

# 🌐 FRONTEND (React + Vite)

## 📦 Instalación

```bash
cd frontend
npm install
```

---

## ▶️ Ejecutar frontend

```bash
npm run dev
```

---

## 🌐 URL Frontend

```
http://localhost:5173
```

---

## 🔌 Conexión con Backend

Ejemplo:

```js
fetch("http://localhost:3000/api/items")
```

o con axios:

```js
axios.get("http://localhost:3000/api/items")
```

---

# 🗄 BASE DE DATOS

## 👤 users

* id
* email
* password
* role_id

## 🔐 roles

* id
* nombre

## 📦 items

* id
* nombre
* descripcion
* estado
* created_at

## 👥 clientes

* id
* nombre
* apellido
* DNI
* celular
* direccion
* item_id

---

# 👮‍♂️ SISTEMA DE ROLES (RBAC)

| Rol           | ID | Permisos         |
| ------------- | -- | ---------------- |
| 🟢 Trabajador | 1  | Lectura limitada |
| 🟡 Admin      | 2  | CRUD parcial     |
| 🔴 Superadmin | 3  | Acceso total     |

---

# 🐳 DOCKER WORKFLOW

## 🔨 Build

```bash
docker build -t backend-api .
```

## 🚀 Run

```bash
docker run -p 3000:3000 backend-api
```

## 🧪 Control

```bash
docker ps
docker stop container
docker restart container
```

---

# 🔐 SEGURIDAD IMPLEMENTADA

✔ JWT Authentication
✔ Password hashing (bcrypt)
✔ Role-based access control (RBAC)
✔ Middleware de protección

---

# 🌐 FLUJO DEL SISTEMA

```
Login → JWT → Middleware → Roles → CRUD → MySQL
```

---

# 🧠 FUNCIONALIDADES

✔ Login / Register
✔ Gestión de usuarios
✔ Gestión de items
✔ Gestión de clientes
✔ Relación entre tablas
✔ Frontend React funcional
✔ API REST completa

---

# 🔮 MEJORAS FUTURAS

* Dashboard admin moderno
* Login visual en React
* Gráficas de ventas
* Exportación PDF / Excel
* Deploy completo (Vercel + Railway)
* Sistema de ventas real

---

# 👨‍💻 AUTOR

**Jhon Fernando Gómez Quispe**
SENATI – Ingeniería de Software con IA

```

---