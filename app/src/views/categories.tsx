/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';

export default function Categories() {
  const mapCategories = (categories: string[]) =>
    categories.map((c) => (
      <Link to={`/${c.toLowerCase()}`} key={c}>
        <article
          css={css({
            display: 'flex',
            borderRadius: '1rem',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            background: 'white',
            color: '#333',
            '&:hover': {
              opacity: 0.9,
              cursor: 'pointer',
            },
          })}
        >
          {c}
        </article>
      </Link>
    ));
  return (
    <section
      css={css({
        display: 'grid',
        width: '600px',
        height: '600px',
        gridTemplateColumns: '300px 300px',
        gridRow: 'auto',
        gridColumnGap: '20px',
        gridRowGap: '20px',
        justifyItems: 'left',
      })}
    >
      {mapCategories(CATEGORIES)}
    </section>
  );
}
