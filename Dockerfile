# Usa un'immagine Node ufficiale
FROM node:20-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file di configurazione
COPY package.json yarn.lock ./

# Installa le dipendenze
RUN yarn install

# Copia tutto il resto del codice
COPY . .

# Espone la porta 3000
EXPOSE 80

# Avvia l'applicazione
CMD ["yarn", "start", "--", "--port", "80"]