import React, { useState } from 'react';
import { Button, Box, Divider } from '@mui/material';
import { type DidYouKnowInput } from '../../types';
import DidYouKnowFormField from '../common/DidYouKnowFormField';

interface DidYouKnowFormBuilderProps {
  initialValues?: Partial<DidYouKnowInput>;
  onSubmit: (data: DidYouKnowInput) => void;
  onCancel?: () => void;
  theme: 'light' | 'dark';
}

const DidYouKnowFormBuilder: React.FC<DidYouKnowFormBuilderProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  theme,
}) => {
  const [form, setForm] = useState<DidYouKnowInput>({
    ...initialValues,
    healthConditions: initialValues.healthConditions ?? [],
    dietaryRestrictions: initialValues.dietaryRestrictions ?? [],
    preferredWorkoutTypes: initialValues.preferredWorkoutTypes ?? [],
  });

  const handleChange = (field: keyof DidYouKnowInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DidYouKnowFormField
          label="Fact"
          type="textarea"
          value={form.fact}
          onChange={v => handleChange('fact', v)}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Source"
          type="text"
          value={form.source}
          onChange={v => handleChange('source', v)}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Image URL"
          type="text"
          value={form.image}
          onChange={v => handleChange('image', v)}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Link"
          type="text"
          value={form.link}
          onChange={v => handleChange('link', v)}
          theme={theme}
        />
      </Box>

      <Divider className="!my-4" />

      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DidYouKnowFormField
          label="Fitness Goal"
          type="select"
          value={form.fitnessGoal}
          onChange={v => handleChange('fitnessGoal', v)}
          options={[
            { value: 'Lose Weight', label: 'Lose Weight' },
            { value: 'Gain Muscle', label: 'Gain Muscle' },
            { value: 'Maintain Health', label: 'Maintain Health' },
          ]}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Gender"
          type="select"
          value={form.gender}
          onChange={v => handleChange('gender', v)}
          options={[
            { value: 'Male', label: 'Male' },
            { value: 'Female', label: 'Female' },
            { value: 'Both', label: 'Both' },
          ]}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Activity Level"
          type="select"
          value={form.activityLevel}
          onChange={v => handleChange('activityLevel', v)}
          options={[
            { value: 'Sedentary', label: 'Sedentary' },
            { value: 'Moderate', label: 'Moderate' },
            { value: 'Active', label: 'Active' },
          ]}
          theme={theme}
        />
      </Box>

      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DidYouKnowFormField
          label="Dietary Preference"
          type="select"
          value={form.dietaryPreference}
          onChange={v => handleChange('dietaryPreference', v)}
          options={[
            { value: 'None', label: 'None' },
            { value: 'Vegan', label: 'Vegan' },
            { value: 'Vegetarian', label: 'Vegetarian' },
            { value: 'Gluten-Free', label: 'Gluten-Free' },
            { value: 'Keto', label: 'Keto' },
            { value: 'Paleo', label: 'Paleo' },
          ]}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Health Conditions"
          type="multiselect"
          value={form.healthConditions}
          onChange={v => handleChange('healthConditions', v)}
          options={[
            { value: 'Diabetes', label: 'Diabetes' },
            { value: 'Hypertension', label: 'Hypertension' },
            { value: 'Heart Condition', label: 'Heart Condition' },
            { value: 'Knee Injury', label: 'Knee Injury' },
            { value: 'Back Pain', label: 'Back Pain' },
            { value: 'Asthma', label: 'Asthma' },
          ]}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Dietary Restrictions"
          type="multiselect"
          value={form.dietaryRestrictions}
          onChange={v => handleChange('dietaryRestrictions', v)}
          options={[
            { value: 'Peanuts', label: 'Peanuts' },
            { value: 'Dairy', label: 'Dairy' },
            { value: 'Gluten', label: 'Gluten' },
            { value: 'Shellfish', label: 'Shellfish' },
            { value: 'Soy', label: 'Soy' },
          ]}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Preferred Workout Types"
          type="multiselect"
          value={form.preferredWorkoutTypes}
          onChange={v => handleChange('preferredWorkoutTypes', v)}
          options={[
            { value: 'Strength', label: 'Strength' },
            { value: 'Cardio', label: 'Cardio' },
            { value: 'Yoga', label: 'Yoga' },
            { value: 'HIIT', label: 'HIIT' },
            { value: 'Pilates', label: 'Pilates' },
          ]}
          theme={theme}
        />
      </Box>

      <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DidYouKnowFormField
          label="Age Min"
          type="number"
          value={form.ageRange?.min}
          onChange={v => handleChange('ageRange', { ...form.ageRange, min: Number(v) })}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Age Max"
          type="number"
          value={form.ageRange?.max}
          onChange={v => handleChange('ageRange', { ...form.ageRange, max: Number(v) })}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Weight Min"
          type="number"
          value={form.weightRange?.min}
          onChange={v => handleChange('weightRange', { ...form.weightRange, min: Number(v) })}
          theme={theme}
        />
        <DidYouKnowFormField
          label="Weight Max"
          type="number"
          value={form.weightRange?.max}
          onChange={v => handleChange('weightRange', { ...form.weightRange, max: Number(v) })}
          theme={theme}
        />
      </Box>

      <Box className="flex justify-end gap-2">
        <Button variant="contained" color="primary" type="submit">Save</Button>
        {onCancel && (
          <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
        )}
      </Box>
    </form>
  );
};

export default DidYouKnowFormBuilder;