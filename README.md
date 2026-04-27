Perfecto 👍 te lo dejo en **nivel GitHub PRO (portafolio real)** con badges, estructura más atractiva y estilo más “empresa”.

---

# 🚀 API Backend Node.js + Docker + MySQL

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MySQL](https://img.shields.io/badge/MySQL-Database-blue)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

---

## 📌 🧑‍🎓 Información del estudiante

* **Nombre:** Jhon Fernando Gómez Quispe
* **ID:** 1613201
* **Carrera:** Ingeniería de Software con Inteligencia Artificial
* **Institución:** SENATI

---

# 📖 Descripción del proyecto

API REST desarrollada con **Node.js + Express**, conectada a **MySQL en la nube (Railway)** y ejecutada con **Docker**.

Este proyecto simula un sistema backend real tipo:

> 🧾 Sistema de ventas (ERP básico / POS)

Incluye autenticación, roles, relaciones entre tablas y validaciones.

---

# ⚡ Funcionalidades principales

✔ Autenticación JWT
✔ Sistema de roles (RBAC)
✔ CRUD de usuarios
✔ CRUD de items (productos)
✔ CRUD de clientes
✔ Relación cliente ↔ producto (JOIN)
✔ Validaciones de datos
✔ Seguridad con bcrypt

---

# 🔐 Sistema de autenticación

* Login con JWT
* Tokens con expiración
* Middleware de protección
* Contraseñas encriptadas

---

# 👮‍♂️ Sistema de roles (RBAC)

| Rol           | ID | Permisos         |
| ------------- | -- | ---------------- |
| 🟢 Trabajador | 1  | Lectura limitada |
| 🟡 Admin      | 2  | CRUD parcial     |
| 🔴 Superadmin | 3  | Acceso total     |

---

### 🔑 Permisos por rol

#### 🔴 Superadmin

* Control total del sistema
* Gestión de usuarios y roles
* CRUD completo

#### 🟡 Admin

* Gestión de clientes e items
* No puede administrar superadmins

#### 🟢 Trabajador

* Lectura de items
* Creación/edición limitada de clientes

---

# 📦 CRUD del sistema

## 👤 Usuarios

* Registro con rol
* Login JWT
* Actualización de roles
* Protección por permisos

## 📦 Items

* Crear / listar / actualizar / eliminar
* Fecha automática (`created_at`)
* Control por roles

## 👥 Clientes

* Validación de DNI y celular
* Relación con items
* JOIN para vista completa

---

# 🔗 Relación entre tablas

```
users → roles (role_id)
clientes → items (item_id)
```

---

# 🐳 Docker

## 📦 Build

```bash
docker build -t backend-api .
```

## 🚀 Run

```bash
docker run -p 3000:3000 --env-file .env backend-api
```

## 🧪 Comandos útiles

```bash
docker ps
docker exec -it container sh
docker restart container
docker stop container
```

---

# 🗄 Base de datos

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

# 🚀 Arquitectura del proyecto

```
src/
 ├── routes/
 ├── middleware/
 ├── db.js
 ├── index.js
```

✔ Modular
✔ Escalable
✔ Separación de responsabilidades

---

# 🧠 Mejoras implementadas

✔ JWT authentication
✔ Role-based access control (RBAC)
✔ Validación de datos
✔ Relaciones SQL (JOIN)
✔ Dockerización completa
✔ Seguridad con bcrypt
✔ API lista para producción

---

# 📊 Nivel del proyecto

👉 Backend intermedio–avanzado
👉 Simulación de sistema empresarial real
👉 Base para SaaS o ERP

---

# 🔮 Futuras mejoras

* Sistema de ventas (facturación)
* Dashboard frontend
* Reportes PDF / Excel
* Logs de auditoría
* Soft delete
* Microservicios

---

# 👨‍💻 Autor

**Jhon Fernando Gómez Quispe**
SENATI – Ingeniería de Software con IA

---