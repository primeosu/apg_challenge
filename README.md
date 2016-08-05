# File Definition Importer
This is a solution for the [Intel Security Programming Challange](https://github.com/primeosu/apg_challenge).

## Dependencies
* [node](https://nodejs.org/en/) version v0.12.0 or later
* [npm](https://www.npmjs.com/) version 2.5.1 or later
* Instructions for installing ```node```and ```npm``` using a package manager can be found [here](https://nodejs.org/en/download/package-manager/).
* MySQL Server

## Configuration

### MySQL Configuration
* To use this app you must provide a database and associated user with full read and write permissions.
* The MySQL database connection is configured by editing the ```mysql``` property in ```env.json```.
* The app will create a new table called ```files``` within the configured database. 

### Port Configuration
* By default the app is served from ```http://localhost:8000```
* The ```port``` can be configured in ```env.json```.

## Installation
```bash
npm install
```

## Run App
```bash
npm start
```
After the app has launched navigate to [http://localhost:8000](http://localhost:8000).