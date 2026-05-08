import { StrapiImage } from "./aboutPageType";

interface TransferFeature {
  id: number;
  title: string;
  description: string;
}

interface PopularRoute {
  from: string;
  to: string;
  price: number;
}

export interface TransferSectionData {
  sectionTitle: string;
  sectionSubTitle: string;
  sectionDescription: string;
  buttonText: string;
  features: TransferFeature[];
  sectionPopularRoute: PopularRoute[];
  carImage: StrapiImage[];
}

export interface TransferSpec {
  id: number;
  text: string;
}

export interface PriceRow {
  id: number;
  title: string;
  subTitle: string;
  priceStandard: number;
  priceBusiness: number;
  priceVip: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
}
export interface TransferPageData {
  titlePage: string;
  subTitlePage: string;
  carTitle: string;
  carDescription: string;
  carCarousel: StrapiImage[];
  carSpecs: TransferSpec[];
  priceTable: PriceRow[];
  features: Feature[];
}
