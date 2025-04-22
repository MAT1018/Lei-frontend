import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, TextField, Button } from '@material-ui/core';
import MerchantRegistration from '../components/MerchantRegistration';
import MerchantList from '../components/MerchantList';
import api from '../services/api';

export default function MerchantPage() {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMerchants = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/merchants');
      setMerchants(response.data.merchants);
      setError(null);
    } catch (err) {
      setError('Failed to fetch merchants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const handleRegister = async (merchantData) => {
    try {
      await api.post('/api/merchants', merchantData);
      fetchMerchants();
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: err.response?.data?.error || 'Registration failed' };
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Merchant Management
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Register New Merchant
          </Typography>
          <MerchantRegistration onRegister={handleRegister} />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Registered Merchants
          </Typography>
          {loading ? (
            <Typography>Loading merchants...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <MerchantList merchants={merchants} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}