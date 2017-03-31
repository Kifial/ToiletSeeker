import React from 'react';

const PaginationItem = (props) => {
  return (
    <div
      className={'pagination__item ' + (props.active ? 'pagination__item--active' : '')}
      onClick={props.handleClick}
    >
      {props.value}
    </div>
  )
};

export default PaginationItem;