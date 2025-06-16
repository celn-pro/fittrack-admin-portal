import React from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';
import { useGetRecommendationsQuery, useGetHealthTipsQuery, useGetCoursesQuery, useGetSocialFeedQuery, useGetDidYouKnowQuery } from '../generated/graphql';
import { CircularProgress, Box, Typography, useTheme, Paper, List, ListItem, ListItemText } from '@mui/material';

const Dashboard: React.FC = () => {
  // Fetch all counts
  const { data: recData, loading: recLoading } = useGetRecommendationsQuery();
  const { data: tipData, loading: tipLoading } = useGetHealthTipsQuery();
  const { data: courseData, loading: courseLoading } = useGetCoursesQuery();
  const { data: feedData, loading: feedLoading } = useGetSocialFeedQuery();
  const { data: didData, loading: didLoading } = useGetDidYouKnowQuery();

  const theme = useTheme();

  const stats = [
    { title: 'Recommendations', value: recData?.getRecommendations.length ?? 0, color: theme.palette.mode === 'dark' ? 'bg-indigo-600' : 'bg-indigo-500' },
    { title: 'Health Tips', value: tipData?.getHealthTips.length ?? 0, color: theme.palette.mode === 'dark' ? 'bg-green-700' : 'bg-green-500' },
    { title: 'Courses', value: courseData?.getCourses.length ?? 0, color: theme.palette.mode === 'dark' ? 'bg-amber-700' : 'bg-amber-500' },
    { title: 'Social Posts', value: feedData?.getSocialFeed.length ?? 0, color: theme.palette.mode === 'dark' ? 'bg-blue-700' : 'bg-blue-500' },
    { title: 'Did You Know', value: didData?.getDidYouKnow.length ?? 0, color: theme.palette.mode === 'dark' ? 'bg-pink-700' : 'bg-pink-500' },
  ];

  const loading = recLoading || tipLoading || courseLoading || feedLoading || didLoading;

  // Recent activity (last 5 posts/tips/recommendations)
  const recentRecommendations = recData?.getRecommendations.slice(0, 5) ?? [];
  const recentTips = tipData?.getHealthTips.slice(0, 5) ?? [];
  const recentPosts = feedData?.getSocialFeed.slice(0, 5) ?? [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Dashboard</h2>
      {loading ? (
        <Box className="flex justify-center items-center h-40">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {stats.map((stat) => (
              <DashboardCard key={stat.title} title={stat.title} value={stat.value} color={stat.color} />
            ))}
          </div>

          {/* Simple Activity Chart (just a bar for each type, for demo) */}
          <Paper className="p-6 mb-8 dark:bg-gray-800 bg-white shadow rounded-lg">
            <Typography variant="h6" className="mb-4 text-gray-900 dark:text-gray-100">Content Distribution</Typography>
            <Box className="flex gap-6 items-end h-32">
              {stats.map((stat) => (
                <Box key={stat.title} className="flex flex-col items-center flex-1">
                  <Box
                    sx={{
                      height: `${Math.max(stat.value, 1) * 2.5}px`,
                      minHeight: '12px',
                      width: '32px',
                      borderRadius: '8px',
                      background: `var(--tw-${stat.color})`,
                      backgroundColor: stat.color.replace('bg-', '').replace('-600', ''),
                      transition: 'height 0.3s',
                    }}
                    className={stat.color}
                  />
                  <Typography variant="caption" className="mt-2 text-gray-700 dark:text-gray-300">{stat.title}</Typography>
                  <Typography variant="body2" className="font-bold text-gray-900 dark:text-gray-100">{stat.value}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>

          {/* Recent Items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Paper className="p-4 dark:bg-gray-800 bg-white shadow rounded-lg">
              <Typography variant="subtitle1" className="mb-2 text-gray-900 dark:text-gray-100">Recent Recommendations</Typography>
              <List dense>
                {recentRecommendations.length === 0 && <ListItem><ListItemText primary="No data" /></ListItem>}
                {recentRecommendations.map(r => (
                  <ListItem key={r.id}>
                    <ListItemText primary={r.title} secondary={r.category} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Paper className="p-4 dark:bg-gray-800 bg-white shadow rounded-lg">
              <Typography variant="subtitle1" className="mb-2 text-gray-900 dark:text-gray-100">Recent Health Tips</Typography>
              <List dense>
                {recentTips.length === 0 && <ListItem><ListItemText primary="No data" /></ListItem>}
                {recentTips.map(t => (
                  <ListItem key={t.id}>
                    <ListItemText primary={t.title} secondary={t.category} />
                  </ListItem>
                ))}
              </List>
            </Paper>
            <Paper className="p-4 dark:bg-gray-800 bg-white shadow rounded-lg">
              <Typography variant="subtitle1" className="mb-2 text-gray-900 dark:text-gray-100">Recent Social Posts</Typography>
              <List dense>
                {recentPosts.length === 0 && <ListItem><ListItemText primary="No data" /></ListItem>}
                {recentPosts.map(p => (
                  <ListItem key={p.id}>
                    <ListItemText
                      primary={p.content.length > 40 ? p.content.slice(0, 40) + '...' : p.content}
                      secondary={p.user?.name}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;