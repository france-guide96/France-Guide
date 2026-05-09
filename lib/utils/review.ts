export type Review = {
  id: number;
  name: string;
  review: string;
  rating: number;
  tourSlug: string;
};

export type StrapiReview = {
  id: number;
  name: string;
  review: string;
  rating: number;
  tourSlug: string;
  createdAt: string;
  date?: string;
};

export type ReviewItem = {
  id: number;
  authorName: string;
  rating: number;
  content: string;
  date: string;
  avatar: string;
};