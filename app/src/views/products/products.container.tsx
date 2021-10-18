import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductsByCategory } from '../../api';
import WithLoading from '../../components/withLoading';
import { Product } from '../../types/products';
import Products, { IProductsProps } from './products.component';

const ProductsContainer = () => {
  const [isLoading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

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
  const ProductsWithLoading = WithLoading<IProductsProps>(Products);
  return (
    <ProductsWithLoading
      loading={isLoading}
      products={products}
      category={category}
    />
  );
};
export default ProductsContainer;
