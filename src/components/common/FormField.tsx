import React from 'react';
import { TextField, Select, MenuItem, Chip, Box } from '@mui/material';

interface FormFieldProps {
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea';
  value: any;
  onChange: (value: any) => void;
  options?: { value: string; label: string }[];
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, type, value, onChange, options, error }) => {
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
          SelectProps={{ multiple: true, renderValue: (selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((val) => (
                <Chip key={val} label={options?.find((o) => o.value === val)?.label} />
              ))}
            </Box>
          )}}
          error={!!error}
          helperText={error}
          fullWidth
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
          rows={4}
          error={!!error}
          helperText={error}
          fullWidth
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
        />
      );
  }
};

export default FormField;