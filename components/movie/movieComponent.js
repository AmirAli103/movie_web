// components/MovieMessage.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import CustomButton from './../CustomButton'; // Adjust the import path if needed

const MovieCardEmpty = ({ onAddMovie }) => {
  const styles = {
    box: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center', // Center align text for better readability
    },
    title: {
      color: 'white',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: { xs: '20px', sm: '25px', md: '48px' },
      fontWeight: 600,
      whiteSpace: 'nowrap', // Allow text to wrap
    },
  };

  return (
    <Box sx={styles.box}>
      <Typography component="h2" sx={styles.title}>
        Your movie list is empty
      </Typography>
      <CustomButton onClick={onAddMovie} width={{ xs:"80%",sm: '40%', md: '30%' }} fontSize={{xs:'12px',md:"16px"}}>
        Add a new movie
      </CustomButton>
    </Box>
  );
};

export default MovieCardEmpty;
