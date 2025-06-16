import React, { useState } from 'react';
import {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  GetCoursesDocument,
} from '../generated/graphql';
import { Button, Tabs, Tab } from '@mui/material';
import { Add, ListAlt } from '@mui/icons-material';
import { type Course, type CourseInput } from '../types';
import CourseFormBuilder from '../components/data/CourseFormBuilder';
import CourseTable from '../components/data/CourseTable';

const Courses: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [tab, setTab] = useState(0);
  const [editData, setEditData] = useState<Course | null>(null);

  const { data, loading, error } = useGetCoursesQuery();
  const [createCourse] = useCreateCourseMutation({
    refetchQueries: [{ query: GetCoursesDocument }],
  });
  const [updateCourse] = useUpdateCourseMutation({
    refetchQueries: [{ query: GetCoursesDocument }],
  });
  const [deleteCourse] = useDeleteCourseMutation({
    refetchQueries: [{ query: GetCoursesDocument }],
  });

  function courseToInput(data: Course): CourseInput {
    const {
      id, __typename, createdAt, updatedAt, topics, weightRange, ageRange, ...rest
    } = data;
    return {
      ...rest,
      topics: topics?.map(topic => ({
        id: topic.id,
        title: topic.title,
        description: topic.description,
        steps: topic.steps?.map(step => ({
          id: step.id,
          title: step.title,
          content: step.content,
          illustration: step.illustration ?? undefined,
          videoUrl: step.videoUrl ?? undefined,
        })),
      })),
      weightRange: weightRange
        ? { min: weightRange.min ?? undefined, max: weightRange.max ?? undefined }
        : undefined,
      ageRange: ageRange
        ? { min: ageRange.min ?? undefined, max: ageRange.max ?? undefined }
        : undefined,
    } as CourseInput;
  }

  const handleSubmit = async (formData: CourseInput) => {
    try {
      if (editData) {
        await updateCourse({ variables: { id: editData.id, input: formData } });
      } else {
        await createCourse({ variables: { input: formData } });
      }
      setEditData(null);
      setTab(0);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: Course) => {
    setEditData(row);
    setTab(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCourse({ variables: { id } });
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'goal', headerName: 'Goal', width: 150 },
    { field: 'level', headerName: 'Level', width: 150 },
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
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Courses</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Manage and create courses for your users.</p>
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
              New Course
            </Button>
          </div>
          <CourseTable
            rows={data?.getCourses || []}
            columns={columns}
            loading={loading}
            theme={theme}
          />
        </div>
      )}

      {tab === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <CourseFormBuilder
            initialValues={editData ? courseToInput(editData) : {}}
            onSubmit={handleSubmit}
            onCancel={() => setTab(0)}
            theme={theme}
          />
        </div>
      )}
    </div>
  );
};

export default Courses;