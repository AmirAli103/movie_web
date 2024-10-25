import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import CustomPagination from './customPagination';

export default function MoviesPage({ data, handleAddmovies }) {
    const [movies, setMovies] = useState(Array.isArray(data) ? data : []);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const router = useRouter();

    useEffect(() => {
        if (Array.isArray(data)) {
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


    const startIndex = (page - 1) * itemsPerPage;
    const currentMovies = Array.isArray(movies) ? movies.slice(startIndex, startIndex + itemsPerPage) : [];

    const styles = {
        container: { padding: { xs: 2, sm: 4, md: 6 }, maxWidth: 'xl' },
        headerBox: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 },
        addMoviesBox: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
        logoutBox: { display: 'flex', alignItems: 'center', cursor: 'pointer' },
        title: { color: 'white', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: '20px', sm: '25px', md: '48px' } },
        addIcon: { color: 'white', ml: 1, border: '1px solid white', borderRadius: '20px', cursor: 'pointer' },
        logoutText: { color: 'white', fontFamily: 'Montserrat', fontWeight: 700, fontSize: { xs: '12px', sm: '14px', md: '16px' } },
        card: { height: 504, background: '#092C39', padding: '5px', borderRadius: '10px' },
        cardMedia: { height: '400px', borderRadius: '10px' },
        movieTitle: { fontFamily: 'Montserrat', color: 'white',lineHeight:'1',fontSize:'20px',fontWeight:'500',overflow: 'hidden', // Hide overflow
            whiteSpace: 'nowrap', // Prevent wrapping to a new line
            textOverflow: 'ellipsis', },
        movieYear: { fontFamily: 'Montserrat', color: 'white' },
        noMoviesText: { color: 'white' },
    };

    return (
        <Container sx={styles.container}>
            <Box sx={styles.headerBox}>
                <Box sx={styles.addMoviesBox} onClick={handleAddmovies}>
                    <Typography variant="h4" sx={styles.title}>My Movies</Typography>
                    <AddIcon sx={styles.addIcon} />
                </Box>
                <Box
                    sx={styles.logoutBox}
                    onClick={() => {
                        localStorage.removeItem('access_token'); // Remove the token from localStorage
                        router.push('/'); // Redirect to homepage
                    }}
                >
                    <Typography variant="body1" sx={styles.logoutText}>Logout</Typography>
                    <LogoutIcon sx={{ color: 'white', ml: 1, }} />
                </Box>
            </Box>
            <Grid container spacing={3}>
                {currentMovies.length > 0 ? (
                    currentMovies.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id || movie.title}>
                            <Card sx={styles.card} onClick={() => router.push({
                                pathname: '/editMovies',
                                query: { movie: JSON.stringify(movie) }, // Convert movie object to a JSON string
                            })}>
                                <CardMedia
                                    component="img"
                                    alt={movie.title}
                                    sx={styles.cardMedia}
                                    image={movie.imageUrl || '/default-image-path.jpg'}
                                />
                                <CardContent>
                                    <Typography sx={styles.movieTitle}>{movie.title}</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={styles.movieYear}>{movie.publishingYear}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={styles.noMoviesText}>No movies available</Typography>
                    </Grid>
                )}
            </Grid>

            <CustomPagination
                count={Math.ceil(movies.length / itemsPerPage)}
                page={page}
                onChange={handleChange}
            />
        </Container>
    );
}
