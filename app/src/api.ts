import Session from 'react-session-api';
import { Product, ProductAvailability } from './types/products';

export const fetchProductsByCategory = async (
  category: string
): Promise<Product[] | undefined> => {
  const url = `/api/products/${category}`;
  let productsResponse;
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      productsResponse = data;
    })
    .catch((err) => {
      console.error(`Error occurred while requesting ${url}`, err);
      productsResponse = undefined;
    });
  return productsResponse;
};

export const fetchAvailabilityByManufacturer = async (
  manufacturer: string
): Promise<ProductAvailability[] | undefined> => {
  const url = `/api/availability/${manufacturer}`;
  let availabilityResponse;
  await fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        return undefined;
      } else {
        const data = await response.json();
        Session.set(manufacturer, JSON.stringify(data));
        return data;
      }
    })
    .then((data) => {
      availabilityResponse = data;
    })
    .catch((err) => {
      console.error(`Error occurred while requesting ${url}`, err);
      availabilityResponse = undefined;
    });
  return availabilityResponse;
};
