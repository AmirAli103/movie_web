import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Container, Grid, Typography } from '@mui/material';
import CustomTextField from './../customTextField'; // Adjust the path as necessary
import CustomButton from '../CustomButton';

export default function CreateMovie({ onSave, onClose }) { // Accept the onSave prop
    // State for title, year, and error messages
    const [formData, setFormData] = useState({ title: '', year: '', image: null });
    const [errors, setErrors] = useState({ title: '', year: '' });

    // Dropzone for image
    const onDrop = useCallback((acceptedFiles) => {
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

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px' }}>
            <Box display="flex" alignItems="center" width="100%">
                <Typography variant="h4" sx={{ color: 'white', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: '20px', sm: '25px', md: '48px' }, textAlign: 'left', width: '100%' }}>
                    Create a new movie
                </Typography>
            </Box>
            <Grid container spacing={2} mt={'10%'}>
                <Grid item xs={12} md={6}>
                    <Box
                        {...getRootProps()}
                        sx={{
                            width: '100%',
                            height: '400px',
                            border: '2px dashed grey',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            backgroundColor: '#1E2A38',
                            marginBottom: '20px',
                        }}
                    >
                        <input {...getInputProps()} />
                        {formData.image ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Preview"
                                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }} // Adjust as needed
                                />
                            </Box>
                        ) : isDragActive ? (
                            <Typography>Drop an image here...</Typography>
                        ) : (
                            <Typography>Drop an image here</Typography>
                        )}
                    </Box>
                </Grid>
                <Grid item xs={12} md={5} sx={{ marginLeft: { md: 0, lg: '50px' } }}>
                    <Grid item xs={12} md={12} >
                        <CustomTextField
                            label="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <CustomTextField
                            label="Publishing year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            error={!!errors.year}
                            helperText={errors.year}
                        />
                    </Grid>
                    <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                        <CustomButton children={"Cancel"} width='167px' variant="outline" onClick={onClose} />
                        <CustomButton children={'Submit'} width='179px' onClick={handleSubmit} />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
