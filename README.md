# Twitter Scheduler API

API for the Twitter Scheduler APP. App developed using the twitter API that schedules a series of tweets to be posted automatically

## Getting Started

These instructions will give you a copy of the project up and running on
your local machine for development and testing purposes. See deployment
for notes on deploying the project on a live system.

### Prerequisites

Requirements for the software and other tools to build, test and push

- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)

### Installing

Install Node and project dependencies

    npm run install

Initialize docker compose

    docker-compose up -d (for the first time)
    docker-compose start (every time you run the server)

Run prisma migrations and generate schema (just for the first time)

    npx prisma db push
    npx prisma generate

Configure environment variables

    cp .env.example .env

## Running the tests

    npm run test

### Style test

[ESLint](https://eslint.org) is used as the linter and [Prettier](https://prettier.io) as the code formatter

    npm run lint

## Stack

- [TypeScript](https://www.typescriptlang.org) as the language
- [Prisma](https://www.prisma.io/) as the database ORM
- [Jest](https://jestjs.io/) as testing framework
- [ESLint](https://eslint.org) as a linter
- [Prettier](https://prettier.io) as a formatter
- [Husky](https://typicode.github.io/husky) as the git hooks manager
- [Git](https://git-scm.com) as the source control manager
- [GitHub Actions](https://github.com/features/actions) as the CI/CD manager

## Authors

- **Valentin Torres** - Creator
  [Valentin Torres](https://github.com/valentintorres02)
