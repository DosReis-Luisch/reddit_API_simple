import React from 'react';

function Card({ data }) {
  const { title, author, thumbnail, likes, url, subreddit, created_utc } = data;

  return (
    <div>
      <h4>{title}</h4>
      <p>By: {author}</p>
      <p>Subreddit: {subreddit}</p>
      {thumbnail && <img src={thumbnail} alt={title} />}
      <p>Likes: {likes}</p>
      <p>Date: {new Date(created_utc * 1000).toLocaleDateString()}</p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        View Post
      </a>
    </div>
  );
}

export default Card;
