import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('popular');

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      <CategoryFilter onSelectCategory={setCategory} selectedCategory={category}/>
      <MovieList query={query} category={category} />
    </div>
  );
};

export default Home;
