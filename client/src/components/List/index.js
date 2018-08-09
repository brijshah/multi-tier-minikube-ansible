import React from 'react';
import Button from '../Button';
import classNames from 'classnames';

import './styles.css';

export default function (props) {
  const { 
    items,
    onCheck = () => {},
    onDelete = () => {}
  } = props;
  
  
  return (
    <ul className="c-list">
      {items.map((item) => {
        const labelClasses = classNames("c-list-label", {
          "c-list-label-complete": item.status === 'complete'
        });

        return (
          <li className="flex">
            <div className={labelClasses}>
              {item.label}
            </div>
            <Button style={{ marginLeft: "10px" }} onClick={onCheck.bind(this, item)}>✔️</Button>
            <Button style={{ marginLeft: "10px" }} onClick={onDelete.bind(this, item)}>✖️</Button>
          </li>
        )
      })}
    </ul>
  )
}