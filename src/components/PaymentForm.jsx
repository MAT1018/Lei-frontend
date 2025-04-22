import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Grid, 
  Typography, 
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import QRScanner from './QRScanner';

export default function PaymentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    qrCodeData: '',
    payerId: '',
    amount: '',
    currency: 'USD'
  });
  const [useScanner, setUseScanner] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScan = (data) => {
    if (data) {
      setFormData(prev => ({ ...prev, qrCodeData: data }));
      setUseScanner(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    
    const response = await onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    
    setResult(response);
    setLoading(false);
    
    if (response.success) {
      setFormData(prev => ({
        ...prev,
        amount: '',
        qrCodeData: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        {useScanner ? (
          <Grid item xs={12}>
            <QRScanner onScan={handleScan} onCancel={() => setUseScanner(false)} />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="QR Code Data"
                name="qrCodeData"
                value={formData.qrCodeData}
                onChange={handleChange}
                required
                multiline
                rows={3}
              />
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setUseScanner(true)}
                style={{ marginTop: '8px' }}
              >
                Scan QR Code
              </Button>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Payer ID"
                name="payerId"
                value={formData.payerId}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                required
                inputProps={{ step: "0.01", min: "0.01" }}
              />
            </Grid>
            
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Currency</InputLabel>
                <Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                >
                  <MenuItem value="USD">INR</MenuItem>
                  <MenuItem value="EUR">USD</MenuItem>
                  <MenuItem value="GBP">EUR</MenuItem>
                  <MenuItem value="KES">GBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? <CircularProgress size={24} /> : 'Initiate Payment'}
              </Button>
            </Grid>
          </>
        )}
        
        {result && (
          <Grid item xs={12}>
            <Typography color={result.success ? 'primary' : 'error'}>
              {result.success 
                ? `Payment initiated! Transaction ID: ${result.transactionId}`
                : result.error}
            </Typography>
            {result.details && (
              <Typography variant="body2" color="error">
                {result.details}
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
    </form>
  );
}