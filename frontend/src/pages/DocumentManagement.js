import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Navbar from '../components/Navbar';
import DocumentUpload from '../components/DocumentUpload';
import DocumentList from '../components/DocumentList';
import DocumentFilters from '../components/DocumentFilters';
import DocumentPreview from '../components/DocumentPreview';
import ShareDocumentDialog from '../components/ShareDocumentDialog';
import { getDocuments, uploadDocument, updateDocument, deleteDocument } from '../api/documentApi';
import { useAuth } from '../contexts/AuthContext';

const DocumentManagement = ({ clientId }) => {
  const { currentUser } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    category: '',
    tags: []
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    tags: []
  });

  useEffect(() => {
    if (currentUser) {
      loadDocuments();
    }
  }, [currentUser, clientId, filters]);

  const loadDocuments = async () => {
    try {
      const docs = await getDocuments(currentUser.uid, clientId, filters);
      setDocuments(docs);
    } catch (error) {
      console.error('Error loading documents:', error);
      showSnackbar('Failed to load documents', 'error');
    }
  };

  const handleFileUpload = async (files) => {
    setUploading(true);
    try {
      for (const file of files) {
        const metadata = {
          name: file.name,
          type: file.type,
          size: file.size,
          category: 'Uncategorized',
          tags: []
        };
        await uploadDocument(file, metadata, currentUser.uid, clientId);
      }
      setUploadedFiles([]);
      loadDocuments();
      showSnackbar('Documents uploaded successfully');
    } catch (error) {
      console.error('Error uploading documents:', error);
      showSnackbar('Failed to upload documents', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setUploadedFiles(files => files.filter(file => file !== fileToRemove));
  };

  const handleEdit = (document) => {
    setSelectedDocument(document);
    setEditFormData({
      name: document.name,
      category: document.category || '',
      tags: document.tags || []
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await updateDocument(selectedDocument.id, editFormData);
      setEditDialogOpen(false);
      loadDocuments();
      showSnackbar('Document updated successfully');
    } catch (error) {
      console.error('Error updating document:', error);
      showSnackbar('Failed to update document', 'error');
    }
  };

  const handleDelete = async (documentId) => {
    if (window.confirm('Are you sure you want to delete this document?')) {
      try {
        await deleteDocument(documentId);
        loadDocuments();
        showSnackbar('Document deleted successfully');
      } catch (error) {
        console.error('Error deleting document:', error);
        showSnackbar('Failed to delete document', 'error');
      }
    }
  };

  const handlePreview = (document) => {
    setSelectedDocument(document);
    setPreviewOpen(true);
  };

  const handleShare = (document) => {
    setSelectedDocument(document);
    setShareDialogOpen(true);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Document Management
        </Typography>

        <Box sx={{ mb: 4 }}>
          <DocumentFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <DocumentUpload
            onUpload={handleFileUpload}
            onRemove={handleRemoveFile}
            files={uploadedFiles}
            uploading={uploading}
          />
        </Box>

        <DocumentList
          documents={documents}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPreview={handlePreview}
          onShare={handleShare}
        />

        {/* Edit Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Document</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Category"
              value={editFormData.category}
              onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Preview Dialog */}
        <DocumentPreview
          document={selectedDocument}
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
        />

        {/* Share Dialog */}
        <ShareDocumentDialog
          document={selectedDocument}
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          onShareUpdate={loadDocuments}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default DocumentManagement;