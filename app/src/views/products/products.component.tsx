/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import InfiniteScrollTable from '../../components/InfiniteScrollTable';
import { Product } from '../../types/products';

export interface IProductsProps {
  category: string;
  products: Product[];
}

export default function Products({ products, category }: IProductsProps) {
  if (!products.length) {
    return null;
  }

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
      <InfiniteScrollTable data={products} />
    </>
  );
}
