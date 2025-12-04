import { useNavigate } from "react-router-dom";
import './MovieCard.scss';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  return (
    <div 
      className="movie-card" 
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img 
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
        alt={movie.title} 
      />
      <h3>{movie.title}</h3>
      <p>평점: {movie.vote_average.toFixed(1)}</p>
    </div>
  );
}

export default MovieCard;