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
    <div className='categories'>
        <div className='category' data-search="popular" onClick={handleCategoryClick}>Popular</div>
        <div className='category' data-search="new" onClick={handleCategoryClick}>New</div>
        <div className='category' data-search="gold" onClick={handleCategoryClick}>Gold</div>
        <div className='category' data-search="default" onClick={handleCategoryClick}>Default</div>
    </div>
    )

}

export default Categories