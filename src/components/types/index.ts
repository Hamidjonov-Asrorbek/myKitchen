export type Product = {
  id: string;
  name: string;
  price: number;
  images: string[];
  time: number;
  description: string;
  ingredients: string[];
  type: string;
};

export type ProductsState = {
  data: Product[];
  filter: string;
  search: string;
};

export type RootState = {
  products: ProductsState;
};

export type ErrorStatus = {
  message: string;
};
