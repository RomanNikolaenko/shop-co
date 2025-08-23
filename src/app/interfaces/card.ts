export interface CardModel {
  url: string;
  title: string;
  src: string;
  srcset: string;
  alt: string;
  save?: string;
  price: {
    new: number;
    old?: number;
  };
}
