import { useParams } from "react-router-dom";
import movieList from "../data/movieListData.json";
import movieDetailData from "../data/movieDetailData.json";
import "./MovieDetail.scss";

function MovieDetail() {
  const { id } = useParams();
  const movie = movieList.results.find(m => m.id === Number(id));

  if (!movie) return <p>영화를 찾을 수 없습니다.</p>;

  function getGenreName(id) {
    const genre = movieDetailData.genres.find(g => g.id === id);
    return genre ? genre.name : "기타";
  }

  return (
    <div className="movie-detail">
      <div className="poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
          alt={movie.title} 
        />
      </div>
      <div className="info">
        <div className="top-row">
          <h2>{movie.title}</h2>
          <div className="rating">평점: {movie.vote_average.toFixed(1)}</div>
        </div>
        <div className="genres">
          {movie.genre_ids.map(id => (
            <span key={id}>{getGenreName(id)}</span>
          ))}
        </div>
        <div className="overview">{movie.overview}</div>
      </div>
    </div>
  );
}

export default MovieDetail;
