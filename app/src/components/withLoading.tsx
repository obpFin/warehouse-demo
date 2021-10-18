import React from 'react';

interface WithLoadingProps {
  loading: boolean;
}

const WithLoading =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithLoadingProps> =>
  ({ loading, ...props }: WithLoadingProps) =>
    loading ? <p>Loading</p> : <Component {...(props as P)} />;

export default WithLoading;
