import './App.scss'; 
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Movies from './pages/Movies';
import Contact from './pages/Contact';
import MovieDetail from './components/MovieDetail'; 
import MovieCard from './components/MovieCard';
import dummy from './data/movieListData.json'; 


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="movies" element={<Movies />} />
        <Route path="contact" element={<Contact />} />
        
        <Route 
          path="movies-list" 
          element={
            <div className="list-container"> 
              <div className="movie-list">
                {dummy.results.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          }
        />
        
        <Route path="movie/:id" element={<MovieDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
