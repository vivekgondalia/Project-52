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
        <>
        <h2>Movie List</h2>
        <ol>
            {
                movieList.map( movie => (
                    <li key={movie.id}>
                        {movie.title}
                        <button onClick={() => handleRemove(movie.id)}>Remove This</button>
                    </li>
                ))
            }
        </ol>

        <MovieSearch onAdd={handleAdd}/>
        </>
    )
}

export default MovieList;