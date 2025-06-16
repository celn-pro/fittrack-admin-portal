import React, { useState } from 'react';
import {
  useGetHealthTipsQuery,
  useCreateHealthTipMutation,
  useUpdateHealthTipMutation,
  useDeleteHealthTipMutation,
  GetHealthTipsDocument,
} from '../generated/graphql';
import { Button, Tabs, Tab } from '@mui/material';
import { Add, ListAlt } from '@mui/icons-material';
import { type HealthTip, type HealthTipInput } from '../types';
import HealthTipFormBuilder from '../components/data/HealthTipFormBuilder';
import HealthTipTable from '../components/data/HealthTipTable';

interface HealthTipsProps {
  theme: 'light' | 'dark';
}

const HealthTips: React.FC<HealthTipsProps> = ({ theme }) => {
  const [tab, setTab] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<HealthTip | null>(null);

  const { data, loading } = useGetHealthTipsQuery();
  const [createHealthTip] = useCreateHealthTipMutation({
    refetchQueries: [{ query: GetHealthTipsDocument }],
  });
  const [updateHealthTip] = useUpdateHealthTipMutation({
    refetchQueries: [{ query: GetHealthTipsDocument }],
  });
  const [deleteHealthTip] = useDeleteHealthTipMutation({
    refetchQueries: [{ query: GetHealthTipsDocument }],
  });

  function healthTipToInput(data: HealthTip): HealthTipInput {
    const { id, __typename, createdAt, updatedAt, ...rest } = data;
    return { ...rest } as HealthTipInput;
  }

  const handleSubmit = async (formData: HealthTipInput) => {
    try {
      if (editData) {
        await updateHealthTip({ variables: { id: editData.id, input: formData } });
      } else {
        await createHealthTip({ variables: { input: formData } });
      }
      setOpenForm(false);
      setEditData(null);
      setTab(0);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: HealthTip) => {
    setEditData(row);
    setOpenForm(true);
    setTab(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHealthTip({ variables: { id } });
    } catch (err) {
      console.error('Error deleting health tip:', err);
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Health Tips</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage and create health tips for your users.</p>
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
              onClick={() => { setEditData(null); setOpenForm(true); setTab(1); }}
              className="font-semibold"
            >
              New Health Tip
            </Button>
          </div>
          <HealthTipTable
            rows={data?.getHealthTips || []}
            columns={columns}
            loading={loading}
            theme={theme}
          />
        </div>
      )}

      {tab === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <HealthTipFormBuilder
            initialValues={editData ? healthTipToInput(editData) : {}}
            onSubmit={handleSubmit}
            onCancel={() => { setOpenForm(false); setEditData(null); setTab(0); }}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

export default HealthTips;