# UI
First we will create a `shared` folder where we will have our UI module. This module will be use to export all our shared UI components, and all the material modules.
```
ng g module shared/ui
```

In our `ui.module.ts` : 

```typescript
import {MatButtonModule} from  '@angular/material/button';
import {MatSidenavModule} from  '@angular/material/sidenav';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatCardModule} from  '@angular/material/card';
import {MatListModule} from  '@angular/material/list';

@NgModule({
  exports: [
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule
  ]
})
export class UiModule { }
```
Here are some common `@angular/material` modules. We will add more later depending on our needs.

# Movie Module

Let's create a module for our movies with routing : 
```
ng g module movie --routing
```
### Import UiModule
In our `movie.module.ts` add `UiModule` in the imports list :

```typescript
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MovieRoutingModule,
    UiModule	// add UiModule here
  ]
})
export class MovieModule { }
```

### [Option] Change `src/tslint.json`
I like my component to have a module specific prefix. On both `directive-selector` and `component-selector` change `"app"` with `["app", "movie"]` . Like that our components will accept selector prefixed with `movie` (e.g. : `movie-list`).

## State
If you're not familliar with Akita, you should check the [doc](https://netbasal.gitbook.io/akita/) to understand better how it works.

Let's create the state. For that we will use the `akita`cli. First, in `package.json` add : 
```javascript
"akitaCli": {
  "customFolderName": "true",
  "isAngular": true,
  "basePath": "./src/app"
}
```
Then run,  :
```
npx akita
```
And answer : 
```
? Give me a name, please 😀 movie
? Which store do you need? 😊 Entity Store
? Give me a folder name, please +state
? Choose a directory.. movie
```
I like to call my folder `+state` like that I'm sure it's always at the top of the module folder.

This will create a `+state` folder inside the `movie`directory with : 

- `movie.model.ts`: Where the interface of our `Movie` lives.
- `movie.query.ts`: Helpers to keep our components.
- `movie.service.ts`: Angular service to update the state of the movie store and sync with the ouside world (Firebase in our case).
- `movie.store.ts`: An in-memory immutable state which is our single source of truth.

For a better understanding of the application structure checkout the [doc](https://netbasal.gitbook.io/akita/entity-store/application-structure).

#### Model 
Inside `movie.model.ts` set Movie like that : 
```
export interface Movie {
  id: ID;
  name: string;
  release: number;
}
```
We will update it later, but for now let's keep it simple.

## Components

In this module we will have two folders for our components: 

- `containers`: For stateful components
- `components`: For stateless components

### Movie List
The list is a stateful component: 
```
ng g component movie/containers/list
```
> [Option] : change selector "app-list" to "movie-list"

#### Component
Movie List will display all the movies that we have in the store. Let's inject our query : 

```typescript
export class ListComponent implements OnInit {
  public movies$: Observable<Movie[]>;

  constructor(private query: MovieQuery) {}

  ngOnInit() {
    this.movies$ = this.query.selectAll();
  }
}
```
The `selectAll` method is a Observable that triggers each time the movie store is updated. Like that the component list is always in sync with the store.

#### Template
Now we need to subscribe to this Observable and display this list of movies. With the `async`pipe we can subscribe and unsubscribe automatically to an Observable which makes it much easier to work with it.
```html
<mat-toolbar>
  <h1>Movie List</h1>
</mat-toolbar>
<mat-action-list>
  <mat-list-item  *ngFor="let movie of movies$ | async">
    <h2  mat-line>{{ movie.name }}</h2>
    <p  mat-line>{{ movie.release | date }}</p>
  </mat-list-item>
</mat-action-list>
```
