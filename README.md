## Installation

```bash
$ npm install
```

## Running migrations

```bash
# create empty postgres db and run
# to avoid error remove migration with default values setting before first run
# then return default values migration and run again
# temp (consistent) solution
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# TESTS NOT WORKING DIDN'T HAVE EXPIRIENCE WITH THOSE IN NEST
# TRIED TO DEBUG => NO RESULT, HARD TO DEBUG
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## BTW NAMINGS ARE SHIT