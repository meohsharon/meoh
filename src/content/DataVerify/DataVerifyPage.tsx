import { Box, Button, Grid, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
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

const DataVerifyPage = () => {
  const breadcrumbs = [];

  return <>
    <Box maxWidth={'1200px'} className={'pageContainer1'}>
        <Box className={'pageHeader1'} marginTop={2}>
          <Button className={'backBtn1'} variant={'outlined'} startIcon={<KeyboardArrowLeftIcon />} onClick={()=>{history.go(-1);}}>Back</Button>
          <Typography variant="h1" align="center">Data Verification</Typography>
        </Box>
        
        <Box mt={8} mb={2}>
          <Typography variant="h3" mb={2}>Data Source</Typography>
          <TableContainer component={Paper} sx={{marginBottom: 4}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Source</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Update Schedule</TableCell>
                  <TableCell>Input Pointer</TableCell>
                  <TableCell>Last Updated</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell>Data Confidence</TableCell>
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
                    <TableCell>{row.inlet_source}</TableCell>
                    <TableCell>{row.arrived_at}</TableCell>
                    <TableCell align="right">{Number(row.travel_km).toLocaleString()}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <Typography variant="h3" mb={20}>Carbon Emission Calculation</Typography>
          <Typography variant="h3" mb={2}>Range of Error</Typography>
        </Box>
    </Box>
  </>;
}

export default DataVerifyPage;