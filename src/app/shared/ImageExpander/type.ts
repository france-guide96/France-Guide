export type GalleryItem = {
  src: string;
  alt?: string;
  height: number;
  width: number;
};

export type GalleryType = {
  images: GalleryItem[];
  styles?: string;
  imgStyles?: string;
  isGrid?: boolean;
  showHeader?: boolean;
};