import React, { useState } from 'react';
import { Button, Box, IconButton, Divider } from '@mui/material';
import { Add, Remove, AutoAwesome } from '@mui/icons-material';
import { type RecommendationInput } from '../../types';
import RecommendationFormField from '../common/RecommendationFormField';
import { useGemini } from '../../hooks/useGemini';

interface RecommendationFormBuilderProps {
  initialValues?: Partial<RecommendationInput>;
  onSubmit: (data: RecommendationInput) => void;
  onCancel?: () => void;
  theme: 'light' | 'dark';
}

const defaultStep = { id: '', title: '', description: '', content: '', image: '', duration: undefined };
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

function cartesianProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (a, b) => a.flatMap(d => b.map(e => [...d, e])),
    [[]]
  );
}

const RecommendationFormBuilder: React.FC<RecommendationFormBuilderProps> = ({
  initialValues = {},
  onSubmit,
  onCancel,
  theme,
}) => {
  const [form, setForm] = useState<RecommendationInput>({
    ...initialValues,
    steps: initialValues.steps || [defaultStep],
    tips: initialValues.tips || [''],
    articles: initialValues.articles || [defaultArticle],
    macros: initialValues.macros || { protein: 0, carbs: 0, fat: 0 },
    healthConditions: initialValues.healthConditions ?? [],
    preferredWorkoutTypes: initialValues.preferredWorkoutTypes ?? [],
    dietaryRestrictions: initialValues.dietaryRestrictions ?? [],
    reminders: initialValues.reminders ?? [],
  } as RecommendationInput);

  const [showGeminiModal, setShowGeminiModal] = useState(false);
  const [geminiPreview, setGeminiPreview] = useState<{
    category: string;
    combinations: Record<string, any>[];
  } | null>(null);

  const [generatedRecs, setGeneratedRecs] = useState<any[] | null>(null);
  const [generating, setGenerating] = useState(false);
  const { generateContent } = useGemini();
  
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

  async function generateRecommendationsWithGemini(category: string, combos: Record<string, any>[]) {
    // For demo, only generate for first 10 to avoid quota issues
    const limitedCombos = combos.slice(0, 10);
    const recs = [];
    for (const combo of limitedCombos) {
      const prompt = `Generate a ${category} recommendation for: 
        Fitness Goal: ${combo.fitnessGoal}, 
        Health Condition: ${combo.healthCondition}, 
        Preferred Workout Type: ${combo.preferredWorkoutType}, 
        Gender: ${combo.gender}, 
        Activity Level: ${combo.activityLevel}, 
        Age Range: ${combo.ageRange.min}-${combo.ageRange.max}, 
        Weight Range: ${combo.weightRange.min}-${combo.weightRange.max}. 
        Respond with a JSON object with title, description, steps (array of {title, description}), and tips (array of strings).`;
      const content = await generateContent(prompt);
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch {
        parsed = { title: content, description: '', steps: [], tips: [] };
      }
      recs.push({
        id: `gen-${Math.random()}`,
        category,
        ...combo,
        ...parsed,
      });
    }
    return recs;
  }

  const handleArrayRemove = (field: string, idx: number) => {
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_: any, i: number) => i !== idx),
    }));
  };

  // Gemini AI handler
  const handleGemini = () => {
    // if (onGeminiGenerate) onGeminiGenerate(form);
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
    <>
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
        <div className="flex flex-col items-center justify-center py-8 gap-4">
          <div className="text-gray-500 dark:text-gray-400">
            Please select a category to continue.
          </div>
          <Button
            variant="outlined"
            startIcon={<AutoAwesome />}
            onClick={() => setShowGeminiModal(true)}
            color="secondary"
          >
            Generate with Gemini AI
          </Button>
        </div>
      )}

      {/* Filtering/Profile Fields Row */}
      {selectedCategory && (
        <Box className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
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
                { value: 'None', label: 'none' },
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
          {/* Age Range */}
          {fieldsToShow.includes('ageRange') && (
            <>
              <RecommendationFormField
                label="Age Min"
                type="number"
                value={form.ageRange?.min}
                onChange={v => handleChange('ageRange', { ...form.ageRange, min: Number(v) })}
                theme={theme}
              />
              <RecommendationFormField
                label="Age Max"
                type="number"
                value={form.ageRange?.max}
                onChange={v => handleChange('ageRange', { ...form.ageRange, max: Number(v) })}
                theme={theme}
              />
            </>
          )}
          {/* Weight Range */}
          {fieldsToShow.includes('weightRange') && (
            <>
              <RecommendationFormField
                label="Weight Min"
                type="number"
                value={form.weightRange?.min}
                onChange={v => handleChange('weightRange', { ...form.weightRange, min: Number(v) })}
                theme={theme}
              />
              <RecommendationFormField
                label="Weight Max"
                type="number"
                value={form.weightRange?.max}
                onChange={v => handleChange('weightRange', { ...form.weightRange, max: Number(v) })}
                theme={theme}
              />
            </>
          )}
          {/* Dietary Preference */}
          {fieldsToShow.includes('dietaryPreference') && (
            <RecommendationFormField
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
          )}
          {/* Dietary Restrictions */}
          {fieldsToShow.includes('dietaryRestrictions') && (
            <RecommendationFormField
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
                  <Box key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-2 items-end">
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
      {showGeminiModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setShowGeminiModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 min-w-[320px] max-w-xs"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Generate Recommendations with Gemini AI</h3>
            <div className="flex flex-col gap-3">
              {Object.keys(categoryFields).map(cat => (
                <Button
                  key={cat}
                  variant="contained"
                  color="primary"
                  startIcon={<AutoAwesome />}
                  onClick={() => {
                    setShowGeminiModal(false);

                    // Define all possible values for each field
                    const fitnessGoals = ['Lose Weight', 'Gain Muscle', 'Maintain Health'];
                    const healthConditions = ['Diabetes', 'Hypertension', 'Heart Condition', 'Knee Injury', 'Back Pain', 'Asthma'];
                    const preferredWorkoutTypes = ['Strength', 'Cardio', 'Yoga', 'HIIT', 'Pilates'];
                    const genders = ['Male', 'Female', 'Both'];
                    const activityLevels = ['Sedentary', 'Moderate', 'Active'];
                    const ageRanges = [
                      { min: 18, max: 25 }, { min: 26, max: 35 }, { min: 36, max: 50 }
                    ];
                    const weightRanges = [
                      { min: 50, max: 65 }, { min: 66, max: 80 }, { min: 81, max: 100 }
                    ];

                    // You can adjust which fields to combine per category if needed
                    const combos = cartesianProduct(
                      fitnessGoals,
                      healthConditions,
                      preferredWorkoutTypes,
                      genders,
                      activityLevels,
                      ageRanges,
                      weightRanges
                    ).map(arr => ({
                      fitnessGoal: arr[0],
                      healthCondition: arr[1],
                      preferredWorkoutType: arr[2],
                      gender: arr[3],
                      activityLevel: arr[4],
                      ageRange: arr[5],
                      weightRange: arr[6],
                    }));

                    setGeminiPreview({
                      category: cat,
                      combinations: combos,
                    });
                  }}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Button>
              ))}
            </div>
            <Button
              variant="text"
              color="secondary"
              onClick={() => setShowGeminiModal(false)}
              className="mt-4"
              fullWidth
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {geminiPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setGeminiPreview(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 min-w-[340px] max-w-lg"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Preview: {geminiPreview.category.charAt(0).toUpperCase() + geminiPreview.category.slice(1)}
            </h3>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
              <b>{geminiPreview.combinations.length}</b> combinations will be generated.
            </div>
            <div className="mb-2 text-gray-700 dark:text-gray-200">
              <b>{geminiPreview.combinations.length}</b> combinations will be generated.<br />
              {geminiPreview.combinations.length > 10 && (
                <span className="text-red-500">
                  Only the first 10 will be generated due to API limits.
                </span>
              )}
            </div>
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-xs">
                <thead>
                  <tr>
                    {Object.keys(geminiPreview.combinations[0] || {}).map(key => (
                      <th key={key} className="px-2 py-1 text-left">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {geminiPreview.combinations.slice(0, 5).map((combo, idx) => (
                    <tr key={idx}>
                      {Object.values(combo).map((val, i) => (
                        <td key={i} className="px-2 py-1">{typeof val === 'object' ? `${val.min}-${val.max}` : val}</td>
                      ))}
                    </tr>
                  ))}
                  {geminiPreview.combinations.length > 5 && (
                    <tr>
                      <td colSpan={Object.keys(geminiPreview.combinations[0]).length} className="text-center text-gray-400">
                        ...and {geminiPreview.combinations.length - 5} more
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  setGenerating(true);
                  // Call Gemini AI (mocked here)
                  const recs = await generateRecommendationsWithGemini(
                    geminiPreview.category,
                    geminiPreview.combinations
                  );
                  setGenerating(false);
                  setGeminiPreview(null);
                  setGeneratedRecs(recs);
                }}
              >
                Generate
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setGeminiPreview(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {generating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <span className="text-lg font-semibold text-gray-700 dark:text-gray-100">Generating recommendations...</span>
          </div>
        </div>
      )}

      {generatedRecs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
              Generated Recommendations Preview
            </h3>
            <div className="overflow-y-auto max-h-96 mb-4">
              <table className="min-w-full text-xs">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Title</th>
                    <th className="px-2 py-1 text-left">Fitness Goal</th>
                    <th className="px-2 py-1 text-left">Gender</th>
                    <th className="px-2 py-1 text-left">Activity Level</th>
                    {/* Add more columns as needed */}
                  </tr>
                </thead>
                <tbody>
                  {generatedRecs.slice(0, 10).map((rec, idx) => (
                    <tr key={rec.id}>
                      <td className="px-2 py-1">{rec.title}</td>
                      <td className="px-2 py-1">{rec.fitnessGoal}</td>
                      <td className="px-2 py-1">{rec.gender}</td>
                      <td className="px-2 py-1">{rec.activityLevel}</td>
                    </tr>
                  ))}
                  {generatedRecs.length > 10 && (
                    <tr>
                      <td colSpan={4} className="text-center text-gray-400">
                        ...and {generatedRecs.length - 10} more
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2">
              <Button
                variant="contained"
                color="primary"
                onClick={async () => {
                  setGenerating(true);
                  for (const rec of generatedRecs) {
                    // Map rec to RecommendationInput as needed
                    await onSubmit(rec); // Or call your createRecommendation mutation directly
                  }
                  setGenerating(false);
                  setGeneratedRecs(null);
                }}
              >
                Save All
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setGeneratedRecs(null)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecommendationFormBuilder;