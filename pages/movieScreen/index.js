import React, { useState, useEffect } from 'react';
import { Box, Container, CircularProgress } from '@mui/material'; // Import CircularProgress
import { useRouter } from 'next/router';
import MovieMessage from '../../components/movie/movieComponent'; // Adjust the import path if needed
import MoviesPage from '../../components/movie/movielist';
import CreateMovie from '../../components/movie/createMovie';
import MovieCardEmpty from '../../components/movie/movieComponent';
import { getData, postDatabyToken } from '../../Api/apiFunction';
import withAuth from '../../hoc/withAuth';

const MovieScreen=() =>{
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [addMovies, setAddMovies] = useState(false);
  const [token, setToken] = useState(null); // State to store the token

  const fetchData = async () => {
    setLoading(true); // Set loading to true when fetching data
    const storedToken = localStorage.getItem('access_token'); // or 'token' based on your logic
    setToken(storedToken); // Set the token in state
    if (storedToken) {
      try {
        const result = await getData('/movies'); // Call your GET function
        console.log('Fetched data:', result);
        setData(result); // Set the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Reset loading state after fetch
      }
    } else {
      setLoading(false); // Reset loading state if no token is found
    }
  };

  // useEffect for initial data fetch
  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  const handleAddMovie = () => {
    setAddMovies(true); // Show the add movie form
  };

  const saveMovieData = async (formData) => {
    setLoading(true);
    console.log('Saving movie data:', formData);
    console.log('Using token:', token);

    try {
      // Call your API function to post movie data
      await postDatabyToken('/movies', formData); // Ensure this function returns a promise
      console.log('Movie data saved successfully!');

      // After a successful save, refetch the movie data
      await fetchData();

    } catch (error) {
      console.error('Error saving movie data:', error);
      // Optionally, show an error message to the user if needed
    } finally {
      setLoading(false); // Ensure loading state is reset
      setAddMovies(false); // Close the add movie form
    }
  };

  const handleEditMovie = (formData) => {
    router.push("/editMovie");
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
      {loading ? (  // Show loading spinner when loading is true
        <Box sx={styles.container}>
          <CircularProgress sx={{color:"#2BD17E"}} />
        </Box>
      ) : addMovies ? (
        <CreateMovie onSave={saveMovieData} loading={loading} onClose={() => { setAddMovies(false); }} />
      ) : data?.data?.length === 0 ? (
        <Container maxWidth={"md"}>
          <Box sx={styles.container}>
            <MovieCardEmpty onAddMovie={handleAddMovie} />
          </Box>
        </Container>
      ) : (
        <MoviesPage data={data?.data} handleEditMovie={handleEditMovie} handleAddmovies={handleAddMovie} />
      )}
    </Container>
  );
}
export default withAuth(MovieScreen);