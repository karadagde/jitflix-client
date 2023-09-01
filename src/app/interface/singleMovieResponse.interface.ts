import { Comment } from './comment.interface';
import { Movie } from './movie.interface';
export interface SingleMovieResponse {
  movie: Movie;
  comments: Comment[];
}
