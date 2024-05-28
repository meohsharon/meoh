import { Box, Button, Card, IconButton, Link, Stack, TextField, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import FuelSourceTransportMap from "./FuelSourceTransportMap";
import { useParams } from "react-router";
import CustomBreadcrumbs from "src/components/Custom/Breadcrumbs";

const titles_map = {
  "1" : "Green Hydrogen and Captured Carbon",
  "2" : "Crude to HFO Refinery",
  "3" : "Bio-waste Raw Material to Biofuel Refinery", 
};

function FuelSourceTransport() {
    const { terminal_id, refinery_id } = useParams<any>();
    const title = titles_map[refinery_id] ?? "";

    const breadcrumbs = [
      {label: 'Fuel Terminal', url: `/terminal/${terminal_id}`},
      {label: 'Fuel Tank', url: `/terminal/${terminal_id}/tank`},
      {label: 'Distribution: Refinery to Bunkering', url: `/terminal/${terminal_id}/tank/refinerytransport`},
      {label: 'Refinery', url: `/terminal/${terminal_id}/tank/refinerytransport/${refinery_id}`},
      {label: 'Distribution: Fuel source to Refinery', url: '#'},
    ];

    return <>
        <Box maxWidth={'1000px'} className={'pageContainer1'}>
            <CustomBreadcrumbs items={breadcrumbs} />
            <Box className={'pageHeader1'} marginTop={2}>              
              <Link href={`/terminal/${terminal_id}/tank/refinerytransport/${refinery_id}`}>
                <Button className={'backBtn1'} variant={'outlined'} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
              </Link>
              
              <Typography variant="h1" align="center">Transportion <br/>{title}</Typography>
            </Box>
            
            <Box sx={{marginTop: 2, marginBottom: 2}}>
                <FuelSourceTransportMap />
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
export default FuelSourceTransport;
