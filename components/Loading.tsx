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
        colors={['#9299fa', '#7077df', '#4e54a4', '#8185c5', '#b2b5e0']}
      />
    </div>
  );
};

export default Loading;
