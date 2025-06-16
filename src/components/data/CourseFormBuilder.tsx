import React, { useState } from 'react';
import { Button, Box, Divider, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { type CourseInput } from '../../types';
import CourseFormField from '../common/CourseFormField';

interface CourseFormBuilderProps {
  initialValues?: Partial<CourseInput>;
  onSubmit: (data: CourseInput) => void;
  onCancel?: () => void;
  theme: 'light' | 'dark';
}

const defaultStep = { id: '', title: '', content: '', illustration: '', videoUrl: '' };
const defaultTopic = { id: '', title: '', description: '', steps: [defaultStep] };

const CourseFormBuilder: React.FC<CourseFormBuilderProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  theme,
}) => {
  const [form, setForm] = useState<CourseInput>({
    ...initialValues,
    topics: initialValues.topics || [defaultTopic],
    healthConditions: initialValues.healthConditions ?? [],
    dietaryRestrictions: initialValues.dietaryRestrictions ?? [],
    preferredWorkoutTypes: initialValues.preferredWorkoutTypes ?? [],
  });

  const handleChange = (field: keyof CourseInput, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // Topic and Step handlers
  const handleTopicChange = (idx: number, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      topics: prev.topics?.map((topic, i) =>
        i === idx ? { ...topic, [field]: value } : topic
      ),
    }));
  };

  const handleTopicAdd = () => {
    setForm(prev => ({
      ...prev,
      topics: [...(prev.topics || []), { ...defaultTopic }],
    }));
  };

  const handleTopicRemove = (idx: number) => {
    setForm(prev => ({
      ...prev,
      topics: prev.topics?.filter((_, i) => i !== idx),
    }));
  };

  const handleStepChange = (topicIdx: number, stepIdx: number, field: string, value: any) => {
    setForm(prev => ({
      ...prev,
      topics: prev.topics?.map((topic, i) =>
        i === topicIdx
          ? {
              ...topic,
              steps: topic.steps?.map((step, j) =>
                j === stepIdx ? { ...step, [field]: value } : step
              ),
            }
          : topic
      ),
    }));
  };

  const handleStepAdd = (topicIdx: number) => {
    setForm(prev => ({
      ...prev,
      topics: prev.topics?.map((topic, i) =>
        i === topicIdx
          ? { ...topic, steps: [...(topic.steps || []), { ...defaultStep }] }
          : topic
      ),
    }));
  };

  const handleStepRemove = (topicIdx: number, stepIdx: number) => {
    setForm(prev => ({
      ...prev,
      topics: prev.topics?.map((topic, i) =>
        i === topicIdx
          ? { ...topic, steps: topic.steps?.filter((_, j) => j !== stepIdx) }
          : topic
      ),
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CourseFormField
          label="Goal"
          type="select"
          value={form.goal}
          onChange={v => handleChange('goal', v)}
          options={[
            { value: 'Lose Weight', label: 'Lose Weight' },
            { value: 'Gain Muscle', label: 'Gain Muscle' },
            { value: 'Maintain Health', label: 'Maintain Health' },
          ]}
          theme={theme}
        />
        <CourseFormField
          label="Title"
          type="text"
          value={form.title}
          onChange={v => handleChange('title', v)}
          theme={theme}
        />
        <CourseFormField
          label="Level"
          type="select"
          value={form.level}
          onChange={v => handleChange('level', v)}
          options={[
            { value: 'Beginner', label: 'Beginner' },
            { value: 'Intermediate', label: 'Intermediate' },
            { value: 'Advanced', label: 'Advanced' },
          ]}
          theme={theme}
        />
        <CourseFormField
          label="Cover Image"
          type="text"
          value={form.coverImage}
          onChange={v => handleChange('coverImage', v)}
          theme={theme}
        />
      </Box>
      <CourseFormField
        label="Description"
        type="textarea"
        value={form.description}
        onChange={v => handleChange('description', v)}
        theme={theme}
      />

      <Divider className="!my-4" />

      {/* Topics and Steps */}
      <Box>
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800 dark:text-gray-200">Topics</span>
          <Button startIcon={<Add />} onClick={handleTopicAdd} variant="outlined" size="small">
            Add Topic
          </Button>
        </div>
        {form.topics?.map((topic, topicIdx) => (
          <Box key={topicIdx} className="border p-2 rounded mb-4 bg-gray-50 dark:bg-gray-900">
            <div className="flex gap-2 mb-2">
              <CourseFormField
                label="Title"
                type="text"
                value={topic.title}
                onChange={v => handleTopicChange(topicIdx, 'title', v)}
                theme={theme}
              />
              <CourseFormField
                label="Description"
                type="text"
                value={topic.description}
                onChange={v => handleTopicChange(topicIdx, 'description', v)}
                theme={theme}
              />
              <IconButton onClick={() => handleTopicRemove(topicIdx)} color="error"><Remove /></IconButton>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Steps</span>
              <Button startIcon={<Add />} onClick={() => handleStepAdd(topicIdx)} variant="outlined" size="small">
                Add Step
              </Button>
            </div>
            {topic.steps?.map((step, stepIdx) => (
              <Box key={stepIdx} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2 items-end">
                <CourseFormField
                  label="Title"
                  type="text"
                  value={step.title}
                  onChange={v => handleStepChange(topicIdx, stepIdx, 'title', v)}
                  theme={theme}
                />
                <CourseFormField
                  label="Content"
                  type="textarea"
                  value={step.content}
                  onChange={v => handleStepChange(topicIdx, stepIdx, 'content', v)}
                  theme={theme}
                />
                <CourseFormField
                  label="Illustration"
                  type="text"
                  value={step.illustration}
                  onChange={v => handleStepChange(topicIdx, stepIdx, 'illustration', v)}
                  theme={theme}
                />
                <CourseFormField
                  label="Video URL"
                  type="text"
                  value={step.videoUrl}
                  onChange={v => handleStepChange(topicIdx, stepIdx, 'videoUrl', v)}
                  theme={theme}
                />
                <IconButton onClick={() => handleStepRemove(topicIdx, stepIdx)} color="error"><Remove /></IconButton>
              </Box>
            ))}
          </Box>
        ))}
      </Box>

      <Divider className="!my-4" />

      {/* Filtering fields */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CourseFormField
          label="Fitness Goal"
          type="select"
          value={form.goal}
          onChange={v => handleChange('goal', v)}
          options={[
            { value: 'Lose Weight', label: 'Lose Weight' },
            { value: 'Gain Muscle', label: 'Gain Muscle' },
            { value: 'Maintain Health', label: 'Maintain Health' },
          ]}
          theme={theme}
        />
        <CourseFormField
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
        <CourseFormField
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
        <CourseFormField
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
        <CourseFormField
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
        <CourseFormField
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
        <CourseFormField
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
        <CourseFormField
          label="Age Min"
          type="number"
          value={form.ageRange?.min}
          onChange={v => handleChange('ageRange', { ...form.ageRange, min: Number(v) })}
          theme={theme}
        />
        <CourseFormField
          label="Age Max"
          type="number"
          value={form.ageRange?.max}
          onChange={v => handleChange('ageRange', { ...form.ageRange, max: Number(v) })}
          theme={theme}
        />
        <CourseFormField
          label="Weight Min"
          type="number"
          value={form.weightRange?.min}
          onChange={v => handleChange('weightRange', { ...form.weightRange, min: Number(v) })}
          theme={theme}
        />
        <CourseFormField
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

export default CourseFormBuilder;