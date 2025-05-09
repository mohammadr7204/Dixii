import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../components/Navbar';
import ClientList from '../components/ClientList';
import ClientForm from '../components/ClientForm';
import { useAuth } from '../context/AuthContext';
import {
  createClient,
  getClients,
  updateClient,
  deleteClient
} from '../api/clientApi';
import { useNavigate } from 'react-router-dom';

export default function ClientManagement() {
  const [clients, setClients] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const showSnackbar = useCallback((message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const loadClients = useCallback(async () => {
    try {
      const fetchedClients = await getClients(currentUser.uid);
      setClients(fetchedClients);
    } catch (error) {
      showSnackbar('Error loading clients', 'error');
    }
  }, [currentUser.uid, showSnackbar]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const handleAddClient = () => {
    setSelectedClient(null);
    setIsFormOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsFormOpen(true);
  };

  const handleDeleteClient = async (client) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await deleteClient(client.id);
        setClients(clients.filter(c => c.id !== client.id));
        showSnackbar('Client deleted successfully');
      } catch (error) {
        showSnackbar('Error deleting client', 'error');
      }
    }
  };

  const handleViewDocuments = (client) => {
    navigate(`/clients/${client.id}/documents`);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (selectedClient) {
        const updatedClient = await updateClient(selectedClient.id, values);
        setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
        showSnackbar('Client updated successfully');
      } else {
        const newClient = await createClient(values, currentUser.uid);
        setClients([...clients, newClient]);
        showSnackbar('Client added successfully');
      }
      setIsFormOpen(false);
    } catch (error) {
      showSnackbar('Error saving client', 'error');
    }
    setSubmitting(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">
              Client Management
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddClient}
            >
              Add Client
            </Button>
          </Box>

          <ClientList
            clients={clients}
            onEdit={handleEditClient}
            onDelete={handleDeleteClient}
            onViewDocuments={handleViewDocuments}
          />

          <Dialog
            open={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedClient ? 'Edit Client' : 'Add New Client'}
            </DialogTitle>
            <DialogContent>
              <ClientForm
                initialValues={selectedClient || {}}
                onSubmit={handleSubmit}
                isEditing={!!selectedClient}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setIsFormOpen(false)}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              variant="filled"
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
}
