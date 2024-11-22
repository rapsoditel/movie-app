import { render, screen, waitFor } from '@testing-library/react';
import MovieDetail from '../components/MovieDetail';
import { tmdbApi } from '../utils/api';
import { vi, Mock } from 'vitest'

vi.mock('../utils/api', () => ({
  tmdbApi: {
    get: vi.fn(),
  },
}));

describe('MovieDetail', () => {
  const movieId = 1;
  const movieData = {
    title: 'Inception',
    poster_path: '/path_to_poster.jpg',
    vote_average: 8.8,
    genres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Sci-Fi' },
    ],
    overview: 'A mind-bending thriller.',
  };

  it('renders movie details correctly after fetch', async () => {
  
    (tmdbApi.get as Mock).mockResolvedValueOnce({ data: movieData });

    render(<MovieDetail movieId={movieId} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Inception')).toBeInTheDocument();
      expect(screen.getByAltText('Inception')).toHaveAttribute(
        'src',
        'https://image.tmdb.org/t/p/w400/path_to_poster.jpg'
      );
      expect(screen.getByText('8.8')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
      expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
      expect(screen.getByText('A mind-bending thriller.')).toBeInTheDocument();
    });
  });


  it('displays an error message if the fetch fails', async () => {
    (tmdbApi.get as Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

    render(<MovieDetail movieId={movieId} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('Inception')).not.toBeInTheDocument();
    });
  });
});
