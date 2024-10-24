import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ label, value, onChange, error, helperText, ...props }) => {
    // Define styles object
    const styles = {
        inputLabel: {
            color: 'white', // White label text
        },
        input: {
            color: 'white', 
            background: '#224957', 
            borderRadius: '10px', 
            fontFamily: 'Montserrat', 
            fontSize: 14, 
            fontWeight: '400', 
            lineHeight: '24px',
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none', // Remove the outline border
            },
        },
    };

    return (
        <TextField
            label={label}
            fullWidth
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            InputLabelProps={{ style: styles.inputLabel }} // Use styles object
            InputProps={{
                sx: styles.input, // Use styles object
            }}
            {...props} // Pass other props (like id, name, etc.)
        />
    );
};

export default CustomTextField;
