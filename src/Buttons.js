import React from 'react';
import { useGlobalContext } from './context';

const Buttons = () => {
  const {handlePage, isLoading, page, nbPages} = useGlobalContext();
  
  return (
    <div className='btn-container'>
      <button
        disabled={isLoading}
        className='btn'
        onClick={() => handlePage('dec')}
      >
        Prev
      </button>
      <span>{page + 1} of {nbPages}</span>
    
      <button
        disabled={isLoading}
        className='btn'
        onClick={() => handlePage('inc')}
      >
        Next
      </button>
    </div>
  );
};

export default Buttons;
