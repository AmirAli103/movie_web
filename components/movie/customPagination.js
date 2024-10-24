import React from 'react';
import { Box, Button } from '@mui/material';

const CustomPagination = ({ count, page, onChange }) => {
    const handlePageChange = (newPage) => {
        onChange(null, newPage);
    };

    // Define styles object
    const styles = {
        button: {
            backgroundColor: 'transparent',
            color: 'white',
            borderRadius: 4,
            boxShadow: 'none',
        },
        pageButton: (isActive) => ({
            mx: 1,
            minWidth: '32px',
            backgroundColor: isActive ? '#2BD17E' : '#092C39',
            color: 'white',
            '&:hover': {
                backgroundColor: '#1F3A45',
            },
        }),
    };

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <Button
                onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
                sx={styles.button} // Use styles object
            >
                Prev
            </Button>

            {Array.from({ length: count }, (_, index) => (
                <Button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    sx={styles.pageButton(index + 1 === page)} // Use styles object with active state
                >
                    {index + 1}
                </Button>
            ))}

            <Button
                onClick={() => handlePageChange(page < count ? page + 1 : count)}
                sx={styles.button} // Use styles object
            >
                Next
            </Button>
        </Box>
    );
};

export default CustomPagination;
