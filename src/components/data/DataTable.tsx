import React from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { type Recommendation, type HealthTip, type DidYouKnow, type Course, type FeedPost } from '../../types';

interface DataTableProps {
  rows: (Recommendation | HealthTip | DidYouKnow | Course | FeedPost)[];
  columns: GridColDef[];
}

const DataTable: React.FC<DataTableProps> = ({ rows, columns }) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default DataTable;