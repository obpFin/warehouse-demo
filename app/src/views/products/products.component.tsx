/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { getProductAvailability } from '../../availability';
import InfiniteScrollTable from '../../components/InfiniteScrollTable';
import { Product, ProductAvailability } from '../../types/products';

export interface IProductsProps {
  category: string;
  products: Product[];
  availability: ProductAvailability[];
}

export default function Products({
  products,
  category,
  availability,
}: IProductsProps) {
  if (!products.length) {
    return null;
  }

  const onProductClick = ({ id }: Product) => {
    console.log('id, ', id);
    console.log('av, ', getProductAvailability(id, availability));
  };

  return (
    <>
      <div
        css={css({
          zIndex: 9999,
          position: 'sticky',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          background: '#282c34',
          height: '150px',
          top: '0',
          width: '100%',
        })}
      >
        <span
          css={css({
            margin: '0 10%',
          })}
        >
          <Link to="/">Back</Link>
        </span>
        <h1 css={css({})}>{category.toUpperCase()}</h1>
        <span></span>
      </div>
      <InfiniteScrollTable data={products} onRowClick={onProductClick} />
    </>
  );
}
