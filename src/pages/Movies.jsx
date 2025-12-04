import React from 'react';
import MovieCard from '../components/MovieCard';
import dummy from '../data/movieListData.json'; 

function Movies() {
  return (
    <div className="movies">
      <div className="movie-list">
        {dummy.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Movies;

