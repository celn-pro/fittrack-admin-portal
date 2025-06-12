import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link as MuiLink } from '@mui/material';
import { useLoginUserMutation } from '../../generated/graphql';
import { login } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    defaultValues: { email: '', password: '' },
  });
  const [loginUser, { loading, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser({ variables: { email: data.email, password: data.password } });
      if (response.data?.loginUser) {
        login(
          response.data.loginUser.token,
          {
            ...response.data.loginUser.user,
            fitnessGoal: response.data.loginUser.user.fitnessGoal ?? undefined,
          }
        );
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <Typography variant="h5" className="text-center">Admin Login</Typography>
      <Controller
        name="email"
        control={control}
        rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } }}
        render={({ field, fieldState }) => (
          <TextField
            label="Email"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
        render={({ field, fieldState }) => (
          <TextField
            label="Password"
            type="password"
            fullWidth
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            {...field}
          />
        )}
      />
      {error && <Typography color="error">{error.message}</Typography>}
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      <Typography className="text-center">
        Don't have an account? <MuiLink component={Link} to="/register">Register</MuiLink>
      </Typography>
    </Box>
  );
};

export default LoginForm;