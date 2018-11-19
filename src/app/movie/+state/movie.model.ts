import { ID } from '@datorama/akita';

export interface Movie {
  id: ID;
  name: string;
  release: number;
}

export function createMovie(params: Partial<Movie>) {
  return {

  } as Movie;
}
