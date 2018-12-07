
# Install 🛠

> Install our stack

Let's install everything we are going to use in our application. We will use them one after the other.

## 1. Angular ![Logo](https://angular.io/assets/images/favicons/favicon-32x32.png)
Angular is the framework that will structure our application
Create a new Angular Application, be sure to add routing to the app and to use SCSS style format.
In a folder, run : 

```bash
$> ng new movie
	? Would you like to add Angular routing? (y/N) yes

	? Which stylesheet format would you like to use? SCSS   [ http://sass-lang.com   ]
	  CSS
	> SCSS   [ http://sass-lang.com   ]
	  SASS   [ http://sass-lang.com   ]
	  LESS   [ http://lesscss.org     ]
	  Stylus [ http://stylus-lang.com ]
```
```bash
$> cd movie
```

### 1.1. UI 🖥
For the UI we will use `@angular/material` with the Indigo/Pink theme and `@angular/flex-layout`  : 
```bash
$> ng add @angular/material
	Installed packages for tooling via npm.
	? Choose a prebuilt theme name, or "custom" for a custom theme: (Use arrow keys)
	> Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
	  Deep Purple/Amber  [ Preview: https://material.angular.io?theme=deeppurple-amber ]
	  Pink/Blue Grey     [ Preview: https://material.angular.io?theme=pink-bluegrey ]
	  Purple/Green       [ Preview: https://material.angular.io?theme=purple-green ]
	  Custom
	  
	? Set up HammerJS for gesture recognition? (Y/n) Yes

	? Set up browser animations for Angular Material? Yes
```
```bash
$> npm install @angular/flex-layout --save
```
> Angular Material [documentation](https://material.angular.io/guides)

> since npm v5 `--save` is no longer needed ([see here](https://stackoverflow.com/questions/19578796/what-is-the-save-option-for-npm-install))

### 1.2. Progressive Web App 📲
Let's make our app a Progressive Web App out of the box with `@angular/cli`:
```bash
$> ng add @angular/pwa`
```

> Detailed tutorial [here](https://angular.io/guide/service-worker-getting-started).

## 2. Akita 🐶

Akita is a state management system like `redux` that needs less boilerplate and works well with the angular architecture.

First install the `Akita` library :
```bash
$> npm install @datorama/akita --save
```
We will also install some helper to develop our application : 
```bash
$> npm install @datorama/akita-cli @datorama/akita-ngdevtools --save-dev
```
We use the tag `save-dev` because we don't want these modules inside the built version.

> Akita [documentation](https://github.com/datorama/akita)  

## 3. Firebase 🔥

Firebase is a service to build and host serverless application.
We need to install `firebase` and the Angular Module for Firebase `@angular/fire`: 
```bash
$> npm install firebase @angular/fire --save
```
> Firebase [documentation](https://firebase.google.com/docs/reference/js/)
> Angular Fire [documentation](https://github.com/angular/angularfire2)

## 4. 🎉 The End ! 🎊 
Congratulation ! You have successfully installed the stack ! To check if everything works, try to serve the project :
```bash
$> ng serve --open
```
You should see the default Angular app !!!
In the next part we will begin to build the app : [Next ->](https://github.com/dappsnation/training-movies/tree/movie-module)

---
---
---
## Troubleshooting 🔎
#### ⚠️ Error :
```bash
npm ERR! Unexpected end of JSON input while parsing near ...
```
#### 📖 Explanation :
> This error happens when npm failed to download a file (i.e. you have a really poor internet connection) making the installation crash. But to save network query npm save everything in its cache thus corrupting it.
#### ✅ Fix :
To fix this error, try to clean npm cache : `$> npm cache verify` (this will delete corrupted files) then retry your `npm install`.
> Because your installation fails half-way, it's very likely that you also encounter the next error.

---
#### ⚠️ Error :
```bash
ERROR! movie/e2e/src/app.po.ts already exists.
The Schematic workflow failed. See above.
```
#### 📖 Explanation :
> This error happens because the Angular CLI tried to create a new project, but some file already exists. This may happen when a previous `ng new` has failed.
#### ✅ Fix :
To fix this error delete the project folder or run the `ng new` elsewhere.

---
#### ⚠️ Error :
```bash
$> ng add @angular/material
Cannot find module '@angular-devkit/schematics'
--OR--
Cannot find module '@angular/cdk/schematics'
```
#### 📖 Explanation :
> Schematics are files that explain to the Angular CLI how to add a package to an existing Angular project (i.e. updating configuration file such as main.ts). Here it seems that there is a problem between material, cdk and the Angular CLI.
#### ✅ Fix :
To fix this error, try to update your CLI and install the latest version of cdk THEN material : 
```bash
$> ng update @angular/cli @angular/core
$> ng add @angular/cdk@latest
$> ng add @angular/material@latest
```
---
#### ⚠️ Error :
```bash
npm ERR! Failed at the grpc@1.16.0 install script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
```
#### 📖 Explanation :
> This is either a problem with Windows and node or with the version of `@angular/fire`
#### ✅ Fix :
To fix this error, try to follow those steps : [Stackoverflow - Windows](https://stackoverflow.com/questions/35293117/npm-install-that-requires-node-gyp-fails-on-windows#answer-35293118)
Then force `@angular/fire` latest version :
```bash
$> npm i @angular/fire@latest
```


