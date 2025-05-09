import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Box,
  Typography
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

// Placeholder for API function to get clients
// You'll need to implement this in your api/clients.js file
import { getClients, createClient } from '../api/clients';

export default function ClientSelector({ value, onChange, sx }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', address: '' });
  const [submitting, setSubmitting] = useState(false);
  const { getUserToken } = useAuth();

  // Load client list
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getUserToken();
        const data = await getClients(token);
        setClients(data.clients || []);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Failed to load clients. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [getUserToken]);

  // Handle new client form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  // Open new client dialog
  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  // Close new client dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setNewClient({ name: '', email: '', phone: '', address: '' });
  };

  // Create new client
  const handleCreateClient = async () => {
    if (!newClient.name || !newClient.email) {
      return;
    }

    try {
      setSubmitting(true);
      const token = await getUserToken();
      const result = await createClient(token, newClient);

      // Add new client to list and select it
      if (result.success && result.client) {
        setClients(prev => [...prev, result.client]);
        onChange(result.client.id);
      }

      handleCloseDialog();
    } catch (err) {
      console.error('Error creating client:', err);
      setError('Failed to create client. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // If loading, show loading indicator
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
        <CircularProgress size={24} sx={{ mr: 2 }} />
        <Typography>Loading clients...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', ...sx }}>
        <FormControl fullWidth sx={{ mr: 2 }}>
          <InputLabel id="client-select-label">Client</InputLabel>
          <Select
            labelId="client-select-label"
            id="client-select"
            value={value || ''}
            label="Client"
            onChange={(e) => onChange(e.target.value)}
          >
            <MenuItem value="">
              <em>Select a client</em>
            </MenuItem>
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={handleOpenDialog}
          sx={{ flexShrink: 0, height: 56 }}
        >
          Add New
        </Button>
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}

      {/* New Client Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Client</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Client Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newClient.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={newClient.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="outlined"
            value={newClient.phone}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={newClient.address}
            onChange={handleInputChange}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleCreateClient}
            variant="contained"
            disabled={submitting || !newClient.name || !newClient.email}
          >
            {submitting ? <CircularProgress size={24} /> : 'Add Client'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}