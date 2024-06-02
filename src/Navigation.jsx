import Box from '@mui/material/Box';
import {
    Link
  } from 'react-router-dom';

import Button from '@mui/material/Button';

export default function Navigation() {
    return (
      <Box sx={{ typography: 'body1' }}>
        <Link to="/">
            <Button variant="contained">Home</Button>
        </Link>
        <Link to="/movies">
            <Button variant="contained">My Movies</Button>
        </Link>
      </Box>
    );
  }