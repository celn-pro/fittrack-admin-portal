import React from 'react';
import { TextField, MenuItem } from '@mui/material';

interface FeedPostFormFieldProps {
  label: string;
  type: 'text' | 'textarea' | 'select';
  value: any;
  onChange: (value: any) => void;
  options?: { value: string; label: string }[];
  error?: string;
  theme: 'light' | 'dark';
}

const FeedPostFormField: React.FC<FeedPostFormFieldProps> = ({
  label, type, value, onChange, options, error, theme,
}) => {
  if (type === 'select') {
    return (
      <TextField
        select
        label={label}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        error={!!error}
        helperText={error}
        fullWidth
        InputLabelProps={{ style: { color: theme === 'dark' ? '#cbd5e1' : '#334155' } }}
        InputProps={{
          style: {
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#1e293b',
            borderRadius: 8,
          }
        }}
      >
        {options?.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>
    );
  }
  if (type === 'textarea') {
    return (
      <TextField
        label={label}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        multiline
        rows={4}
        error={!!error}
        helperText={error}
        fullWidth
        InputLabelProps={{ style: { color: theme === 'dark' ? '#cbd5e1' : '#334155' } }}
        InputProps={{
          style: {
            background: theme === 'dark' ? '#1e293b' : '#fff',
            color: theme === 'dark' ? '#fff' : '#1e293b',
            borderRadius: 8,
          }
        }}
      />
    );
  }
  return (
    <TextField
      label={label}
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      error={!!error}
      helperText={error}
      fullWidth
      InputLabelProps={{ style: { color: theme === 'dark' ? '#cbd5e1' : '#334155' } }}
      InputProps={{
        style: {
          background: theme === 'dark' ? '#1e293b' : '#fff',
          color: theme === 'dark' ? '#fff' : '#1e293b',
          borderRadius: 8,
        }
      }}
    />
  );
};

export default FeedPostFormField;