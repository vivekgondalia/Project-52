import {useState, useEffect} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const params = new URLSearchParams({
                month: parseInt(new Date().getMonth()+1)
            });

            try {
                const response = await axios.get('https://localhost:7109/api/movies', {params} );
                setMovies(response.data);
            } catch (error) {
                setError(error);
                toast.error('Error fetching movies. Sorry.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='homeMovieList'>
            <h1>Movies of the Month</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="left">Movie</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {movies.map((row, idx) => (
                        <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {idx+1}
                        </TableCell>
                        <TableCell align="left" sx={{ width: '40%' }}>{row.title}</TableCell>
                        <TableCell align="right">{row.year}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home;