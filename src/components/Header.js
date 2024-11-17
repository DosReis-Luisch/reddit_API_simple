import React from 'react'

function Header() {
  return (
    <div className='header'>
        <h2>Simple Reddit API without OAuth</h2>
        <h4>Search or click on a categorie</h4>
        <img className='redditLogo' src="/Reddit-Logo.png" alt="Reddit Logo" />
    </div>
  )
}

export default Header