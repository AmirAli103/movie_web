// Import the postData function
import { useRouter } from 'next/router';
import { postData } from './../../Api/apiFunction'; 
import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import Link from 'next/link';
import TextInput from '../../components/TextInput'; 
import RememberMeCheckbox from '../../components/RememberMeCheckbox'; 

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
      try {
        const response = await postData('/auth/signUp', formData);
        console.log("response: ", JSON.stringify(response));
  
        // Check if the access_token is present in the response
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          await router.push('/movieScreen'); // You can await here if needed
        } else {
          console.error('Token not found in the response.');
        }
      } catch (error) {
        console.error('Login error:', error);
      }
  };
  }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  // Styling object
  const styles = {
    mainContainer: {
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      color: 'white',
      fontFamily: "'Montserrat', sans-serif",
      fontSize: { xs: '40px', md: "64px" },
      fontWeight: 600,
    },
    form: {
      mt: 1,
    },
    checkboxContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    linkText: {
      mt: 2,
      color: 'white',
      fontFamily: 'Montserrat',
    },
    signInLink: {
      color: '#FFD700',
      cursor: 'pointer',
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.mainContainer}>
        <Box sx={styles.formContainer}>
          <Typography component="h1" variant="h5" sx={styles.title}>
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <TextInput
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}
            />
            <TextInput
              id="password"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password}
            />
            <CustomButton type="submit">
              Sign Up
            </CustomButton>
          </Box>
          <Typography sx={styles.linkText}>
            Already have an account?{' '}
            <Link href="/SignIn" passHref>
              <Typography component="span" sx={styles.signInLink}>
                Sign in
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
