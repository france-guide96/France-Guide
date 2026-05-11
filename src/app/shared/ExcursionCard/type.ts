export type ExcursionProps = {
  id: number;
  title: string;
  description: string;
  image: { id: number; url: string } | string;
  duration?: string;
  group?: string;
  location: string;
  isLarge?: boolean;
  href?: string;
};
