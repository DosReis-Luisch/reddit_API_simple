import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateSearchValue } from "../features/search";
import { fetchResult } from "../features/redditCall";

function Search() {
  const dispatch = useDispatch();
  const inputRef = useRef(null); // Create a ref for the input

  const handleSearch = () => {
    dispatch(fetchResult());
    if (inputRef.current) {
      inputRef.current.value = ''; // Clear the input field
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={inputRef}
        onInput={(event) => {
          dispatch(updateSearchValue({ searchValue: event.target.value, isSearchable: true }));
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;