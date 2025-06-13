import React, { useState } from 'react';
import {
  useGetRecommendationsQuery,
  useCreateRecommendationMutation,
  useUpdateRecommendationMutation,
  useDeleteRecommendationMutation,
  GetRecommendationsDocument,
} from '../generated/graphql';
import { Button, Tabs, Tab, IconButton, Tooltip } from '@mui/material';
import { Add, ListAlt, AutoAwesome } from '@mui/icons-material';
import { type Recommendation, type RecommendationInput } from '../types';
import RecommendationFormBuilder from '../components/data/RecommendationFormBuilder';
import RecommendationTable from '../components/data/RecommendationTable';

interface RecommendationsProps {
  theme: 'light' | 'dark';
}

// const recommendationSchema: FormFieldSchema[] = [
//   { name: 'category', label: 'Category', type: 'select', options: [
//     { value: 'workout', label: 'Workout' },
//     { value: 'nutrition', label: 'Nutrition' },
//     { value: 'hydration', label: 'Hydration' },
//     { value: 'rest', label: 'Rest' },
//   ], required: true },
//   { name: 'title', label: 'Title', type: 'text', required: true },
//   { name: 'description', label: 'Description', type: 'textarea', required: true },
//   { name: 'image', label: 'Image URL', type: 'text' },
//   { name: 'calories', label: 'Calories', type: 'number' },
//   { name: 'fitnessGoal', label: 'Fitness Goal', type: 'select', options: [
//     { value: 'Lose Weight', label: 'Lose Weight' },
//     { value: 'Gain Muscle', label: 'Gain Muscle' },
//     { value: 'Maintain Health', label: 'Maintain Health' },
//   ]},
//   { name: 'activityLevel', label: 'Activity Level', type: 'select', options: [
//     { value: 'Sedentary', label: 'Sedentary' },
//     { value: 'Moderate', label: 'Moderate' },
//     { value: 'Active', label: 'Active' },
//   ]},
//   { name: 'dietaryPreference', label: 'Dietary Preference', type: 'select', options: [
//     { value: 'None', label: 'None' },
//     { value: 'Vegan', label: 'Vegan' },
//     { value: 'Vegetarian', label: 'Vegetarian' },
//     { value: 'Gluten-Free', label: 'Gluten-Free' },
//     { value: 'Keto', label: 'Keto' },
//     { value: 'Paleo', label: 'Paleo' },
//   ]},
//   // ...add more fields as needed, including multiselects for healthConditions, preferredWorkoutTypes, dietaryRestrictions, etc.
// ];

const Recommendations: React.FC<RecommendationsProps> = ({ theme }) => {
  const [tab, setTab] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<Recommendation | null>(null);

  const { data, loading, error } = useGetRecommendationsQuery();
  const [createRecommendation] = useCreateRecommendationMutation({ refetchQueries: [{ query: GetRecommendationsDocument }] });
  const [updateRecommendation] = useUpdateRecommendationMutation({ refetchQueries: [{ query: GetRecommendationsDocument }] });
  const [deleteRecommendation] = useDeleteRecommendationMutation({ refetchQueries: [{ query: GetRecommendationsDocument }] });

  function recommendationToInput(data: Recommendation): RecommendationInput {
  const {
    id, __typename, createdAt, updatedAt, steps, articles, macros, weightRange, ageRange,
    healthConditions, preferredWorkoutTypes, dietaryRestrictions,
    reminders, tips,
    ...rest
  } = data;
  return {
    ...rest,
    steps: steps?.map((step, idx) => ({
      id: (step as any).id ?? `step-${idx}`,
      title: step.title,
      description: step.description,
      content: (step as any).content ?? step.description ?? '', // fallback to description if no content
      image: step.image ?? undefined,
      duration: step.duration !== undefined && step.duration !== null && step.duration !== ''
        ? Number(step.duration)
        : undefined,
      illustration: (step as any).illustration ?? undefined,
      videoUrl: (step as any).videoUrl ?? undefined,
    })) || [],
    articles: articles?.map(article => article && ({
      title: article.title,
      url: article.url,
    })) || [],
    macros: macros
      ? {
          protein: macros.protein ?? undefined,
          carbs: macros.carbs ?? undefined,
          fat: macros.fat ?? undefined,
        }
      : { protein: 0, carbs: 0, fat: 0 },
    weightRange: weightRange
      ? { min: weightRange.min ?? undefined, max: weightRange.max ?? undefined }
      : undefined,
    ageRange: ageRange
      ? { min: ageRange.min ?? undefined, max: ageRange.max ?? undefined }
      : undefined,
    healthConditions: healthConditions ?? [],
    preferredWorkoutTypes: preferredWorkoutTypes ?? [],
    dietaryRestrictions: dietaryRestrictions ?? [],
    reminders: reminders ?? [],
    tips: tips ?? [],
  };
  }

  const handleGeminiGenerate = async () => {
    // In production, call your Gemini API here
    alert('Gemini AI generation coming soon!');
  };

  const handleSubmit = async (formData: RecommendationInput) => {
    try {
      if (editData) {
        await updateRecommendation({ variables: { id: editData.id, input: formData } });
      } else {
        await createRecommendation({ variables: { input: formData } });
      }
      setOpenForm(false);
      setEditData(null);
      setTab(0);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: Recommendation) => {
    setEditData(row);
    setOpenForm(true);
    setTab(1);
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-1">Recommendations</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage and generate personalized recommendations for your users.</p>
        </div>
        <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        className="rounded-lg"
        TabIndicatorProps={{
          style: {
            background: tab === 0 ? '#6366f1' : '#22c55e', // Indigo for List, Green for Create/Edit
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
              New Recommendation
            </Button>
          </div>
          <RecommendationTable rows={data?.getRecommendations || []} columns={columns} loading={loading} theme={theme} />
        </div>
      )}

      {tab === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <RecommendationFormBuilder
            initialValues={editData ? recommendationToInput(editData) : {}}
            onSubmit={handleSubmit}
            onCancel={() => { setOpenForm(false); setEditData(null); setTab(0); }}
            onGeminiGenerate={handleGeminiGenerate}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

export default Recommendations;