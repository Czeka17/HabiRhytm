import React from 'react';
import classes from './List.module.css';
interface ListProps {
  children: React.ReactNode;
  isAddictionList?: boolean;
}
function List({ children, isAddictionList }: ListProps) {
  return (
    <ul
      className={`${classes.list} ${isAddictionList && classes.addictionList}`}
    >
      {children}
    </ul>
  );
}
export default List;
