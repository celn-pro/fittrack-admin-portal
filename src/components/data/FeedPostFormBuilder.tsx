import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { type FeedPostInput } from '../../types';
import FeedPostFormField from '../common/FeedPostFormField';

interface FeedPostFormBuilderProps {
  initialValues?: Partial<FeedPostInput>;
  onSubmit: (data: FeedPostInput) => void;
  onCancel?: () => void;
  theme: 'light' | 'dark';
}

const FeedPostFormBuilder: React.FC<FeedPostFormBuilderProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  theme,
}) => {
  const [form, setForm] = useState<FeedPostInput>({
    ...initialValues,
  });

  const handleChange = (field: keyof FeedPostInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <FeedPostFormField
        label="Content"
        type="textarea"
        value={form.content}
        onChange={v => handleChange('content', v)}
        theme={theme}
      />
      <FeedPostFormField
        label="Image URL"
        type="text"
        value={form.image}
        onChange={v => handleChange('image', v)}
        theme={theme}
      />
      <FeedPostFormField
        label="Activity Type"
        type="select"
        value={form.activityType}
        onChange={v => handleChange('activityType', v)}
        options={[
          { value: 'workout', label: 'Workout' },
          { value: 'meal', label: 'Meal' },
          { value: 'progress', label: 'Progress' },
        ]}
        theme={theme}
      />
      <FeedPostFormField
        label="Activity Value"
        type="text"
        value={form.activityValue}
        onChange={v => handleChange('activityValue', v)}
        theme={theme}
      />
      <Box className="flex justify-end gap-2">
        <Button variant="contained" color="primary" type="submit">Save</Button>
        {onCancel && (
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        )}
      </Box>
    </form>
  );
};

export default FeedPostFormBuilder;