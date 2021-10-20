import Session from 'react-session-api';
import { fetchAvailabilityByManufacturer } from './api';
import { Product, ProductAvailability } from './types/products';

export const fetchAvailabilityFromProducts = async (
  products: Product[]
): Promise<ProductAvailability[]> => {
  const manufacturers = [...new Set(products.map((pr) => pr.manufacturer))];
  const avbt = await Promise.all(
    manufacturers.map((m) => {
      const manAvbt = Session.get(m);
      return manAvbt
        ? Promise.resolve(JSON.parse(manAvbt))
        : fetchAvailabilityByManufacturer(m);
    })
  ).catch((err) => {
    console.error(err);
  });

  if (avbt) {
    return avbt.flat();
  }
  return [];
};

export const getProductAvailability = (
  productId: string,
  availabilityList: ProductAvailability[]
) => {
  return availabilityList
    .flat()
    .find((avbt) => avbt.id.toLowerCase() === productId)?.stock;
};

export const mergeProductsWithAvailability = (
  products: Product[],
  availabilityList: ProductAvailability[]
) => {
  return new Promise<Product[]>((resolve, reject) => {
    try {
      let productsWithAvailability: Product[] = [];

      products.forEach((pr) => {
        const prAvbt = availabilityList.find((avbt) => {
          if (!avbt) return undefined;
          return avbt.id.toLowerCase() === pr.id.toLowerCase();
        });
        productsWithAvailability.push({ ...pr, stock: prAvbt?.stock });
      });
      resolve(productsWithAvailability);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};
