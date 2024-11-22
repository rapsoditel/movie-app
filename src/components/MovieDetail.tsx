import React, { useEffect, useState } from "react";
import { tmdbApi } from "../utils/api";
import { createInitials } from "../utils/tools";

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
    <div className="flex gap-8 flex-col md:flex-row text-white">
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt={movie.title || "Movie Poster"}
          className="rounded"
        />
      )}

      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="flex gap-4 items-center">
            <h1 className="text-2xl lg:text-3xl font-bold">
              {movie.title || "N/A"}{" "}
              <span className="font-thin">{`(${
                movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"
              })`}</span>
            </h1>
            <div className="bg-yellow-400 text-base font-semibold py-1 px-2 rounded-bl-md text-slate-900">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </div>
          </div>
          <p className="font-extralight italic opacity-80 mb-4 text-sm lg:text-base">
            {movie.tagline}
          </p>
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
        <div>
          <p className="italic mb-2">Produced by :</p>
          <div className="flex gap-4 flex-wrap">
            {movie.production_companies.map(
              (item: { name: string; logo_path: string }, idx: number) => (
                <div
                  key={idx}
                  className="flex gap-1 items-center bg-white bg-opacity-20 pr-2 rounded-lg"
                >
                  <div className="bg-white rounded-lg p-1 w-10 h-10 flex items-center justify-center">
                    {item.logo_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                        alt={item.name}
                        className="w-11/12"
                      />
                    ) : (
                      <div className="text-slate-900 font-bold">
                        {createInitials(item.name)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm">{item.name}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
