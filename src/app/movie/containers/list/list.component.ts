import { Component, OnInit } from '@angular/core';
import { MovieService, MovieQuery, Movie, createMovie,  } from './../../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'movie-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public movies$: Observable<Movie[]>;

  constructor(
    private query: MovieQuery,
    private service: MovieService
  ) {}

  ngOnInit() {
    this.movies$ = this.query.selectAll();
  }

  public add(name: string) {
    const id = Math.floor(Math.random() * 1000).toString();
    const movie = createMovie({ name, id });
    this.service.add(movie);
  }
}
