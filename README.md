# Road Surface Estimator

A web application that estimate the surface area of roads of a selected on a map.

This application is part of my Monash University final year project for the Bachelor of Computer Science's unit FIT3036: Computer Science Project.

---

# RseAngularProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Node.js

This project requires Node.js and npm package manager to install the dependencies and run the application.
Grab the installation at [Node.js](https://nodejs.org/en/)

## Angular CLI

Before doing anything else make sure that you've got the Angular CLI installed globally on your system.

```sh
npm install -g @angular/cli
```
if the command requires administrative privilege then prefix the command with a ```sudo```.
```sh
sudo npm install -g @angular/cli
```

## Installing Node Modules

At the root directory, run `npm install` to install all node modules required.

## Development server

Run `node server.js` for a backend Express.JS server API.

In the file `.\src\app\app-services\area-calculation\area-calculation.services.ts`:

comment out the line :
```javascript
private serverApi = 'api/area_calculation/';
```
and uncomment the line :
```javascript
private serverApi = 'http://localhost:8080/api/area_calculation/';
```
This configuration is required to redirect application to the correct server API address.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
