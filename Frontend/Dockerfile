# Etapa 1: Desarrollo
FROM node:18-alpine

WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Exponer el puerto para el desarrollo
EXPOSE 3001

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "start"]