import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Tooltip, Paper } from '@material-ui/core';

export default function QRCodeDisplay({ value, size = 128 }) {
  return (
    <Tooltip title="Scan this QR code to make a payment">
      <Paper elevation={1} style={{ padding: '8px', display: 'inline-block' }}>
        <QRCodeCanvas value={value} size={size} />
      </Paper>
    </Tooltip>
  );
}