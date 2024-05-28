import { Box, Breadcrumbs, Button, Grid, IconButton, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router";
import terminals from 'src/utils/terminals.json';
import { getCurrentUrl, id2item } from "src/utils/custom";
import CustomBreadcrumbs from "src/components/Custom/Breadcrumbs";

const FuelTerminal = () => { 
  const { terminal_id } = useParams<any>();
  const terminal = id2item(terminal_id, terminals);
  if (!terminal) {
    location.href = '/status/404';
  }

  const breadcrumbs = [
    {label: 'Fuel Terminal', url: '#'},
  ];

  return <>
    <Box maxWidth={'1000px'} className={'pageContainer1'}>
        <CustomBreadcrumbs items={breadcrumbs} />
        <Box className={'pageHeader1'} marginTop={2}>
          <Link href={`/`}>
            <Button className={'backBtn1'} variant={'outlined'} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
          </Link>

          <Typography variant="h1" align="center">Fuel Terminal</Typography>
          <Typography variant="h1" align="center" marginTop={1}>Port of {terminal.label}</Typography>
        </Box>

        <Box sx={{marginTop: 2, marginBottom: 2}}>
          <Link href={`${getCurrentUrl()}/tank`}>
            <img style={{display:'block', maxWidth:'100%', height:'450px', margin:'0 auto'}} src={'/static/images/buildings/terminal.jpg'} />
          </Link>
        </Box>

        <Box marginTop={2}>
          <Paper sx={{padding: 2}}>            
            <Stack spacing={2}>
              <TextField label="Time of Bunkering" variant="outlined" />
              <TextField label="Amount of Bunkering" variant="outlined" />
              <Grid container spacing={0} alignItems={'center'}>
                <Grid item xs={8}>
                  <TextField label="Carbon Emission" variant="outlined" style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={4} style={{paddingLeft: '10px'}}>
                  <Link href={'/dataverify'}>
                    <IconButton aria-label="delete" color="primary">
                      <AccountCircleIcon />
                    </IconButton>
                  </Link>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
        </Box>
    </Box>
  </>;
}

export default FuelTerminal;