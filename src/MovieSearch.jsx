import {useState} from 'react';
import movieApi from './movieApi';

const MovieSearch = ({onAdd}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    //what am I going to do with this result? 
    //I would like to show the search result(s)
    //Have the ability select the movie that user would want to add to the list of movies

    //TODO
    const handleSearch = (e) => {
        e.preventDefault();
        //axios to rescue
        movieApi.get(`/search/movie?query=${query}`)
        .then(response => {
            //setData(response.data);
            //setLoading(false);
            //console.log(response.data.results[0]);
            setResults(response.data.results);
        })
        .catch(error => {
            console.log(error);
            //setError(error);
            //setLoading(false);
        });
    }

    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery(value);
    }

    const handleAddToTheList = (movie) => {
        onAdd(movie);
    }

    return (
    <div className="movieSearchWrapper">
        <h2>Search</h2> 
        <form className="movieSearchInput">
            <input 
                    type="text"
                    name="query"
                    placeholder='Search movie name'
                    value={query}
                    onChange={handleQueryChange}
            />
            <button onClick={handleSearch}>Search</button> 
        </form>
        
        {results.length ? <h2>Search Results : </h2> : null}
        
        <ol className='movieSearchResults'>
            {
                results.map( movie => (
                    <li key={movie.id}>
                        {movie.title} - {movie.release_date.split('-')[0]}
                        {/* <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title}`} /> */}
                        <button onClick={() => handleAddToTheList(movie)}>Add This Movie!</button>
                    </li>
                ))
            }
        </ol> 
    </div>
    )
}

export default MovieSearch;