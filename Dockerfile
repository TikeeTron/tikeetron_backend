# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.yaml into the container
COPY package.json ./

# Install dependencies using npm
RUN npm install --prod

# Copy the rest of the application code into the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
