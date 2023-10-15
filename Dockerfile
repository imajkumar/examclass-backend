# Use an official Node.js runtime as the parent image
FROM node:latest


# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application source code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 3000

# Command to start your Node.js application
CMD ["npm", "src/app.ts"]
