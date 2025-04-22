import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@material-ui/core';
import QRCodeDisplay from './QRCodeDisplay';

export default function MerchantList({ merchants }) {
  if (merchants.length === 0) {
    return <Typography>No merchants registered yet.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Business Name</TableCell>
            <TableCell>LEI</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>QR Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merchants.map((merchant) => (
            <TableRow key={merchant.lei}>
              <TableCell>{merchant.businessName}</TableCell>
              <TableCell>{merchant.lei}</TableCell>
              <TableCell>{new Date(merchant.registrationDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <QRCodeDisplay 
                  value={JSON.stringify({ 
                    lei: merchant.lei, 
                    accountId: merchant.accountId 
                  })} 
                  size={50} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}