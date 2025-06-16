import React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type FeedPost } from '../../types';

interface FeedPostTableProps {
  rows: FeedPost[];
  columns: GridColDef[];
  loading?: boolean;
  theme: 'light' | 'dark';
}

const FeedPostTable: React.FC<FeedPostTableProps> = ({ rows, columns, loading, theme }) => (
  <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
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
);

export default FeedPostTable;