import React, { useState, useMemo } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type HealthTip } from '../../types';
import { MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

interface HealthTipTableProps {
  rows: HealthTip[];
  columns: GridColDef[];
  loading?: boolean;
  theme: 'light' | 'dark';
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'exercise', label: 'Exercise' },
];

const HealthTipTable: React.FC<HealthTipTableProps> = ({ rows, columns, loading, theme }) => {
  const [category, setCategory] = useState('');

  const filteredRows = useMemo(
    () => (category ? rows.filter(r => r.category === category) : rows),
    [rows, category]
  );

  return (
    <Box>
      <Box className="flex flex-wrap items-center gap-4 mb-4">
        <FormControl size="small" fullWidth sx={{
          maxWidth: 220,
          background: theme === 'dark' ? '#1e293b' : '#fff',
          borderRadius: 2,
          '.MuiInputLabel-root': { color: theme === 'dark' ? '#cbd5e1' : '#334155' },
          '.MuiOutlinedInput-root': {
            color: theme === 'dark' ? '#fff' : '#1e293b',
            '& fieldset': { borderColor: theme === 'dark' ? '#334155' : '#cbd5e1' },
            '&:hover fieldset': { borderColor: '#6366f1' },
          },
        }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            value={category}
            label="Category"
            onChange={e => setCategory(e.target.value)}
            className="bg-white dark:bg-gray-900"
          >
            {categories.map(cat => (
              <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
          loading={loading}
          sx={{
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#1e293b',
            borderRadius: 2,
            border: 'none',
            '.MuiDataGrid-columnHeaders': {
              background: theme === 'dark' ? '#334155' : '#f3f4f6',
              color: theme === 'dark' ? '#fff' : '#1e293b',
              fontWeight: 700,
            },
            '.MuiDataGrid-cell': {
              borderBottom: `1px solid ${theme === 'dark' ? '#334155' : '#e5e7eb'}`,
            },
          }}
        />
      </div>
    </Box>
  );
};

export default HealthTipTable;