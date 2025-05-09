import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to AccountantAI
        </Typography>
        <Typography variant="body1" paragraph>
          Logged in as: {currentUser?.email}
        </Typography>

        <Grid container spacing={3} sx={{ mt: 3 }}>
          {/* Quick actions */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Upload Document
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upload client documents for AI processing and analysis.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<UploadFileIcon />}
                  component={RouterLink}
                  to="/upload"
                >
                  Upload Now
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  View Documents
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse and manage all processed documents.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<DescriptionIcon />}
                  component={RouterLink}
                  to="/documents"
                >
                  View Documents
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Manage Clients
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add, edit, and organize your client information.
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  startIcon={<PeopleIcon />}
                  component={RouterLink}
                  to="/clients"
                >
                  Manage Clients
                </Button>
              </CardActions>
            </Card>
          </Grid>

          {/* Recent activity placeholder */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No recent activity to display.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Log Out
        </Button>
      </Container>
    </>
  );
}