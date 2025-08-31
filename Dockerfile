# Stage 1: Build the app
FROM node:18 AS build
WORKDIR /app

# copy package.json and install deps
COPY package*.json ./
RUN npm install

# copy all source files
COPY . .

# build the project
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# remove default nginx files
RUN rm -rf ./*

# copy build output from previous stage
COPY --from=build /app/dist .

# expose port 80
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
