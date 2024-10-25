import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Grid, CircularProgress,Box } from '@mui/material';
import TitleBox from './../../components/movie/titleComponent';
import DropzoneBox from './../../components/movie/dropBoxZone';
import FormFields from './../../components/movie/formField';
import Buttons from './../../components/movie/Button';
import { patchData, postDatabyToken } from '../../Api/apiFunction'; // Ensure this is correctly imported
import withAuth from '../../hoc/withAuth';

const EditMovie=({ onSave, onClose, loading })=> {
    const router = useRouter();
    const { query } = router;
    
    const [formData, setFormData] = useState({
        title: '',
        year: '',
        image: null,
    });
    const [errors, setErrors] = useState({ title: '', year: '' });
    const [isLoading, setLoading] = useState(false); // Local loading state

    useEffect(() => {
        if (query.movie) {
            try {
                const movie = JSON.parse(decodeURIComponent(query.movie));
                setFormData({
                    id:movie?.id,
                    title: movie.title || '',
                    year: movie.publishingYear || '',
                    image: movie.imageUrl || null,
                });
            } catch (error) {
                console.error("Error parsing movie data:", error);
            }
        }
    }, [query.movie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        let tempErrors = { title: '', year: '' };
        let isValid = true;

        if (!formData.title) {
            tempErrors.title = 'Title is required';
            isValid = false;
        }
        if (!formData.year) {
            tempErrors.year = 'Publishing year is required';
            isValid = false;
        } else if (!/^\d{4}$/.test(formData.year)) {
            tempErrors.year = 'Publishing year must be a 4-digit number';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const saveMovieData = async () => {
        setLoading(true);
        console.log('Saving movie data:', formData);

        try {
            await patchData(`/movies/${formData?.id}`, formData);
            console.log('Movie data saved successfully!');
            onClose ? onClose() : router.push('/movieScreen');
        } catch (error) {
            console.error('Error saving movie data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            saveMovieData();
        }
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ 
                marginTop: { xs: '5vh', sm: '10vh', md: '15vh', lg: '20vh' }, 
                width: '100%' 
            }}>
                <TitleBox title="Edit movie" />
            </Box>
            <Grid container spacing={2} mt="10%">
                <Grid item xs={12} md={6}>
                    <DropzoneBox image={formData.image} setImage={(file) => setFormData((prev) => ({ ...prev, image: file }))} />
                </Grid>
                <Grid item xs={12} md={5} sx={{ marginLeft: { md: 0, lg: '50px' } }}>
                    <FormFields title={formData.title} year={formData.year} onChange={handleChange} errors={errors} />
                    <Buttons
                        loading={isLoading} 
                        onClose={() => router.push('/movieScreen')} 
                        onSubmit={handleSubmit} 
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
export default withAuth(EditMovie);