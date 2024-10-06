# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml into the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --prod

# Copy the rest of the application code into the container
COPY . .

# Build the NestJS application
RUN npx nest build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "start:prod"]
