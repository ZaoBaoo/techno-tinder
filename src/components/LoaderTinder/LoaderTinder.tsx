import { FC } from 'react';

const LoaderTinder: FC<ILoaderTinder> = ({ isLoaderView }) => {
  return (
    <div className="loader-wrapper" style={{ display: isLoaderView ? 'block' : 'none' }}>
      <div className="loader" />
    </div>
  );
};

export { LoaderTinder };
