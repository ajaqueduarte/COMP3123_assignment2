# Use the official Node.js 16 image as a builder stage
FROM node:16 as builder

# Set the working directory in the builder stage
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application for production
RUN npm run build

# Use the official Nginx image for a production container
FROM nginx:1.21

# Copy the build assets from the builder stage to the production container
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

# Nginx will start by itself, no need to define CMD
EXPOSE 80
