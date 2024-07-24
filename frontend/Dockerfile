# Stage 1: Build the react app using Vite
FROM node:16 AS build

WORKDIR /frontend
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the react app with nginx
FROM nginx:latest

# Remove default configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy build files to nginx html directory
COPY --from=build /frontend/dist /usr/share/nginx/html

# Ensure the correct permissions
RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
