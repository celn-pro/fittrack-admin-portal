import React, { useState, useMemo } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type DidYouKnow } from '../../types';
import { MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

interface DidYouKnowTableProps {
  rows: DidYouKnow[];
  columns: GridColDef[];
  loading?: boolean;
  theme: 'light' | 'dark';
}

const DidYouKnowTable: React.FC<DidYouKnowTableProps> = ({ rows, columns, loading, theme }) => {
  const [fitnessGoal, setFitnessGoal] = useState('');
  const filteredRows = useMemo(
    () => (fitnessGoal ? rows.filter(r => r.fitnessGoal === fitnessGoal) : rows),
    [rows, fitnessGoal]
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
          <InputLabel id="fitnessgoal-filter-label">Fitness Goal</InputLabel>
          <Select
            labelId="fitnessgoal-filter-label"
            value={fitnessGoal}
            label="Fitness Goal"
            onChange={e => setFitnessGoal(e.target.value)}
            className="bg-white dark:bg-gray-900"
          >
            <MenuItem value="">All Fitness Goals</MenuItem>
            <MenuItem value="Lose Weight">Lose Weight</MenuItem>
            <MenuItem value="Gain Muscle">Gain Muscle</MenuItem>
            <MenuItem value="Maintain Health">Maintain Health</MenuItem>
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

export default DidYouKnowTable;