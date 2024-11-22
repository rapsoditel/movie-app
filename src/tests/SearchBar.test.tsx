import { render, fireEvent, screen } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

describe('SearchBar', () => {
  it('should display the input field on the UI', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search movies...');
    expect(input).toBeInTheDocument(); 
  });

  it('updates the input value on change', () => {
    render(<SearchBar onSearch={vi.fn()} />);
    const input = screen.getByPlaceholderText('Search movies...');
    fireEvent.change(input, { target: { value: 'Avengers' } });
    expect(input).toHaveValue('Avengers');
  });
});
