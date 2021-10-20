import React from 'react';
import Loader from 'react-loader-spinner';

interface WithLoadingProps {
  loading: boolean;
}

const WithLoading =
  <P extends object>(
    Component: React.ComponentType<P>
  ): React.FC<P & WithLoadingProps> =>
  ({ loading, ...props }: WithLoadingProps) =>
    loading ? (
      <Loader type="ThreeDots" color="#00BFFF" height={75} width={75} />
    ) : (
      <Component {...(props as P)} />
    );

export default WithLoading;
