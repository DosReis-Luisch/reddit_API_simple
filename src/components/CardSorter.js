import React from 'react';

function CardSorter({ setSortOption, setFilterOption }) {
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <div className='cardSorter'>
      <p className='sortBy'>Sort by</p>
      <select className='select max-w-xs' onChange={handleSortChange}>
        <option value="Name">name</option>
        <option value="Date">date</option>
        <option value="Likes">likes</option>
      </select>
      <p className='filterCards'>Filter</p>
      <select className='select max-w-xs' onChange={handleFilterChange}>
        <option value="all">all posts</option>
        <option value="video">just Video</option>
        <option value="image">just Image</option>
        <option value="likes">with likes</option>
      </select>
    </div>
  );
}

export default CardSorter;