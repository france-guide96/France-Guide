export type GalleryItem = {
  src: string;
  alt?: string;
};

export type GalleryType = {
  images: GalleryItem[];
  styles?: string;
  imgStyles?: string;
};