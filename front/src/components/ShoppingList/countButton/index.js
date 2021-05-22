import React from 'react';

// == Import
// import './styles.css';
import CounterInput from 'react-counter-input';
// == Composant

function Button() {
  const button = {};
  return (
    <CounterInput
      min={0}
      max={60}
      onCountChange={count => console.log(count)}
    />
  );
}

// == Export
export default Button;
