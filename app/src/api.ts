import { Product } from './types/products';

export const fetchProductsByCategory = async (
  category: string
): Promise<Product[] | undefined> => {
  const url = `/api/products/${category}`;
  let productsResponse;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log('data ', data);
      productsResponse = data;
      return productsResponse;
    })
    .catch((err) => {
      console.error(`Error occurred while requesting ${url}`, err);
      productsResponse = undefined;
    });
  return productsResponse;
};
