import {useState} from 'react';
import movieApi from './movieApi';

const MovieSearch = () => {
    const [query, setQuery] = useState('');
    //what am I going to do with this result? 
    //I would like to show the search result(s)
    //Have the ability select the movie that user would want to add to the list of movies

    //TODO
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(query);
        //axios to rescue
        movieApi.get(`/search/movie?query=${query}`)
        .then(response => {
            //setData(response.data);
            //setLoading(false);
            console.log(response.data.results[0]);
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

    return <form>
        <input 
                type="text"
                name="query"
                placeholder='Search movie name'
                value={query}
                onChange={handleQueryChange}
        />
        <button onClick={handleSearch}>Search</button>  
    </form>

}

export default MovieSearch;