import { StaticImageData } from "next/image";

export type ExcursionProps = {
  id: number;
  title: string;
  description: string;
  image: string | StaticImageData;
  duration?: string;
  group?: string;
  location: string;
  isLarge?: boolean;
  href?: string;
}