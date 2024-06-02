import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import MovieList from './MovieList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='mainWrapper'>
      <ToastContainer/>
      <MovieList/>
    </div>
    
  </React.StrictMode>,
)