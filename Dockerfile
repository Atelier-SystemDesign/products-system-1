# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /products_server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port
EXPOSE 3021

ARG ENV_FILE
ENV ENV_FILE=$ENV_FILE

# Define the command to run your service
CMD [ "npm", "start" ]