import * as React from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import CustomBackdrop from './CustomBackdrop';

export default function CustomReduxBackdrop() {

    const { open, message } =  useAppSelector((state) => state.backdrop);

    return (<>
        <CustomBackdrop open={open} message={message}/>
    </>);
}
