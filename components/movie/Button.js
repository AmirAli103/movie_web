import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import CustomButton from '../../components/CustomButton';

export default function Buttons({ loading, onClose, onSubmit }) {
    return (
        <Box sx={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <CustomButton children="Cancel" width="167px" variant="outline" onClick={onClose} />
            {loading ? (
               <Box sx={{width:'100px',alignSelf:'center',textAlign:'center'}}>
                 <CircularProgress sx={{ color: '#2BD17E' }} />
               </Box>
            ) : (
                <CustomButton children="Submit" width="179px" onClick={onSubmit} />
            )}
        </Box>
    );
}
