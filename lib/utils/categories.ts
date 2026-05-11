import { Formats } from "./tourCardType";

export interface CategoriesTypes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  title: string;
  description: string;
  duration: string;
  group: string;
  href: string;
  location: string;
  order: number;
  image: Image;
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
}
