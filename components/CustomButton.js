import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({ 
  children, 
  onClick, 
  width="100%",
  type = 'button', 
  variant = 'contained', 
  color = '#2BD17E', 
  height = 54, 
  borderRadius = "10px", 
  fontSize = 16, 
  fontWeight = 700, 
  fontFamily = "Montserrat", 
  ...props 
}) => {
  return (
    <Button
      type={type}
      fullWidth
      variant={variant}
      onClick={onClick}
      sx={{
        mt: 2,
        mb: 2,
        width: width,
        height: height,
        borderRadius: borderRadius,
        fontSize: fontSize,
        fontWeight: fontWeight,
        fontFamily: fontFamily,
        color: variant === 'outline' ? 'white' : 'white', // Text color
        backgroundColor: variant === 'outline' ? 'transparent' : color, // Background color
        border: variant === 'outline' ? '2px solid white' : 'none', // Border for outline variant
        '&:hover': {
          backgroundColor: variant === 'outline' ? 'rgba(255, 255, 255, 0.1)' : color, // Hover effect for outline
          borderColor: variant === 'outline' ? '#2BD17E' : 'none', // Change border color on hover
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
