import { Box, Button, Grid, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCurrentUrl } from "src/utils/custom";
import { useParams } from "react-router";
import CustomBreadcrumbs from "src/components/Custom/Breadcrumbs";

const rows = [
  { refinery_origin: 'Shell, CA', volume: 5000, grade: 'B10', arrived_at: '2024.03.01 9am - 12pm', travel_km: 4612, inlet_source: 'Trucks' },
  { refinery_origin: 'Marathon, Tx', volume: 200000, grade: 'HFO', arrived_at: '2024.02.28 1pm - 5pm', travel_km: 2501, inlet_source: 'Pipeline' },
  { refinery_origin: 'Exxon, NJ', volume: 5000, grade: 'Green Methanol', arrived_at: '2024.02.10 4am - 7am', travel_km: 310, inlet_source: 'Trucks' },
];

const summary_rows = [
  { title: 'Oil Terminal Operator', value: 'Sinopec'},
  { title: 'Type', value: 'B10'},
  { title: 'Capacity', value: Number(600000).toLocaleString() + ' Barrels'},
];

const FuelTank = () => {
  const { terminal_id } = useParams<any>();
  const breadcrumbs = [
    {label: 'Fuel Terminal', url: `/terminal/${terminal_id}`},
    {label: 'Fuel Tank', url: '#'},
  ];

  return <>
    <Box maxWidth={'1200px'} className={'pageContainer1'}>
        <CustomBreadcrumbs items={breadcrumbs} />
        <Box className={'pageHeader1'} marginTop={2}>
          <Link href={`/terminal/${terminal_id}`}>
            <Button className={'backBtn1'} variant={'outlined'} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
          </Link>
          <Typography variant="h1" align="center">Fuel Tank</Typography>
        </Box>
        <Box mt={8} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <img style={{display:'block', maxWidth:'100%', height:'300px', margin:'0 auto'}} src={'/static/images/buildings/fueltank.jpg'} />
            </Grid>
            <Grid item xs={8}>
              <Link href={`${getCurrentUrl()}/refinerytransport`}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Refinery origin</TableCell>
                        <TableCell align="right">Volume (Barrel)</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Date and time</TableCell>
                        <TableCell align="right">Distance Travelled (km)</TableCell>
                        <TableCell>Inlet source</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.refinery_origin}
                          </TableCell>
                          <TableCell align="right">{Number(row.volume).toLocaleString()}</TableCell>
                          <TableCell>{row.grade}</TableCell>
                          <TableCell>{row.arrived_at}</TableCell>
                          <TableCell align="right">{Number(row.travel_km).toLocaleString()}</TableCell>
                          <TableCell>{row.inlet_source}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Link>
            </Grid>
          </Grid>
        </Box>

        <Box mt={'70px'} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">                    
                  <TableBody>
                  {summary_rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell align="right"><Typography variant="h4">{row.title} :</Typography></TableCell>
                      <TableCell align="right"><Typography fontSize={18}>{row.value}</Typography></TableCell>
                    </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={8}>
              <Paper sx={{padding: 2, paddingBottom: 5, paddingTop: 5}}>
                <Stack direction={'row'} spacing={2}>
                  <Typography variant="h4">Carbon Intensity<br/>(Full capacity)</Typography>
                  <TextField variant="outlined" sx={{width: '300px'}}/>
                  <Link href={'/dataverify'}>
                    <IconButton aria-label="delete" color="primary">
                      <AccountCircleIcon />
                    </IconButton>
                  </Link>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Box>
    </Box>
  </>;
}

export default FuelTank;