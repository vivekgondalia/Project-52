import {useState} from 'react';
import movieApi from './movieApi';
import AddMovie from './Movie';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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
      

    const searchTableData = results.map((movie,idx) => {
        if(hasRequiredProps(movie, requiredApiJsonProps)){
            return (
                <TableRow
                    key={idx+1}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {idx+1}
                    </TableCell>
                    <TableCell align="left">{movie.title}</TableCell>
                    <TableCell align="left">{movie.release_date.split('-')[0]}</TableCell>
                    <TableCell align="right">
                        <Tooltip title="Add this movie" placement="right" arrow>
                            <PlaylistAddIcon
                                className="sortIcon" 
                                onClick={() => handleAddToTheList(movie)}
                                sx={{ 
                                    color: 'grey',
                                    fontSize: 18,
                                    transition: 'transform 0.2s ease-in-out', // smooth transform transition
                                        '&:hover': {
                                        cursor: 'pointer',
                                        transform: 'scale(1.5)', // scale up the icon on hover
                                        color: '#3498db', // change color on hover
                                        }
                                }}
                            />
                        </Tooltip>
                    </TableCell>
                </TableRow>
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
        <Button variant="outlined" style={{width: '150px'}} onClick={clearSearch} size='large'>Clear Results</Button>
    </div>
    : <></>;

    return (
    <div className="movieSearchWrapper">
        <form className="movieSearchInput">
            <TextField 
                label="Search to add your movie..." 
                variant="outlined" 
                name="query"
                autoComplete='off'
                value={query}
                fullWidth
                onChange={handleQueryChange}
                InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                          <IconButton onClick={handleSearch} edge="end">
                            <SearchIcon />
                          </IconButton>
                      </InputAdornment>
                    ),
                }}
            />
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

        {/* {
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
        } */}
        { searchTableData.length ?
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="left">Movie</TableCell>
                        <TableCell align="left">Year</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {searchTableData}
                    </TableBody>
                </Table>
            </TableContainer> 
            : null
        }
    </div>
    )
}

export default MovieSearch;