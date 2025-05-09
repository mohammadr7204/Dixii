import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Avatar,
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { shareDocument, unshareDocument } from '../api/documentApi';

const ShareDocumentDialog = ({ document, open, onClose, onShareUpdate }) => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sharedUsers, setSharedUsers] = useState(document?.sharedWith || []);

  const handleShare = async () => {
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      // In a real application, you would first look up the user by email
      // and get their userId. For now, we'll use the email as the userId
      const userId = email;
      await shareDocument(document.id, userId);
      setSharedUsers([...sharedUsers, userId]);
      setEmail('');
      onShareUpdate?.();
    } catch (error) {
      setError('Failed to share document. Please try again.');
      console.error('Share error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnshare = async (userId) => {
    setLoading(true);
    setError(null);

    try {
      await unshareDocument(document.id, userId);
      setSharedUsers(sharedUsers.filter(id => id !== userId));
      onShareUpdate?.();
    } catch (error) {
      setError('Failed to remove sharing. Please try again.');
      console.error('Unshare error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle
        sx={{
          p: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6">Share Document</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Share "{document?.fileName}" with others
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            bgcolor: 'background.default',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <EmailIcon fontSize="small" color="action" />
            Share with others
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error}
              helperText={error}
              InputProps={{
                sx: { bgcolor: 'background.paper' }
              }}
            />
            <Button
              variant="contained"
              onClick={handleShare}
              disabled={!email || loading}
              sx={{ minWidth: 100 }}
            >
              Share
            </Button>
          </Box>
        </Paper>

        {sharedUsers.length > 0 && (
          <Box>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon fontSize="small" color="action" />
              Shared with
            </Typography>
            <Paper
              elevation={0}
              sx={{
                mt: 2,
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <List sx={{ p: 0 }}>
                {sharedUsers.map((userId, index) => (
                  <React.Fragment key={userId}>
                    {index > 0 && <Divider />}
                    <ListItem
                      sx={{
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: theme.palette.primary.main,
                          mr: 2,
                        }}
                      >
                        {userId.charAt(0).toUpperCase()}
                      </Avatar>
                      <ListItemText
                        primary={userId}
                        primaryTypographyProps={{
                          variant: 'body2',
                          fontWeight: 500,
                        }}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleUnshare(userId)}
                          disabled={loading}
                          size="small"
                          sx={{
                            color: 'error.main',
                            '&:hover': {
                              bgcolor: 'error.light',
                              color: 'error.contrastText',
                            },
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareDocumentDialog;