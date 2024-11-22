import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetailPage from "./pages/MovieDetailPage";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Route>
        </Routes>
    </Router>
  );
};

export default App;
