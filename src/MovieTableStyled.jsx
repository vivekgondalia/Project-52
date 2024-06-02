import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const data = [
  { id: 1, name: 'Alice', age: 24, location: 'New York' },
  { id: 2, name: 'Bob', age: 30, location: 'London' },
  { id: 3, name: 'Catherine', age: 22, location: 'Los Angeles' },
  { id: 4, name: 'David', age: 28, location: 'Tokyo' }
];

const MovieTableStyled = ({data}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Week #</TableCell>
            <TableCell align="left" onClick={() => handleSort('title')}>Movie</TableCell>
            <TableCell align="right" onClick={() => handleSort('month')}>Month</TableCell>
            <TableCell align="right" onClick={() => handleSort('year')}>Year</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {idx+1}
              </TableCell>
              <TableCell align="left" sx={{ width: '40%' }}>{row.title}</TableCell>
              <TableCell align="right">{row.month}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">
                <RemoveCircleIcon 
                  sx={{ 
                    color: 'grey',
                    transition: 'transform 0.2s ease-in-out', // smooth transform transition
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'scale(1.2)', // scale up the icon on hover
                      color: 'red', // change color on hover
                    }
                  }}  
                  onClick={() => handleRemove(movie.id)}
                  />
                </TableCell>
              {/* <button className="buttonRemove" onClick={() => handleRemove(movie.id)}>Remove</button> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTableStyled;
