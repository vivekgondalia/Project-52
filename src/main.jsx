import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

import Movie from './Movie'
import MovieList from './MovieList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1>Project 52</h1>
    {/* <Movie /> */}
    <MovieList />
  </React.StrictMode>,
)