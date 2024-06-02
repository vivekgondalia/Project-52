import {useState, useEffect} from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

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
                        <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="left">Movie</StyledTableCell>
                            <StyledTableCell align="right">Year</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                    {movies.map((row, idx) => (
                        <StyledTableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <StyledTableCell component="th" scope="row">
                            {idx+1}
                        </StyledTableCell>
                        <StyledTableCell align="left" sx={{ width: '40%' }}>{row.title}</StyledTableCell>
                        <StyledTableCell align="right">{row.year}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Home;