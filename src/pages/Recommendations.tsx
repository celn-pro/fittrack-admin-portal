import React, { useState } from 'react';
import {
  useGetRecommendationsQuery,
  useCreateRecommendationMutation,
  useUpdateRecommendationMutation,
  useDeleteRecommendationMutation,
} from '../generated/graphql';
import { GetRecommendationsDocument } from '../generated/graphql';
import DataTable from '../components/data/DataTable';
import FormBuilder from '../components/data/FormBuilder';
import { Button } from '@mui/material';
import { type Recommendation, type RecommendationInput } from '../types';

interface FormFieldSchema {
  name: keyof RecommendationInput;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea';
  options?: { value: string; label: string }[];
  required?: boolean;
}

const recommendationSchema: FormFieldSchema[] = [
  { name: 'category', label: 'Category', type: 'select', options: [{ value: 'nutrition', label: 'Nutrition' }, { value: 'exercise', label: 'Exercise' }], required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'calories', label: 'Calories', type: 'number' },
];

const Recommendations: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Recommendation | null>(null);

  const { data, loading, error } = useGetRecommendationsQuery();
  const [createRecommendation] = useCreateRecommendationMutation({
    refetchQueries: [{ query: GetRecommendationsDocument }],
  });
  const [updateRecommendation] = useUpdateRecommendationMutation({
    refetchQueries: [{ query: GetRecommendationsDocument }],
  });
  const [deleteRecommendation] = useDeleteRecommendationMutation({
    refetchQueries: [{ query: GetRecommendationsDocument }],
  });

 function recommendationToInput(data: Recommendation): RecommendationInput {
    const {
      id,
      __typename,
      createdAt,
      updatedAt,
      steps,
      articles,
      macros,
      weightRange,
      ageRange,
      ...rest
    } = data;

    return {
      ...rest,
      steps: steps?.map(step => {
        if (!step) return null;
        return {
          id: (step as any).id ?? '', // fallback to empty string if not present
          title: step.title,
          description: step.description,
          content: (step as any).content ?? '', // fallback to empty string if not present
          image: step.image ?? undefined,
          duration: step.duration ?? undefined,
          illustration: (step as any).illustration ?? undefined,
          videoUrl: (step as any).videoUrl ?? undefined,
        };
      }),
      articles: articles?.map(article => article && {
        title: article.title,
        url: article.url,
      }),
      macros: macros
        ? {
            protein: macros.protein ?? undefined,
            carbs: macros.carbs ?? undefined,
            fat: macros.fat ?? undefined,
          }
        : undefined,
      weightRange: weightRange
        ? { min: weightRange.min ?? undefined, max: weightRange.max ?? undefined }
        : undefined,
      ageRange: ageRange
        ? { min: ageRange.min ?? undefined, max: ageRange.max ?? undefined }
        : undefined,
    };
  }

  const handleSubmit = async (formData: RecommendationInput) => {
    try {
      if (editData) {
        await updateRecommendation({ variables: { id: editData.id, input: formData } });
      } else {
        await createRecommendation({ variables: { input: formData } });
      }
      setOpenForm(false);
      setEditData(null);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: Recommendation) => {
    setEditData(row);
    setOpenForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteRecommendation({ variables: { id } });
    } catch (err) {
      console.error('Error deleting recommendation:', err);
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'calories', headerName: 'Calories', width: 100 },
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
        <h2 className="text-2xl font-bold">Recommendations</h2>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Recommendation
        </Button>
      </div>
      <DataTable rows={data?.getRecommendations || []} columns={columns} />
      {openForm && (
        <FormBuilder
          schema={recommendationSchema}
          onSubmit={handleSubmit}
          defaultValues={editData ? recommendationToInput(editData) : {}}
        />
      )}
    </div>
  );
};

export default Recommendations;