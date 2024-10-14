<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">Strongly opinionated setup for NestJS applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) application starter repository.

This setup comes with:

- NestJS v10
- strict TypeScript
- environment variables validation
- Configuration service with intellisense
- TypeOrm
  - migrations
  - seeds
  - logging
  - base entity with handy properties
- Postgres container with docker compose
- ESLint + Prettier with handy rules
- Swagger and OpenAPI documentation with dracula theme
  - `ApiProperty` decorator is not required to see DTO parameters in documentation. But here they are added to have randomized examples with Falso. JSDoc `@description` and `@example` can be used to show them in documentation as well
- Endpoint error handler
- Example resource module (users)
- Jest and supertest
- REPL mode
- Logging with Pino
- Correlation ID on each request for easier debugging and monitoring
- Falso data faking for tests and documentation
- Knip to keep things tidy
- DTO validation

## Project setup

Install

```bash
$ npm install
$ docker compose -f compose.dev.yaml up -d
```

Run migrations and seeds

```bash
$ npm run migration:run
$ npm run seed:run
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## DB commands

```bash
# creates a new empty seed
$ npm run seed:new <name of the new seed>

# runs all seeds that are down
$ npm run seed:run

# reverts the latest run seed
$ npm run seed:revert

# generates a new migration
$ npm run migration:generate <name of the new migration>

# runs all migrations that are down
$ npm run migration:run

# reverts the latest run migration
$ npm run migration:revert
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
