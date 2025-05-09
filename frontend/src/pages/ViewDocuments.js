import React from 'react';
import { Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

export default function ViewDocuments() {
  return (
    <>
      <Navbar />
      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          View Documents
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Document viewing functionality coming soon...
        </Typography>
      </Container>
    </>
  );
}
