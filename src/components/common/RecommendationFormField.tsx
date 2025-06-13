import React from 'react';
import { TextField, MenuItem, IconButton, Chip, Box, Button } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

export interface RecommendationFormFieldProps {
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea';
  value: any;
  onChange: (value: any) => void;
  options?: { value: string; label: string }[];
  error?: string;
  multilineRows?: number;
  children?: React.ReactNode;
  theme: 'light' | 'dark';
}

const RecommendationFormField: React.FC<RecommendationFormFieldProps> = ({
  label,
  type,
  value,
  onChange,
  options,
  error,
  multilineRows = 4,
  children,
  theme,
}) => {
  switch (type) {
    case 'select':
      return (
        <TextField
          select
          label={label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
          className="bg-white dark:bg-gray-900 transition-colors"
          InputLabelProps={{
            style: { color: theme === 'dark' ? '#cbd5e1' : '#334155' }
          }}
          InputProps={{
            style: {
              background: theme === 'dark' ? '#1e293b' : '#fff',
              color: theme === 'dark' ? '#fff' : '#1e293b',
              borderRadius: 8,
            }
          }}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'multiselect':
      return (
        <TextField
          select
          label={label}
          value={value || []}
          onChange={(e) => onChange(e.target.value)}
          SelectProps={{
            multiple: true,
            renderValue: (selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {(selected as string[]).map((val) => (
                  <Chip key={val} label={options?.find((o) => o.value === val)?.label || val} />
                ))}
              </Box>
            ),
          }}
          error={!!error}
          helperText={error}
          fullWidth
          className="bg-white dark:bg-gray-900 transition-colors"
          InputLabelProps={{
            style: { color: theme === 'dark' ? '#cbd5e1' : '#334155' }
          }}
          InputProps={{
            style: {
              background: theme === 'dark' ? '#1e293b' : '#fff',
              color: theme === 'dark' ? '#fff' : '#1e293b',
              borderRadius: 8,
            }
          }}
        >
          {options?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      );
    case 'textarea':
      return (
        <TextField
          label={label}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          multiline
          rows={multilineRows}
          error={!!error}
          helperText={error}
          fullWidth
          className="bg-white dark:bg-gray-900 transition-colors"
          InputLabelProps={{
            style: { color: theme === 'dark' ? '#cbd5e1' : '#334155' }
          }}
          InputProps={{
            style: {
              background: theme === 'dark' ? '#1e293b' : '#fff',
              color: theme === 'dark' ? '#fff' : '#1e293b',
              borderRadius: 8,
            }
          }}
        />
      );
    default:
      return (
        <TextField
          label={label}
          type={type}
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          error={!!error}
          helperText={error}
          fullWidth
          className="bg-white dark:bg-gray-900 transition-colors"
          InputLabelProps={{
            style: { color: theme === 'dark' ? '#cbd5e1' : '#334155' }
          }}
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
};

export default RecommendationFormField;