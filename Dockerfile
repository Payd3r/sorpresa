# ===============================================================
# STAGE 1: Build - Costruisce i file statici
# ===============================================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copia i file di package e installa le dipendenze
COPY package.json yarn.lock ./
RUN yarn install

# Copia il resto del codice sorgente
COPY . .

# Esegui il comando di build che crea la cartella 'dist' (o 'build')
RUN yarn build


# ===============================================================
# STAGE 2: Production - Serve i file con Nginx sulla porta 80
# ===============================================================
FROM nginx:1.25-alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Assicurati che questa riga sia presente e non commentata
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]