import * as React from 'react';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export interface CustomBackdropProps {
    open: boolean;
    message: string;
}

export default function CustomBackdrop({ 
    open, 
    message
}: CustomBackdropProps) {

    return (
        <Backdrop
            sx={{ color: '#fff', background: "rgba(0,0,0,0)", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
          <Box sx={{ background: "rgba(0,0,0,.5)", padding: 2}}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <CircularProgress color="inherit" /> 
                <Typography variant="h4" color="white">{message}</Typography>
            </Stack>
          </Box>
        </Backdrop>
    );
}
