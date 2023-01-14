# F1 Rx Angular #

An simple Angular using [Ergast F1 API](http://ergast.com/mrd) API and [ngrx](https://ngrx.io/)

## Features to deliver
- List of Drivers per season.
- List of Races per season with final results.
- Qualifying Results per race.
- Driver Standings after a race.
- In season 2021,
  - How many cars "Finished".
  - How many cars had an "Accident".
  - How many cars finished +1 Lap.

_All information shown should be since season 2018 to season 2022._

## Dependencies ##

The main dependencies are `NodeJS >= 14` and `NPM >= 8`.  
It doesn't mean that other version are not going to work but the only followings are tested with such starter.

## Scripts ##

### Start ###

```shell
npm run start
```

### Build ###

```shell
npm run build
```

To build the application; results files will be in `dist` directory.  
By default, this builds the app in `production` mode

### Test ###

```shell
npm run test
```

To test the app. Tests have to be in `.spec.ts` files.  
By default, it runs the tests in browser `headful` mode



