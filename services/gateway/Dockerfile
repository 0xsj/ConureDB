# Use an official Node.js image as the base image for the builder stage
FROM node:18 as builder

WORKDIR /services/gateway

COPY package*.json ./
RUN npm install

# Use a separate base image for the main stage
FROM node:18 as base

WORKDIR /gateway

# Copy built node_modules from the builder stage to the main stage
COPY --from=builder /services/gateway/node_modules ./node_modules

# Copy application source code
COPY . .

# Build your application (if needed)
RUN npm run build

# Expose the port that your application will listen on
EXPOSE 3000

# Command to run your application
CMD ["node", "dist/index.js"]
