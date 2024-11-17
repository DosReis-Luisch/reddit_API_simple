import React from 'react';

function Card({ data }) {
  const {
    title,
    author,
    likes,
    url,
    subreddit,
    created_utc,
    mediaContent,
    isVideo
  } = data;

  

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      {/* Conditionally render the video or image */}
      {isVideo ? (
        <figure>
          <video
            style={{ height: '14rem' }}
            width="100%"
            controls
            loop
          >
            <source src={mediaContent} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </figure>
      )  : mediaContent !== "" &&
      (
        <figure>
          <img style={{ height: '14rem' }} src={mediaContent} alt={title} />
        </figure>
      )}

      <div className="card-body cardBody">
        <h2 className="card-title">
          <p>{title}</p>
        </h2>
        <div className="card-actions">
          <div className="likes-date">
            <div className="badge badge-secondary">{likes} Likes</div>
            <div className="badge badge-secondary">
              {new Date(created_utc * 1000).toLocaleDateString()}
            </div>
          </div>
          <div className="badge badge-outline">By: {author}</div>
          <div className="badge badge-outline">Subreddit: {subreddit}</div>
          <div className="card-actions justify-end">
            <a
              className="btn btn-primary cardLink"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
