// src/schemas/recommendationSchema.ts

import * as yup from 'yup';

export const recommendationSchema = yup.object({
  category: yup.string().required('Category is required'),
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  image: yup.string().url('Image must be a valid URL').nullable().default(''),
});

export type RecommendationFormValues = yup.InferType<typeof recommendationSchema>;
