import React, { useState } from 'react';
import {
  useGetSocialFeedQuery,
  useCreateFeedPostMutation,
  useUpdateFeedPostMutation,
  useDeleteFeedPostMutation,
  useLikeFeedPostMutation,
  useCommentFeedPostMutation,
  GetSocialFeedDocument,
} from '../generated/graphql';
import DataTable from '../components/data/DataTable';
import FormBuilder from '../components/data/FormBuilder';
import { Button, TextField, Box } from '@mui/material';
import { type FeedPost, type FeedPostInput } from '../types';
import { type FormFieldSchema } from '../components/data/FormBuilder';

const feedPostSchema: FormFieldSchema[] = [
  { name: 'content', label: 'Content', type: 'textarea', required: true },
  { name: 'activityType', label: 'Activity Type', type: 'select', options: [
    { value: 'workout', label: 'Workout' },
    { value: 'meal', label: 'Meal' },
    { value: 'progress', label: 'Progress' },
  ]},
  { name: 'activityValue', label: 'Activity Value', type: 'text' },
];

const SocialFeed: React.FC = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState<FeedPost | null>(null);
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const { data, loading, error } = useGetSocialFeedQuery();
  const [createFeedPost] = useCreateFeedPostMutation({
    refetchQueries: [{ query: GetSocialFeedDocument }],
  });
  const [updateFeedPost] = useUpdateFeedPostMutation({
    refetchQueries: [{ query: GetSocialFeedDocument }],
  });
  const [deleteFeedPost] = useDeleteFeedPostMutation({
    refetchQueries: [{ query: GetSocialFeedDocument }],
  });
  const [likeFeedPost] = useLikeFeedPostMutation({
    refetchQueries: [{ query: GetSocialFeedDocument }],
  });
  const [commentFeedPost] = useCommentFeedPostMutation({
    refetchQueries: [{ query: GetSocialFeedDocument }],
  });

  function feedPostToInput(data: FeedPost): FeedPostInput {
    const {
      id,
      __typename,
      createdAt,
      user,
      likes,
      likedByCurrentUser,
      comments,
      ...rest
    } = data;
    return {
      ...rest,
    } as FeedPostInput;
  }

  const handleSubmit = async (formData: FeedPostInput) => {
    try {
      if (editData) {
        await updateFeedPost({ variables: { id: editData.id, input: formData } });
      } else {
        await createFeedPost({ variables: { input: formData } });
      }
      setOpenForm(false);
      setEditData(null);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: FeedPost) => {
    setEditData(row);
    setOpenForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFeedPost({ variables: { id } });
    } catch (err) {
      console.error('Error deleting feed post:', err);
    }
  };

  const handleLike = async (id: string) => {
    try {
      await likeFeedPost({ variables: { id } });
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (id: string) => {
    try {
      await commentFeedPost({ variables: { id, comment } });
      setComment('');
      setCommentPostId(null);
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const columns = [
    { field: 'content', headerName: 'Content', width: 300 },
    { field: 'activityType', headerName: 'Activity Type', width: 150 },
    { field: 'likes', headerName: 'Likes', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params: any) => (
        <>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)} color="error">Delete</Button>
          <Button onClick={() => handleLike(params.row.id)}>
            {params.row.likedByCurrentUser ? 'Unlike' : 'Like'}
          </Button>
          <Button onClick={() => setCommentPostId(params.row.id)}>Comment</Button>
        </>
      ),
    },
  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Social Feed</h2>
        <Button variant="contained" onClick={() => setOpenForm(true)}>
          Add Feed Post
        </Button>
      </div>
      <DataTable rows={data?.getSocialFeed || []} columns={columns} />
      {openForm && (
        <FormBuilder
          schema={feedPostSchema}
          onSubmit={handleSubmit}
          defaultValues={editData ? feedPostToInput(editData) : {}}
        />
      )}
      {commentPostId && (
        <Box mt={4}>
          <TextField
            label="Add Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            multiline
          />
          <Box mt={2}>
            <Button
              variant="contained"
              onClick={() => handleComment(commentPostId)}
              disabled={!comment}
            >
              Submit Comment
            </Button>
            <Button onClick={() => setCommentPostId(null)} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default SocialFeed;