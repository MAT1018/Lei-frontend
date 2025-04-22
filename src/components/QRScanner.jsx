import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { Button, Typography, Paper } from '@material-ui/core';

export default function QRScanner({ onScan, onCancel }) {
  const [error, setError] = useState(null);

  const handleScan = (data) => {
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (parsed.lei && parsed.accountId) {
          onScan(data);
        }
      } catch (e) {
        setError('Invalid QR code format');
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setError('Failed to scan QR code');
  };

  return (
    <Paper style={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Scan Merchant QR Code
      </Typography>

      {error && (
        <Typography color="error" paragraph>
          {error}
        </Typography>
      )}

      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result?.text);
          }
          if (!!error) {
            handleError(error);
          }
        }}
        style={{ width: '100%' }}
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={onCancel}
        style={{ marginTop: '16px' }}
      >
        Cancel
      </Button>
    </Paper>
  );
}