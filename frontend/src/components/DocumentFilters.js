import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Autocomplete,
  Paper,
  Typography,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const categories = [
  'Uncategorized',
  'Invoices',
  'Contracts',
  'Reports',
  'Tax Documents',
  'Financial Statements',
  'Other'
];

const commonTags = [
  'Important',
  'Draft',
  'Final',
  'Reviewed',
  'Pending',
  'Archived'
];

const DocumentFilters = ({ filters, onFilterChange }) => {
  const handleSearchChange = (event) => {
    onFilterChange({ ...filters, search: event.target.value });
  };

  const handleCategoryChange = (event) => {
    onFilterChange({ ...filters, category: event.target.value });
  };

  const handleTagsChange = (event, newValue) => {
    onFilterChange({ ...filters, tags: newValue });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <SearchIcon color="primary" />
        Filter Documents
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SearchIcon fontSize="small" color="action" />
            Search
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search documents..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            InputProps={{
              sx: { bgcolor: 'background.paper' }
            }}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CategoryIcon fontSize="small" color="action" />
            Category
          </Typography>
          <FormControl fullWidth size="small">
            <Select
              value={filters.category || ''}
              onChange={handleCategoryChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Select category' }}
              sx={{ bgcolor: 'background.paper' }}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocalOfferIcon fontSize="small" color="action" />
            Tags
          </Typography>
          <Autocomplete
            multiple
            size="small"
            options={commonTags}
            value={filters.tags || []}
            onChange={handleTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select tags"
                sx={{ bgcolor: 'background.paper' }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  size="small"
                  {...getTagProps({ index })}
                  sx={{
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiChip-deleteIcon': {
                      color: 'primary.contrastText',
                      '&:hover': {
                        color: 'primary.contrastText',
                        opacity: 0.8,
                      },
                    },
                  }}
                />
              ))
            }
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default DocumentFilters;