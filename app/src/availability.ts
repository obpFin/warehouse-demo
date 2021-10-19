import { fetchAvailabilityByManufacturer } from './api';
import { Product, ProductAvailability } from './types/products';

export const mapManufacturersFromProducts = async (
  products: Product[]
): Promise<ProductAvailability[]> => {
  const manufacturers = [...new Set(products.map((pr) => pr.manufacturer))];
  const avbt = await Promise.all(
    manufacturers.map((m) => fetchAvailabilityByManufacturer(m))
  ).catch((err) => {
    console.error(err);
  });

  console.log(avbt);

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
