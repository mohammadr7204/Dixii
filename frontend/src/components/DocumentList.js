import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Tooltip,
  Chip,
  Avatar,
  TablePagination,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import { formatFileSize } from '../utils/formatFileSize';

const getFileTypeIcon = (fileType) => {
  if (fileType.includes('pdf')) {
    return <PictureAsPdfIcon />;
  } else if (fileType.includes('image')) {
    return <ImageIcon />;
  } else {
    return <DescriptionIcon />;
  }
};

const getFileTypeColor = (fileType) => {
  if (fileType.includes('pdf')) {
    return '#ef4444'; // Red
  } else if (fileType.includes('image')) {
    return '#22c55e'; // Green
  } else {
    return '#3b82f6'; // Blue
  }
};

const DocumentList = ({ documents, onEdit, onDelete, onPreview, onShare }) => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!documents || documents.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No Documents Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Upload some documents to get started
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 300px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ bgcolor: 'background.paper' }}>Name</TableCell>
              <TableCell sx={{ bgcolor: 'background.paper' }}>Type</TableCell>
              <TableCell sx={{ bgcolor: 'background.paper' }}>Size</TableCell>
              <TableCell sx={{ bgcolor: 'background.paper' }}>Category</TableCell>
              <TableCell sx={{ bgcolor: 'background.paper' }}>Tags</TableCell>
              <TableCell sx={{ bgcolor: 'background.paper' }}>Upload Date</TableCell>
              <TableCell align="right" sx={{ bgcolor: 'background.paper' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((document) => (
                <TableRow
                  key={document.id}
                  hover
                  sx={{
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar
                        sx={{
                          bgcolor: getFileTypeColor(document.type),
                          width: 32,
                          height: 32,
                        }}
                      >
                        {getFileTypeIcon(document.type)}
                      </Avatar>
                      <Typography variant="body2" noWrap>
                        {document.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={document.type.split('/')[1].toUpperCase()}
                      sx={{
                        bgcolor: `${getFileTypeColor(document.type)}15`,
                        color: getFileTypeColor(document.type),
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {formatFileSize(document.size)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={document.category || 'Uncategorized'}
                      color={document.category ? 'primary' : 'default'}
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {document.tags?.map((tag) => (
                        <Chip
                          key={tag}
                          size="small"
                          label={tag}
                          variant="outlined"
                          sx={{
                            borderColor: 'primary.light',
                            color: 'primary.main',
                            '&:hover': {
                              bgcolor: 'primary.light',
                              color: 'primary.contrastText',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(document.createdAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Tooltip title="Preview">
                        <IconButton
                          size="small"
                          onClick={() => onPreview(document)}
                          sx={{ color: 'primary.main' }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Share">
                        <IconButton
                          size="small"
                          onClick={() => onShare(document)}
                          sx={{ color: 'secondary.main' }}
                        >
                          <ShareIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(document)}
                          sx={{ color: 'info.main' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(document.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={documents.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DocumentList;
