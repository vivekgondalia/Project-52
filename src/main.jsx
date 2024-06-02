import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


import Navigation from './Navigation';
import MovieList from './MovieList'
import Home from './Home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Router>
        <div>
          <Navigation />
          <div className='mainWrapper'>
            <ToastContainer/>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<MovieList />} />
            </Routes>
          </div>
        </div>
      </Router>
  </React.StrictMode>,
)