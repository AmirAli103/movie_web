import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, CircularProgress, Container, Grid, Typography } from '@mui/material';
import CustomTextField from './../customTextField'; // Adjust the path as necessary
import CustomButton from '../CustomButton';
import AddIcon from '@mui/icons-material/Add';
import TitleBox from './titleComponent';
import FormFields from './formField';
import Buttons from './Button';
import DropzoneBox from './dropBoxZone';
export default function CreateMovie({ onSave, onClose, loading }) {
    // State for title, year, and error messages
    const [formData, setFormData] = useState({ title: '', year: '', image: null });
    const [errors, setErrors] = useState({ title: '', year: '' });

    // Dropzone for image
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles[0])
        setFormData((prev) => ({ ...prev, image: acceptedFiles[0] }));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on change
    };
    // Validate fields
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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // Call the onSave function passed as a prop
            onSave(formData);
        }
    };

    // Define styles
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        titleBox: {
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        title: {
            color: 'white',
            fontFamily: 'Montserrat',
            fontWeight: 600,
            fontSize: { xs: '20px', sm: '25px', md: '48px' },
            textAlign: 'left',
            width: '100%',
        },
        dropzone: {
            width: { xs: "250px", sm: "400px", lg: '473px' },
            height: { xs: "300px", md: '450px', lg: '504px' },
            border: '2px dashed white',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            backgroundColor: '#224957',
            marginBottom: '20px',
        },
        imagePreview: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
        },
        buttonBox: {
            display: 'flex',
            gap: '10px',
            marginTop: '20px',
        }, icon: {
            width: '24px',
            height: '24px',
        },
    };

    return (
        <Container sx={styles.container}>
            <Box sx={{ 
                marginTop: { xs: '5vh', sm: '10vh', md: '15vh', lg: '20vh' }, 
                width: '100%' 
            }}>
                <TitleBox title="Create a new movie" />

            </Box>
            
            <Grid container spacing={2} mt={'10%'}>
            <Grid item xs={12} md={6}>
                    <DropzoneBox image={formData.image} setImage={(file) => setFormData((prev) => ({ ...prev, image: file }))} />
                </Grid>
                <Grid item xs={12} md={5} sx={{ marginLeft: { md: 0, lg: '50px' } }}>
                    <FormFields title={formData.title} year={formData.year} onChange={handleChange} errors={errors} />
                    <Buttons
                        loading={loading} 
                        onClose={onClose} 
                        onSubmit={handleSubmit} 
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
