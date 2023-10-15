# Étape de construction
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM nginx:alpine

# Copie des fichiers statiques générés à partir de l'étape de construction
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Exposition du port 80 pour le serveur web
EXPOSE 80

# La commande de démarrage par défaut de l'image Nginx suffit généralement
CMD ["nginx", "-g", "daemon off;"]
