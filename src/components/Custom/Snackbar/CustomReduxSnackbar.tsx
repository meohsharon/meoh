import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import CustomSnackbar from './CustomSnackbar';
import { hideSnackBar } from '../../../store/slices/snackbar.slice';
import { AlertColor } from '@mui/material';

export default function CustomReduxSnackbar() {

    const { open, message, type } = useAppSelector((state) => state.snackbar);
    const dispatch = useAppDispatch();

    const handleClose = (event: any, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(hideSnackBar(null));
    };

    return (<>
        <CustomSnackbar open={open} message={message} type={(type as AlertColor)} onClose={handleClose}/>
    </>);
}