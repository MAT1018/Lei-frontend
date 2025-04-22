import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Button } from '@material-ui/core';
import PaymentForm from '../components/PaymentForm';
import PaymentList from '../components/PaymentList';
import api from '../services/api';

export default function PaymentPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/payments');
      setPayments(response.data.payments);
      setError(null);
    } catch (err) {
      setError('Failed to fetch payments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handlePayment = async (paymentData) => {
    try {
      const response = await api.post('/api/payments', paymentData);
      fetchPayments();
      return { success: true, transactionId: response.data.transactionId };
    } catch (err) {
      console.error(err);
      return { 
        success: false, 
        error: err.response?.data?.error || 'Payment failed',
        details: err.response?.data?.details
      };
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Merchant Payments
        </Typography>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Initiate Payment
          </Typography>
          <PaymentForm onSubmit={handlePayment} />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Payment History
          </Typography>
          {loading ? (
            <Typography>Loading payments...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <PaymentList payments={payments} />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}