import React from 'react';
import { Box, Button } from '@mui/material';

const CustomPagination = ({ count, page, onChange }) => {
    const handlePageChange = (newPage) => {
        onChange(null, newPage);
    };

    return (
        <Box mt={4} display="flex" justifyContent="center">
            <Button
                onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
                sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: 4,
                    boxShadow:'none',
                }}
            >
                Prev
            </Button>

            {Array.from({ length: count }, (_, index) => (
                <Button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    sx={{
                        mx: 1,
                        minWidth:'32px',
                        backgroundColor: index + 1 === page ? '#2BD17E' : '#092C39',
                        color: index + 1 === page ? 'white' : 'white',
                        '&:hover': {
                            backgroundColor: '#1F3A45',
                        },
                    }}
                >
                    {index + 1}
                </Button>
            ))}
            <Button
                onClick={() => handlePageChange(page < count ? page + 1 : count)}
                sx={{
                    backgroundColor: 'transparent',
                    color: 'white',
                    borderRadius: 4,
                    boxShadow:'none',
                }}
            >
                Next
            </Button>
        </Box>
    );
};

export default CustomPagination;
