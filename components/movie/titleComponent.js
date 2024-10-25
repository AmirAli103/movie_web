import React from 'react';
import { Box, Typography } from '@mui/material';

export default function TitleBox({ title }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography variant="h4" sx={{ color: 'white', fontFamily: 'Montserrat', fontWeight: 600, fontSize: { xs: '20px', sm: '25px', md: '48px' }, textAlign: 'left', width: '100%' }}>
                {title}
            </Typography>
        </Box>
    );
}
