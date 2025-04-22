import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, CircularProgress } from '@material-ui/core';

export default function MerchantRegistration({ onRegister }) {
  const [formData, setFormData] = useState({
    businessName: '',
    lei: '',
    accountId: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const response = await onRegister(formData);
    setResult(response);
    
    if (response.success) {
      setFormData({
        businessName: '',
        lei: '',
        accountId: ''
      });
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="LEI (Legal Entity Identifier)"
            name="lei"
            value={formData.lei}
            onChange={handleChange}
            required
            helperText="20-character alphanumeric identifier"
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Account ID"
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            required
            helperText="The merchant's account identifier"
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register Merchant'}
          </Button>
        </Grid>
        
        {result && (
          <Grid item xs={12}>
            <Typography color={result.success ? 'primary' : 'error'}>
              {result.success ? 'Merchant registered successfully!' : result.error}
            </Typography>
          </Grid>
        )}
      </Grid>
    </form>
  );
}