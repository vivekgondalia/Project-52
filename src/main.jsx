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
    <div className='mainWrapper'>
      <ToastContainer/>
      {/* <MovieList/> */}
      <Router>
        <div>
          <Navigation />
          {/* <nav>
            <ul>
              <li>
                
              </li>
              <li>
                <Link to="/movies">My Movies</Link>
              </li>
            </ul>
          </nav> */}

          {/* A <Routes> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<MovieList />} />
          </Routes>
        </div>
      </Router>
    </div>
    
  </React.StrictMode>,
)