import {useState} from 'react';
import MovieSearch from './MovieSearch'

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);

    const handleAdd = (newMovie) => {
        console.log(newMovie);
        setMovieList([...movieList, newMovie]);
    }

    return (
        <>
        <h2>Movie List</h2>
        <ol>
            {
                movieList.map( movie => (
                    <li key={movie.id}>{movie.title}</li>
                ))
            }
        </ol>

        <MovieSearch onAdd={handleAdd}/>
        </>
    )
}

export default MovieList;