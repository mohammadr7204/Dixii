import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  IconButton,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Search as SearchIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import Navbar from '../components/Navbar';
import { getDocuments, deleteDocument } from '../api/documentApi';
import { useAuth } from '../context/AuthContext';

export default function ViewDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { currentUser } = useAuth();

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {
        search: searchTerm,
        category: filterCategory
      };
      const docs = await getDocuments(filters);
      setDocuments(docs);
    } catch (error) {
      showSnackbar('Error loading documents: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterCategory]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const handleDelete = async (document) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(document.id);
        setDocuments(documents.filter(doc => doc.id !== document.id));
        showSnackbar('Document deleted successfully');
      } catch (error) {
        showSnackbar('Error deleting document: ' + error.message, 'error');
      }
    }
  };

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    setSelectedDocument(null);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            View Documents
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search Documents"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Filter by Category"
                value={filterCategory}
                onChange={handleFilterChange}
                InputProps={{
                  endAdornment: <FilterListIcon />
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="tax">Tax Documents</MenuItem>
                <MenuItem value="financial">Financial Statements</MenuItem>
                <MenuItem value="legal">Legal Documents</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {documents.map((document) => (
                <Grid item xs={12} sm={6} md={4} key={document.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" noWrap>
                        {document.fileName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {document.category || 'Uncategorized'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Uploaded: {new Date(document.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        size="small"
                        onClick={() => handlePreview(document)}
                        title="Preview"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(document)}
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          <Dialog
            open={previewOpen}
            onClose={handleClosePreview}
            maxWidth="md"
            fullWidth
          >
            <DialogTitle>
              {selectedDocument?.fileName}
            </DialogTitle>
            <DialogContent>
              {selectedDocument && (
                <Box sx={{ mt: 2 }}>
                  <iframe
                    src={selectedDocument.downloadURL}
                    style={{ width: '100%', height: '500px', border: 'none' }}
                    title="Document Preview"
                  />
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePreview}>Close</Button>
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
