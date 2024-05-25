import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

import Movie from './Movie'
import MovieSearch from './MovieSearch'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MovieSearch />
    <Movie />
  </React.StrictMode>,
)