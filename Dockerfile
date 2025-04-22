ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine       

# Set the working directory inside the container
WORKDIR /app

#Copy package.json package-lock.json ./
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

#Set the environment variable for the port
ENV PORT=3000

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD [ "npm", "start" ]