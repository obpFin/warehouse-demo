export interface IManufacturerAvailability {
  productsStock: Stock[];
}

export type Stock = {
  id: string;
  DATAPAYLOAD: string;
};

export type Availability = {
  CODE: string;
  INSTOCKVALUE: string;
};

export type Product = {
  id: string;
  type: string;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
};
