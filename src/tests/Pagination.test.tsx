import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";
import { Mock } from "vitest";


describe("Pagination Component", () => {
  const setup = (currentPage: number, totalPages: number, onPageChange: Mock) => {
    render(
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    );
  };

  it("displays the correct page numbers", () => {
    const mockOnPageChange = vi.fn();
    setup(3, 10, mockOnPageChange);

    // Check visible page numbers (should show pages near the current page)
    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(7); // 2 navigation buttons + 5 page numbers
    expect(pageButtons.map((btn) => btn.textContent)).toEqual(["<", "1", "2", "3", "4", "5", ">"]);
  });

  it("disables the 'Previous' button on the first page", () => {
    const mockOnPageChange = vi.fn();
    setup(1, 5, mockOnPageChange);

    const prevButton = screen.getByText("<");
    expect(prevButton).toBeDisabled();
  });

  it("disables the 'Next' button on the last page", () => {
    const mockOnPageChange = vi.fn();
    setup(5, 5, mockOnPageChange);

    const nextButton = screen.getByText(">");
    expect(nextButton).toBeDisabled();
  });

  it("calls 'onPageChange' with the correct page number when a page button is clicked", () => {
    const mockOnPageChange = vi.fn();
    setup(2, 10, mockOnPageChange);

    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("calls 'onPageChange' with the previous page number when 'Previous' is clicked", () => {
    const mockOnPageChange = vi.fn();
    setup(3, 10, mockOnPageChange);

    const prevButton = screen.getByText("<");
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls 'onPageChange' with the next page number when 'Next' is clicked", () => {
    const mockOnPageChange = vi.fn();
    setup(3, 10, mockOnPageChange);

    const nextButton = screen.getByText(">");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it("renders only available pages when totalPages is less than maxVisiblePages", () => {
    const mockOnPageChange = vi.fn();
    setup(1, 3, mockOnPageChange);

    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(5); // 2 navigation buttons + 3 page numbers
    expect(pageButtons.map((btn) => btn.textContent)).toEqual(["<", "1", "2", "3", ">"]);
  });
});
