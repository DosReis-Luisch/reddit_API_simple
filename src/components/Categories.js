import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSearchValue } from "../features/search";
import { fetchResult } from "../features/redditCall";

function Categories() {
    const dispatch = useDispatch();

    const handleCategoryClick = (event) => {
        const searchValue = event.currentTarget.getAttribute('data-search');
        dispatch(updateSearchValue({ searchValue, isSearchable: false }))
        dispatch(fetchResult());
    }

    return (
        <div>
            <h2 style={{margin: "20px 0px 15px 0px", "font-size": "2rem"}}>Categories</h2>
            <div className='categories'>
                <div className='btn btn-active btn-sm btn-neutral' data-search="popular" onClick={handleCategoryClick}>Popular</div>
                <div className='btn btn-active btn-sm btn-neutral' data-search="crypto" onClick={handleCategoryClick}>Crypto</div>
                <div className='btn btn-active btn-sm btn-neutral' data-search="gold" onClick={handleCategoryClick}>Gold</div>
                <div className='btn btn-active btn-sm btn-neutral' data-search="weather" onClick={handleCategoryClick}>Weather</div>
                <div className='btn btn-active btn-sm btn-neutral' data-search="elections" onClick={handleCategoryClick}>Elections</div>
                <div className='btn btn-active btn-sm btn-neutral' data-search="life" onClick={handleCategoryClick}>Life</div>
                <div className='btn btn-active btn-sm btn-neutral' data-search="sports" onClick={handleCategoryClick}>Sports</div>
            </div>
        </div>
    )

}

export default Categories