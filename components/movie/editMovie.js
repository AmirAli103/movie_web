import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Container, Grid, Typography } from '@mui/material';
import CustomTextField from './../customTextField'; // Adjust path as necessary
import CustomButton from '../CustomButton';
import AddIcon from '@mui/icons-material/Add';

export default function EditMovie({ movieData, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: movieData?.title || '',
    year: movieData?.year || '',
    image: movieData?.image || null,
  });
  const [errors, setErrors] = useState({ title: '', year: '' });

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prev) => ({ ...prev, image: acceptedFiles[0] }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
    if (!formData.year || !/^\d{4}$/.test(formData.year)) {
      tempErrors.year = 'Publishing year must be a valid 4-digit number';
      isValid = false;
    }
    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

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
      width: { xs: '250px', sm: '400px', lg: '473px' },
      height: { xs: '300px', md: '450px', lg: '504px' },
      border: '2px dashed white',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      backgroundColor: '#224957',
      marginBottom: '20px',
    },
    buttonBox: {
      display: 'flex',
      gap: '10px',
      marginTop: '20px',
    },
  };

  return (
    <Container sx={styles.container}>
      <Box sx={styles.titleBox}>
        <Typography variant="h4" sx={styles.title}>
          Edit Movie
        </Typography>
      </Box>
      <Grid container spacing={2} mt={'10%'}>
        <Grid item xs={12} md={6}>
          <Box {...getRootProps()} sx={styles.dropzone}>
            <input {...getInputProps()} />
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Preview"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            ) : (
              <AddIcon />
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!errors.title}
            helperText={errors.title}
          />
          <CustomTextField
            label="Publishing year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            error={!!errors.year}
            helperText={errors.year}
          />
          <Box sx={styles.buttonBox}>
            <CustomButton onClick={onClose}>Cancel</CustomButton>
            <CustomButton onClick={handleSubmit}>Save</CustomButton>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
