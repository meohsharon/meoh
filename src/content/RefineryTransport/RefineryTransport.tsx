import { Box, Button, Card, IconButton, Link, Stack, TextField, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RefineryTransportMap from "./RefineryTransportMap";
import { useParams } from "react-router";
import CustomBreadcrumbs from "src/components/Custom/Breadcrumbs";

function RefineryTransport() {
    const { terminal_id } = useParams<any>();
    const breadcrumbs = [
      {label: 'Fuel Terminal', url: `/terminal/${terminal_id}`},
      {label: 'Fuel Tank', url: `/terminal/${terminal_id}/tank`},
      {label: 'Distribution: Refinery to Bunkering', url: '#'},
    ];
    
    return <>
        <Box maxWidth={'1000px'} className={'pageContainer1'}>
            <CustomBreadcrumbs items={breadcrumbs} />
            <Box className={'pageHeader1'} marginTop={2}>
              <Link href={`/terminal/${terminal_id}/tank`}>
                <Button className={'backBtn1'} variant={'outlined'} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
              </Link>
              
              <Typography variant="h1" align="center">Transportion <br/>Refinery to Port Terminal</Typography>
            </Box>
            
            <Box sx={{marginTop: 2, marginBottom: 2}}>
                <RefineryTransportMap />
            </Box>
            <Card sx={{padding: 2}}>
              <Stack direction={'row'} spacing={2} justifyContent={'center'} alignItems={'center'}>
                <Typography variant="h3">Carbon Intensity</Typography>
                <TextField variant="outlined" sx={{width: '300px'}}/>
                <Link href={'/dataverify'}>
                  <IconButton aria-label="delete" color="primary">
                    <AccountCircleIcon />
                  </IconButton>
                </Link>
              </Stack>
            </Card>
        </Box>
    </>;
}
export default RefineryTransport;
