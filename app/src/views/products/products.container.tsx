import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Session from 'react-session-api';
import { fetchProductsByCategory } from '../../api';
import {
  fetchAvailabilityFromProducts,
  mergeProductsWithAvailability,
} from '../../availability';
import WithLoading from '../../components/withLoading';
import { Product } from '../../types/products';
import Products, { IProductsProps } from './products.component';

const ProductsContainer = () => {
  const [isLoading, setLoading] = useState(true);
  const [fetchingAvailability, setFetchingAvailability] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  let { category } = useParams<{ category: string }>();

  useEffect(() => {
    async function getProducts() {
      let products = Session.get(category);

      if (!products) {
        products = await fetchProductsByCategory(category);
        setProducts(products);
        setLoading(false);

        Session.set(category, JSON.stringify(products));
        setFetchingAvailability(true);
        fetchAvailabilityFromProducts(products).then((avbt) => {
          if (avbt) {
            mergeProductsWithAvailability(products, avbt).then((mergedList) => {
              setProducts(mergedList);
              setFetchingAvailability(false);
              Session.set(category, JSON.stringify(mergedList));
            });
          }
        });
      } else {
        products = JSON.parse(products);
        setProducts(products);
        setLoading(false);
      }
    }
    getProducts();
  }, [category]);

  const ProductsWithLoading = WithLoading<IProductsProps>(Products);
  return (
    <ProductsWithLoading
      loading={isLoading}
      fetchingAvailability={fetchingAvailability}
      products={products}
      category={category}
    />
  );
};
export default ProductsContainer;
