import React, {useState} from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FilterListIcon from '@mui/icons-material/FilterList';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

const MovieTable = ({data, onSort, onDelete}) => {
  const handleSort = (path) => {
    onSort(path);
  }

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

  const handleRemove = (id) => {
    onDelete(id);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell align="left"  onClick={() => handleSort('title')}>
              Movie 
              <FilterListIcon className="sortIcon" sx={{ 
                  color: 'white',
                  fontSize: 14,
                  transition: 'transform 0.2s ease-in-out', // smooth transform transition
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'scale(1.5)', // scale up the icon on hover
                      color: 'green', // change color on hover
                    }
                }}
              />
            </StyledTableCell>
            <StyledTableCell align="right" onClick={() => handleSort('month')}>
              Month
              <FilterListIcon className="sortIcon" sx={{ 
                  color: 'white',
                  fontSize: 14,
                  transition: 'transform 0.2s ease-in-out', // smooth transform transition
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'scale(1.5)', // scale up the icon on hover
                      color: 'green', // change color on hover
                    }
                }}
              />
            </StyledTableCell>
            <StyledTableCell align="right" onClick={() => handleSort('year')}>
              Year
              <FilterListIcon className="sortIcon" sx={{ 
                  color: 'white',
                  fontSize: 14,
                  transition: 'transform 0.2s ease-in-out', // smooth transform transition
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'scale(1.5)', // scale up the icon on hover
                      color: 'green', // change color on hover
                    }
                }}
              />
            </StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <StyledTableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {idx+1}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ width: '40%' }}>{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.month}</StyledTableCell>
              <StyledTableCell align="right">{row.year}</StyledTableCell>
              <StyledTableCell align="right">
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
                  onClick={() => handleRemove(row.id)}
                  />
                </StyledTableCell>
             </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MovieTable;
