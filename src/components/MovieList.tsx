import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { tmdbApi } from "../utils/api";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

interface MovieListProps {
  query: string;
  category: string;
}

const MovieList: React.FC<MovieListProps> = ({ query, category }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchMovies = async () => {
    setIsLoading(true);
    const url = query ? `/search/movie` : `/movie/${category}`;

    const params: { query?: string; page: number } = {
      page: currentPage,
    };

    if (query) params.query = query;

    try {
      const response = await tmdbApi.get(url, { params });
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      return error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
  }, [searchParams]);

  useEffect(() => {
    fetchMovies();
  }, [currentPage, query, category]);

  useEffect(() => {
    setCurrentPage(1);
    setSearchParams();
  }, [query, category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSearchParams({ page: page.toString() });
  };

  return (
    <>
      {isLoading && <p className="text-center mt-4">Loading...</p>}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie, idx) => (
          <MovieCard key={idx} movie={movie} currentPage={currentPage} />
        ))}
      </div>
      {movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      {
        movies.length === 0 && <center className="text-white p-4 text-center">Movies not found</center>
      }
    </>
  );
};

export default MovieList;
