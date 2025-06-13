import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ArticleInput = {
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: User;
};

export type Course = {
  __typename?: 'Course';
  activityLevel?: Maybe<Scalars['String']['output']>;
  ageRange?: Maybe<Range>;
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  dietaryPreference?: Maybe<Scalars['String']['output']>;
  dietaryRestrictions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  gender?: Maybe<Scalars['String']['output']>;
  goal: Scalars['String']['output'];
  healthConditions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  level: Scalars['String']['output'];
  preferredWorkoutTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  topics: Array<Topic>;
  updatedAt: Scalars['String']['output'];
  weightRange?: Maybe<Range>;
};

export type CourseInput = {
  activityLevel?: InputMaybe<Scalars['String']['input']>;
  ageRange?: InputMaybe<RangeInput>;
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description: Scalars['String']['input'];
  dietaryPreference?: InputMaybe<Scalars['String']['input']>;
  dietaryRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  gender?: InputMaybe<Scalars['String']['input']>;
  goal: Scalars['String']['input'];
  healthConditions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  level: Scalars['String']['input'];
  preferredWorkoutTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  topics: Array<TopicInput>;
  weightRange?: InputMaybe<RangeInput>;
};

export type DidYouKnow = {
  __typename?: 'DidYouKnow';
  activityLevel?: Maybe<Scalars['String']['output']>;
  ageRange?: Maybe<Range>;
  createdAt: Scalars['String']['output'];
  dietaryPreference?: Maybe<Scalars['String']['output']>;
  dietaryRestrictions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  fact: Scalars['String']['output'];
  fitnessGoal?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  healthConditions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  preferredWorkoutTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  source: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  weightRange?: Maybe<Range>;
};

export type DidYouKnowInput = {
  activityLevel?: InputMaybe<Scalars['String']['input']>;
  ageRange?: InputMaybe<RangeInput>;
  dietaryPreference?: InputMaybe<Scalars['String']['input']>;
  dietaryRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fact: Scalars['String']['input'];
  fitnessGoal?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  healthConditions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  preferredWorkoutTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  source: Scalars['String']['input'];
  weightRange?: InputMaybe<RangeInput>;
};

export type FeedComment = {
  __typename?: 'FeedComment';
  comment: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  user: User;
};

export type FeedPost = {
  __typename?: 'FeedPost';
  activityType?: Maybe<Scalars['String']['output']>;
  activityValue?: Maybe<Scalars['String']['output']>;
  comments: Array<FeedComment>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likedByCurrentUser: Scalars['Boolean']['output'];
  likes: Scalars['Int']['output'];
  user: User;
};

export type FeedPostInput = {
  activityType?: InputMaybe<Scalars['String']['input']>;
  activityValue?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  user: Scalars['ID']['input'];
};

export type HealthTip = {
  __typename?: 'HealthTip';
  activityLevel?: Maybe<Scalars['String']['output']>;
  ageRange?: Maybe<Range>;
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  dietaryPreference?: Maybe<Scalars['String']['output']>;
  dietaryRestrictions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  fitnessGoal?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  healthConditions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  icon: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  link?: Maybe<Scalars['String']['output']>;
  preferredWorkoutTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  weightRange?: Maybe<Range>;
};

export type HealthTipInput = {
  activityLevel?: InputMaybe<Scalars['String']['input']>;
  ageRange?: InputMaybe<RangeInput>;
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  dietaryPreference?: InputMaybe<Scalars['String']['input']>;
  dietaryRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fitnessGoal?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  healthConditions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  preferredWorkoutTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  weightRange?: InputMaybe<RangeInput>;
};

export type Macros = {
  __typename?: 'Macros';
  carbs?: Maybe<Scalars['Float']['output']>;
  fat?: Maybe<Scalars['Float']['output']>;
  protein?: Maybe<Scalars['Float']['output']>;
};

export type MacrosInput = {
  carbs?: InputMaybe<Scalars['Float']['input']>;
  fat?: InputMaybe<Scalars['Float']['input']>;
  protein?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  commentFeedPost: FeedPost;
  completeProfile?: Maybe<User>;
  createCourse: Course;
  createDidYouKnow: DidYouKnow;
  createFeedPost: FeedPost;
  createHealthTip: HealthTip;
  createRecommendation: Recommendation;
  deleteCourse: Scalars['Boolean']['output'];
  deleteDidYouKnow: Scalars['Boolean']['output'];
  deleteFeedPost: Scalars['Boolean']['output'];
  deleteHealthTip: Scalars['Boolean']['output'];
  deleteRecommendation: Scalars['Boolean']['output'];
  likeFeedPost: FeedPost;
  loginUser?: Maybe<AuthPayload>;
  registerUser?: Maybe<AuthPayload>;
  updateCourse: Course;
  updateDidYouKnow: DidYouKnow;
  updateFeedPost: FeedPost;
  updateHealthTip: HealthTip;
  updateProfile?: Maybe<User>;
  updateRecommendation: Recommendation;
};


export type MutationCommentFeedPostArgs = {
  comment: Scalars['String']['input'];
  id: Scalars['ID']['input'];
};


export type MutationCompleteProfileArgs = {
  activityLevel?: InputMaybe<Scalars['String']['input']>;
  age: Scalars['Int']['input'];
  dietaryPreference: Scalars['String']['input'];
  dietaryRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
  fitnessGoal: Scalars['String']['input'];
  gender?: InputMaybe<Scalars['String']['input']>;
  healthConditions?: InputMaybe<Array<Scalars['String']['input']>>;
  height: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  preferredWorkoutTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  weight: Scalars['Float']['input'];
};


export type MutationCreateCourseArgs = {
  input: CourseInput;
};


export type MutationCreateDidYouKnowArgs = {
  input: DidYouKnowInput;
};


export type MutationCreateFeedPostArgs = {
  input: FeedPostInput;
};


export type MutationCreateHealthTipArgs = {
  input: HealthTipInput;
};


export type MutationCreateRecommendationArgs = {
  input: RecommendationInput;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDidYouKnowArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFeedPostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteHealthTipArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRecommendationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLikeFeedPostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID']['input'];
  input: CourseInput;
};


export type MutationUpdateDidYouKnowArgs = {
  id: Scalars['ID']['input'];
  input: DidYouKnowInput;
};


export type MutationUpdateFeedPostArgs = {
  id: Scalars['ID']['input'];
  input: UpdateFeedPostInput;
};


export type MutationUpdateHealthTipArgs = {
  id: Scalars['ID']['input'];
  input: HealthTipInput;
};


export type MutationUpdateProfileArgs = {
  activityLevel?: InputMaybe<Scalars['String']['input']>;
  age?: InputMaybe<Scalars['Int']['input']>;
  dietaryPreference?: InputMaybe<Scalars['String']['input']>;
  dietaryRestrictions?: InputMaybe<Array<Scalars['String']['input']>>;
  fitnessGoal?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  healthConditions?: InputMaybe<Array<Scalars['String']['input']>>;
  height?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  preferredWorkoutTypes?: InputMaybe<Array<Scalars['String']['input']>>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUpdateRecommendationArgs = {
  id: Scalars['ID']['input'];
  input: RecommendationInput;
};

export type Query = {
  __typename?: 'Query';
  getCourse?: Maybe<Course>;
  getCourses: Array<Course>;
  getCurrentUser?: Maybe<User>;
  getDidYouKnow: Array<DidYouKnow>;
  getDidYouKnowItem?: Maybe<DidYouKnow>;
  getFeedPost?: Maybe<FeedPost>;
  getHealthTip?: Maybe<HealthTip>;
  getHealthTips: Array<HealthTip>;
  getRecommendation?: Maybe<Recommendation>;
  getRecommendations: Array<Recommendation>;
  getSocialFeed: Array<FeedPost>;
  getUser?: Maybe<User>;
};


export type QueryGetCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetDidYouKnowItemArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetFeedPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetHealthTipArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRecommendationArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetUserArgs = {
  email: Scalars['String']['input'];
};

export type Range = {
  __typename?: 'Range';
  max?: Maybe<Scalars['Float']['output']>;
  min?: Maybe<Scalars['Float']['output']>;
};

export type RangeInput = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
};

export type Recommendation = {
  __typename?: 'Recommendation';
  activityLevel?: Maybe<Scalars['String']['output']>;
  ageRange?: Maybe<Range>;
  articles?: Maybe<Array<Maybe<Article>>>;
  calories?: Maybe<Scalars['Int']['output']>;
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  dailyGoalMl?: Maybe<Scalars['Int']['output']>;
  description: Scalars['String']['output'];
  dietaryPreference?: Maybe<Scalars['String']['output']>;
  dietaryRestrictions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  fitnessGoal?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  healthConditions?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  macros?: Maybe<Macros>;
  preferredWorkoutTypes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  reminders?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  sleepGoalHours?: Maybe<Scalars['Float']['output']>;
  steps?: Maybe<Array<Maybe<Step>>>;
  tips?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  weightRange?: Maybe<Range>;
};

export type RecommendationInput = {
  activityLevel?: InputMaybe<Scalars['String']['input']>;
  ageRange?: InputMaybe<RangeInput>;
  articles?: InputMaybe<Array<InputMaybe<ArticleInput>>>;
  calories?: InputMaybe<Scalars['Int']['input']>;
  category: Scalars['String']['input'];
  dailyGoalMl?: InputMaybe<Scalars['Int']['input']>;
  description: Scalars['String']['input'];
  dietaryPreference?: InputMaybe<Scalars['String']['input']>;
  dietaryRestrictions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fitnessGoal?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  healthConditions?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  image?: InputMaybe<Scalars['String']['input']>;
  macros?: InputMaybe<MacrosInput>;
  preferredWorkoutTypes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  reminders?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sleepGoalHours?: InputMaybe<Scalars['Int']['input']>;
  steps?: InputMaybe<Array<InputMaybe<StepInput>>>;
  tips?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title: Scalars['String']['input'];
  weightRange?: InputMaybe<RangeInput>;
};

export type Step = {
  __typename?: 'Step';
  content: Scalars['String']['output'];
  description: Scalars['String']['output'];
  duration?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  illustration?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  videoUrl?: Maybe<Scalars['String']['output']>;
};

export type StepInput = {
  content: Scalars['String']['input'];
  description: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  illustration?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  videoUrl?: InputMaybe<Scalars['String']['input']>;
};

export type Topic = {
  __typename?: 'Topic';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  steps: Array<Step>;
  title: Scalars['String']['output'];
};

export type TopicInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  steps: Array<StepInput>;
  title: Scalars['String']['input'];
};

export type UpdateFeedPostInput = {
  activityType?: InputMaybe<Scalars['String']['input']>;
  activityValue?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  activityLevel?: Maybe<Scalars['String']['output']>;
  age?: Maybe<Scalars['Int']['output']>;
  avatar?: Maybe<Scalars['String']['output']>;
  bmi?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['String']['output'];
  dietaryPreference?: Maybe<Scalars['String']['output']>;
  dietaryRestrictions?: Maybe<Array<Scalars['String']['output']>>;
  email: Scalars['String']['output'];
  fitnessGoal?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  healthConditions?: Maybe<Array<Scalars['String']['output']>>;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isProfileComplete: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  preferredWorkoutTypes?: Maybe<Array<Scalars['String']['output']>>;
  role?: Maybe<Scalars['String']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  weight?: Maybe<Scalars['Float']['output']>;
};

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, email: string, isProfileComplete: boolean } } | null };

export type LoginUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser?: { __typename?: 'AuthPayload', token: string, user: { __typename?: 'User', id: string, name: string, email: string, fitnessGoal?: string | null, isProfileComplete: boolean } } | null };

export type GetRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecommendationsQuery = { __typename?: 'Query', getRecommendations: Array<{ __typename?: 'Recommendation', id: string, category: string, title: string, description: string, image?: string | null, tips?: Array<string | null> | null, calories?: number | null, reminders?: Array<string | null> | null, dailyGoalMl?: number | null, sleepGoalHours?: number | null, fitnessGoal?: string | null, gender?: string | null, healthConditions?: Array<string | null> | null, preferredWorkoutTypes?: Array<string | null> | null, dietaryRestrictions?: Array<string | null> | null, createdAt: string, updatedAt: string, steps?: Array<{ __typename?: 'Step', title: string, description: string, image?: string | null, duration?: number | null } | null> | null, articles?: Array<{ __typename?: 'Article', title: string, url: string } | null> | null, macros?: { __typename?: 'Macros', protein?: number | null, carbs?: number | null, fat?: number | null } | null, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null }> };

export type CreateRecommendationMutationVariables = Exact<{
  input: RecommendationInput;
}>;


export type CreateRecommendationMutation = { __typename?: 'Mutation', createRecommendation: { __typename?: 'Recommendation', id: string, category: string, title: string, description: string, image?: string | null, tips?: Array<string | null> | null, calories?: number | null, reminders?: Array<string | null> | null, dailyGoalMl?: number | null, sleepGoalHours?: number | null, createdAt: string, updatedAt: string, steps?: Array<{ __typename?: 'Step', title: string, description: string, image?: string | null, duration?: number | null } | null> | null, articles?: Array<{ __typename?: 'Article', title: string, url: string } | null> | null, macros?: { __typename?: 'Macros', protein?: number | null, carbs?: number | null, fat?: number | null } | null } };

export type UpdateRecommendationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: RecommendationInput;
}>;


export type UpdateRecommendationMutation = { __typename?: 'Mutation', updateRecommendation: { __typename?: 'Recommendation', id: string, category: string, title: string, description: string, image?: string | null, tips?: Array<string | null> | null, calories?: number | null, reminders?: Array<string | null> | null, dailyGoalMl?: number | null, sleepGoalHours?: number | null, createdAt: string, updatedAt: string, steps?: Array<{ __typename?: 'Step', title: string, description: string, image?: string | null, duration?: number | null } | null> | null, articles?: Array<{ __typename?: 'Article', title: string, url: string } | null> | null, macros?: { __typename?: 'Macros', protein?: number | null, carbs?: number | null, fat?: number | null } | null } };

export type DeleteRecommendationMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteRecommendationMutation = { __typename?: 'Mutation', deleteRecommendation: boolean };

export type GetHealthTipsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHealthTipsQuery = { __typename?: 'Query', getHealthTips: Array<{ __typename?: 'HealthTip', id: string, title: string, description: string, category: string, icon: string, image?: string | null, link?: string | null, createdAt: string, updatedAt: string }> };

export type CreateHealthTipMutationVariables = Exact<{
  input: HealthTipInput;
}>;


export type CreateHealthTipMutation = { __typename?: 'Mutation', createHealthTip: { __typename?: 'HealthTip', id: string, title: string, description: string, category: string, icon: string, image?: string | null, link?: string | null, fitnessGoal?: string | null, gender?: string | null, healthConditions?: Array<string | null> | null, activityLevel?: string | null, dietaryPreference?: string | null, dietaryRestrictions?: Array<string | null> | null, preferredWorkoutTypes?: Array<string | null> | null, createdAt: string, updatedAt: string, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null } };

export type UpdateHealthTipMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: HealthTipInput;
}>;


export type UpdateHealthTipMutation = { __typename?: 'Mutation', updateHealthTip: { __typename?: 'HealthTip', id: string, title: string, description: string, category: string, icon: string, image?: string | null, link?: string | null, fitnessGoal?: string | null, gender?: string | null, healthConditions?: Array<string | null> | null, activityLevel?: string | null, dietaryPreference?: string | null, dietaryRestrictions?: Array<string | null> | null, preferredWorkoutTypes?: Array<string | null> | null, createdAt: string, updatedAt: string, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null } };

export type DeleteHealthTipMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteHealthTipMutation = { __typename?: 'Mutation', deleteHealthTip: boolean };

export type GetDidYouKnowQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDidYouKnowQuery = { __typename?: 'Query', getDidYouKnow: Array<{ __typename?: 'DidYouKnow', id: string, fact: string, source: string, image?: string | null, link?: string | null, createdAt: string, updatedAt: string, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null }> };

export type CreateDidYouKnowMutationVariables = Exact<{
  input: DidYouKnowInput;
}>;


export type CreateDidYouKnowMutation = { __typename?: 'Mutation', createDidYouKnow: { __typename?: 'DidYouKnow', id: string, fact: string, source: string, image?: string | null, link?: string | null, fitnessGoal?: string | null, gender?: string | null, healthConditions?: Array<string | null> | null, activityLevel?: string | null, dietaryPreference?: string | null, dietaryRestrictions?: Array<string | null> | null, preferredWorkoutTypes?: Array<string | null> | null, createdAt: string, updatedAt: string, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null } };

export type UpdateDidYouKnowMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: DidYouKnowInput;
}>;


export type UpdateDidYouKnowMutation = { __typename?: 'Mutation', updateDidYouKnow: { __typename?: 'DidYouKnow', id: string, fact: string, source: string, image?: string | null, link?: string | null, fitnessGoal?: string | null, gender?: string | null, healthConditions?: Array<string | null> | null, activityLevel?: string | null, dietaryPreference?: string | null, dietaryRestrictions?: Array<string | null> | null, preferredWorkoutTypes?: Array<string | null> | null, createdAt: string, updatedAt: string, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null } };

export type DeleteDidYouKnowMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDidYouKnowMutation = { __typename?: 'Mutation', deleteDidYouKnow: boolean };

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = { __typename?: 'Query', getCourses: Array<{ __typename?: 'Course', id: string, goal: string, title: string, description: string, level: string, coverImage?: string | null, createdAt: string, updatedAt: string, topics: Array<{ __typename?: 'Topic', id: string, title: string, description?: string | null, steps: Array<{ __typename?: 'Step', id: string, title: string, content: string, illustration?: string | null, videoUrl?: string | null }> }>, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null }> };

export type CreateCourseMutationVariables = Exact<{
  input: CourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', id: string, goal: string, title: string, description: string, level: string, coverImage?: string | null, gender?: string | null, healthConditions?: Array<string | null> | null, activityLevel?: string | null, dietaryPreference?: string | null, dietaryRestrictions?: Array<string | null> | null, preferredWorkoutTypes?: Array<string | null> | null, createdAt: string, updatedAt: string, topics: Array<{ __typename?: 'Topic', id: string, title: string, description?: string | null, steps: Array<{ __typename?: 'Step', id: string, title: string, content: string, illustration?: string | null, videoUrl?: string | null }> }>, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null } };

export type UpdateCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: CourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', id: string, goal: string, title: string, description: string, level: string, coverImage?: string | null, gender?: string | null, healthConditions?: Array<string | null> | null, activityLevel?: string | null, dietaryPreference?: string | null, dietaryRestrictions?: Array<string | null> | null, preferredWorkoutTypes?: Array<string | null> | null, createdAt: string, updatedAt: string, topics: Array<{ __typename?: 'Topic', id: string, title: string, description?: string | null, steps: Array<{ __typename?: 'Step', id: string, title: string, content: string, illustration?: string | null, videoUrl?: string | null }> }>, ageRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null, weightRange?: { __typename?: 'Range', min?: number | null, max?: number | null } | null } };

export type DeleteCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCourseMutation = { __typename?: 'Mutation', deleteCourse: boolean };

export type GetSocialFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSocialFeedQuery = { __typename?: 'Query', getSocialFeed: Array<{ __typename?: 'FeedPost', id: string, content: string, createdAt: string, image?: string | null, likes: number, likedByCurrentUser: boolean, activityType?: string | null, activityValue?: string | null, user: { __typename?: 'User', id: string, name: string, avatar?: string | null }, comments: Array<{ __typename?: 'FeedComment', comment: string, createdAt: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> }> };

export type CreateFeedPostMutationVariables = Exact<{
  input: FeedPostInput;
}>;


export type CreateFeedPostMutation = { __typename?: 'Mutation', createFeedPost: { __typename?: 'FeedPost', id: string, content: string, createdAt: string, image?: string | null, likes: number, likedByCurrentUser: boolean, activityType?: string | null, activityValue?: string | null, user: { __typename?: 'User', id: string, name: string, avatar?: string | null }, comments: Array<{ __typename?: 'FeedComment', comment: string, createdAt: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } };

export type UpdateFeedPostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateFeedPostInput;
}>;


export type UpdateFeedPostMutation = { __typename?: 'Mutation', updateFeedPost: { __typename?: 'FeedPost', id: string, content: string, image?: string | null, activityType?: string | null, activityValue?: string | null, createdAt: string, likes: number, likedByCurrentUser: boolean, user: { __typename?: 'User', id: string, name: string, avatar?: string | null }, comments: Array<{ __typename?: 'FeedComment', comment: string, createdAt: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } };

export type DeleteFeedPostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteFeedPostMutation = { __typename?: 'Mutation', deleteFeedPost: boolean };

export type LikeFeedPostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type LikeFeedPostMutation = { __typename?: 'Mutation', likeFeedPost: { __typename?: 'FeedPost', id: string, likes: number } };

export type CommentFeedPostMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
}>;


export type CommentFeedPostMutation = { __typename?: 'Mutation', commentFeedPost: { __typename?: 'FeedPost', id: string, comments: Array<{ __typename?: 'FeedComment', comment: string, createdAt: string, user: { __typename?: 'User', id: string, name: string, avatar?: string | null } }> } };


export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $password: String!) {
  registerUser(email: $email, password: $password) {
    user {
      id
      email
      isProfileComplete
    }
    token
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    user {
      id
      name
      email
      fitnessGoal
      isProfileComplete
    }
    token
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const GetRecommendationsDocument = gql`
    query GetRecommendations {
  getRecommendations {
    id
    category
    title
    description
    image
    steps {
      title
      description
      image
      duration
    }
    tips
    articles {
      title
      url
    }
    macros {
      protein
      carbs
      fat
    }
    calories
    reminders
    dailyGoalMl
    sleepGoalHours
    fitnessGoal
    ageRange {
      min
      max
    }
    gender
    healthConditions
    weightRange {
      min
      max
    }
    preferredWorkoutTypes
    dietaryRestrictions
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetRecommendationsQuery__
 *
 * To run a query within a React component, call `useGetRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecommendationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRecommendationsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecommendationsQuery, GetRecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecommendationsQuery, GetRecommendationsQueryVariables>(GetRecommendationsDocument, options);
      }
export function useGetRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecommendationsQuery, GetRecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecommendationsQuery, GetRecommendationsQueryVariables>(GetRecommendationsDocument, options);
        }
export function useGetRecommendationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetRecommendationsQuery, GetRecommendationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetRecommendationsQuery, GetRecommendationsQueryVariables>(GetRecommendationsDocument, options);
        }
export type GetRecommendationsQueryHookResult = ReturnType<typeof useGetRecommendationsQuery>;
export type GetRecommendationsLazyQueryHookResult = ReturnType<typeof useGetRecommendationsLazyQuery>;
export type GetRecommendationsSuspenseQueryHookResult = ReturnType<typeof useGetRecommendationsSuspenseQuery>;
export type GetRecommendationsQueryResult = Apollo.QueryResult<GetRecommendationsQuery, GetRecommendationsQueryVariables>;
export const CreateRecommendationDocument = gql`
    mutation CreateRecommendation($input: RecommendationInput!) {
  createRecommendation(input: $input) {
    id
    category
    title
    description
    image
    steps {
      title
      description
      image
      duration
    }
    tips
    articles {
      title
      url
    }
    macros {
      protein
      carbs
      fat
    }
    calories
    reminders
    dailyGoalMl
    sleepGoalHours
    createdAt
    updatedAt
  }
}
    `;
export type CreateRecommendationMutationFn = Apollo.MutationFunction<CreateRecommendationMutation, CreateRecommendationMutationVariables>;

/**
 * __useCreateRecommendationMutation__
 *
 * To run a mutation, you first call `useCreateRecommendationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRecommendationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRecommendationMutation, { data, loading, error }] = useCreateRecommendationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRecommendationMutation(baseOptions?: Apollo.MutationHookOptions<CreateRecommendationMutation, CreateRecommendationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRecommendationMutation, CreateRecommendationMutationVariables>(CreateRecommendationDocument, options);
      }
export type CreateRecommendationMutationHookResult = ReturnType<typeof useCreateRecommendationMutation>;
export type CreateRecommendationMutationResult = Apollo.MutationResult<CreateRecommendationMutation>;
export type CreateRecommendationMutationOptions = Apollo.BaseMutationOptions<CreateRecommendationMutation, CreateRecommendationMutationVariables>;
export const UpdateRecommendationDocument = gql`
    mutation UpdateRecommendation($id: ID!, $input: RecommendationInput!) {
  updateRecommendation(id: $id, input: $input) {
    id
    category
    title
    description
    image
    steps {
      title
      description
      image
      duration
    }
    tips
    articles {
      title
      url
    }
    macros {
      protein
      carbs
      fat
    }
    calories
    reminders
    dailyGoalMl
    sleepGoalHours
    createdAt
    updatedAt
  }
}
    `;
export type UpdateRecommendationMutationFn = Apollo.MutationFunction<UpdateRecommendationMutation, UpdateRecommendationMutationVariables>;

/**
 * __useUpdateRecommendationMutation__
 *
 * To run a mutation, you first call `useUpdateRecommendationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecommendationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecommendationMutation, { data, loading, error }] = useUpdateRecommendationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateRecommendationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRecommendationMutation, UpdateRecommendationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRecommendationMutation, UpdateRecommendationMutationVariables>(UpdateRecommendationDocument, options);
      }
export type UpdateRecommendationMutationHookResult = ReturnType<typeof useUpdateRecommendationMutation>;
export type UpdateRecommendationMutationResult = Apollo.MutationResult<UpdateRecommendationMutation>;
export type UpdateRecommendationMutationOptions = Apollo.BaseMutationOptions<UpdateRecommendationMutation, UpdateRecommendationMutationVariables>;
export const DeleteRecommendationDocument = gql`
    mutation DeleteRecommendation($id: ID!) {
  deleteRecommendation(id: $id)
}
    `;
export type DeleteRecommendationMutationFn = Apollo.MutationFunction<DeleteRecommendationMutation, DeleteRecommendationMutationVariables>;

/**
 * __useDeleteRecommendationMutation__
 *
 * To run a mutation, you first call `useDeleteRecommendationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRecommendationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRecommendationMutation, { data, loading, error }] = useDeleteRecommendationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRecommendationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRecommendationMutation, DeleteRecommendationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRecommendationMutation, DeleteRecommendationMutationVariables>(DeleteRecommendationDocument, options);
      }
export type DeleteRecommendationMutationHookResult = ReturnType<typeof useDeleteRecommendationMutation>;
export type DeleteRecommendationMutationResult = Apollo.MutationResult<DeleteRecommendationMutation>;
export type DeleteRecommendationMutationOptions = Apollo.BaseMutationOptions<DeleteRecommendationMutation, DeleteRecommendationMutationVariables>;
export const GetHealthTipsDocument = gql`
    query GetHealthTips {
  getHealthTips {
    id
    title
    description
    category
    icon
    image
    link
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetHealthTipsQuery__
 *
 * To run a query within a React component, call `useGetHealthTipsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHealthTipsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHealthTipsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHealthTipsQuery(baseOptions?: Apollo.QueryHookOptions<GetHealthTipsQuery, GetHealthTipsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHealthTipsQuery, GetHealthTipsQueryVariables>(GetHealthTipsDocument, options);
      }
export function useGetHealthTipsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHealthTipsQuery, GetHealthTipsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHealthTipsQuery, GetHealthTipsQueryVariables>(GetHealthTipsDocument, options);
        }
export function useGetHealthTipsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetHealthTipsQuery, GetHealthTipsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetHealthTipsQuery, GetHealthTipsQueryVariables>(GetHealthTipsDocument, options);
        }
export type GetHealthTipsQueryHookResult = ReturnType<typeof useGetHealthTipsQuery>;
export type GetHealthTipsLazyQueryHookResult = ReturnType<typeof useGetHealthTipsLazyQuery>;
export type GetHealthTipsSuspenseQueryHookResult = ReturnType<typeof useGetHealthTipsSuspenseQuery>;
export type GetHealthTipsQueryResult = Apollo.QueryResult<GetHealthTipsQuery, GetHealthTipsQueryVariables>;
export const CreateHealthTipDocument = gql`
    mutation CreateHealthTip($input: HealthTipInput!) {
  createHealthTip(input: $input) {
    id
    title
    description
    category
    icon
    image
    link
    fitnessGoal
    ageRange {
      min
      max
    }
    gender
    healthConditions
    weightRange {
      min
      max
    }
    activityLevel
    dietaryPreference
    dietaryRestrictions
    preferredWorkoutTypes
    createdAt
    updatedAt
  }
}
    `;
export type CreateHealthTipMutationFn = Apollo.MutationFunction<CreateHealthTipMutation, CreateHealthTipMutationVariables>;

/**
 * __useCreateHealthTipMutation__
 *
 * To run a mutation, you first call `useCreateHealthTipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHealthTipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHealthTipMutation, { data, loading, error }] = useCreateHealthTipMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHealthTipMutation(baseOptions?: Apollo.MutationHookOptions<CreateHealthTipMutation, CreateHealthTipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHealthTipMutation, CreateHealthTipMutationVariables>(CreateHealthTipDocument, options);
      }
export type CreateHealthTipMutationHookResult = ReturnType<typeof useCreateHealthTipMutation>;
export type CreateHealthTipMutationResult = Apollo.MutationResult<CreateHealthTipMutation>;
export type CreateHealthTipMutationOptions = Apollo.BaseMutationOptions<CreateHealthTipMutation, CreateHealthTipMutationVariables>;
export const UpdateHealthTipDocument = gql`
    mutation UpdateHealthTip($id: ID!, $input: HealthTipInput!) {
  updateHealthTip(id: $id, input: $input) {
    id
    title
    description
    category
    icon
    image
    link
    fitnessGoal
    ageRange {
      min
      max
    }
    gender
    healthConditions
    weightRange {
      min
      max
    }
    activityLevel
    dietaryPreference
    dietaryRestrictions
    preferredWorkoutTypes
    createdAt
    updatedAt
  }
}
    `;
export type UpdateHealthTipMutationFn = Apollo.MutationFunction<UpdateHealthTipMutation, UpdateHealthTipMutationVariables>;

/**
 * __useUpdateHealthTipMutation__
 *
 * To run a mutation, you first call `useUpdateHealthTipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHealthTipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHealthTipMutation, { data, loading, error }] = useUpdateHealthTipMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHealthTipMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHealthTipMutation, UpdateHealthTipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHealthTipMutation, UpdateHealthTipMutationVariables>(UpdateHealthTipDocument, options);
      }
export type UpdateHealthTipMutationHookResult = ReturnType<typeof useUpdateHealthTipMutation>;
export type UpdateHealthTipMutationResult = Apollo.MutationResult<UpdateHealthTipMutation>;
export type UpdateHealthTipMutationOptions = Apollo.BaseMutationOptions<UpdateHealthTipMutation, UpdateHealthTipMutationVariables>;
export const DeleteHealthTipDocument = gql`
    mutation DeleteHealthTip($id: ID!) {
  deleteHealthTip(id: $id)
}
    `;
export type DeleteHealthTipMutationFn = Apollo.MutationFunction<DeleteHealthTipMutation, DeleteHealthTipMutationVariables>;

/**
 * __useDeleteHealthTipMutation__
 *
 * To run a mutation, you first call `useDeleteHealthTipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHealthTipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHealthTipMutation, { data, loading, error }] = useDeleteHealthTipMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHealthTipMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHealthTipMutation, DeleteHealthTipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHealthTipMutation, DeleteHealthTipMutationVariables>(DeleteHealthTipDocument, options);
      }
export type DeleteHealthTipMutationHookResult = ReturnType<typeof useDeleteHealthTipMutation>;
export type DeleteHealthTipMutationResult = Apollo.MutationResult<DeleteHealthTipMutation>;
export type DeleteHealthTipMutationOptions = Apollo.BaseMutationOptions<DeleteHealthTipMutation, DeleteHealthTipMutationVariables>;
export const GetDidYouKnowDocument = gql`
    query GetDidYouKnow {
  getDidYouKnow {
    id
    fact
    source
    image
    link
    ageRange {
      min
      max
    }
    weightRange {
      min
      max
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDidYouKnowQuery__
 *
 * To run a query within a React component, call `useGetDidYouKnowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDidYouKnowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDidYouKnowQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDidYouKnowQuery(baseOptions?: Apollo.QueryHookOptions<GetDidYouKnowQuery, GetDidYouKnowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDidYouKnowQuery, GetDidYouKnowQueryVariables>(GetDidYouKnowDocument, options);
      }
export function useGetDidYouKnowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDidYouKnowQuery, GetDidYouKnowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDidYouKnowQuery, GetDidYouKnowQueryVariables>(GetDidYouKnowDocument, options);
        }
export function useGetDidYouKnowSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDidYouKnowQuery, GetDidYouKnowQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDidYouKnowQuery, GetDidYouKnowQueryVariables>(GetDidYouKnowDocument, options);
        }
export type GetDidYouKnowQueryHookResult = ReturnType<typeof useGetDidYouKnowQuery>;
export type GetDidYouKnowLazyQueryHookResult = ReturnType<typeof useGetDidYouKnowLazyQuery>;
export type GetDidYouKnowSuspenseQueryHookResult = ReturnType<typeof useGetDidYouKnowSuspenseQuery>;
export type GetDidYouKnowQueryResult = Apollo.QueryResult<GetDidYouKnowQuery, GetDidYouKnowQueryVariables>;
export const CreateDidYouKnowDocument = gql`
    mutation CreateDidYouKnow($input: DidYouKnowInput!) {
  createDidYouKnow(input: $input) {
    id
    fact
    source
    image
    link
    fitnessGoal
    ageRange {
      min
      max
    }
    gender
    healthConditions
    weightRange {
      min
      max
    }
    activityLevel
    dietaryPreference
    dietaryRestrictions
    preferredWorkoutTypes
    createdAt
    updatedAt
  }
}
    `;
export type CreateDidYouKnowMutationFn = Apollo.MutationFunction<CreateDidYouKnowMutation, CreateDidYouKnowMutationVariables>;

/**
 * __useCreateDidYouKnowMutation__
 *
 * To run a mutation, you first call `useCreateDidYouKnowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDidYouKnowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDidYouKnowMutation, { data, loading, error }] = useCreateDidYouKnowMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDidYouKnowMutation(baseOptions?: Apollo.MutationHookOptions<CreateDidYouKnowMutation, CreateDidYouKnowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDidYouKnowMutation, CreateDidYouKnowMutationVariables>(CreateDidYouKnowDocument, options);
      }
export type CreateDidYouKnowMutationHookResult = ReturnType<typeof useCreateDidYouKnowMutation>;
export type CreateDidYouKnowMutationResult = Apollo.MutationResult<CreateDidYouKnowMutation>;
export type CreateDidYouKnowMutationOptions = Apollo.BaseMutationOptions<CreateDidYouKnowMutation, CreateDidYouKnowMutationVariables>;
export const UpdateDidYouKnowDocument = gql`
    mutation UpdateDidYouKnow($id: ID!, $input: DidYouKnowInput!) {
  updateDidYouKnow(id: $id, input: $input) {
    id
    fact
    source
    image
    link
    fitnessGoal
    ageRange {
      min
      max
    }
    gender
    healthConditions
    weightRange {
      min
      max
    }
    activityLevel
    dietaryPreference
    dietaryRestrictions
    preferredWorkoutTypes
    createdAt
    updatedAt
  }
}
    `;
export type UpdateDidYouKnowMutationFn = Apollo.MutationFunction<UpdateDidYouKnowMutation, UpdateDidYouKnowMutationVariables>;

/**
 * __useUpdateDidYouKnowMutation__
 *
 * To run a mutation, you first call `useUpdateDidYouKnowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDidYouKnowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDidYouKnowMutation, { data, loading, error }] = useUpdateDidYouKnowMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDidYouKnowMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDidYouKnowMutation, UpdateDidYouKnowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDidYouKnowMutation, UpdateDidYouKnowMutationVariables>(UpdateDidYouKnowDocument, options);
      }
export type UpdateDidYouKnowMutationHookResult = ReturnType<typeof useUpdateDidYouKnowMutation>;
export type UpdateDidYouKnowMutationResult = Apollo.MutationResult<UpdateDidYouKnowMutation>;
export type UpdateDidYouKnowMutationOptions = Apollo.BaseMutationOptions<UpdateDidYouKnowMutation, UpdateDidYouKnowMutationVariables>;
export const DeleteDidYouKnowDocument = gql`
    mutation DeleteDidYouKnow($id: ID!) {
  deleteDidYouKnow(id: $id)
}
    `;
export type DeleteDidYouKnowMutationFn = Apollo.MutationFunction<DeleteDidYouKnowMutation, DeleteDidYouKnowMutationVariables>;

/**
 * __useDeleteDidYouKnowMutation__
 *
 * To run a mutation, you first call `useDeleteDidYouKnowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDidYouKnowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDidYouKnowMutation, { data, loading, error }] = useDeleteDidYouKnowMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDidYouKnowMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDidYouKnowMutation, DeleteDidYouKnowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDidYouKnowMutation, DeleteDidYouKnowMutationVariables>(DeleteDidYouKnowDocument, options);
      }
export type DeleteDidYouKnowMutationHookResult = ReturnType<typeof useDeleteDidYouKnowMutation>;
export type DeleteDidYouKnowMutationResult = Apollo.MutationResult<DeleteDidYouKnowMutation>;
export type DeleteDidYouKnowMutationOptions = Apollo.BaseMutationOptions<DeleteDidYouKnowMutation, DeleteDidYouKnowMutationVariables>;
export const GetCoursesDocument = gql`
    query GetCourses {
  getCourses {
    id
    goal
    title
    description
    level
    coverImage
    topics {
      id
      title
      description
      steps {
        id
        title
        content
        illustration
        videoUrl
      }
    }
    ageRange {
      min
      max
    }
    weightRange {
      min
      max
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export function useGetCoursesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesSuspenseQueryHookResult = ReturnType<typeof useGetCoursesSuspenseQuery>;
export type GetCoursesQueryResult = Apollo.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($input: CourseInput!) {
  createCourse(input: $input) {
    id
    goal
    title
    description
    level
    coverImage
    topics {
      id
      title
      description
      steps {
        id
        title
        content
        illustration
        videoUrl
      }
    }
    ageRange {
      min
      max
    }
    gender
    healthConditions
    weightRange {
      min
      max
    }
    activityLevel
    dietaryPreference
    dietaryRestrictions
    preferredWorkoutTypes
    createdAt
    updatedAt
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($id: ID!, $input: CourseInput!) {
  updateCourse(id: $id, input: $input) {
    id
    goal
    title
    description
    level
    coverImage
    topics {
      id
      title
      description
      steps {
        id
        title
        content
        illustration
        videoUrl
      }
    }
    ageRange {
      min
      max
    }
    gender
    healthConditions
    weightRange {
      min
      max
    }
    activityLevel
    dietaryPreference
    dietaryRestrictions
    preferredWorkoutTypes
    createdAt
    updatedAt
  }
}
    `;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const DeleteCourseDocument = gql`
    mutation DeleteCourse($id: ID!) {
  deleteCourse(id: $id)
}
    `;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const GetSocialFeedDocument = gql`
    query GetSocialFeed {
  getSocialFeed {
    id
    user {
      id
      name
      avatar
    }
    content
    createdAt
    image
    likes
    likedByCurrentUser
    comments {
      user {
        id
        name
        avatar
      }
      comment
      createdAt
    }
    activityType
    activityValue
  }
}
    `;

/**
 * __useGetSocialFeedQuery__
 *
 * To run a query within a React component, call `useGetSocialFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSocialFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSocialFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSocialFeedQuery(baseOptions?: Apollo.QueryHookOptions<GetSocialFeedQuery, GetSocialFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSocialFeedQuery, GetSocialFeedQueryVariables>(GetSocialFeedDocument, options);
      }
export function useGetSocialFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSocialFeedQuery, GetSocialFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSocialFeedQuery, GetSocialFeedQueryVariables>(GetSocialFeedDocument, options);
        }
export function useGetSocialFeedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSocialFeedQuery, GetSocialFeedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSocialFeedQuery, GetSocialFeedQueryVariables>(GetSocialFeedDocument, options);
        }
export type GetSocialFeedQueryHookResult = ReturnType<typeof useGetSocialFeedQuery>;
export type GetSocialFeedLazyQueryHookResult = ReturnType<typeof useGetSocialFeedLazyQuery>;
export type GetSocialFeedSuspenseQueryHookResult = ReturnType<typeof useGetSocialFeedSuspenseQuery>;
export type GetSocialFeedQueryResult = Apollo.QueryResult<GetSocialFeedQuery, GetSocialFeedQueryVariables>;
export const CreateFeedPostDocument = gql`
    mutation CreateFeedPost($input: FeedPostInput!) {
  createFeedPost(input: $input) {
    id
    user {
      id
      name
      avatar
    }
    content
    createdAt
    image
    likes
    likedByCurrentUser
    comments {
      user {
        id
        name
        avatar
      }
      comment
      createdAt
    }
    activityType
    activityValue
  }
}
    `;
export type CreateFeedPostMutationFn = Apollo.MutationFunction<CreateFeedPostMutation, CreateFeedPostMutationVariables>;

/**
 * __useCreateFeedPostMutation__
 *
 * To run a mutation, you first call `useCreateFeedPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFeedPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFeedPostMutation, { data, loading, error }] = useCreateFeedPostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateFeedPostMutation(baseOptions?: Apollo.MutationHookOptions<CreateFeedPostMutation, CreateFeedPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFeedPostMutation, CreateFeedPostMutationVariables>(CreateFeedPostDocument, options);
      }
export type CreateFeedPostMutationHookResult = ReturnType<typeof useCreateFeedPostMutation>;
export type CreateFeedPostMutationResult = Apollo.MutationResult<CreateFeedPostMutation>;
export type CreateFeedPostMutationOptions = Apollo.BaseMutationOptions<CreateFeedPostMutation, CreateFeedPostMutationVariables>;
export const UpdateFeedPostDocument = gql`
    mutation UpdateFeedPost($id: ID!, $input: UpdateFeedPostInput!) {
  updateFeedPost(id: $id, input: $input) {
    id
    content
    image
    activityType
    activityValue
    createdAt
    user {
      id
      name
      avatar
    }
    likes
    likedByCurrentUser
    comments {
      user {
        id
        name
        avatar
      }
      comment
      createdAt
    }
  }
}
    `;
export type UpdateFeedPostMutationFn = Apollo.MutationFunction<UpdateFeedPostMutation, UpdateFeedPostMutationVariables>;

/**
 * __useUpdateFeedPostMutation__
 *
 * To run a mutation, you first call `useUpdateFeedPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFeedPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFeedPostMutation, { data, loading, error }] = useUpdateFeedPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFeedPostMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFeedPostMutation, UpdateFeedPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFeedPostMutation, UpdateFeedPostMutationVariables>(UpdateFeedPostDocument, options);
      }
export type UpdateFeedPostMutationHookResult = ReturnType<typeof useUpdateFeedPostMutation>;
export type UpdateFeedPostMutationResult = Apollo.MutationResult<UpdateFeedPostMutation>;
export type UpdateFeedPostMutationOptions = Apollo.BaseMutationOptions<UpdateFeedPostMutation, UpdateFeedPostMutationVariables>;
export const DeleteFeedPostDocument = gql`
    mutation DeleteFeedPost($id: ID!) {
  deleteFeedPost(id: $id)
}
    `;
export type DeleteFeedPostMutationFn = Apollo.MutationFunction<DeleteFeedPostMutation, DeleteFeedPostMutationVariables>;

/**
 * __useDeleteFeedPostMutation__
 *
 * To run a mutation, you first call `useDeleteFeedPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFeedPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFeedPostMutation, { data, loading, error }] = useDeleteFeedPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFeedPostMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFeedPostMutation, DeleteFeedPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFeedPostMutation, DeleteFeedPostMutationVariables>(DeleteFeedPostDocument, options);
      }
export type DeleteFeedPostMutationHookResult = ReturnType<typeof useDeleteFeedPostMutation>;
export type DeleteFeedPostMutationResult = Apollo.MutationResult<DeleteFeedPostMutation>;
export type DeleteFeedPostMutationOptions = Apollo.BaseMutationOptions<DeleteFeedPostMutation, DeleteFeedPostMutationVariables>;
export const LikeFeedPostDocument = gql`
    mutation LikeFeedPost($id: ID!) {
  likeFeedPost(id: $id) {
    id
    likes
  }
}
    `;
export type LikeFeedPostMutationFn = Apollo.MutationFunction<LikeFeedPostMutation, LikeFeedPostMutationVariables>;

/**
 * __useLikeFeedPostMutation__
 *
 * To run a mutation, you first call `useLikeFeedPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeFeedPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeFeedPostMutation, { data, loading, error }] = useLikeFeedPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLikeFeedPostMutation(baseOptions?: Apollo.MutationHookOptions<LikeFeedPostMutation, LikeFeedPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikeFeedPostMutation, LikeFeedPostMutationVariables>(LikeFeedPostDocument, options);
      }
export type LikeFeedPostMutationHookResult = ReturnType<typeof useLikeFeedPostMutation>;
export type LikeFeedPostMutationResult = Apollo.MutationResult<LikeFeedPostMutation>;
export type LikeFeedPostMutationOptions = Apollo.BaseMutationOptions<LikeFeedPostMutation, LikeFeedPostMutationVariables>;
export const CommentFeedPostDocument = gql`
    mutation CommentFeedPost($id: ID!, $comment: String!) {
  commentFeedPost(id: $id, comment: $comment) {
    id
    comments {
      user {
        id
        name
        avatar
      }
      comment
      createdAt
    }
  }
}
    `;
export type CommentFeedPostMutationFn = Apollo.MutationFunction<CommentFeedPostMutation, CommentFeedPostMutationVariables>;

/**
 * __useCommentFeedPostMutation__
 *
 * To run a mutation, you first call `useCommentFeedPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentFeedPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentFeedPostMutation, { data, loading, error }] = useCommentFeedPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCommentFeedPostMutation(baseOptions?: Apollo.MutationHookOptions<CommentFeedPostMutation, CommentFeedPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CommentFeedPostMutation, CommentFeedPostMutationVariables>(CommentFeedPostDocument, options);
      }
export type CommentFeedPostMutationHookResult = ReturnType<typeof useCommentFeedPostMutation>;
export type CommentFeedPostMutationResult = Apollo.MutationResult<CommentFeedPostMutation>;
export type CommentFeedPostMutationOptions = Apollo.BaseMutationOptions<CommentFeedPostMutation, CommentFeedPostMutationVariables>;