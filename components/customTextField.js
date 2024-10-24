
import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({ label, value, onChange, error, helperText, ...props }) => {
    return (
        <TextField
            label={label}
            fullWidth
            value={value}
            onChange={onChange}
            error={error}
            helperText={helperText}
            InputLabelProps={{ style: { color: 'white' } }} // White label text
            InputProps={{
              sx: {color: 'white', background: '#224957', borderRadius: "10px", disableUnderline: true, fontFamily: "Montserrat", fontSize: 14, fontWeight: '400', lineHeight: '24px' }, // White input text
            }}
            {...props} // Pass other props (like id, name, etc.)
        />
    );
};

export default CustomTextField;
