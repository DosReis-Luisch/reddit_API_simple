import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateSearchValue } from "../features/search";
import { fetchResult } from "../features/redditCall";

function Search() {
  const dispatch = useDispatch();
  const inputRef = useRef(null); // Create a ref for the input

  const handleSearch = (event) => {
    dispatch(updateSearchValue({ searchValue: event.target.value, isSearchable: true }));
    dispatch(fetchResult());
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input field
    }
  };

  return (
    <div>
      <input
        className='input input-bordered input-sm w-full max-w-xs'
        type="text"
        ref={inputRef}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleSearch(event);
          }
        }}
      />
      <button 
        className='btn btn-sm'
        style={{margin: "10px"}}
        onClick={(event) => {handleSearch(event)}}>Search</button>
    </div>
  );
}

export default Search;