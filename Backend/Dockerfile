FROM node:18-alpine

WORKDIR /app

# Instalar solo las dependencias
COPY package*.json ./
RUN npm install --production  # Solo instala dependencias de producción

# Copia el código fuente
COPY . .

# Expone el puerto de la aplicación
EXPOSE 3000

# Usa nodemon solo en desarrollo
CMD ["npm", "run", "start"]
