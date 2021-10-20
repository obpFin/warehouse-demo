import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IProps<T> {
  data: T[];
}

const SLICE_LENGTH = 500;

const InfiniteScrollTable = <T extends {}>({ data }: IProps<T>) => {
  const [count, setCount] = useState({
    prev: 0,
    next: SLICE_LENGTH,
  });
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(data.slice(count.prev, count.next));
  const getMoreData = () => {
    if (current.length === data.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(
        current.concat(
          data.slice(count.prev + SLICE_LENGTH, count.next + SLICE_LENGTH)
        )
      );
    }, 200);
    setCount((prevState) => ({
      prev: prevState.prev + SLICE_LENGTH,
      next: prevState.next + SLICE_LENGTH,
    }));
  };

  const headers = Object.keys(data[0]) as Array<string>;
  const getRow = (row: T) => Object.values(row) as Array<string>;

  return (
    <InfiniteScroll
      dataLength={current.length}
      next={getMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {current.map((p, idx) => (
            <tr key={idx}>
              {getRow(p).map((r) => (
                <td key={r}>{r}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </InfiniteScroll>
  );
};

export default InfiniteScrollTable;
