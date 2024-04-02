# { Project Name Here } API

This is the API of { Project Name Here } built using Express, a framework for building RESTful web services.

## Prerequisites

Before we dive into using our amazing application, let's ensure you have everything you need.

- Node.js (v20.11.1 or higher)
- npm (Node Package Manager)
- PostgreSQL 14.11

## Installation

Let's walk through the process of getting our application up and running on your local machine.

1. Clone the repository:
   ```bash
   git clone -b main git@github.com:mcyncierto/expressjs-typescript-sequelize-boilerplate.git
   ```
2. Install dependencies
   ```bash
   cd expressjs-typescript-sequelize-boilerplate
   npm install
   ```

## Usage

Time to explore the different ways you can interact with and utilize our powerful application.

### Setup Environment variables in Development Mode

1. Create .env file in root folder
2. Copy the contents of .env.example to the newly created .env file
3. Choose and set your preferred values for the INITIAL_SUPER_ADMIN_PASSWORD and JWT_SECRET_KEY variables.

### Create database and perform migration in Development Mode

```bash
sequelize db:create
sequelize db:migrate
sequelize db:seed:all
```

### Start the Server in Development Mode

```bash
npm run dev
```

### Start the Server

```bash
npm run start
```

That's it! You're all set to run the application in both development and production modes.

## Commands

Get to know the various commands that simplify development, testing, and more.

### Run Unit Tests

```bash
npm run test:unit
```

### Run specific Unit Tests

```bash
npm run test:unit --filter <file-name>
```

### Run Integration Tests

```bash
## For Localhost Database (local device) run this command in root folder:
npm run test:integration
# To immediately have the summary of failing tests (for Mac and Linux), run this:
npm run test:integration 2>&1 | grep 'FAIL'
```

You now have a range of commands at your disposal for different tasks.

## API Documentation

The API documentation is available at { baseUrl }/api/docs.
