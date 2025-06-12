import {
  type GetRecommendationsQuery,
  type CreateRecommendationMutation,
  type UpdateRecommendationMutation,
  type DeleteRecommendationMutation,
  type GetHealthTipsQuery,
  type CreateHealthTipMutation,
  type UpdateHealthTipMutation,
  type DeleteHealthTipMutation,
  type GetDidYouKnowQuery,
  type CreateDidYouKnowMutation,
  type UpdateDidYouKnowMutation,
  type DeleteDidYouKnowMutation,
  type GetCoursesQuery,
  type CreateCourseMutation,
  type UpdateCourseMutation,
  type DeleteCourseMutation,
  type GetSocialFeedQuery,
  type CreateFeedPostMutation,
  type UpdateFeedPostMutation,
  type DeleteFeedPostMutation,
  type LikeFeedPostMutation,
  type CommentFeedPostMutation,
  type LoginUserMutation,
  type RegisterUserMutation,
  type RecommendationInput as GqlRecommendationInput,
} from '../generated/graphql';

export type Recommendation = GetRecommendationsQuery['getRecommendations'][0];
export type HealthTip = GetHealthTipsQuery['getHealthTips'][0];
export type DidYouKnow = GetDidYouKnowQuery['getDidYouKnow'][0];
export type Course = GetCoursesQuery['getCourses'][0];
export type FeedPost = GetSocialFeedQuery['getSocialFeed'][0];
export type User = NonNullable<NonNullable<LoginUserMutation['loginUser']>['user']> | NonNullable<NonNullable<RegisterUserMutation['registerUser']>['user']>;
;

export type RecommendationInput = GqlRecommendationInput;
export type HealthTipInput = CreateHealthTipMutation['createHealthTip'];
export type DidYouKnowInput = CreateDidYouKnowMutation['createDidYouKnow'];
export type CourseInput = CreateCourseMutation['createCourse'];
export type FeedPostInput = CreateFeedPostMutation['createFeedPost'];