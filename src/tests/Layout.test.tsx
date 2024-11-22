import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';

const DummyPage = () => <div>Dummy Page Content</div>;

describe('Layout', () => {
  it('renders the Header component', () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const header = screen.getByTestId('header');
    expect(header).toBeInTheDocument();
  });

  it('renders the correct component in the Outlet during routing', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DummyPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );

    const dummyContent = screen.getByText('Dummy Page Content');
    expect(dummyContent).toBeInTheDocument();
  });
});
