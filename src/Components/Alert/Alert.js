/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './Alert.scss';

function Alert({ text, active = false }) {
  return (
    <div className={`alert-message ${active && 'alert-message_active'}`}>
      <p>{text}</p>
    </div>
  );
}

export default Alert;
