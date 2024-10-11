<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

  <p align="center">Highly opinionated setup for NestJS applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework starter repository.

This setup comes with:

- NestJS v10
- strict TypeScript
- environment variables validation
- Configuration service with intellisense
- TypeOrm
- Postgres container with docker compose
- EsLint
- Prettier
- Swagger and OpenAPI documentation (with dracula theme)
  - `ApiProperty` decorator is not required to see DTO parameters in documentation. But here they are added to have randomized examples. JSDoc @description and @example can be used to show them in documentation as well
- Endpoint error handler
- Example resource module (users)
- Jest and supertest
- REPL mode
- Logging with Pino
- Correlation ID on each request for easier debugging and monitoring
- Falso for data faking (for tests and documentation)
- Knip command to keep things tidy
- DTO validation

## Project setup

```bash
$ npm install
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

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
