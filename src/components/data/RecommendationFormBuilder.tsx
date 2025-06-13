import React, { useState } from 'react';
import { Button, Box, IconButton, Divider } from '@mui/material';
import { Add, Remove, AutoAwesome } from '@mui/icons-material';
import { type RecommendationInput } from '../../types';
import RecommendationFormField from '../common/RecommendationFormField';

interface RecommendationFormBuilderProps {
  initialValues?: Partial<RecommendationInput>;
  onSubmit: (data: RecommendationInput) => void;
  onCancel?: () => void;
  onGeminiGenerate?: (fields: Partial<RecommendationInput>) => void;
  theme: 'light' | 'dark';
}

const defaultStep = { id: '', title: '', description: '', content: '',  image: '', duration: undefined };
const defaultArticle = { title: '', url: '' };

const categoryFields: Record<string, Array<keyof RecommendationInput>> = {
  workout: [
    'title', 'description', 'image', 'steps', 'tips', 'articles', 'calories',
    'fitnessGoal', 'ageRange', 'gender', 'healthConditions', 'weightRange', 'activityLevel',
    'preferredWorkoutTypes', 'reminders'
  ],
  nutrition: [
    'title', 'description', 'image', 'tips', 'articles', 'macros', 'calories',
    'fitnessGoal', 'ageRange', 'gender', 'healthConditions', 'weightRange', 'activityLevel',
    'dietaryPreference', 'dietaryRestrictions', 'reminders'
  ],
  hydration: [
    'title', 'description', 'image', 'tips', 'articles', 'dailyGoalMl', 'reminders',
    'fitnessGoal', 'ageRange', 'gender', 'healthConditions', 'weightRange', 'activityLevel'
  ],
  rest: [
    'title', 'description', 'image', 'tips', 'articles', 'sleepGoalHours', 'reminders',
    'fitnessGoal', 'ageRange', 'gender', 'healthConditions', 'weightRange', 'activityLevel'
  ],
};

const RecommendationFormBuilder: React.FC<RecommendationFormBuilderProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  onGeminiGenerate,
  theme,
}) => {
  const [form, setForm] = useState<RecommendationInput>({
    ...initialValues,
    steps: initialValues.steps || [defaultStep],
    tips: initialValues.tips || [''],
    articles: initialValues.articles || [defaultArticle],
    macros: initialValues.macros || { protein: 0, carbs: 0, fat: 0 },
  } as RecommendationInput);

  const selectedCategory = form.category;

  // Handle field changes
  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Dynamic array handlers (steps, tips, articles)
  const handleArrayChange = (field: string, idx: number, subfield: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field]?.map((item: any, i: number) =>
        i === idx ? { ...item, [subfield]: value } : item
      ),
    }));
  };

  const handleArrayAdd = (field: string, defaultValue: any) => {
    setForm((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue],
    }));
  };

  const handleArrayRemove = (field: string, idx: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== idx),
    }));
  };

  // Gemini AI handler
  const handleGemini = () => {
    if (onGeminiGenerate) onGeminiGenerate(form);
  };

  // Submit handler
  const handleFormSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Ensure each step has id and content
  const stepsWithIdAndContent = (form.steps || []).map((step, idx) => ({
    ...step,
    id: step.id || `step-${idx}`,
    content: step.content || step.description || '',
  }));

  // Pass the updated steps to onSubmit
  onSubmit({
    ...form,
    steps: stepsWithIdAndContent,
  });
};

  // Only show fields relevant to the selected category
  const fieldsToShow = selectedCategory ? categoryFields[selectedCategory] : [];

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      {/* Always show category selector first */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecommendationFormField
          label="Category"
          type="select"
          value={form.category}
          onChange={v => handleChange('category', v)}
          options={[
            { value: 'workout', label: 'Workout' },
            { value: 'nutrition', label: 'Nutrition' },
            { value: 'hydration', label: 'Hydration' },
            { value: 'rest', label: 'Rest' },
          ]}
          theme={theme}
        />
      </Box>

      {/* If no category selected, prompt user */}
      {!selectedCategory && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Please select a category to continue.
        </div>
      )}

      {/* Filtering/Profile Fields Row */}
            {selectedCategory && (
            <Box className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                {/* Category (disabled after selection for clarity, or keep editable if you want) */}
                {/* <RecommendationFormField
                label="Category"
                type="select"
                value={form.category}
                onChange={v => handleChange('category', v)}
                options={[
                    { value: 'workout', label: 'Workout' },
                    { value: 'nutrition', label: 'Nutrition' },
                    { value: 'hydration', label: 'Hydration' },
                    { value: 'rest', label: 'Rest' },
                ]}
                theme={theme}
                /> */}
                {/* Fitness Goal */}
                {fieldsToShow.includes('fitnessGoal') && (
                <RecommendationFormField
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
                )}
                {/* Health Conditions */}
                {fieldsToShow.includes('healthConditions') && (
                <RecommendationFormField
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
                )}
                {/* Preferred Workout Types */}
                {fieldsToShow.includes('preferredWorkoutTypes') && (
                <RecommendationFormField
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
                )}
                {/* Gender */}
                {fieldsToShow.includes('gender') && (
                <RecommendationFormField
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
                )}
                {/* Activity Level */}
                {fieldsToShow.includes('activityLevel') && (
                <RecommendationFormField
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
                )}
            </Box>
            )}

      {/* Show fields for the selected category */}
      {selectedCategory && (
        <>
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldsToShow.includes('title') && (
              <RecommendationFormField label="Title" type="text" value={form.title} onChange={v => handleChange('title', v)} theme={theme} />
            )}
            {fieldsToShow.includes('description') && (
              <RecommendationFormField label="Description" type="textarea" value={form.description} onChange={v => handleChange('description', v)} theme={theme} />
            )}
            {fieldsToShow.includes('image') && (
              <RecommendationFormField label="Image URL" type="text" value={form.image} onChange={v => handleChange('image', v)} theme={theme} />
            )}
            {fieldsToShow.includes('calories') && (
              <RecommendationFormField label="Calories" type="number" value={form.calories} onChange={v => handleChange('calories', v)} theme={theme} />
            )}
            {fieldsToShow.includes('dailyGoalMl') && (
              <RecommendationFormField label="Daily Goal (ml)" type="number" value={form.dailyGoalMl} onChange={v => handleChange('dailyGoalMl', v)} theme={theme} />
            )}
            {fieldsToShow.includes('sleepGoalHours') && (
              <RecommendationFormField label="Sleep Goal (hours)" type="number" value={form.sleepGoalHours} onChange={v => handleChange('sleepGoalHours', v)} theme={theme} />
            )}
            {/* Add more single fields as needed */}
          </Box>

          {/* Steps */}
          {fieldsToShow.includes('steps') && (
            <>
              <Divider className="!my-4" />
              <Box>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Steps</span>
                  <Button
                    startIcon={<Add />}
                    onClick={() => handleArrayAdd('steps', defaultStep)}
                    variant="outlined"
                    size="small"
                  >
                    Add Step
                  </Button>
                </div>
                {form.steps?.map((step, idx) => (
                  <Box key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2 items-end">
                    <RecommendationFormField label="Title" type="text" value={step.title} onChange={v => handleArrayChange('steps', idx, 'title', v)} theme={theme} />
                    <RecommendationFormField label="Description" type="text" value={step.description} onChange={v => handleArrayChange('steps', idx, 'description', v)} theme={theme} />
                    <RecommendationFormField label="Image" type="text" value={step.image} onChange={v => handleArrayChange('steps', idx, 'image', v)} theme={theme} />
                    <RecommendationFormField
                        label="Duration"
                        type="number"
                        value={step.duration}
                        onChange={v => handleArrayChange('steps', idx, 'duration', v === '' ? undefined : Number(v))}
                        theme={theme}
                    />
                    <IconButton onClick={() => handleArrayRemove('steps', idx)} color="error"><Remove /></IconButton>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Tips */}
          {fieldsToShow.includes('tips') && (
            <>
              <Divider className="!my-4" />
              <Box>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Tips</span>
                  <Button
                    startIcon={<Add />}
                    onClick={() => handleArrayAdd('tips', '')}
                    variant="outlined"
                    size="small"
                  >
                    Add Tip
                  </Button>
                </div>
                {form.tips?.map((tip, idx) => (
                  <Box key={idx} className="flex gap-2 items-end mb-2">
                    <RecommendationFormField label={`Tip ${idx + 1}`} type="text" value={tip} onChange={v => {
                      const newTips = [...(form.tips || [])];
                      newTips[idx] = v;
                      handleChange('tips', newTips);
                    }} theme={theme} />
                    <IconButton onClick={() => handleArrayRemove('tips', idx)} color="error"><Remove /></IconButton>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Articles */}
          {fieldsToShow.includes('articles') && (
            <>
              <Divider className="!my-4" />
              <Box>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Articles</span>
                  <Button
                    startIcon={<Add />}
                    onClick={() => handleArrayAdd('articles', defaultArticle)}
                    variant="outlined"
                    size="small"
                  >
                    Add Article
                  </Button>
                </div>
                {form.articles?.map((article, idx) => (
                  <Box key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 items-end">
                    <RecommendationFormField label="Title" type="text" value={article.title} onChange={v => handleArrayChange('articles', idx, 'title', v)} theme={theme} />
                    <RecommendationFormField label="URL" type="text" value={article.url} onChange={v => handleArrayChange('articles', idx, 'url', v)} theme={theme} />
                    <IconButton onClick={() => handleArrayRemove('articles', idx)} color="error"><Remove /></IconButton>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Macros */}
          {fieldsToShow.includes('macros') && (
            <>
              <Divider className="!my-4" />
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <RecommendationFormField label="Protein (g)" type="number" value={form.macros?.protein} onChange={v => handleChange('macros', { ...form.macros, protein: Number(v) })} theme={theme} />
                <RecommendationFormField label="Carbs (g)" type="number" value={form.macros?.carbs} onChange={v => handleChange('macros', { ...form.macros, carbs: Number(v) })} theme={theme} />
                <RecommendationFormField label="Fat (g)" type="number" value={form.macros?.fat} onChange={v => handleChange('macros', { ...form.macros, fat: Number(v) })} theme={theme} />
              </Box>
            </>
          )}

          {/* Reminders */}
          {fieldsToShow.includes('reminders') && (
            <>
              <Divider className="!my-4" />
              <Box>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Reminders</span>
                  <Button
                    startIcon={<Add />}
                    onClick={() => handleArrayAdd('reminders', '')}
                    variant="outlined"
                    size="small"
                  >
                    Add Reminder
                  </Button>
                </div>
                {form.reminders?.map((reminder, idx) => (
                  <Box key={idx} className="flex gap-2 items-end mb-2">
                    <RecommendationFormField label={`Reminder ${idx + 1}`} type="text" value={reminder} onChange={v => {
                      const newReminders = [...(form.reminders || [])];
                      newReminders[idx] = v;
                      handleChange('reminders', newReminders);
                    }} theme={theme} />
                    <IconButton onClick={() => handleArrayRemove('reminders', idx)} color="error"><Remove /></IconButton>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* Gemini AI */}
          <Divider className="!my-4" />
          <Box className="flex justify-between">
            <Button
              variant="outlined"
              startIcon={<AutoAwesome />}
              onClick={handleGemini}
              className="font-semibold"
            >
              Generate with Gemini AI
            </Button>
            <Box>
              <Button variant="contained" color="primary" type="submit" className="mr-2">Save</Button>
              {onCancel && (
                <Button variant="outlined" color="secondary" onClick={onCancel}>Cancel</Button>
              )}
            </Box>
          </Box>
        </>
      )}
    </form>
  );
};

export default RecommendationFormBuilder;