import React from 'react';
import './App.css';

function SuggestionList(props) {
  const { items, onItemSelect, hidden } = props;

  const handleItemClick = (item) => {
    onItemSelect(item)
  }

  return (
    <div className='suggestion-list' style={{ display: hidden ? 'none' : 'inline' }}>
      {items.length > 0 ? items.map(item => (
        <div className='list-item' onClick={() => handleItemClick(item)}>
          <img src={item.thumbnail} className='thumbnail' />
          <div className='name' title={item.name}>{item.name}</div>
          <div className='email' title={item.email} >{item.email}</div>
        </div>
      )) :
        <div>No Records Found</div>
      }
    </div>
  )
}

export default SuggestionList
