import React from 'react';

export default function (props) {
  const { items } = props;
  
  return (
    <ul>
      {items.map((item) => (
        <li>{item.label}</li>
      ))}
    </ul>
  )
}