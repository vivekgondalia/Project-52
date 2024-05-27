import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

import MovieList from './MovieList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='mainWrapper'>
      <MovieList/>
    </div>
    
  </React.StrictMode>,
)