import {useState} from 'react';
import MovieSearch from './MovieSearch'

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);

    const handleAdd = (newMovie) => {
        setMovieList([...movieList, newMovie]);
    }

    const handleRemove = (movieId) => {
        const updatedMovieList = movieList.filter(movie => movie.id !== movieId);
        setMovieList(updatedMovieList);
    }

    return (
        <div className="movieListWrapperOut">
            <div className='movieListWrapperIn'>
                <h2>Movie List</h2>
                <ol>
                    {
                        movieList.map( movie => (
                            <li key={movie.id}>
                                <div class="movieItemPosterWrapper">
                                    <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={`${movie.title}`} />
                                </div>
                                <div class="movieItemContent">
                                    <p className='truncate'>{movie.title}</p>
                                    <p>({movie.release_date.split('-')[0]})</p>
                                    <button onClick={() => handleRemove(movie.id)}>Remove This</button>
                                </div>
                            </li>
                        ))
                    }
                </ol>
            </div>
            <MovieSearch onAdd={handleAdd}/>
        </div>
    )
}

export default MovieList;