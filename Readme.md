# Node.js Express MongoDB Application

This project is a Node.js Express application connected to a MongoDB database. It includes user authentication, question handling, and uses Docker for containerization.

## Features

- **User Authentication**: Register and login functionalities with JWT-based authentication.
- **Question Management**: Users can ask questions, and the answers are generated using an AI service.
- **MongoDB Integration**: All user and question data are stored in a MongoDB database.
- **Dockerized**: The application can be easily deployed using Docker.

## Prerequisites

- Node.js (>= 16)
- MongoDB
- Docker

## Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=8000
   MONGODB_URL="your_mongodb_connection_string"
   JWT_SECRET="your_jwt_secret"
   ```

4. **Run the application**

   ```bash
   node index.js
   ```

### API Endpoints

- **GET /**: Check if the server is running.
- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Login a user.
- **POST /api/questions**: Ask a question (requires authentication).
- **GET /api/questions/:questionId**: Get a question by ID (requires authentication).
- **GET /api/users/:userid**: Get user by ID.
- **GET /api/users/:userid/questions**: Get all questions asked by a user (requires authentication).

### Running Tests

The application uses `supertest` and `jest` for testing.

```bash
npm test
```

## Docker Setup

### Dockerfile

The `Dockerfile` sets up the Node.js application.

```dockerfile
# Use the official Node.js 16 image as a base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port that your application will run on
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]
```

### Docker Compose

The `docker-compose.yml` file defines the services for the application and MongoDB.

```yaml
version: '3.8'

services:
  app:
    build: .
    container_name: my-app-container
    ports:
      - "8000:8000"
    environment:
      - MONGODB_URL=mongodb+srv://niajp2950:admin123@cluster0.iq4ers6.mongodb.net/Assignment
      - JWT_SECRET=Riyajain_Assignment_PowerAI
      - PORT=8000
    depends_on:
      - mongo

  mongo:
    image: mongo:latest
    container_name: mongo-container
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Running with Docker

1. **Build and run the containers**

   ```bash
   docker compose up
   ```

2. **Stop the containers**

   ```bash
   docker-compose down
   ```

## Conclusion

This project demonstrates a simple Node.js application with user authentication and question handling capabilities, utilizing MongoDB for data storage and Docker for containerization. The provided Dockerfile and docker-compose.yml make it easy to set up and run the application in a containerized environment.