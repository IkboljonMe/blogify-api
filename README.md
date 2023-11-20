# Blogify API

Welcome to Blogify API, a TypeScript-powered Node.js and Express backend server for your secure and robust blogging platform.

## Table of Contents

- [Installation](#installation)
- [Swagger Documentation](#swagger-documentation)
- [Postman for Better Testing](#postman-for-better-testing)
- [Deployment](#deployment)
  - [Running with Docker](#running-with-docker)
  - [Deploy with Candy Server and Digital Ocean](#deploy-with-candy-server-and-digital-ocean)

## Technologies Used

- [**Typescript:**](https://www.typescriptlang.org/) Provides strong typing for enhanced developer experience.
- [**Node.js & Express:**](https://expressjs.com/) Power the backend server.
- [**Mongoose & MongoDB:**](https://mongoosejs.com/) Used for database connectivity and management.
- [**JWT:**](https://jwt.io/) Implements token-based authentication for enhanced security.
- [**Swagger:**](https://swagger.io/) Generates interactive API documentation.
- [**Postman:**](https://www.postman.com/) Offers a comprehensive environment for API testing.
- [**Docker:**](https://www.docker.com/) Enables containerization for consistent deployment.
- [**Candy for Server:**](https://candyservers.com/) Facilitates server management and deployment.
- [**Digital Ocean's Droplets:**](https://www.digitalocean.com/) Utilized for scalable and reliable deployment.

## Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:IkboljonMe/blogify-api.git
   cd blogify-api
   ```

2. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file and provide the necessary configuration values.

3. Install dependencies and run the development server:

   ```bash
   yarn install
   yarn run dev
   ```

   This will start the development server at [http://localhost:1337](http://localhost:1337).

   Open [http://localhost:1337/docs](http://localhost:1337/docs) to access Swagger documentation. For additional details, refer to [`ROUTES.md`](https://github.com/IkboljonMe/blogify-api/blob/main/ROUTES.md).

## Swagger Documentation

Explore and interact with the API using Swagger documentation. Visit [http://localhost:1337/docs](http://localhost:1337/docs) to view detailed information about available routes, request payloads, and responses. For additional details of every API endpoint, go to [`ROUTES.md`](https://github.com/IkboljonMe/blogify-api/blob/main/ROUTES.md) file

## Postman for Better Testing

For a comprehensive testing experience, import the provided Postman collection (`postman_collection.json`)([link](https://github.com/IkboljonMe/blogify-api/blob/main/postman_collection.json)) into your Postman workspace. The collection includes pre-configured requests for various API endpoints, making testing and development more efficient.

## Deployment

The application is configured for deployment using Candy Server and Digital Ocean.

### Running with Docker

1. Ensure Docker are installed.

2. Build and run the Docker containers:

   ```bash
   docker-compose up
   ```

   To run in the background, use:

   ```bash
   docker-compose up -d
   ```

   To build and run:

   ```bash
   docker-compose up --build
   ```

### Deploy with Candy Server and Digital Ocean

1. Deploy to Candy Server:

   - I have already predefined Candyfile in project. For more, [click here](https://caddyserver.com/docs/caddyfile)

2. Deploy to Digital Ocean:

   - Create a Digital Ocean Droplet.

   - Connect to your Droplet and clone the repository. For more, [read official tutorial](https://owen31302.gitbook.io/github-education/digital-ocean/deploy-node-js-on-digitalocean-droplet-using-docker#deploy-your-docker-image-on-digitalocean-droplet). Personally, I did not push project Docker Hub, instead simply I connected repo to Droplet via terminal. Follow attached tutorial for better understanding.

   - Install dependencies and start the server. To deploy a project, simply use my `deploy.sh` script to pull and push repo to Digital Ocean droplet.

   ```bash
   ./deploy.sh
   ```

## TODO

- [ ] Implement Google auth
- [ ] Add cookies to save token
- [ ] Connect to client(React/Next)
