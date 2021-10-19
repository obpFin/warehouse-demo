import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../../api';
import { mapManufacturersFromProducts } from '../../availability';
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
      const products = await fetchProductsByCategory(category);
      setLoading(false);
      if (products) {
        setProducts(products);
      }
    }
    getProducts();
  }, [category]);

  useEffect(() => {
    async function getAvailability() {
      const avbt = await mapManufacturersFromProducts(products);
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
