import React, { useState } from 'react';
import Card from './Card';
import CardSorter from './CardSorter';
import { useSelector } from 'react-redux';

function Cards() {
  const redditCall = useSelector((state) => state.redditCall);
  const searchString = useSelector((state) => state.searchQuery.value.searchValue);

  const [sortOption, setSortOption] = useState('Name'); // Default sort option

  if (!redditCall) {
    return <div>Loading...</div>;
  }

  const { searchResult, status, error } = redditCall;

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  if (status === 'loading') {
    return <div>Searching for: {searchString}...</div>;
  }

  // Extract relevant posts from the children array
  const searchType = searchResult?.searchType;
  const children = searchResult?.[searchType]?.[searchString]?.data.children || [];

  // Map over the children array to get individual posts
  const posts = children.map((child) => {
    const {
      title,
      author,
      thumbnail,
      ups: likes,
      url,
      subreddit,
      created_utc,
    } = child.data;

    return {
      title,
      author,
      thumbnail,
      likes,
      url,
      subreddit,
      created_utc,
    };
  });

  // Sort the posts based on sortOption
  const sortedPosts = posts.sort((a, b) => {
    if (sortOption === 'Name') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'Date') {
      return b.created_utc - a.created_utc;
    } else if (sortOption === 'Likes') {
      return b.likes - a.likes;
    } else {
      return 0; // Add more sorting logic as needed
    }
  });

  return (
    <div>
      <CardSorter setSortOption={setSortOption} />
      {sortedPosts.map((post, index) => (
        <Card key={index} data={post} />
      ))}
    </div>
  );
}

export default Cards;
