// material
import { Box, Container, Typography } from "@mui/material";
// components
import Grid from '@mui/material/Grid';

import Page from "../../components/app/Page";

// ----------------------------------------------------------------------

export default function Dashboard() {
  return (
    <Page title="Condor app - admin">
      <Container maxWidth="xl"> 
        <Grid
          container
          spacing={32}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        > 
          <Grid item xs={3}>
            <Box sx={{ pb: 5 }}>
              <Typography variant="h2">
                Bienvenido a CondorApp
              </Typography>
            </Box> 
          </Grid>   
        </Grid> 
      </Container>
    </Page>
  );
}
