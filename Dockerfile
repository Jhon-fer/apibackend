# Imagen base
FROM node:18

# Carpeta de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el proyecto
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "run", "dev"]