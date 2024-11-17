import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardSorter from './CardSorter';
import { useSelector } from 'react-redux';

function Cards() {
  const redditCall = useSelector((state) => state.redditCall);
  const {searchValue, isSearchable} = useSelector((state) => state.searchQuery.value);
  const searchType = isSearchable ? "search" : "category";
  // sort and filter states
  const [sortOption, setSortOption] = useState('Name');
  const [filterOption, setFilterOption] = useState("all");

  // reset filter and sort options when a new search is made
  useEffect(() => {
    setFilterOption("all");
    setSortOption("Name");
  }, [searchValue]);

  if (!redditCall) {
    return <div>Loading...</div>;
  }
  const { searchResult, status, error } = redditCall;
  if (error) {
    return <div>Error fetching data: {error}</div>;
  }
  if (status === 'loading') {
    return <div>Searching for: {searchValue}...</div>;
  }
  // Extract relevant data
  const rawData = searchResult?.[searchType]?.[searchValue]?.data || {};
  // check if there are results
  if (typeof rawData.children !== "undefined" && rawData.children.length === 0) {
    return <div>Couldn't find anything for: {searchValue}</div>;
  }
  // Map over relevant data
  if (typeof rawData.children != "undefined") {
    const posts = rawData.children.map((child) => {
      const {
        title,
        author,
        ups: likes,
        url,
        subreddit,
        created_utc,
        thumbnail,
        is_video,
        secure_media,
      } = child.data;
    
      // Determine if it's a video or image
      var mediaContent = "";
      if (is_video) {
        mediaContent = secure_media.reddit_video.fallback_url;
      } else if (thumbnail && thumbnail.startsWith('http')) {
        mediaContent = thumbnail;
      }
      return {
        title,
        author,
        likes,
        url,
        subreddit,
        created_utc,
        mediaContent,
        isVideo: is_video,
      };
    });

    // Filter the posts on filterOption
    const filteredPosts = posts.filter((post) => {
      if (filterOption === "video") {
        return post.isVideo === true;
      } else if (filterOption === "image") {
        return post.isVideo === false && post.mediaContent !== "";
      } else if (filterOption === "likes") {
        return post.likes > 0;
      } else if (filterOption === "all") {
        return true;
      }
      return false;
    });
    console.log("before sort", posts);


    // Sort the posts based on sortOption
    const sortedPosts = filteredPosts.sort((a, b) => {
      if (sortOption === 'Name') {
        return a.title.localeCompare(b.title);
      } else if (sortOption === 'Date') {
        return b.created_utc - a.created_utc;
      } else if (sortOption === 'Likes') {
        return b.likes - a.likes;
      }
      return 0;
    });

    return (
      <div>
        <CardSorter setSortOption={setSortOption} setFilterOption={setFilterOption} />
        <h4 style={{padding: "1rem"}}>Results for: {searchValue}</h4>
        <div className='container mx-auto px-4'>
          <div className='grid gap-4 cards'>
            {sortedPosts.map((post, index) => (
              <Card key={index} data={post} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
