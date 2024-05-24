import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'

import Movie from './Movie'
// import ProjectIdeas from './ProjectIdeas'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Movie />
    {/* <ProjectIdeas /> */}
  </React.StrictMode>,
)