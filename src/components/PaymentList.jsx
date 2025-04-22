import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  Chip
} from '@material-ui/core';

const statusColors = {
  pending: 'default',
  completed: 'primary',
  failed: 'secondary'
};

export default function PaymentList({ payments }) {
  if (payments.length === 0) {
    return <Typography>No payments yet.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Merchant LEI</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.transactionId}>
              <TableCell>{payment.transactionId.substring(0, 8)}...</TableCell>
              <TableCell>{payment.merchantLei}</TableCell>
              <TableCell>
                {payment.currency} {payment.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Chip 
                  label={payment.status} 
                  color={statusColors[payment.status]} 
                  size="small" 
                />
              </TableCell>
              <TableCell>
                {new Date(payment.timestamp).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}