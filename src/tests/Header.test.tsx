
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header', () => {
  it("render title on header", ()=>{
    render(<Header/>);
    const message = screen.queryByText(/MovieApp/i);
    expect(message).toBeVisible()
  })
})
