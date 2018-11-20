# UI
First we will create a `shared` folder where we will have our UI module. This module will be use to export all our shared UI components, and all the material modules.
```bash
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
```bash
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
```bash
npx akita
```
And answer : 
```bash
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
```typescript
export interface Movie {
  id: ID;
  name: string;
  release: number;
}
  
export  function  createMovie(params:  Partial<Movie>) {
  return { ...params } as  Movie;
}
```
We will update it later, but for now let's keep it simple.

#### Bonus DevTools
One of the best of state management is the DevTools that you can install on your browser to see state history.
First add the [extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) (Chrome) or [addon](https://addons.mozilla.org/en-US/firefox/addon/remotedev/) (Firefox).
Then in  `app.module.ts` inside the `imports` array add : 
```
environment.production  ? [] :  AkitaNgDevtools.forRoot()
``` 
> See Akita [documentation](https://netbasal.gitbook.io/akita/enhancers/devtools) for more details.

## Components

In this module we will have two folders for our components: 

- `containers`: For stateful components
- `components`: For stateless components

### Movie List
The list is a stateful component: 
```bash
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

#### Routing
For now, when we launch our application, we want to see the `movie-list` components. Let's make our AppComponent a router outlet : 
In `app.component.ts`change the template and style : 
```typescript
import { Component } from  '@angular/core';
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: [':host { display: block; height: 100% }']
})
export class AppComponent {}
```
This will enable the AppComponent to host the routes. We don't need `app.component.html` and `app.component.scss` anymore. **Delete them**.

We need to redirect our route toward our `MovieComponent` : 

- In `app-routing.module.ts`: update `routes`
```typescript
const  routes:  Routes  = [
  { path: '', redirectTo: 'movie', pathMatch: 'full' },
  { path: 'movie', loadChildren: './movie/movie.module#MovieModule' }
];
```
This will redirect the default route to the`/movie` which will lazyload the content of the MovieModule. Right now the lazyloading does not much, but later it's going to be helpful to  load faster the first page.

You can find the complet documentation for Lazy Loading [here](https://angular.io/guide/lazy-loading-ngmodules).

- In `movie-routing.module.ts`: update `routes`
```typescript
import { ListComponent } from './containers/list/list.component';
const  routes:  Routes  = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListComponent }
];
```
Now when the `/movie` route is called it will redirect to `/movie/list` and display the `ListComponent` to the screen.
Let's check : 
```
ng serve
```
We don't see any movies because none have been added to the store.

## Service
As you can see in Akita [documentation](https://netbasal.gitbook.io/akita/#what-is-akita), the service is the one that updates the state. Open `+state/movie.service.ts` :

```typescript
import { Injectable } from  '@angular/core';
import { MovieStore } from  './movie.store';
import { Movie } from  './movie.model';

@Injectable({ providedIn:  'root' })
export  class  MovieService {

  constructor(private  store:  MovieStore) {}

  public add(movie:  Movie) {
    this.store.add(movie);
  }
}
```

Then we need to inject the service into our component and call this method `add`.
In `list.component.ts` add this method :  
```typescript
// Inject the service in the constructor
constructor(
  private query: MovieQuery,
  private service: MovieService
) {}
...
// Create a movie with a name and call add in service
public add(name: string) {
  const id = Math.floor(Math.random() *  1000).toString();
  const movie = createMovie({ name, id });
  this.service.add(movie);
}
```
Later we will use a more sophisticated id generator.
And the template `list.template.html`: 
```html
...
<!-- Mat Toolbar above -->
<form>
  <mat-form-field>
    <input #name placeholder="name" />
  </mat-form-field>
  <button mat-button type="button" (click)="add(name.value)">Create Movie</button>
</form>
<!-- List Below -->
...
```
> Don't forget to add `MatFormFieldModule` and `MatInputModule` in the `UiModule`.

When the button is clicked it gets the value of `#name` (the input) and send it to the `add` method in `list.component.ts`. We specify `type="button"` to prevent default behaviour with the `form` tag that would reload the page.

## Testing
Let's test our component.

In `list.component.spect.ts` : 
- We need to provide the `MovieService` and  
