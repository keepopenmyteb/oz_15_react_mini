import MovieCard from '../components/MovieCard';
import dummy from '../data/movieListData.json';

function Home() {
  return (
    <div>
      <div className="movie-list">
        {dummy.results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
