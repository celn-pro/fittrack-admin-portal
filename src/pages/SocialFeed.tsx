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
import { Button, Tabs, Tab, TextField, Box } from '@mui/material';
import { Add, ListAlt } from '@mui/icons-material';
import { type FeedPost, type FeedPostInput } from '../types';
import FeedPostFormBuilder from '../components/data/FeedPostFormBuilder';
import FeedPostTable from '../components/data/FeedPostTable';

const SocialFeed: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) => {
  const [tab, setTab] = useState(0);
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
      setEditData(null);
      setTab(0);
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleEdit = (row: FeedPost) => {
    setEditData(row);
    setTab(1);
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">Social Feed</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Share and manage user posts.</p>
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
              New Feed Post
            </Button>
          </div>
          <FeedPostTable
            rows={data?.getSocialFeed || []}
            columns={columns}
            loading={loading}
            theme={theme}
          />
        </div>
      )}

      {tab === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors">
          <FeedPostFormBuilder
            initialValues={editData ? feedPostToInput(editData) : {}}
            onSubmit={handleSubmit}
            onCancel={() => setTab(0)}
            theme={theme}
          />
        </div>
      )}

      {/* Comment dialog */}
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