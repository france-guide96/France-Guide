export interface StrapiResponse<T> {
  data: T[];
}

export interface StrapiSingleResponse<T> {
  data: T;
}

export interface TourCard {
  id: number;
  documentId: string;
  duration: string;
  category: string;
  primaryText: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  filterCategory: string;
  TourOverview: string;
  price: string;
  rating: string;
  order: number;
  included: Included[];
  gallery: Gallery[];
  bgImg: BgImg;
  pricing: Pricing[];
  contentSections: ContentSection[];
}

export interface ContentSection {
  id: number;
  title?: string;
  description: string;
  isNewDesign: boolean;
  newDesignImageCarousel: BgImg;
}

export interface PlanItem {
  id: number;
  time: string;
  title: string;
  description: string;
}

export interface Highlight {
  id: number;
  text: string;
}

export interface Included {
  id: number;
  text: string;
}

export interface Gallery {
  id: number;
  alt: string;
  image: Image[];
}

export interface Pricing {
  price: number;
  id: number;
  range: string;
}

export interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Formats {
  thumbnail: Thumbnail;
  medium: Medium;
  small: Small;
  large: Large;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

export interface BgImg {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats2;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  related: Related[];
}

export interface Formats2 {
  large: Large2;
  small: Small2;
  medium: Medium2;
  thumbnail: Thumbnail2;
}

export interface Large2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Small2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Medium2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Thumbnail2 {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Related {
  __type: string;
  id: number;
  documentId: string;
  duration: string;
  category: string;
  primaryText: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  slug: string;
  filterCategory: string;
  TourOverview: string;
  price: string;
  rating: string;
}
