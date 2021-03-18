## Description

A Coffee API with Unit/E2E unit test

## Installation

- Install Mongo DB from [here](https://www.mongodb.com/try/download/community)

- Install Node JS form [here](https://nodejs.org/en/)

- Create a dot env file to configure your application also you can change default configuration using JSON files in infrastructure

```
NODE_ENV=development
DB_URI=mongodb://localhost:27017/inspection-tool
PORT=3041
```

```bash
$ npm install
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running Swagger

- you need to setup the .env environment variable NODE_ENV=develpment first

- run this swagger link http://localhost:3041/swagger-api/

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Stay in touch

- Author - Mohsen Hegazy
- Website - [https://hagazy.com](https://hagazy.com/)
- LinkedIn - [LinkedIn](https://www.linkedin.com/in/mohsen-hegazy-79a05a67/)
