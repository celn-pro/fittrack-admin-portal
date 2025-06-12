import React, { useState } from 'react';
import {
  useGetDidYouKnowQuery,
  useCreateDidYouKnowMutation,
  useUpdateDidYouKnowMutation,
  useDeleteDidYouKnowMutation,
  GetDidYouKnowDocument,
} from '../generated/graphql';
import DataTable from '../components/data/DataTable';
import FormBuilder from '../components/data/FormBuilder';
import { Button } from '@mui/material';
import { type DidYouKnow, type DidYouKnowInput } from '../types';
import { type FormFieldSchema } from '../components/data/FormBuilder';

const didYouKnowSchema: FormFieldSchema[] = [
  { name: 'fact', label: 'Fact', type: 'textarea', required: true },
  { name: 'source', label: 'Source', type: 'text' },
  { name: 'fitnessGoal', label: 'Fitness Goal', type: 'text' },
  { name: 'activityLevel', label: 'Activity Level', type: 'select', options: [
    { value: 'sedentary', label: 'Sedentary' },
    { value: 'moderate', label: 'Moderate' },
    { value: 'active', label: 'Active' },
  ]},
];

const DidYouKnowPage: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
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
    const {
      id,
      __typename,
      createdAt,
      updatedAt,
      weightRange,
      ageRange,
      ...rest
    } = data;
    return {
      ...rest,
      weightRange: weightRange
        ? { min: weightRange.min ?? undefined, max: weightRange.max ?? undefined }
        : undefined,
      ageRange: ageRange
        ? { min: ageRange.min ?? undefined, max: ageRange.max ?? undefined }
        : undefined,
    } as DidYouKnowInput;
  }

  const handleSubmit = async (formData: DidYouKnowInput) => {
    try {
      if (editData) {
        await updateDidYouKnow({ variables: { id: editData.id, input: formData } });
      } else {
        await createDidYouKnow({ variables: { input: formData } });
      }
      setOpenForm(false);
      setEditData(null);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: DidYouKnow) => {
    setEditData(row);
    setOpenForm(true);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Did You Know</h2>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Did You Know
        </Button>
      </div>
      <DataTable rows={data?.getDidYouKnow || []} columns={columns} />
      {openForm && (
        <FormBuilder
          schema={didYouKnowSchema}
          onSubmit={handleSubmit}
          defaultValues={editData ? didYouKnowToInput(editData) : {}}
        />
      )}
    </div>
  );
};

export default DidYouKnowPage;