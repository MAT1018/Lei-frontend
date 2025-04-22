import React from 'react';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function HomePage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          LEI-based Merchant Payments PoC
        </Typography>
        <Typography variant="body1" paragraph>
          This proof-of-concept demonstrates merchant payments using Legal Entity Identifiers (LEI) 
          with QR code technology.
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Merchant Registration
          </Typography>
          <Typography paragraph>
            Register new merchants with their LEI and generate QR codes for payments.
          </Typography>
          <Box mt={2}>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/merchants"
            >
              Go to Merchants
            </Button>
          </Box>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Make a Payment
          </Typography>
          <Typography paragraph>
            Scan a merchant's QR code to initiate a payment using their LEI.
          </Typography>
          <Box mt={2}>
            <Button 
              variant="contained" 
              color="secondary" 
              component={Link} 
              to="/payments"
            >
              Go to Payments
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}