import React from 'react';
import './LoaderBox.scss';

function LoaderBox({
  width,
  height,
  marginLeft = 'auto',
  marginRight = 'auto',
  marginBottom = '0px',
}) {
  const styles = {
    width,
    height,
    marginLeft,
    marginRight,
    marginBottom,
  };

  return <div style={styles} className="gradient"></div>;
}

export default LoaderBox;
