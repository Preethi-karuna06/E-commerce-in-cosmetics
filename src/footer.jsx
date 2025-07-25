import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Twitter, WhatsApp } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: 'black',
  boxShadow:"none",
}));

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 5, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
          <Grid  size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <h6>SMILE</h6>
              
            </Item>
          </Grid>
        
          <Grid  size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <h6>QUICK LINKS</h6>
            </Item>
          </Grid>
          <Grid  size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <h6>Contact us</h6>
            </Item>
          </Grid>
          <Grid  size={{ xs: 2, sm: 4, md: 4 }}>
            <Item>
              <FacebookIcon sx={{padding:"5px"}}/>
              <Twitter/>
              <WhatsApp/>
            </Item>
          </Grid>
      </Grid>
    </Box>
  );
}
