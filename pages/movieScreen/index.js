import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { useRouter } from 'next/router';
import MovieMessage from '../../components/movie/movieComponent'; // Adjust the import path if needed
import MoviesPage from '../../components/movie/movielist';
import CreateMovie from '../../components/movie/createMovie';
import MovieCardEmpty from '../../components/movie/movieComponent';

export default function MovieScreen() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [addMovies, setAddMovies] = useState(false);

  const handleAddMovie = () => {
    setAddMovies(true); // Show the add movie form
  };

  // Function to save movie data
  const saveMovieData = (formData) => {
    // Here you can handle the API call or any other logic to save the movie data
    console.log('Saving movie data:', formData);

    // Simulate saving data (e.g., pushing to state or calling an API)
    setData((prevData) => [...prevData, formData]);

    // Optionally reset the add movies state to hide the form
    setAddMovies(false);

    // Redirect or show success message as needed
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };

  return (
    <Container component="main" maxWidth="xl">
      {addMovies ? (
        <CreateMovie onSave={saveMovieData} onClose={()=>{setAddMovies(false);}}/>
      ) : data.length === 0 ? (
        <Container maxWidth={"md"}>
          <Box sx={styles.container}>
            <MovieCardEmpty onAddMovie={handleAddMovie} />
          </Box>
        </Container>
      ) : (
        <MoviesPage data={data} handleAddmovies={handleAddMovie} />
      )}
    </Container>
  );
}
