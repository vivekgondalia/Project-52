import {useState, useEffect} from 'react';
import MovieSearch from './MovieSearch'
import axios from 'axios';

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://localhost:7109/api/movies');
            //console.log(response.data);
            setMovieList(response.data);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    const handleAdd = (newMovie) => {
        //send the new movie to DB
        const url = 'https://localhost:7109/api/Movies';
        const data = {
            title: newMovie.title,
            month: parseInt(newMovie.release_date.split('-')[1]),
            year: parseInt(newMovie.release_date.split('-')[0])
        };

        axios.post(url, data)
        .then(response => {
            // Handle success
            setMovieList([...movieList, response.data]);
        })
        .catch(error => {
            // Handle error
            console.error('Error:', error);
        });
    }

    const handleRemove = (movieId) => {
        const updatedMovieList = movieList.filter(movie => movie.id !== movieId);
        setMovieList(updatedMovieList);
    }
    
    const tableData = movieList.map((movie,idx) => {
        return (
            <tr key={movie.id}>
                <td>{idx + 1}</td>
                <td>{movie.title}</td>
                <td>{movie.year}</td>
                <td><button className="buttonRemove" onClick={() => handleRemove(movie.id)}>Remove</button></td>
            </tr>
        );
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="movieListWrapperOut">
            <div className='movieListWrapperIn'>
                <h2>Movie List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Week #</th>
                            <th className='tableHeaderMovie'>Movie Name</th>
                            <th>Year</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData} 
                    </tbody>
                </table>
                {/* <ol>
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
                </ol> */}
            </div>
            <MovieSearch onAdd={handleAdd}/>
        </div>
    )
}

export default MovieList;