import React, { useEffect, useState } from "react";
import { tmdbApi } from "../utils/api";

interface MovieDetailProps {
  movieId: number;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movieId }) => {
  const [movie, setMovie] = useState<any>(null);

  const fetchDetail = async () => {
    try {
      const response = await tmdbApi.get(`/movie/${movieId}`);
      setMovie(response.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="flex gap-8 flex-col md:flex-row">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title || "Movie Poster"}
          className="rounded"
        />
      )}

      <div className="text-white">
        <div className="flex gap-4 items-center mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold">{movie.title || "N/A"}</h1>
          <div className="bg-yellow-400 text-base font-semibold py-1 px-2 rounded-bl-md text-slate-900">
            {movie.vote_average? movie.vote_average.toFixed(1) : "N/A"}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {movie.genres.length > 0 &&
            movie.genres.map((item: { id: number; name: string }) => (
              <div
                key={item.id}
                className="text-xs rounded-md py-1 px-2 bg-slate-300 text-slate-900 font-semibold"
              >
                {item.name}
              </div>
            ))}
        </div>

        <p>{movie.overview || "N/A"}</p>
      </div>
    </div>
  );
};

export default MovieDetail;
