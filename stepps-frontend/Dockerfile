FROM node:20-alpine AS build

WORKDIR /app

# Copia os arquivos de dependência e instala as dependências
COPY package*.json ./
RUN npm install

# Copia o código-fonte da aplicação
COPY . .

# Realiza o build de produção
RUN npm run build --prod

# Etapa 2: Servir o build com o Nginx
FROM nginx:alpine

# Copia os arquivos do build para o Nginx
COPY --from=build /app/dist/stepps-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Expõe a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
