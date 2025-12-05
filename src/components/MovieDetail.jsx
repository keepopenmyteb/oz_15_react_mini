import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./MovieDetail.scss";

const fetchMovieDetailAPI = async (id) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NzAzYjhjYzRmODU3Njc4YzYwZGM2NTllNWE1ZWY2MSIsIm5iZiI6MTc2NDgzNjcxOS4wNTcsInN1YiI6IjY5MzE0NTZmZTMyZjI4MjJmMDEzOTljYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pgha52Dn31f3sYRrNEkFTuympuppVoOYiSkWY6bmTrU`
      }
    }
  );

  const data = await response.json();

  return {
    ...data,
   posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
  overview: data.overview?.trim() || "제공되는 줄거리가 없습니다"
  };
};

function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const loadMovieDetail = async () => {
      try {
        const movieData = await fetchMovieDetailAPI(id);
        setMovie(movieData);
      } catch (err) {
        setError("영화 정보를 불러오는 데 실패했습니다");
      } 
        setLoading(false);
    };

    loadMovieDetail();
  }, [id]);

  if (loading) return <h1 className="loading-message">로드 중...</h1>;
  if (error) return <div className="error-message">{error}</div>;


  return (
    <div className="movie-detail">
      <div className="poster">
        <img src={movie.posterUrl} alt={movie.title} />
      </div>

      <div className="info">
        <div className="top-row">
          <h2>{movie.title}</h2>
          <div className="rating">평점: {movie.vote_average.toFixed(1)}</div>
        </div>

        <div className="genres">
          {movie.genres?.map((genre) => (
            <span key={genre.id} className="genre-tag">
              {genre.name}
            </span>
          ))}
        </div>

        <div className="overview-title">줄거리</div>
        <div className="overview">{movie.overview}</div>
      </div>
    </div>
  );
}

export default MovieDetail;
