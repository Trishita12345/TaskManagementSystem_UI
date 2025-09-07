FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build-time env for Vite
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the app
RUN npm run build

EXPOSE 5173

# Run Vite preview server
CMD ["npm", "run", "preview", "--", "--port", "5173", "--host"]
