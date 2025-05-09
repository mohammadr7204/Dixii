import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  CircularProgress,
  Typography,
  Paper,
  useTheme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { generatePreview } from '../api/documentApi';

const DocumentPreview = ({ document, open, onClose }) => {
  const theme = useTheme();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPreview = async () => {
      if (document && open) {
        setLoading(true);
        setError(null);
        try {
          const url = await generatePreview(document);
          setPreviewUrl(url);
        } catch (err) {
          setError('Failed to load preview');
          console.error('Preview error:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadPreview();
  }, [document, open]);

  const handleDownload = () => {
    window.open(document.downloadURL, '_blank');
  };

  const renderPreview = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: 400 }}>
          <CircularProgress size={40} />
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="error" variant="h6" gutterBottom>
            {error}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Please try again or download the file to view it
          </Typography>
        </Box>
      );
    }

    if (document.fileType.includes('pdf')) {
      return (
        <iframe
          src={previewUrl}
          style={{
            width: '100%',
            height: '80vh',
            border: 'none',
            borderRadius: theme.shape.borderRadius,
          }}
          title="PDF Preview"
        />
      );
    }

    if (document.fileType.includes('image')) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <img
            src={previewUrl}
            alt={document.fileName}
            style={{
              maxWidth: '100%',
              maxHeight: '80vh',
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[2],
            }}
          />
        </Box>
      );
    }

    return (
      <iframe
        src={previewUrl}
        style={{
          width: '100%',
          height: '80vh',
          border: 'none',
          borderRadius: theme.shape.borderRadius,
        }}
        title="Document Preview"
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: '90vh',
          maxHeight: '90vh',
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="h6" noWrap>
            {document?.fileName}
          </Typography>
          <IconButton
            onClick={handleDownload}
            size="small"
            sx={{ color: 'primary.main' }}
          >
            <DownloadIcon />
          </IconButton>
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'text.primary',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          p: 0,
          bgcolor: 'background.default',
          '&.MuiDialogContent-root': {
            padding: 0,
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
          }}
        >
          {renderPreview()}
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentPreview;