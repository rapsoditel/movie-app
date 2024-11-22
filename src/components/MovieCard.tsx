import React from "react";
import { Link } from "react-router-dom";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average : number
  };
  currentPage: number;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, currentPage }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      state={{ fromPage: currentPage }}
      data-testid="movie-card"
    >
      <div className="text-center relative bg-black bg-opacity-75 rounded h-full">
        <div className="absolute right-0 top-0 bg-yellow-400 text-xs font-semibold p-1 rounded-bl-lg">{movie.vote_average?movie.vote_average.toFixed(1):'N/A'}</div>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title || "Movie Poster"}
            className="rounded mx-auto w-full"
          />
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-2 pt-40">
          <h3 className="text-lg font-bold">{movie.title? movie.title : "N/A"}</h3>
          <p className="text-sm">
            {movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
