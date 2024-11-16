import React from 'react';

function CardSorter({ setSortOption }) {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <p>Sort by</p>
      <select onChange={handleSortChange}>
        <option value="Name">Name</option>
        <option value="Date">Date</option>
        <option value="Likes">Likes</option>
      </select>
    </div>
  );
}

export default CardSorter;