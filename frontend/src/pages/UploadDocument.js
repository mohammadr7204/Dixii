import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

export default function UploadDocument() {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Upload Document
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Document upload functionality coming soon...
        </Typography>
      </Container>
    </>
  );
}