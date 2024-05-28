import { Box, Button, Grid, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { FUEL_TYPE, getCurrentUrl, id2item } from "src/utils/custom";
import CustomBreadcrumbs from "src/components/Custom/Breadcrumbs";

const Refinery = () => {
  const dispatch = useAppDispatch();
  const { refineryStore } =  useAppSelector((state) => state.main);
  
  const { terminal_id, refinery_id } = useParams<any>();
  const refinery: Refinery = id2item(refinery_id, refineryStore);

  if (!refinery) {
    return <Typography variant="h3" mt={2} align="center">Invalid ID</Typography>;
  }
  const breadcrumbs = [
    {label: 'Fuel Terminal', url: `/terminal/${terminal_id}`},
    {label: 'Fuel Tank', url: `/terminal/${terminal_id}/tank`},
    {label: 'Distribution: Refinery to Bunkering', url: `/terminal/${terminal_id}/tank/refinerytransport`},
    {label: 'Refinery', url: '#'},
  ];

  const summary_rows = [
    { title: 'Refiner', value: refinery.refiner },
    { title: 'Location', value: refinery.location },
    { title: 'Fuel Type', value: id2item(refinery.fuel_type, FUEL_TYPE)?.['name'] ?? refinery.fuel_type },
    { title: 'Capacity', value: Number(refinery.capacity).toLocaleString() + ' Barrels'},
  ];

  const rows: Array<RefineryFuelSource> = refinery.sources;
  const common_source_unit: string = refinery.fuel_type !== 'green_methanol' ? 'barrel' : 'ton';

  return <>
    <Box maxWidth={'1200px'} className={'pageContainer1'}>
        <CustomBreadcrumbs items={breadcrumbs} />
        <Box className={'pageHeader1'} marginTop={2}>
          <Link href={`/terminal/${terminal_id}/tank/refinerytransport`}>
            <Button className={'backBtn1'} variant={'outlined'} startIcon={<KeyboardArrowLeftIcon />}>Back</Button>
          </Link>

          <Typography variant="h1" align="center">Refinery: {refinery.fuel_type_detail}</Typography>
        </Box>
        
        <Box mt={8} mb={1}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box mb={4}>
                <img style={{display:'block', maxWidth:'100%', height:'300px', margin:'0 auto'}} src={'/static/images/buildings/refinery.jpg'} />
              </Box>
              
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
              <Box minHeight={'30vh'}>
                <Link href={`${getCurrentUrl()}/fuelsourcetransport`}>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Renewable Source</TableCell>
                          <TableCell align="right">Volume ({common_source_unit})</TableCell>
                          <TableCell>Type</TableCell>
                          <TableCell>Date and time</TableCell>
                          <TableCell align="right">Distance Travelled (km)</TableCell>
                          <TableCell>Transport By</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row, index) => (
                          <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {row.source}
                            </TableCell>
                            <TableCell align="right">{Number(row.volume).toLocaleString()}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.arrived_at}</TableCell>
                            <TableCell align="right">{Number(row.distance_km).toLocaleString()}</TableCell>
                            <TableCell>{row.transport_by}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Link>
              </Box>

              <Paper sx={{marginTop: 2, padding: 2}}>
                <Typography variant="h3" marginBottom={2}>Energy Used per Barrel Production: 400 MJ</Typography>
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

export default Refinery;