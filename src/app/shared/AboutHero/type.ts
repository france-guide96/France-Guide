export interface AboutHeroProps {
  description: string;
  countExcursions: number;
  subTitle: string;
  title: string;
  statistics: {
    id: number;
    value: string;
    label: string;
  }[];
  aboutPageImage: {
    id: number;
    url: string;
    alternativeText?: string | undefined;
  } | null;
}
