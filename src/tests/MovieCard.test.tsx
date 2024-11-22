import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

describe('MovieCard', () => {
  const movie = {
    id: 1,
    title: 'Avengers: Endgame',
    release_date: '2019-04-26',
    poster_path: '/path_to_poster.jpg',
    vote_average: 8.5,
  };

  it('renders the movie poster, title, release date, and vote_average', () => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} currentPage={1} />
      </MemoryRouter>
    );

    const poster = screen.getByRole('img');
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/path_to_poster.jpg');
    expect(poster).toHaveAttribute('alt', 'Avengers: Endgame');

    const title = screen.getByText('Avengers: Endgame');
    expect(title).toBeInTheDocument();

    const releaseDate = screen.getByText('2019');
    expect(releaseDate).toBeInTheDocument();

    const voteAverage = screen.getByText('8.5');
    expect(voteAverage).toBeInTheDocument();
  });

  it('render N/A if title is missing', () => {
    const movieWithoutTitle = { ...movie, title: '' };

    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutTitle} currentPage={1} />
      </MemoryRouter>
    );

    const poster = screen.getByRole('img');
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/path_to_poster.jpg');

    const title = screen.queryByText('N/A');
    expect(title).toBeInTheDocument();

    const releaseDate = screen.getByText('2019');
    expect(releaseDate).toBeInTheDocument();
  });

  it('does not break if release_date is missing', () => {
    const movieWithoutReleaseDate = { ...movie, release_date: '' };

    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutReleaseDate} currentPage={1} />
      </MemoryRouter>
    );

    const poster = screen.getByRole('img');
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/path_to_poster.jpg');

    const title = screen.getByText('Avengers: Endgame');
    expect(title).toBeInTheDocument();

    const releaseDate = screen.getByText('N/A');
    expect(releaseDate).toBeInTheDocument();
  });

  it('renders "N/A" if vote_average is missing', () => {
    const movieWithoutVote = { ...movie, vote_average: 0 };

    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutVote} currentPage={1} />
      </MemoryRouter>
    );

    const poster = screen.getByRole('img');
    expect(poster).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w200/path_to_poster.jpg');

    const title = screen.getByText('Avengers: Endgame');
    expect(title).toBeInTheDocument();

    const releaseDate = screen.getByText('2019');
    expect(releaseDate).toBeInTheDocument();

    const voteAverage = screen.getByText('N/A');
    expect(voteAverage).toBeInTheDocument();
  });

  it('does not render the poster if poster_path is null', () => {
    const movieWithoutPoster = { ...movie, poster_path: '' };

    render(
      <MemoryRouter>
        <MovieCard movie={movieWithoutPoster} currentPage={1} />
      </MemoryRouter>
    );

    const poster = screen.queryByRole('img');
    expect(poster).toBeNull();

    const title = screen.getByText('Avengers: Endgame');
    expect(title).toBeInTheDocument();

    const releaseDate = screen.getByText('2019');
    expect(releaseDate).toBeInTheDocument();
  });

  it('navigates to the correct route when the link is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MovieCard movie={movie} currentPage={1} />} />
          <Route path="/movie/:id" element={<div>Movie Detail Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByTestId('movie-card');
    expect(link).toHaveAttribute('href', '/movie/1');

    fireEvent.click(link);

    const detailPage = screen.getByText('Movie Detail Page');
    expect(detailPage).toBeInTheDocument();
  });
});
