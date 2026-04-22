# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Installation des dépendances de build
COPY package*.json ./
RUN npm install

# Copie du code et build
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine AS runner

WORKDIR /app

# Configuration de l'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Copie des fichiers nécessaires depuis le stage 1
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port par défaut de l'infrastructure
EXPOSE 3000

# Lancement
CMD ["node", "dist/server.js"]
