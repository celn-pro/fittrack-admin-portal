import React, { useState } from 'react';
import {
  useGetDidYouKnowQuery,
  useCreateDidYouKnowMutation,
  useUpdateDidYouKnowMutation,
  useDeleteDidYouKnowMutation,
  GetDidYouKnowDocument,
} from '../generated/graphql';
import { Button, Tabs, Tab } from '@mui/material';
import { Add, ListAlt } from '@mui/icons-material';
import { type DidYouKnow, type DidYouKnowInput } from '../types';
import DidYouKnowFormBuilder from '../components/data/DidYouKnowFormBuilder';
import DidYouKnowTable from '../components/data/DidYouKnowTable';

interface DidYouKnowPageProps {
  theme: 'light' | 'dark';
}

const DidYouKnowPage: React.FC<DidYouKnowPageProps> = ({ theme }) => {
  const [tab, setTab] = useState(0);
  const [editData, setEditData] = useState<DidYouKnow | null>(null);

  const { data, loading, error } = useGetDidYouKnowQuery();
  const [createDidYouKnow] = useCreateDidYouKnowMutation({
    refetchQueries: [{ query: GetDidYouKnowDocument }],
  });
  const [updateDidYouKnow] = useUpdateDidYouKnowMutation({
    refetchQueries: [{ query: GetDidYouKnowDocument }],
  });
  const [deleteDidYouKnow] = useDeleteDidYouKnowMutation({
    refetchQueries: [{ query: GetDidYouKnowDocument }],
  });

  function didYouKnowToInput(data: DidYouKnow): DidYouKnowInput {
    const { id, __typename, createdAt, updatedAt, ...rest } = data;
    return { ...rest } as DidYouKnowInput;
  }

  const handleSubmit = async (formData: DidYouKnowInput) => {
    try {
      if (editData) {
        await updateDidYouKnow({ variables: { id: editData.id, input: formData } });
      } else {
        await createDidYouKnow({ variables: { input: formData } });
      }
      setEditData(null);
      setTab(0);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: DidYouKnow) => {
    setEditData(row);
    setTab(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDidYouKnow({ variables: { id } });
    } catch (err) {
      console.error('Error deleting did you know:', err);
    }
  };

  const columns = [
    { field: 'fact', headerName: 'Fact', width: 300 },
    { field: 'source', headerName: 'Source', width: 200 },
    { field: 'fitnessGoal', headerName: 'Fitness Goal', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params: any) => (
        <>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)} color="error">Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Did You Know</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Share interesting facts and tips with your users.</p>
        </div>
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          className="rounded-lg"
          TabIndicatorProps={{
            style: {
              background: tab === 0 ? '#6366f1' : '#22c55e',
              height: 4,
              borderRadius: 2,
            },
          }}
          sx={{
            backgroundColor: theme === 'dark' ? '#1e293b' : '#f3f4f6',
            '.MuiTab-root': {
              color: theme === 'dark' ? '#cbd5e1' : '#334155',
              fontWeight: 600,
              fontSize: '1rem',
              textTransform: 'none',
              minWidth: 120,
              '&.Mui-selected': {
                color: theme === 'dark' ? '#fff' : '#1e293b',
              },
            },
          }}
        >
          <Tab icon={<ListAlt />} label="List" />
          <Tab icon={<Add />} label={editData ? "Edit" : "Create"} />
        </Tabs>
      </div>

      {tab === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 transition-colors">
          <div className="flex justify-end mb-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={() => { setEditData(null); setTab(1); }}
              className="font-semibold"
            >
              New Fact
            </Button>
          </div>
          <DidYouKnowTable
            rows={data?.getDidYouKnow || []}
            columns={columns}
            loading={loading}
            theme={theme}
          />
        </div>
      )}

      {tab === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <DidYouKnowFormBuilder
            initialValues={editData ? didYouKnowToInput(editData) : {}}
            onSubmit={handleSubmit}
            onCancel={() => setTab(0)}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

export default DidYouKnowPage;