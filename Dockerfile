# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Sørg for at cert-mappen findes
RUN mkdir -p /etc/nginx/certs

# Certifikater
COPY nginx/certs/localhost.crt /etc/nginx/certs/localhost.crt
COPY nginx/certs/localhost.key /etc/nginx/certs/localhost.key

# Web og konfiguration
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
