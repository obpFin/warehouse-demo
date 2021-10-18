/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/products';

export interface IProductsProps {
  category: string;
  products: Product[];
}

export default function Products({ products, category }: IProductsProps) {
  return (
    <>
      <div
        css={css({
          position: 'fixed',
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
      {products.map((p) => (
        <article
          key={p.id}
          css={css({
            margin: '1rem 0',
          })}
        >
          <p>{p.name}</p>
          <p>{p.color}</p>
          <p>{p.manufacturer}</p>
          <p>{p.price}</p>
        </article>
      ))}
    </>
  );
}
