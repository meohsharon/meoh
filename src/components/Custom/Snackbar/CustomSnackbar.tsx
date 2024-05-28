import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {AlertColor} from '@mui/material/Alert';

export interface CustomSnackbarProps {
    open: boolean;
    message: string;
    type?: AlertColor;
    onClose: (event: any, reason?: string) => void;
}

export default function CustomSnackbar({
    open,
    message,
    type,
    onClose
}: CustomSnackbarProps) {

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={5000} onClose={onClose}>
                <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={( type?type:undefined )} sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </Stack>
    );
}
