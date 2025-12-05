import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import './MovieCard.scss'; 

const fetchMoviesAPI = async () => {
  const response = await fetch(
    'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc',
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzAzYjhjYzRmODU3Njc4YzYwZGM2NTllNWE1ZWY2MSIsIm5iZiI6MTc2NDgzNjcxOS4wNTcsInN1YiI6IjY5MzE0NTZmZTMyZjI4MjJmMDEzOTljYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pgha52Dn31f3sYRrNEkFTuympuppVoOYiSkWY6bmTrU`
      }
    }
  );

  const data = await response.json();

  return data.results.map(movie => ({
    ...movie,
    posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    overview: movie.overview?.trim() || '제공되는 영화 정보가 없습니다'
  }));
};

const IndividualMovieCard = ({ movie }) => {
  const { title, posterUrl, vote_average, id } = movie;

  return (
    <Link to={`/detail/${id}`} className="movie-card-link">
      <div className="movie-card">
        <img 
          src={posterUrl}
          alt={`${title} 포스터`}
          className="movie-poster"
        />
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-rating">평점: {vote_average.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
};

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const movieData = await fetchMoviesAPI();
        setMovies(movieData);
      } catch (err) {
        setError('데이터 로드 실패');
      } 
        setLoading(false);
    };

    loadMovies();
  }, []);

  if (loading) return <h1 className="loading-message">로드 중...</h1>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="list-container">
      <div className="movie-list">
        {movies.map(movie => (
          <IndividualMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCard;
