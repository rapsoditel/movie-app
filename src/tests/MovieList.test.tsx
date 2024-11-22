import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { Mock, vi } from "vitest";
import { tmdbApi } from "../utils/api";
import MovieList from "../components/MovieList";

// Mock child components
vi.mock("../MovieCard", () => ({
  default: ({ movie }: { movie: any }) => <div>{movie.title}</div>,
}));
vi.mock("../Pagination", () => ({
  default: ({ currentPage, totalPages, onPageChange }: any) => (
    <div>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Prev
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  ),
}));

// Mock API module
vi.mock("../utils/api", () => ({
  tmdbApi: {
    get: vi.fn(),
  },
}));

describe("MovieList", () => {
  const mockMovies = [
    { title: "Movie 1" },
    { title: "Movie 2" },
    { title: "Movie 3" },
  ];

  const renderComponent = (query = "", category = "popular") => {
    return render(
      <MemoryRouter>
        <MovieList query={query} category={category} />
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays a loading message while fetching data", async () => {
    (tmdbApi.get as Mock).mockImplementationOnce(() => new Promise(() => {}));

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders a list of movies after fetching data", async () => {
    (tmdbApi.get as Mock).mockResolvedValueOnce({
      data: {
        results: mockMovies,
        total_pages: 3,
      },
    });

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });

    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it("displays a message if no movies are found", async () => {
    (tmdbApi.get as Mock).mockResolvedValueOnce({
      data: {
        results: [],
        total_pages: 1,
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("Movies not found")).toBeInTheDocument();
    });
  });

  it("handles pagination correctly", async () => {
    (tmdbApi.get as Mock).mockResolvedValueOnce({
      data: {
        results: mockMovies,
        total_pages: 3,
      },
    });

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    (tmdbApi.get as Mock).mockResolvedValueOnce({
      data: {
        results: mockMovies,
        total_pages: 3,
      },
    });
    fireEvent.click(screen.getByText(">"));

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });
  });

  it("handles errors gracefully", async () => {
    (tmdbApi.get as Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    renderComponent();

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Movies not found")).toBeInTheDocument();
    });
  });

  it("resets to page 1 when query or category changes", async () => {
    (tmdbApi.get as Mock).mockResolvedValueOnce({
      data: {
        results: mockMovies,
        total_pages: 3,
      },
    });

    const { rerender } = render(
      <MemoryRouter>
        <MovieList query="Batman" category="popular" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    (tmdbApi.get as Mock).mockResolvedValueOnce({
      data: {
        results: mockMovies,
        total_pages: 2,
      },
    });
    rerender(
      <MemoryRouter>
        <MovieList query="Superman" category="top_rated" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
    });
  });
});
