import React, { useState, useMemo } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type Course } from '../../types';
import { MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

interface CourseTableProps {
  rows: Course[];
  columns: GridColDef[];
  loading?: boolean;
  theme: 'light' | 'dark';
}

const CourseTable: React.FC<CourseTableProps> = ({ rows, columns, loading, theme }) => {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('');

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (r) =>
          (!goal || r.goal === goal) &&
          (!level || r.level === level)
      ),
    [rows, goal, level]
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
          <InputLabel id="goal-filter-label">Goal</InputLabel>
          <Select
            labelId="goal-filter-label"
            value={goal}
            label="Goal"
            onChange={(e) => setGoal(e.target.value)}
            className="bg-white dark:bg-gray-900"
          >
            <MenuItem value="">All Goals</MenuItem>
            <MenuItem value="Lose Weight">Lose Weight</MenuItem>
            <MenuItem value="Gain Muscle">Gain Muscle</MenuItem>
            <MenuItem value="Maintain Health">Maintain Health</MenuItem>
          </Select>
        </FormControl>
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
          <InputLabel id="level-filter-label">Level</InputLabel>
          <Select
            labelId="level-filter-label"
            value={level}
            label="Level"
            onChange={(e) => setLevel(e.target.value)}
            className="bg-white dark:bg-gray-900"
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
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

export default CourseTable;