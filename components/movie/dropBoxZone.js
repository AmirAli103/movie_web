import React, { useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import AddIcon from '@mui/icons-material/Add';

export default function DropzoneBox({ image, setImage }) {
    const onDrop = useCallback((acceptedFiles) => {
        setImage(acceptedFiles[0]);
    }, [setImage]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <Box {...getRootProps()} sx={{ width: { xs: "250px", sm: "250px", lg: '473px' }, height: { xs: "300px", md: '250px', lg: '504px' }, border: '2px dashed white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', backgroundColor: '#224957', marginBottom: '20px' }}>
            <input {...getInputProps()} />
            {image ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <img
                        src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                        alt="Preview"
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </Box>
            ) : isDragActive ? (
                <Typography>Drop an image here...</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AddIcon sx={{ width: '24px', height: '24px' }} />
                    <Typography>Drop an image here</Typography>
                </Box>
            )}
        </Box>
    );
}
