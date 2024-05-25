import {useState} from 'react';
import movieApi from './movieApi';

const MovieSearch = () => {
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

    return <> 
    <form>
        <input 
                type="text"
                name="query"
                placeholder='Search movie name'
                value={query}
                onChange={handleQueryChange}
        />
        <button onClick={handleSearch}>Search</button> 
    </form>
    <h2>Search Results : </h2>
    <ol>
        {
            results.map( movie => (
                <li key={movie.id}>
                    {movie.title} - {movie.release_date.split('-')[0]}
                    {/* <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={`${movie.title}`} /> */}
                </li>
            ))
        }
    </ol> 
    </>

}

export default MovieSearch;