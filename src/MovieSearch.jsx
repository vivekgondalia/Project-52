import {useState} from 'react';
import movieApi from './movieApi';
import AddMovie from './Movie';

const MovieSearch = ({onAdd, onAddManual}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [noResultFlag, setNoResultFlag] = useState(false);

   
    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await movieApi.get(`/search/movie?query=${query}`);
            const result = response.data.results;
            
            if(!result.length)
                setNoResultFlag(true);
            setResults(response.data.results);
            setQuery('');

          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
    }

    const handleQueryChange = (e) => {
        const { name, value } = e.target;
        setQuery(value);
    }

    const handleAddToTheList = (movie) => {
        onAdd(movie);
    }

    const requiredApiJsonProps = ['title', 'release_date', 'id'];

    const hasRequiredProps = (data, requiredProps) => {
        return requiredProps.every(prop => prop in data);
      };
      

    const tableData = results.map((movie,idx) => {
        if(hasRequiredProps(movie, requiredApiJsonProps)){
            return (
                <tr key={movie.id}>
                    <td>{idx + 1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.release_date.split('-')[0]}</td>
                    <td><button className="buttonAdd" onClick={() => handleAddToTheList(movie)}>Add</button></td>
                </tr>
            );
        } else {
            return null;
        }
        
    });

    const handleAddManual = (newMovie) => {
        setNoResultFlag(false);
        onAddManual(newMovie);
    }

    const clearSearch = () => {
        setResults([]);
    }

    const handleCancel = () => {
        setNoResultFlag(false);
    }

    const noSearchResultMessage = noResultFlag ? 
        <div>
            <p>No movie(s) found. Please, add your movie manually.</p>
            <br></br>
            <AddMovie onAdd={handleAddManual} onCancel={handleCancel}/>
        </div> : <></>;

    const clearSearchButton = results.length ? <div className="clearButtonWrapper">
        <button onClick={clearSearch}>Clear Search</button>
    </div>
    : <></>;

    return (
    <div className="movieSearchWrapper">
        <form className="movieSearchInput">
            <input 
                    type="text"
                    name="query"
                    placeholder='Search your movie...'
                    autoComplete='off'
                    value={query}
                    onChange={handleQueryChange}
            />
            <button onClick={handleSearch}>Search</button> 
        </form>
        
        {results.length ? <h2>Search Results : </h2> : null}
        
        {/* {loading && <p className="spinner"></p>} */}
        {/* {loading && (
            <div className="dots-spinner">
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
            </div>
        )} */}
        {loading && (
            <div className="bouncing-loader">
            <div className="dot1"></div>
            <div className="dot2"></div>
            <div className="dot3"></div>
            </div>
        )}
        {/* {error && <p>Error: {error.message}</p>} */}
        {/* {!loading && !error && results.length === 0 && <p>No results found</p>} */}

        {noSearchResultMessage}

        {clearSearchButton}

        {
            tableData.length ? <table>
                <thead>
                    <tr>
                        <th></th>
                        <th className='tableHeaderMovie'>Movie Name</th>
                        <th>Year</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tableData} 
                </tbody>
            </table>
            : null
        }
    </div>
    )
}

export default MovieSearch;