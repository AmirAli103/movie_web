import * as React from 'react';
import { useState } from 'react';
import { Box, TextField, Typography, Container, Checkbox, FormControlLabel } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import {postData} from '../../Api/apiFunction'; // Adjust the import based on your project structure

export default function Login() {
  const { t } = useTranslation(); // Initialize translation
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
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
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      valid = false;
      errors.email = t('login.email') + ' is required'; // Updated to use translation
    } else if (!emailPattern.test(formData.email)) {
      valid = false;
      errors.email = t('login.email') + ' is invalid'; // Updated to use translation
    }

    if (!formData.password) {
      valid = false;
      errors.password = t('login.password') + ' is required'; // Updated to use translation
    } else if (formData.password.length < 6) {
      valid = false;
      errors.password = t('login.password') + ' must be at least 6 characters'; // Updated to use translation
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
        console.log(formData)
        // Call the postData function with the sign-in path and form data
        const response = await postData('/auth/signin', formData);
        // Save the token (you might want to save it in localStorage)
        console.log(response)
        localStorage.setItem('token', response.token);
        // Redirect to the movie screen after successful login
        router.push('/movieScreen');
      } catch (error) {
        console.error('Login error:', error);
        // Handle error here (e.g., show an error message)
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
            {t('login.title')} {/* Localized title */}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label={t('login.email')} // Localized label
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
              label={t('login.password')} // Localized label
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
                label={<Typography sx={{ color: 'white', fontSize: 16, fontWeight: 400, fontFamily: "Montserrat" }}>{t('login.rememberMe')}</Typography>} // Localized label
              />
            </Box>
            <CustomButton type="submit">
              {t('login.signIn')} {/* Localized button text */}
            </CustomButton>
          </Box>
          <Typography sx={{ mt: 2, color: 'white', fontFamily: 'Montserrat' }}>
            {t('login.noAccount')}{' '}
            <Link href="/signUp" passHref>
              <Typography component="span" sx={{ color: '#FFD700', cursor: 'pointer' }}>
                {t('login.signUp')} {/* Localized link text */}
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
