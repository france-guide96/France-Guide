interface Formats {
  thumbnail: Thumbnail;
  medium: Medium;
  small: Small;
  large: Large;
}

interface Thumbnail {
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

interface Medium {
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

interface Small {
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

interface Large {
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

export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: Formats;
  caption?: string;
  size?: string;
}

interface StatisticItem {
  id: number;
  value: string;
  label: string;
}

interface AboutMyself {
  id: number;
  aboutMyself: string;
}
interface FeatureItem {
  id: number;
  title: string;
  description: string;
}

interface TimelineEventItem {
  id: number;
  year: string;
  title: string;
  description: string;
  eventTitle: string;
}

export interface AboutPageData {
  id: number;
  documentId: string;
  title: string;
  subTitle: string;
  description: string;
  countExcursions: number;
  stats: StatisticItem[];
  aboutPageImage: {
    id: number;
    url: string;
    alternativeText?: string | undefined;
  } | null;
  myself: AboutMyself[];
  myselfTitle: string;
  carousel: StrapiImage[];
  educationTitle: string;
  educationSubTitle: string;
  educationItems: FeatureItem[];
  principleTitle: string;
  principleSubTitle: string;
  principles: FeatureItem[];
  timelineEventTitle: string;
  timelineEventSubTitle: string;
  timelineEventItem?: TimelineEventItem[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface AboutPageResponse {
  data: AboutPageData;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
