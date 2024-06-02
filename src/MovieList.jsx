import {useState, useEffect} from 'react';
import MovieSearch from './MovieSearch'
import axios from 'axios';
import _, { first } from 'lodash';
import genreMap from './genreMap';
import { toast } from 'react-toastify';
import MovieTable from './MovieTable';


const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortColumn, setSortColumn] = useState({path : 'title', order: 'asc'});

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('https://localhost:7109/api/movies');
            let sortedMovieList = _.orderBy(response.data, [sortColumn.path], [sortColumn.order]);
            setMovieList(sortedMovieList);
          } catch (error) {
            setError(error);
            toast.error('Error fetching movies. Sorry.');
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
            setMovieList([...movieList, response.data]);
            toast.success('Movie was added to DB');
        })
        .catch(error => {
            toast.error(`Sorry, ${error.response.data}`);
        });
    }

    const handleAddManual = (newMovie) => {
        const url = 'https://localhost:7109/api/Movies';
        const data = {
            title: newMovie.title,
            month: parseInt(newMovie.year),
            year: parseInt(newMovie.month)
        };

        axios.post(url, data)
        .then(response => {
            setMovieList([...movieList, response.data]);
            toast.success('Movie was added to DB');
        })
        .catch(error => {
            toast.error('Failed to ADD movie. Sorry.');
        });
    }

    const handleRemove = async (movieId) => {
        try {
            const url = 'https://localhost:7109/api/Movies';
            await axios.delete(`${url}/${movieId}`);
            
            // Handle further actions like updating UI or redirecting
            const updatedMovieList = movieList.filter(movie => movie.id !== movieId);
            let sortedMovieList = _.orderBy(updatedMovieList, [sortColumn.path], [sortColumn.order]);
            setMovieList(sortedMovieList);
            toast.success('Movie was removed from your list.');
          } catch (error) {
            toast.error('Sorry, could not delete the movie.');
          }
        
    }

    const handleSort = path => {
        setSortColumn({path, order: 'asc'});
    }

    const getGenreName = movie => {
        const firstGenreId = movie["genre_ids"][0];
        console.log(genreMap.get(firstGenreId));
        return genreMap.get(firstGenreId);
    }
    
    // const sortedMovieList = _.orderBy(movieList, [sortColumn.path], [sortColumn.order]);
    
    // const tableData = sortedMovieList.map((movie,idx) => {
    //     return (
    //         <tr key={movie.id}>
    //             <td>{idx + 1}</td>
    //             <td>{movie.title}</td>
    //             <td>{movie.month}</td>
    //             <td>{movie.year}</td>
    //             <td><button className="buttonRemove" onClick={() => handleRemove(movie.id)}>Remove</button></td>
    //         </tr>
    //     );
    // });

    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="movieListWrapperOut">
            {/* <div className='movieListWrapperIn'>
                <h1>Project 52<span>({movieList.length})</span></h1>
            </div> */}
            <MovieSearch onAdd={handleAdd} onAddManual={handleAddManual}/>
            <MovieTable data={movieList} onSort={handleSort} onDelete={handleRemove}/>
        </div>
    )
}

export default MovieList;