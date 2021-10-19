import { useState, useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import Session from 'react-session-api';
import { fetchProductsByCategory } from '../../api';
import { fetchAvailabilityFromProducts } from '../../availability';
import WithLoading from '../../components/withLoading';
import { Product, ProductAvailability } from '../../types/products';
import Products, { IProductsProps } from './products.component';

const ProductsContainer = () => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [availability, setAvailability] = useState<ProductAvailability[]>([]);

  let { category } = useParams<{ category: string }>();

  useEffect(() => {
    async function getProducts() {
      let products = Session.get(category);

      if (!products) {
        products = await fetchProductsByCategory(category);
        Session.set(category, JSON.stringify(products));
      } else {
        products = JSON.parse(products);
      }

      setLoading(false);
      if (products) {
        setProducts(products);
      }
    }
    getProducts();
  }, [category]);

  useEffect(() => {
    async function getAvailability() {
      const avbt = await fetchAvailabilityFromProducts(products);
      setLoading(false);
      if (avbt) {
        setAvailability(avbt);
      }
    }
    getAvailability();
  }, [products]);

  const ProductsWithLoading = WithLoading<IProductsProps>(Products);
  return (
    <ProductsWithLoading
      loading={isLoading}
      products={products}
      category={category}
      availability={availability}
    />
  );
};
export default ProductsContainer;
