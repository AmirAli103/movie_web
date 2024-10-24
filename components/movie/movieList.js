import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import CustomPagination from './customPagination'; // Adjust the path as necessary

export default function MoviesPage({ data,handleAddmovies }) {
    const [movies, setMovies] = useState(Array.isArray(data) ? data : []); 
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const router = useRouter();

    console.log("data", JSON.stringify(data)); // For debugging

    useEffect(() => {
        if (Array.isArray(data)) {
            // Create image URLs for the movies
            const moviesWithUrls = data.map((movie) => {
                if (movie.image instanceof File) {
                    return { ...movie, imageUrl: URL.createObjectURL(movie.image) };
                }
                return movie;
            });
            setMovies(moviesWithUrls);
        }
    }, [data]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const handleLogout = () => {
        router.push('/');
    };

    const startIndex = (page - 1) * itemsPerPage;
    const currentMovies = Array.isArray(movies) ? movies.slice(startIndex, startIndex + itemsPerPage) : [];

    return (
        <Container sx={{ padding: { xs: 2, sm: 4, md: 6 } }} maxWidth="xl">
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                <Box display="flex" alignItems="center" onClick={handleAddmovies}>
                    <Typography variant="h4" sx={{ color: 'white', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: '20px', sm: '25px', md: '48px' } }}>My Movies</Typography>
                    <AddIcon sx={{ color: 'white', ml: 1, borderWidth: 1, border: '1px solid white', borderRadius: '20px', cursor: 'pointer' }} />
                </Box>
                <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={handleLogout}>
                    <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Montserrat', fontWeight: 700, fontSize: { xs: '12px', sm: '14px', md: '16px' } }}>Logout</Typography>
                    <LogoutIcon sx={{ color: 'white', ml: 1 }} />
                </Box>
            </Box>

            <Grid container spacing={3}>
                {currentMovies.length > 0 ? (
                    currentMovies.map((movie, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Card sx={{ height: 504, background: '#092C39', padding: '5px', borderRadius: '10px' }}>
                                <CardMedia
                                    component="img"
                                    alt={movie.title}
                                    sx={{ height: '400px', borderRadius: '10px' }}
                                    image={movie.imageUrl || '/default-image-path.jpg'} // Default image if no image is found
                                />
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontFamily: 'Montserrat', color: 'white' }} component="div">{movie.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Montserrat', color: 'white' }}>{movie.year}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: 'white' }}>No movies available</Typography>
                    </Grid>
                )}
            </Grid>

            {/* Custom Pagination */}
            <CustomPagination
                count={Math.ceil(movies.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
            />
        </Container>
    );
}