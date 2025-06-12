import React, { useState } from 'react';
import {
  useGetHealthTipsQuery,
  useCreateHealthTipMutation,
  useUpdateHealthTipMutation,
  useDeleteHealthTipMutation,
  GetHealthTipsDocument,
} from '../generated/graphql';
import DataTable from '../components/data/DataTable';
import FormBuilder from '../components/data/FormBuilder';
import { Button } from '@mui/material';
import { type HealthTip, type HealthTipInput } from '../types';
import { type FormFieldSchema } from '../components/data/FormBuilder';

const healthTipSchema: FormFieldSchema[] = [
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'category', label: 'Category', type: 'select', options: [{ value: 'nutrition', label: 'Nutrition' }, { value: 'exercise', label: 'Exercise' }], required: true },
  { name: 'fitnessGoal', label: 'Fitness Goal', type: 'text' },
];

const HealthTips: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<HealthTip | null>(null);

  const { data, loading, error } = useGetHealthTipsQuery();
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
    const {
      id,
      __typename,
      createdAt,
      updatedAt,
      ...rest
    } = data;
    // Only include fields that exist in HealthTipInput
    return {
      ...rest,
    } as HealthTipInput;
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
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: HealthTip) => {
    setEditData(row);
    setOpenForm(true);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Health Tips</h2>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Health Tip
        </Button>
      </div>
      <DataTable rows={data?.getHealthTips || []} columns={columns} />
      {openForm && (
        <FormBuilder
          schema={healthTipSchema}
          onSubmit={handleSubmit}
          defaultValues={editData ? healthTipToInput(editData) : {}}
        />
      )}
    </div>
  );
};

export default HealthTips;