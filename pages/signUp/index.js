// Import the postData function
import { useRouter } from 'next/router';
import { postData } from './../../Api/apiFunction'; // Adjust the import path based on your folder structure
import React, { useState } from 'react';
import { Box, TextField, Typography, Container, Checkbox, FormControlLabel } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import Link from 'next/link';
export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',  // Email for sign up
    password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validate = () => {
    let valid = true;
    let errors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex

    if (!formData.email) {
      valid = false;
      errors.email = 'Email is required';
    } else if (!emailPattern.test(formData.email)) {
      valid = false;
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      valid = false;
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      valid = false;
      errors.password = 'Password must be at least 6 characters';
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('Form submitted:', formData);
      console.log('Remember me:', rememberMe);

      try {
        // Call postData with the signup path and formData
        const result = await postData('/auth/signup', formData);
        console.log('Signup successful:', result);
        
        // You can redirect or perform actions based on the result
        router.push('/movieScreen');
      } catch (error) {
        console.error('Signup failed:', error);
        // Handle the error appropriately (e.g., show an error message to the user)
      }
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: 'white', fontFamily: "'Montserrat', sans-serif", fontSize: { xs: '40px', md: "64px" }, fontWeight: 600 }}>
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                sx: { color: 'white', background: '#224957', borderRadius: "10px", disableUnderline: true, fontFamily: "Montserrat", fontSize: 14, fontWeight: '400', lineHeight: '24px' },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                sx: {
                  color: 'white',
                  background: '#224957',
                  borderRadius: '10px',
                  fontFamily: 'Montserrat',
                  fontSize: 14,
                  fontWeight: '400',
                  lineHeight: '24px',
                },
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    sx={{
                      color: '#224957',
                      '&.Mui-checked': {
                        color: '#224957',
                      },
                      '&.Mui-checked svg': {
                        color: 'red',
                      },
                    }}
                  />
                }
                label={<Typography sx={{ color: 'white', fontSize: 16, fontWeight: 400, fontFamily: "Montserrat" }}>Remember me</Typography>}
              />
            </Box>
            <CustomButton type="submit">
              Sign Up
            </CustomButton>
          </Box>
          <Typography sx={{ mt: 2, color: 'white', fontFamily: 'Montserrat' }}>
            Already have an account?{' '}
            <Link href="/SignIn" passHref>
              <Typography component="span" sx={{ color: '#FFD700', cursor: 'pointer' }}>
                Sign in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
