import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Link as MuiLink } from '@mui/material';
import { useRegisterUserMutation } from '../../generated/graphql';
import { login } from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>({
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });
  const [registerUser, { loading, error }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser({ variables: { email: data.email, password: data.password } });
      if (response.data?.registerUser) {
        login(response.data.registerUser.token, {
          ...response.data.registerUser.user,
          name: response.data.registerUser.user.email.split('@')[0], // Fallback name
          fitnessGoal: undefined,
          isProfileComplete: response.data.registerUser.user.isProfileComplete,
        });
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-md">
      <Typography variant="h5" className="text-center">Admin Registration</Typography>
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
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: 'Confirm password is required',
          validate: value => value === password || 'Passwords do not match',
        }}
        render={({ field, fieldState }) => (
          <TextField
            label="Confirm Password"
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
        {loading ? 'Registering...' : 'Register'}
      </Button>
      <Typography className="text-center">
        Already have an account? <MuiLink component={Link} to="/login">Login</MuiLink>
      </Typography>
    </Box>
  );
};

export default RegisterForm;