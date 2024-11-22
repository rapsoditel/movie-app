import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import MovieDetail from '../components/MovieDetail';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.fromPage || 1;

  const handleBack = () => {
    navigate(`/?page=${fromPage}`) 
  };

  return (
    <div>
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-700 text-white py-2 px-4 rounded"
      >
        Back
      </button>
      {id && <MovieDetail movieId={parseInt(id, 10)} />}
    </div>
  );
};

export default MovieDetailPage;
