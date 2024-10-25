import React from 'react';
import { Grid, Box } from '@mui/material';
import CustomTextField from '../../components/customTextField';

export default function FormFields({ title, year, onChange, errors }) {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CustomTextField
                    label="Title"
                    name="title"
                    value={title}
                    onChange={onChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
            </Grid>
            <Box sx={{ marginTop: '20px' }} />
            <Grid item xs={8} md={6}>
                <CustomTextField
                    label="Publishing year"
                    name="year"
                    value={year}
                    onChange={onChange}
                    error={!!errors.year}
                    helperText={errors.year}
                />
            </Grid>
        </Grid>
    );
}
