import React, { useState } from 'react';
import {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  GetCoursesDocument,
} from '../generated/graphql';
import DataTable from '../components/data/DataTable';
import FormBuilder from '../components/data/FormBuilder';
import { Button } from '@mui/material';
import { type Course, type CourseInput } from '../types';
import { type FormFieldSchema } from '../components/data/FormBuilder';

const courseSchema: FormFieldSchema[] = [
  { name: 'goal', label: 'Goal', type: 'text', required: true },
  { name: 'title', label: 'Title', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
  { name: 'level', label: 'Level', type: 'select', options: [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ], required: true },
];

const Courses: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
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
      id,
      __typename,
      createdAt,
      updatedAt,
      topics,
      weightRange,
      ageRange,
      ...rest
    } = data;
    return {
      ...rest,
      topics: topics?.map(topic => topic && {
        id: topic.id,
        title: topic.title,
        description: topic.description,
        steps: topic.steps?.map(step => step && {
          id: step.id,
          title: step.title,
          content: step.content,
          illustration: step.illustration ?? undefined,
          videoUrl: step.videoUrl ?? undefined,
        }),
      }),
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
      setOpenForm(false);
      setEditData(null);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: Course) => {
    setEditData(row);
    setOpenForm(true);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Course
        </Button>
      </div>
      <DataTable rows={data?.getCourses || []} columns={columns} />
      {openForm && (
        <FormBuilder
          schema={courseSchema}
          onSubmit={handleSubmit}
          defaultValues={editData ? courseToInput(editData) : {}}
        />
      )}
    </div>
  );
};

export default Courses;