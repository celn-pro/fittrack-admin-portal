import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, Chip, Box } from '@mui/material';
import { useGemini } from '../../hooks/useGemini';
import FormField from '../common/FormField';
import { type RecommendationInput, type HealthTipInput, type DidYouKnowInput, type CourseInput, type FeedPostInput } from '../../types';

type AllInputKeys =
  | keyof RecommendationInput
  | keyof HealthTipInput
  | keyof DidYouKnowInput
  | keyof CourseInput
  | keyof FeedPostInput;

export interface FormFieldSchema {
  name: AllInputKeys;
  label: string;
  type: 'text' | 'number' | 'select' | 'multiselect' | 'textarea';
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface FormBuilderProps<T> {
  schema: FormFieldSchema[];
  onSubmit: (data: T) => void;
  defaultValues?: any;
}

function FormBuilder<T = any>({ schema, onSubmit, defaultValues }: FormBuilderProps<T>) {
  const { control, handleSubmit, setValue } = useForm({ defaultValues });
  const { generateContent } = useGemini();
  const [loading, setLoading] = useState(false);

  const handleGenerateContent = async (fieldName: string) => {
    setLoading(true);
    try {
      const prompt = `Generate a ${fieldName} for a health and fitness admin portal based on user profile: age 20-40, fitness goal: weight loss, activity level: moderate`;
      const content = await generateContent(prompt);
      setValue(fieldName as any, content);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {schema.map((field) => (
        <Box key={field.name} className="flex items-end gap-2">
          <Controller
            name={field.name}
            control={control}
            rules={{ required: field.required ? `${field.label} is required` : false }}
            render={({ field: formField, fieldState }) => (
              <FormField
                label={field.label}
                type={field.type}
                options={field.options}
                error={fieldState.error?.message}
                {...formField}
              />
            )}
          />
          {['title', 'description', 'content', 'fact'].includes(field.name as string) && (
            <Button
              variant="outlined"
              onClick={() => handleGenerateContent(field.name as string)}
              disabled={loading}
            >
              Generate
            </Button>
          )}
        </Box>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default FormBuilder;