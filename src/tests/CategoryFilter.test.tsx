import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../components/CategoryFilter';

describe('CategoryFilter', () => {
  const mockOnSelectCategory = vi.fn();

  it('renders the correct number of buttons based on categories data', () => {
    render(<CategoryFilter onSelectCategory={mockOnSelectCategory} selectedCategory="now_playing" />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
  });

  it('calls onSelectCategory when a button is clicked', () => {
    render(<CategoryFilter onSelectCategory={mockOnSelectCategory} selectedCategory="now_playing" />);
    const popularButton = screen.getByText('Popular');
    fireEvent.click(popularButton);
    expect(mockOnSelectCategory).toHaveBeenCalledWith('popular');
  });

  it('applies the correct class for the selected category button', () => {
    render(<CategoryFilter onSelectCategory={mockOnSelectCategory} selectedCategory="popular" />);
    
    const popularButton = screen.getByText('Popular');
    expect(popularButton).toHaveClass('bg-white text-gray-700');
    
    const nowPlayingButton = screen.getByText('Now Playing');
    expect(nowPlayingButton).toHaveClass('bg-gray-700 text-white');
  });
});
