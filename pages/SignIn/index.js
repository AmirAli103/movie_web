import React, { useEffect, useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import CustomButton from '../../components/CustomButton';
import Link from 'next/link';
import { postData } from '../../Api/apiFunction';
import TextInput from '../../components/TextInput';
import RememberMeCheckbox from '../../components/RememberMeCheckbox';

export default function SignIn() {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Retrieve email from local storage on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      setFormData({ ...formData, email: savedEmail });
      setRememberMe(true); // Check the Remember Me checkbox if there's a saved email
    }
  }, []);

  const validate = () => {
    let valid = true;
    let errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      valid = false;
      errors.email = `${t('login.email')} is required`;
    } else if (!emailPattern.test(formData.email)) {
      valid = false;
      errors.email = `${t('login.email')} is invalid`;
    }

    if (!formData.password) {
      valid = false;
      errors.password = `${t('login.password')} is required`;
    } else if (formData.password.length < 6) {
      valid = false;
      errors.password = `${t('login.password')} must be at least 6 characters`;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        const response = await postData('/auth/signin', formData);
        console.log("response: ", JSON.stringify(response));

        // Check if the access_token is present in the response
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
          // Store email if Remember Me is checked
          if (rememberMe) {
            localStorage.setItem('savedEmail', formData.email);
          } else {
            localStorage.removeItem('savedEmail'); // Clear saved email if not checked
          }
          await router.push('/movieScreen'); // You can await here if needed
        } else {
          console.error('Token not found in the response.');
        }
      } catch (error) {
        console.error('Login error:', error);
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

  const styles = {
    container: {
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
      fontSize: { xs: '40px', md: '64px' },
      fontWeight: 600,
    },
    form: {
      marginTop: 1,
    },
    checkboxContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    linkText: {
      marginTop: 2,
      color: 'white',
      fontFamily: 'Montserrat',
      textAlign: 'center'
    },
    signUpLink: {
      color: '#FFD700',
      cursor: 'pointer',
    },
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={styles.container}>
        <Box sx={styles.formContainer}>
          <Typography component="h1" variant="h5" sx={styles.title}>
            {t('login.title')}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
            <TextInput
              id="email"
              label={t('login.email')}
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}
            />
            <TextInput
              id="password"
              label={`${t('login.password')} *`}  // Add asterisk here
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}  // Ensure error is a boolean
              helperText={errors.password}
            />
            <Box sx={styles.checkboxContainer}>
              <RememberMeCheckbox
                checked={rememberMe}
                onChange={handleRememberMeChange}
                label={t('login.rememberMe')}
              />
            </Box>
            <CustomButton type="submit">{t('login.signIn')}</CustomButton>
          </Box>
          <Typography sx={styles.linkText}>
            {t('login.noAccount')}{' '}
            <Link href="/signUp" passHref>
              <Typography component="span" sx={styles.signUpLink}>
                {t('login.signUp')}
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
