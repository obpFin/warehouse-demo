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
