import { Component, OnInit } from '@angular/core';
import { MovieQuery, Movie } from './../../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'movie-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public movies$: Observable<Movie[]>;

  constructor(private query: MovieQuery) {}

  ngOnInit() {
    this.movies$ = this.query.selectAll();
  }

}
