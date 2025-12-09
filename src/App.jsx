import './App.scss'; 
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MyList from './pages/MyList';
import Home from './pages/Home';
import About from './pages/About';
import Movies from './pages/Movies';
import Contact from './pages/Contact';
import Series from './pages/Series';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MovieDetail from './components/MovieDetail'; 
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route 
        path="/" 
        element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      >
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="movies" element={<Movies />} />
        <Route path="series" element={<Series />} />
        <Route path="contact" element={<Contact />} />
        <Route path="detail/:id" element={<MovieDetail />} /> 
        <Route path="mylist" element={<MyList />} />
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
