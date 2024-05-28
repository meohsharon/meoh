import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import "./App.css";
import AjaxInterceptor from './components/Custom/AjaxInterceptor';
import CustomReduxSnackbar from './components/Custom/Snackbar/CustomReduxSnackbar';
import CustomReduxBackdrop from './components/Custom/Backdrop/CustomReduxBackdrop';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AjaxInterceptor />
        <CssBaseline />
        <CustomReduxSnackbar />
        <CustomReduxBackdrop />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
