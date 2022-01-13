import { useState } from 'react'
import { NavBar } from './shared/NavBar'
import {Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Home } from './components/Home';
import { Movie } from './components/Movie';
import MovieContext from './context/MovieContext';
import { SearchMovie } from './components/SearchMovie';
import SearchContext from './context/SearchContext';

function App() {
  const [movie, setMovie] = useState(null);
  const [query, setQuery] = useState('')
  return (
    <SearchContext.Provider value={{query, setQuery}}>
    <MovieContext.Provider value={{movie, setMovie}}>
      <NavBar />
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/movie" element={<Movie />}></Route>
        <Route path="/search/:query" element={<SearchMovie />}></Route>
        <Route
            path="*"
            element={
              <Home />
            }
        />
      </Routes>
    </MovieContext.Provider>
    </SearchContext.Provider>
  )
}

export default App
