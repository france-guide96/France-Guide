export interface MyStoryProps {
  title: string;
  subTitle: string;
  events?: {
    id: number;
    year: string;
    title: string;
    description: string;
    eventTitle: string;
  }[];
}
