import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <ColorRing
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperClass="color-ring-wrapper"
        colors={['#c0942f', '#aa9565', '#f4b420', '#71f420', '#449213']}
      />
    </div>
  );
};

export default Loading;
