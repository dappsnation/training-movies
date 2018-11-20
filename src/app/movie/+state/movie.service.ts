import { Injectable } from '@angular/core';
import { MovieStore } from './movie.store';
import { Movie } from './movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {

  constructor(private store: MovieStore) {}

  public add(movie: Movie) {
    console.log(movie);
    this.store.add(movie);
  }

}
