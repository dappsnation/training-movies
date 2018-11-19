# Install

> Install our stack

Let's install everything we are going to use in our application. We will use them one after the other.

## Angular
Angular is the framework that will structure ou application

In a folder run : 
```
ng new movie
cd movie
```

### UI
For the UI we will use `@angular/material` and `@angular/flex-layout`  : 

```
ng add @angular/material
npm install @angular/flex-layout --save
```

### PWA 
Let"s make our app a Progressive Web App out of the box with `@angular/cli`:
```
ng add @angular/pwa`
```

> Detailed tutorial [here](https://angular.io/guide/service-worker-getting-started).

## Akita

Akita is a state management system like `redux` that needs less boilerplate and works well with the angular architecture.

First install the `Akita` library :
```
npm install @datorama/akita --save
```
We will also install some helper to develop our application : 
```
npm install @datorama/akita-cli @datorama/akita-ngdevtools --save-dev
```
We use the tag `save-dev` because we don't want these module inside the built version.
  

## Firebase

Firebase is a service to build and host serverless application.
We need to install `firebase` and the Angular Module for Firebase `@angular/fire`: 
```
npm install firebase @angular/fire --save
```
