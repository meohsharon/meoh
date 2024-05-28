import { Box, Typography } from "@mui/material";
import LandingPageMap from "./LandingPageMap";

function LandingPage() {
    return <>
        <Box maxWidth={'1200px'} className={'pageContainer1'}>
            <Box className={'pageHeader1'}>
                <Typography variant="h1" align="center">Marine Fuel <br/>Carbon Intensity <br/>Life Cycle Data Domain</Typography>
            </Box>
            <Box sx={{marginTop: 2, marginBottom: 2}}>
                <LandingPageMap />
            </Box>
        </Box>
    </>;
}
export default LandingPage;
