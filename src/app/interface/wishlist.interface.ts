export interface Root {
  data: Data;
}

export interface Data {
  some(arg0: (item: any) => boolean): unknown;
  _id: string;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  category: { _id: string; name: string; slug: string; image: string };
  brand: { _id: string; name: string; slug: string; image: string };
  ratingsAverage: number;
  
}
