export type Product = {
  id: string;
  color: string[];
  manufacturer: string;
  name: string;
  price: number;
  type: string;
  stock?: string;
};

export type ProductAvailability = {
  id: string;
  stock: string;
};
